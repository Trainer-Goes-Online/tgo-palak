"use client";

import { useState } from "react";
import { restoreUtm, restoreFbclid } from "@/lib/tracking";

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void };
  }
}

const COUNTRIES: { iso: string; dial: string; label: string }[] = [
  { iso: "IN", dial: "+91", label: "🇮🇳 +91" },
  { iso: "US", dial: "+1", label: "🇺🇸 +1" },
  { iso: "GB", dial: "+44", label: "🇬🇧 +44" },
  { iso: "AU", dial: "+61", label: "🇦🇺 +61" },
  { iso: "AE", dial: "+971", label: "🇦🇪 +971" },
  { iso: "SG", dial: "+65", label: "🇸🇬 +65" },
  { iso: "MY", dial: "+60", label: "🇲🇾 +60" },
  { iso: "NZ", dial: "+64", label: "🇳🇿 +64" },
  { iso: "ZA", dial: "+27", label: "🇿🇦 +27" },
  { iso: "SA", dial: "+966", label: "🇸🇦 +966" },
];

type Fields = { fname: string; lname: string; email: string; phone: string; city: string };

function validate(f: Fields): Partial<Record<keyof Fields, string>> {
  const e: Partial<Record<keyof Fields, string>> = {};
  if (f.fname.trim().length < 2) e.fname = "Please enter your first name.";
  if (f.lname.trim().length < 1) e.lname = "Please enter your last name.";
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email.trim())) e.email = "Please enter a valid email address.";
  if (!/^\d{10}$/.test(f.phone.trim())) e.phone = "Enter a 10-digit mobile number.";
  if (f.city.trim().length < 2) e.city = "Please enter your town or city.";
  return e;
}

function loadRazorpay(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve(false);
    if (window.Razorpay) return resolve(true);
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });
}

