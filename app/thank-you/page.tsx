import type { Metadata } from "next";
import FunnelEffects from "../FunnelEffects";
import Footer from "../Footer";
import { brand } from "@/lib/config";

export const metadata: Metadata = {
  title: "You are booked | FitWithPalak Clarity Call",
  description: "Your 30-minute 1:1 Clarity Call with Palak is confirmed. Here is what to expect and how to prepare.",
};

export default function ThankYouPage() {
  const communityUrl = brand.whatsappCommunityUrl;
  return (
    <>
      <FunnelEffects sticky={false} />

      {/* ============================================== CHROME */}
      <div className="urgency-strip pk-topstrip" role="note" aria-label="Your call is booked">
        <div className="pk-ticker">
          <div className="pk-ticker-grp">
            <span>Your Clarity Call is booked</span><span className="sep" aria-hidden="true">/</span><span>Check your email</span><span className="sep" aria-hidden="true">/</span><span>1:1 with Palak</span>
          </div>
          <div className="pk-ticker-grp" aria-hidden="true">
            <span>Your Clarity Call is booked</span><span className="sep">/</span><span>Check your email</span><span className="sep">/</span><span>1:1 with Palak</span>
          </div>
        </div>
      </div>

      <header className="pk-nav">
        <div className="pk-nav-inner">
          <a className="pk-brand" href="/" aria-label="FitWithPalak home">
            <img className="pk-brand-logo" src="/brand-logo.png" alt="FitWithPalak" />
          </a>
          <span className="pk-nav-cta" aria-hidden="true">Booked</span>
        </div>
      </header>

      <main id="top" className="pk-thanks">
        {/* ============================================== 1 · SUCCESS HEADER */}
        <section className="section pk-thanks-head" aria-label="Booking confirmed">
          <div className="wrapn">
            <div className="pk-success">
              <span className="pk-success-seal" aria-hidden="true">
                <span className="ring"></span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4 4 10-10.5" /></svg>
              </span>
            </div>
            <div className="sec-head">
              <span className="eyebrow">Your Clarity Call is booked</span>
              <h2 className="display">Your call is confirmed. <em>One last step.</em></h2>
              <p className="deck">Check your email for the call link. And join the <em>FitWithPalak</em> WhatsApp community as promised.</p>
            </div>

            <div className="pk-community" role="group" aria-label="Join the FitWithPalak WhatsApp community">
              <span className="pk-community-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3l9 16H3z" /><path d="M12 10v4M12 17v.5" /></svg>
                Important &middot; One last step
              </span>
              <h3 className="pk-community-title">Join the FitWithPalak WhatsApp community now.</h3>
              <p className="pk-community-text">This is where Palak shares reminders, answers, and support around your call, alongside other women doing the same work. <strong>Your seat in the community is waiting.</strong></p>
              <a className="pk-community-btn" href={communityUrl} target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.8 4.9-1.3A10 10 0 1 0 12 2zm0 2a8 8 0 1 1-4.2 14.8l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 0 1 12 4zm-3 4.2c-.2 0-.5 0-.7.4-.2.4-.9 1-.9 2.3s.9 2.6 1.1 2.8c.1.2 1.8 2.9 4.5 3.9 2.2.9 2.7.7 3.2.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.6-.3l-1.8-.9c-.2-.1-.4-.1-.6.1l-.8 1c-.2.2-.3.2-.6.1-.3-.2-1.2-.5-2.3-1.4-.8-.7-1.4-1.6-1.6-1.9-.1-.3 0-.4.1-.5l.5-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2c-.2-.5-.4-.5-.6-.5z" /></svg>
                Join the Community Here
                <svg className="arr" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 10h11M11 5.5L15.5 10 11 14.5" /></svg>
              </a>
              <p className="pk-community-note">Opens in WhatsApp &middot; 1-click join</p>
            </div>
          </div>
        </section>

        {/* ============================================== 2 · WHAT WE WILL COVER */}
        <section className="section section--soft" data-reveal aria-label="What we will cover">
          <div className="wrapn">
            <div className="sec-head">
              <span className="eyebrow">What we will cover</span>
              <h2 className="display">Here is what your 30 minutes with Palak will cover.</h2>
            </div>
            <div className="pk-walkaway" role="list">
              <div className="pk-wa" role="listitem">
                <span className="pk-wa-num" aria-hidden="true">01</span>
                <div><span className="pk-wa-label">Your story</span><p className="pk-wa-body">Your history and how your body actually feels, in your own words.</p></div>
              </div>
              {/* <div className="pk-wa" role="listitem">
                <span className="pk-wa-num" aria-hidden="true">02</span>
                <div><span className="pk-wa-label">Your reports</span><p className="pk-wa-body">What your current reports show, and what they are missing.</p></div>
              </div> */}
              <div className="pk-wa" role="listitem">
                <span className="pk-wa-num" aria-hidden="true">02</span>
                <div><span className="pk-wa-label">The cause</span><p className="pk-wa-body">The most likely cause of <em>your</em> tiredness, bloating, and stuck weight.</p></div>
              </div>
              <div className="pk-wa" role="listitem">
                <span className="pk-wa-num" aria-hidden="true">03</span>
                <div><span className="pk-wa-label">The tests</span><p className="pk-wa-body">The exact markers you need to test next.</p></div>
              </div>
              <div className="pk-wa" role="listitem">
                <span className="pk-wa-num" aria-hidden="true">04</span>
                <div><span className="pk-wa-label">The order</span><p className="pk-wa-body">What to fix first, in the right order.</p></div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================== 3 · BEFORE YOU SHOW UP */}
        <section className="section" data-reveal aria-label="Before you show up">
          <div className="wrapn">
            <div className="sec-head">
              <span className="eyebrow">Before you show up</span>
              <h2 className="display">Four small things, so we make the most of your call.</h2>
            </div>
            <div className="pk-prep">
              <div className="pk-prep-item">
                <span className="pk-prep-check" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4 4 10-10.5" /></svg></span>
                <p className="pk-prep-text"><strong>Be on time.</strong> Join a few minutes early so you get the full 30 minutes.</p>
              </div>
              <div className="pk-prep-item">
                <span className="pk-prep-check" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4 4 10-10.5" /></svg></span>
                <p className="pk-prep-text"><strong>Find a quiet space.</strong> Somewhere you can talk freely, with your recent reports handy.</p>
              </div>
              <div className="pk-prep-item">
                <span className="pk-prep-check" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4 4 10-10.5" /></svg></span>
                <p className="pk-prep-text"><strong>Talk openly.</strong> The more honest you are about how you feel, the more Palak can help.</p>
              </div>
              <div className="pk-prep-item">
                <span className="pk-prep-check" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4 4 10-10.5" /></svg></span>
                <p className="pk-prep-text"><strong>Check email and WhatsApp.</strong> Your link is in your email. Your reminder comes on WhatsApp.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================== 4 · CLOSING */}
        <section className="section section--soft" data-reveal aria-label="One more thing">
          <div className="wrapn">
            <p className="pk-close">No complete reports yet? <strong>That is exactly what the call is for.</strong> Just show up.</p>
          </div>
        </section>

        {/* ============================================== FOOTER */}
        <Footer />
      </main>
    </>
  );
}
