import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { pricing, brand } from "@/lib/config";
import type { CustomerData, UtmData } from "@/lib/meta-capi";

// Razorpay notes: max 15 keys, each value <= 256 chars. We use 9, leaving 6
// free. Customer + UTM are packed as JSON blobs so we stay under the key cap.
const NOTE_MAX_VALUE_LEN = 256;
const FUNNEL_KIND = "client_funnel";

function truncate(value: string | undefined | null, max = NOTE_MAX_VALUE_LEN): string {
  if (!value) return "";
  return value.length > max ? value.slice(0, max) : value;
}

let razorpay: Razorpay | null = null;
if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
  razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
}

export async function POST(req: NextRequest) {
  try {
    if (!razorpay) {
      console.error("[create-order] Razorpay not configured — missing env vars");
      return NextResponse.json(
        { error: "Payment system not configured. Please contact support." },
        { status: 500 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const {
      amount = pricing.paise,
      currency = pricing.currency,
      customer,
      utm,
      fbclid,
    }: {
      amount?: number;
      currency?: string;
      customer?: CustomerData;
      utm?: UtmData;
      fbclid?: string;
    } = body;

    // Snapshot cookies + request context now — the webhook (server-to-server)
    // has none of these, so we stash them in the order notes for later.
    const fbc = req.cookies.get("_fbc")?.value ?? "";
    const fbp = req.cookies.get("_fbp")?.value ?? "";
    const clientIp =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
      req.headers.get("x-real-ip") ??
      "";
    const clientUserAgent = req.headers.get("user-agent") ?? "";

    const notes: Record<string, string> = {
      kind: FUNNEL_KIND,
      cust: truncate(
        JSON.stringify({
          fn: customer?.firstName ?? "",
          ln: customer?.lastName ?? "",
          em: customer?.email ?? "",
          ph: customer?.phone ?? "",
          ct: customer?.city ?? "",
          co: customer?.countryCode ?? "",
          dl: customer?.dialCode ?? "",
          tp: customer?.customerType ?? "",
        })
      ),
      utm: truncate(
        JSON.stringify({
          s: utm?.source ?? "",
          m: utm?.medium ?? "",
          c: utm?.campaign ?? "",
          n: utm?.content ?? "",
          t: utm?.term ?? "",
        })
      ),
      clid: truncate(fbclid ?? ""),
      fbc: truncate(fbc),
      fbp: truncate(fbp),
      ip: truncate(clientIp),
      ua: truncate(clientUserAgent),
      esu: brand.checkoutUrl,
    };

    const order = await razorpay.orders.create({
      amount,
      currency,
      receipt: `receipt_${Date.now()}`,
      notes,
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ?? process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("[create-order]", error);
    return NextResponse.json(
      { error: "Failed to create order. Please try again." },
      { status: 500 }
    );
  }
}