export default function CheckoutClient({ priceInr, priceLabel }: { priceInr: number; priceLabel: string }) {
  const [fields, setFields] = useState<Fields>({ fname: "", lname: "", email: "", phone: "", city: "" });
  const [iso, setIso] = useState("IN");
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [loading, setLoading] = useState(false);
  const [payError, setPayError] = useState("");

  const set = (k: keyof Fields) => (ev: React.ChangeEvent<HTMLInputElement>) =>
    setFields((f) => ({ ...f, [k]: ev.target.value }));

  const country = COUNTRIES.find((c) => c.iso === iso) ?? COUNTRIES[0];

  async function handlePay() {
    setPayError("");
    const errs = validate(fields);
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      const first = document.querySelector<HTMLInputElement>(".pk-field input[aria-invalid='true']");
      first?.focus();
      return;
    }
    setLoading(true);
    try {
      const ok = await loadRazorpay();
      if (!ok) throw new Error("Could not load the payment window. Please try again.");

      const res = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: priceInr * 100,
          currency: "INR",
          customer: {
            firstName: fields.fname.trim(),
            lastName: fields.lname.trim(),
            email: fields.email.trim(),
            city: fields.city.trim(),
            phone: fields.phone.trim(),
            countryCode: country.iso,
            dialCode: country.dial,
          },
          utm: restoreUtm(),
          fbclid: restoreFbclid(),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.orderId) throw new Error(data.error || "Could not start checkout. Please try again.");

      const rzp = new window.Razorpay!({
        key: data.keyId,
        order_id: data.orderId,
        amount: data.amount,
        currency: data.currency,
        name: "FitWithPalak",
        description: "Clarity Call — 30-minute 1:1 clinical assessment",
        image: "/favicon.png",
        prefill: {
          name: `${fields.fname.trim()} ${fields.lname.trim()}`.trim(),
          email: fields.email.trim(),
          contact: `${country.dial}${fields.phone.trim()}`,
        },
        notes: { kind: "client_funnel" },
        theme: { color: "#e479af" },
        handler: function () {
          // Payment authority is the server webhook — just move the buyer on.
          window.location.href = "/book-a-call";
        },
        modal: { ondismiss: () => setLoading(false) },
      });
      rzp.open();
    } catch (err) {
      setPayError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  const field = (
    key: keyof Fields,
    label: React.ReactNode,
    props: React.InputHTMLAttributes<HTMLInputElement>,
    full = false
  ) => (
    <div className={`pk-field${full ? " pk-field--full" : ""}`}>
      <label htmlFor={key}>
        {label} <span className="req" aria-hidden="true">*</span>
      </label>
      {key === "phone" ? (
        <div className="pk-phone">
          <select
            className="pk-cc"
            aria-label="Country code"
            value={iso}
            onChange={(e) => setIso(e.target.value)}
          >
            {COUNTRIES.map((c) => (
              <option key={c.iso} value={c.iso}>
                {c.label}
              </option>
            ))}
          </select>
          <input
            id="phone"
            value={fields.phone}
            onChange={set("phone")}
            aria-invalid={!!errors.phone}
            {...props}
          />
        </div>
      ) : (
        <input id={key} value={fields[key]} onChange={set(key)} aria-invalid={!!errors[key]} {...props} />
      )}
      {errors[key] && <span className="pk-field-err">{errors[key]}</span>}
    </div>
  );

  return (
    <>
      <section className="section" data-reveal aria-label="Your details and order">
        <div className="wrap">
          <div className="pk-checkout">
            <div className="pk-form">
              <p className="pk-form-legend">Your details</p>
              <div className="pk-fields">
                {field("fname", "First name", { type: "text", placeholder: "Priya", autoComplete: "given-name" })}
                {field("lname", "Last name", { type: "text", placeholder: "Sharma", autoComplete: "family-name" })}
                {field("email", <>Email <span className="hint">(we send your call link here)</span></>, { type: "email", placeholder: "you@email.com", autoComplete: "email" }, true)}
                {field("phone", <>Phone <span className="hint">(for your WhatsApp reminder)</span></>, { type: "tel", inputMode: "numeric", placeholder: "10-digit mobile number", autoComplete: "tel-national", maxLength: 10 }, true)}
                {field("city", "Town / City", { type: "text", placeholder: "Mumbai", autoComplete: "address-level2" }, true)}
              </div>
            </div>

            <aside className="pk-summary" aria-label="Order summary">
              <p className="pk-summary-title">Order summary</p>
              <div className="pk-summary-item">
                <div>
                  <p className="pk-summary-name">1:1 Clarity Call</p>
                  <span className="pk-summary-meta">30-minute 1:1 with Palak</span>
                </div>
                <span className="pk-summary-fig">
                  <span className="was">₹3,897</span>
                  {priceLabel}
                </span>
              </div>
              <div className="pk-summary-total">
                <span className="lbl">Total due today</span>
                <span className="amt">{priceLabel}</span>
              </div>
              <div className="pk-paymethods" aria-label="Accepted payment methods">
                <span className="lbl">Accepted payment methods</span>
                <span className="pk-pay-icon"><img src="/assets/pay/upi.svg" alt="UPI" loading="lazy" /></span>
                <span className="pk-pay-icon"><img src="/assets/pay/visa.svg" alt="Visa" loading="lazy" /></span>
                <span className="pk-pay-icon"><img src="/assets/pay/mastercard.svg" alt="Mastercard" loading="lazy" /></span>
                <span className="pk-pay-icon"><img src="/assets/pay/rupay.svg" alt="RuPay" loading="lazy" /></span>
                <span className="pk-pay-icon"><img src="/assets/pay/amex.svg" alt="American Express" loading="lazy" /></span>
                <span className="pk-pay-icon"><img src="/assets/pay/netbanking.svg" alt="Net Banking" loading="lazy" /></span>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="section" aria-label="Guarantee and payment" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="pk-pay-block">
            <div className="pk-guarantee pk-guarantee--pay">
              <span className="pk-seal" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.5l7 3v5.5c0 4.4-3 7.7-7 9-4-1.3-7-4.6-7-9V5.5z" /><path d="M8.5 12l2.4 2.4 4.6-4.8" /></svg>
              </span>
              <p className="pk-guarantee-text">Clarity or your fee back. Leave without clarity and <strong>your {priceLabel} comes straight back.</strong></p>
            </div>
            <button className="cta-big" type="button" onClick={handlePay} disabled={loading} aria-busy={loading}>
              {loading ? "Opening secure checkout…" : `PAY ${priceLabel} AND BOOK MY CALL`}
              {!loading && (
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 10h11M11 5.5L15.5 10 11 14.5" />
                </svg>
              )}
            </button>
            {payError && <p className="pk-pay-error" role="alert">{payError}</p>}
            <p className="pk-pay-legal">By paying you agree to our <a href="/terms">Terms</a> and <a href="/privacy">Privacy Policy</a>. Payments are secure and encrypted. The Clarity Call is a 30-minute clinical assessment, not a prescription or emergency service.</p>
          </div>
        </div>
      </section>
    </>
  );
}
