"use client";

// GA4 event firing for the FitWithPalak funnel — native gtag.js, independent of
// any Meta tracking. Every event fires AT MOST ONCE PER BROWSER (reach/intent
// counts, not volume). Rules (from the GA4 brief):
//   - stamp the localStorage flag BEFORE calling gtag (a CTA click navigates
//     away immediately after, and an un-stamped flag double-fires)
//   - if gtag is absent (GA4 not loaded), do NOTHING and do NOT stamp, so the
//     event can still fire once GA4 is present (never permanently suppress it)
//   - if localStorage throws (private mode), fire anyway (best-effort dedup)
//   - never throw into a click handler

const PREFIX = "fwp_ga4_";

type GtagFn = (command: string, ...args: unknown[]) => void;

/** Fire a GA4 event once per browser. No params (pure count, no value/currency). */
export function trackGa4EventOnce(event: string): void {
  if (typeof window === "undefined") return;
  const key = `${PREFIX}${event}_fired`;

  // Already fired in this browser? bail. (If storage throws, fall through.)
  try {
    if (window.localStorage.getItem(key) === "1") return;
  } catch {
    /* private mode — best-effort, continue */
  }

  const gtag = (window as unknown as { gtag?: GtagFn }).gtag;
  if (typeof gtag !== "function") return; // GA4 not present -> do not stamp

  // Stamp BEFORE firing so navigation can't cause a double-fire.
  try {
    window.localStorage.setItem(key, "1");
  } catch {
    /* private mode — fire anyway */
  }

  try {
    gtag("event", event);
  } catch {
    /* analytics must never throw into a handler */
  }
}
