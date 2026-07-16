import { NextRequest, NextResponse } from "next/server";
import { pricing, brand } from "@/lib/config";
import { sendInitiateCheckoutEvent } from "@/lib/meta-events";

// InitiateCheckout CAPI — fired by the checkout pay-button click (after the
// form validates, before create-order). Full hashed PII -> high EMQ.
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const customer = (body?.customer ?? {}) as Record<string, string>;
    const email = typeof customer.email === "string" ? customer.email : "";

    // Email is required (it drives the PII match + event_id dedup).
    if (!email) {
      return NextResponse.json({ ok: false, error: "email_required" }, { status: 400 });
    }

    // Test-mode gate (PRICE_INR=1) — no side effects on staging/preview.
    if (!pricing.trackingEnabled) {
      return NextResponse.json({ ok: true, skipped: "test_mode" });
    }
    const pixelId = process.env.META_PIXEL_ID;
    const accessToken = process.env.META_CAPI_ACCESS_TOKEN;
    if (!pixelId || !accessToken) {
      return NextResponse.json({ ok: true, skipped: "env_missing" });
    }

    const eventSourceUrl =
      typeof body?.eventSourceUrl === "string" ? body.eventSourceUrl : brand.checkoutUrl;

    const fbc = req.cookies.get("_fbc")?.value || undefined;
    const fbp = req.cookies.get("_fbp")?.value || undefined;
    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      undefined;
    const clientUserAgent = req.headers.get("user-agent") || undefined;

    try {
      await sendInitiateCheckoutEvent({
        pixelId,
        accessToken,
        email,
        phone: `${customer.dialCode ?? ""}${customer.phone ?? ""}`,
        firstName: customer.firstName ?? "",
        lastName: customer.lastName ?? "",
        city: customer.city ?? "",
        countryCode: customer.countryCode ?? "",
        fbc,
        fbp,
        clientIp,
        clientUserAgent,
        eventSourceUrl,
        value: pricing.inr,
        currency: pricing.currency,
      });
      console.log("[ic] sent");
      return NextResponse.json({ ok: true, capi: "sent" });
    } catch (err) {
      console.error("[ic] Meta error:", err);
      return NextResponse.json({ ok: true, capi: "error" });
    }
  } catch (err) {
    console.error("[ic] fatal:", err);
    return NextResponse.json({ ok: true, capi: "error" });
  }
}
