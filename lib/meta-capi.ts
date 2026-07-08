import crypto from "crypto";

// ============================================================================
// Meta Conversions API — server-side firing (called from the Razorpay webhook).
//
// HEALTH & WELLNESS COMPLIANCE (Section 0 of META_TRACKING_AGENT_GUIDE):
// FitWithPalak is a thyroid / clinical-nutrition funnel, i.e. a dataset Meta
// classifies as "Health and wellness condition". For those datasets the
// standard `Purchase` event is restricted BY NAME. So we fire a SINGLE neutral
// custom event (default "sales"), with:
//   - PHI-free custom_data (value / currency / order_id only)
//   - host-only event_source_url (no path/query leaks to Meta)
//   - full hashed user_data + external_id for EMQ (hashed PII is allowed)
// To switch to the standard dual-event (Purchase + custom) pattern for a
// non-restricted account, set META_CAPI_FIRE_PURCHASE=true.
// ============================================================================

const CUSTOM_EVENT_NAME = process.env.META_CAPI_EVENT_NAME ?? "sales";
const FIRE_PURCHASE = process.env.META_CAPI_FIRE_PURCHASE === "true";
const GRAPH_VERSION = "v25.0";

export function sha256(value: string): string {
  return crypto.createHash("sha256").update(value).digest("hex");
}

/** Reduce any URL to its origin (scheme + host) so no path/query reaches Meta. */
function toOrigin(url: string, fallback: string): string {
  try {
    return new URL(url).origin;
  } catch {
    try {
      return new URL(fallback).origin;
    } catch {
      return fallback;
    }
  }
}

// Shared shapes used by the create-order route + checkout form.
export interface CustomerData {
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  phone: string;
  countryCode: string; // 2-letter ISO, e.g. "IN"
  dialCode: string; // e.g. "+91"
  customerType?: string;
}

export interface UtmData {
  source?: string;
  medium?: string;
  campaign?: string;
  content?: string;
  term?: string;
}

export async function sendMetaCapiEvent(params: {
  pixelId: string;
  accessToken: string;
  paymentId: string; // event_id (dedup)
  orderId?: string;
  email: string;
  phone: string; // dial code + number, raw
  firstName: string;
  lastName: string;
  city: string;
  countryCode: string; // 2-letter ISO
  eventSourceUrl: string;
  value: number; // rupees (major units)
  currency: string;
  fbc?: string;
  fbp?: string;
  clientIp?: string;
  clientUserAgent?: string;
}) {
  const normalisedEmail = params.email.trim().toLowerCase();
  const hashedEmail = normalisedEmail ? sha256(normalisedEmail) : undefined;
  const externalId = normalisedEmail ? sha256(normalisedEmail) : undefined;

  const rawPhone = params.phone.replace(/\D/g, "");
  const hashedPhone = rawPhone ? sha256(rawPhone) : undefined;

  const fn = params.firstName.trim().toLowerCase();
  const ln = params.lastName.trim().toLowerCase();
  const ct = params.city.trim().toLowerCase().replace(/[^a-z]/g, "");
  const country = params.countryCode.trim().toLowerCase();

  const hashedFn = fn ? sha256(fn) : undefined;
  const hashedLn = ln ? sha256(ln) : undefined;
  const hashedCt = ct ? sha256(ct) : undefined;
  const hashedCountry = country ? sha256(country) : undefined;

  const baseEvent = {
    event_time: Math.floor(Date.now() / 1000),
    event_id: params.paymentId,
    action_source: "website" as const,
    event_source_url: toOrigin(params.eventSourceUrl, "https://vsl.palaksachdeva.com"),
    user_data: {
      ...(hashedEmail && { em: [hashedEmail] }),
      ...(hashedPhone && { ph: [hashedPhone] }),
      ...(hashedFn && { fn: [hashedFn] }),
      ...(hashedLn && { ln: [hashedLn] }),
      ...(hashedCt && { ct: [hashedCt] }),
      ...(hashedCountry && { country: [hashedCountry] }),
      ...(externalId && { external_id: [externalId] }),
      ...(params.fbc && { fbc: params.fbc }),
      ...(params.fbp && { fbp: params.fbp }),
      ...(params.clientUserAgent && { client_user_agent: params.clientUserAgent }),
      ...(params.clientIp && { client_ip_address: params.clientIp }),
    },
    // PHI-free custom_data — no product/condition strings, no UTMs.
    custom_data: {
      currency: params.currency,
      value: params.value,
      order_id: params.orderId ?? params.paymentId,
    },
  };

  const events: Array<Record<string, unknown>> = [
    { ...baseEvent, event_name: CUSTOM_EVENT_NAME },
  ];
  if (FIRE_PURCHASE) {
    events.push({ ...baseEvent, event_name: "Purchase" });
  }

  const res = await fetch(
    `https://graph.facebook.com/${GRAPH_VERSION}/${params.pixelId}/events?access_token=${params.accessToken}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: events }),
    }
  );
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(JSON.stringify(err));
  }
  return res.json();
}
