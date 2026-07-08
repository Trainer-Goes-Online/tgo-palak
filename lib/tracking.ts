"use client";

// Client-side capture of UTM + click-id params on first landing, persisted so
// they survive the journey to /checkout and get packed into the Razorpay order
// notes (which the webhook reads server-to-server). Mirrors the migration spec.

import type { UtmData } from "./meta-capi";

const STORE_KEY = "fwp_tracking";
const UTM_KEYS: Array<[keyof UtmData, string]> = [
  ["source", "utm_source"],
  ["medium", "utm_medium"],
  ["campaign", "utm_campaign"],
  ["content", "utm_content"],
  ["term", "utm_term"],
];

interface TrackingStore {
  utm: UtmData;
  fbclid: string;
}

function read(): TrackingStore {
  if (typeof window === "undefined") return { utm: {}, fbclid: "" };
  try {
    const raw = window.localStorage.getItem(STORE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { utm: parsed.utm ?? {}, fbclid: parsed.fbclid ?? "" };
    }
  } catch {
    /* ignore */
  }
  return { utm: {}, fbclid: "" };
}

/**
 * Capture tracking params from the current URL into localStorage. Only writes
 * values that are present, and never overwrites an existing value with an empty
 * one (first-touch attribution wins). Call once on landing (e.g. in a client
 * effect on the home page).
 */
export function captureTrackingParams(): void {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const existing = read();
  const utm: UtmData = { ...existing.utm };
  for (const [key, param] of UTM_KEYS) {
    const v = params.get(param);
    if (v && !utm[key]) utm[key] = v;
  }
  const fbclid = params.get("fbclid") || existing.fbclid || "";
  const next: TrackingStore = { utm, fbclid };
  try {
    window.localStorage.setItem(STORE_KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
}

export function restoreUtm(): UtmData {
  return read().utm;
}

export function restoreFbclid(): string {
  return read().fbclid;
}
