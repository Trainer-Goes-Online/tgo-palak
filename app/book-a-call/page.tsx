import type { Metadata } from "next";
import FunnelEffects from "../FunnelEffects";
import Footer from "../Footer";
import { priceLabel } from "@/lib/config";

export const metadata: Metadata = {
  title: "Book your Clarity Call | FitWithPalak",
  description: `Your ${priceLabel} is confirmed. Pick a time for your 30-minute 1:1 Clarity Call with Palak.`,
};

export default function BookACallPage() {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;
  return (
    <>
      <FunnelEffects sticky={false} />

      {/* ============================================== CHROME */}
      <div className="urgency-strip pk-topstrip" role="note" aria-label="Payment confirmed">
        <div className="pk-ticker">
          <div className="pk-ticker-grp">
            <span>Payment confirmed</span><span className="sep" aria-hidden="true">/</span><span>₹499 received</span><span className="sep" aria-hidden="true">/</span><span>30 minutes, 1:1 with Palak</span>
          </div>
          <div className="pk-ticker-grp" aria-hidden="true">
            <span>Payment confirmed</span><span className="sep">/</span><span>₹499 received</span><span className="sep">/</span><span>30 minutes, 1:1 with Palak</span>
          </div>
        </div>
      </div>

      <header className="pk-nav">
        <div className="pk-nav-inner">
          <a className="pk-brand" href="/" aria-label="FitWithPalak home">
            <span className="pk-brand-word">FitWith<em>Palak</em></span>
          </a>
          <span className="pk-nav-cta" aria-hidden="true">Payment confirmed</span>
        </div>
      </header>

      <main id="top" className="pk-bookstage">
        {/* ============================================== 1 · SUCCESS HEADER + URGENCY */}
        <section className="section pk-book-head" aria-label="Payment confirmed">
          <div className="wrapn">
            <div className="pk-success">
              <span className="pk-success-seal" aria-hidden="true">
                <span className="ring"></span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4 4 10-10.5" /></svg>
              </span>
            </div>
            <div className="sec-head">
              <span className="eyebrow">Payment confirmed</span>
              <h2 className="display">You are in. Now pick your time.</h2>
              <p className="deck">Your ₹499 is confirmed. Choose a slot below and your call link comes straight to your email.</p>
            </div>
          </div>
        </section>

        {/* ============================================== 2 · SCHEDULER (full-width, prominent) */}
        <section className="section" id="schedule" data-reveal aria-label="Pick your slot">
          <div className="wrap">
            <div className="pk-book">
              <div className="pk-sched-head">
                <span className="eyebrow">Pick your slot</span>
                <p className="sub">Times shown in your local time zone.</p>
              </div>
              <div className="pk-scheduler" aria-label="Scheduler">
                {calendlyUrl ? (
                  <iframe
                    className="pk-scheduler-frame"
                    src={`${calendlyUrl}?hide_gdpr_banner=1&primary_color=e479af`}
                    title="Book your Clarity Call with Palak"
                    loading="lazy"
                  />
                ) : (
                  <div className="pk-scheduler-ph" aria-hidden="true">
                    <span className="ic">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3.5" y="5" width="17" height="15.5" rx="2.5" /><path d="M3.5 9.5h17M8 3.5v3M16 3.5v3" /><circle cx="8" cy="13.5" r=".9" fill="currentColor" stroke="none" /><circle cx="12" cy="13.5" r=".9" fill="currentColor" stroke="none" /><circle cx="16" cy="13.5" r=".9" fill="currentColor" stroke="none" /><circle cx="8" cy="17" r=".9" fill="currentColor" stroke="none" /><circle cx="12" cy="17" r=".9" fill="currentColor" stroke="none" /></svg>
                    </span>
                    <span className="lbl">Loading your calendar</span>
                    <p className="note">Pick a day and time that actually works for you. No rushing.</p>
                  </div>
                )}
              </div>

              <ul className="pk-book-support" aria-label="What to expect">
                <li>
                  <span className="ic" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12a8 8 0 1 1 2.3 5.6" /><path d="M4 20v-4h4" /></svg></span>
                  <span>Only reschedule if there is an emergency.</span>
                </li>
                {/* <li>
                  <span className="ic" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6.5h16v11H4z" /><path d="M4 7l8 6 8-6" /></svg></span>
                  <span>Video link by email, plus one WhatsApp reminder.</span>
                </li>
                <li>
                  <span className="ic" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="3.4" /><path d="M5.5 19a6.5 6.5 0 0 1 13 0" /></svg></span>
                  <span>30 minutes, 1:1, directly with Palak.</span>
                </li> */}
              </ul>

              <div className="pk-book-more">
                <span className="pk-book-more-kicker">Wait, <em>there is more.</em></span>
                <p className="pk-book-more-text">Your booking also includes the private FitWithPalak WhatsApp community. Grab your link on the next step.</p>
                <a className="cta-big" href="/thank-you" role="button">
                  Get The WhatsApp Community Link
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M4 10h11M11 5.5L15.5 10 11 14.5" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================== 3 · WALK-AWAY LEDGER */}
        <section className="section section--soft" data-reveal aria-label="What you walk away with">
          <div className="wrapn">
            <div className="sec-head">
              <span className="eyebrow">What you walk away with</span>
              <h2 className="display">In 30 minutes you leave with three things you do not have right now.</h2>
            </div>
            <div className="pk-walkaway" role="list">
              <div className="pk-wa" role="listitem">
                <span className="pk-wa-num" aria-hidden="true">01</span>
                <div>
                  <span className="pk-wa-label">The cause</span>
                  <p className="pk-wa-body">What is most likely driving <em>your</em> tiredness, bloating, and stuck weight.</p>
                </div>
              </div>
              <div className="pk-wa" role="listitem">
                <span className="pk-wa-num" aria-hidden="true">02</span>
                <div>
                  <span className="pk-wa-label">The tests</span>
                  <p className="pk-wa-body">The exact markers your current reports are missing.</p>
                </div>
              </div>
              <div className="pk-wa" role="listitem">
                <span className="pk-wa-num" aria-hidden="true">03</span>
                <div>
                  <span className="pk-wa-label">The order</span>
                  <p className="pk-wa-body">What to fix first, so your effort finally works.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================== 4 · NUDGE */}
        <section className="section" data-reveal aria-label="A quick nudge">
          <div className="wrapn">
            <p className="pk-book-nudge">You have already paid. The only thing left is to pick a time. <strong>An unbooked call cannot help you.</strong></p>
          </div>
        </section>

        {/* ============================================== 5 · FAQ */}
        <section className="section section--soft" data-reveal aria-label="Before your call">
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">Before you book</span>
              <h2 className="display">Two quick questions before you book.</h2>
            </div>
            <div className="pk-faq">
              <details className="pk-faq-item" open>
                <summary>
                  <span className="pk-faq-q">Is the call directly with Palak?</span>
                  <span className="pk-faq-chevron" aria-hidden="true"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 8l5 5 5-5" /></svg></span>
                </summary>
                <div className="pk-faq-a"><p>Yes. Every Clarity Call is 30 minutes, 1:1, on video, directly with Palak. Not an assistant, not a sales team.</p></div>
              </details>
              <details className="pk-faq-item">
                <summary>
                  <span className="pk-faq-q">Can I reschedule?</span>
                  <span className="pk-faq-chevron" aria-hidden="true"><svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 8l5 5 5-5" /></svg></span>
                </summary>
                <div className="pk-faq-a"><p>Please only reschedule if there is a genuine emergency. If something urgent comes up, use the link in your confirmation email to move your call, and your ₹499 stays valid. Palak holds a limited number of these slots, so keeping your time helps every woman get seen.</p></div>
              </details>
            </div>
          </div>
        </section>

        {/* ============================================== 6 · FINAL CTA */}
        <section className="section" data-reveal aria-label="Book your slot">
          <div className="wrapn">
            <div className="pk-book-final">
              <p className="line">Your slot is waiting. Pick your time now.</p>
              <a className="cta-big" href="#schedule" role="button">
                Pick my time
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 10h11M11 5.5L15.5 10 11 14.5" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* ============================================== FOOTER */}
        <Footer />
      </main>
    </>
  );
}
