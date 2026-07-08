// Central config for the FitWithPalak Clinical Track funnel.
// The call price is env-driven (PRICE_INR) so it can be changed in one place
// and flows through the UI, order creation, and the webhook tracking payload.

const PRICE_INR = Number(process.env.PRICE_INR ?? process.env.NEXT_PUBLIC_PRICE_INR ?? 599);

export const pricing = {
  /** Price in rupees (major units) — e.g. 599. */
  inr: Number.isFinite(PRICE_INR) && PRICE_INR > 0 ? PRICE_INR : 599,
  /** Price in paise (what Razorpay's orders.create expects). */
  get paise() {
    return this.inr * 100;
  },
  currency: "INR",
  /**
   * When PRICE_INR is 1 the funnel is in ₹1 test mode: the webhook still runs
   * but skips firing Pabbly + Meta CAPI so test payments do not pollute
   * production analytics / sheets.
   */
  get trackingEnabled() {
    return this.inr > 1;
  },
} as const;

export const brand = {
  name: "FitWithPalak",
  supportEmail: "teamfitwithpalak@gmail.com",
  /** Timezone used to format payment_date / payment_time in the Pabbly payload. */
  paymentTimezone: "Asia/Kolkata",
  /** Canonical checkout URL for CAPI event_source_url (query stripped). */
  checkoutUrl:
    process.env.NEXT_PUBLIC_CHECKOUT_URL ?? "https://fitwithpalak.com/checkout",
} as const;

/** Formatted price for display, e.g. "₹599". */
export const priceLabel = `₹${pricing.inr}`;
