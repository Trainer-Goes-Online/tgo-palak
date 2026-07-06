"use client";

import { useEffect, useRef } from "react";

/* Client-side conversion polish for the FitWithPalak Clinical Track page:
   - a top scroll-progress rail
   - reveal-on-scroll for sections below the fold (fail-open: only sections
     already below the viewport at mount get hidden, so above-fold never blinks)
   - the method "journey spine" fills + ignites its step nodes as you scroll
   - a sticky bottom CTA that rises after the hero and hides again over the finale
   - the VSL poster frame swaps to the real embed on play (when a src is wired)
   Everything degrades to visible, finished content without JS, and honors
   prefers-reduced-motion. */
export default function FunnelEffects({
  bookHref = "#book",
}: {
  bookHref?: string;
}) {
  const fillRef = useRef<HTMLSpanElement>(null);
  const stickyRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const fill = fillRef.current;
    const sticky = stickyRef.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // --- The method journey spine: pre-measure each node's fractional position.
    const journey = document.querySelector<HTMLElement>(".pk-journey");
    const jnodes = journey
      ? Array.from(journey.querySelectorAll<HTMLElement>(".pk-jstep-node"))
      : [];
    let nodeFr: number[] = [];
    const measureNodes = () => {
      if (!journey) return;
      const jr = journey.getBoundingClientRect();
      const trackH = journey.offsetHeight - 20; // spine runs top:10 -> bottom:10
      nodeFr = jnodes.map((n) => {
        const r = n.getBoundingClientRect();
        const center = r.top - jr.top + r.height / 2 - 10;
        return trackH > 0 ? Math.min(1, Math.max(0, center / trackH)) : 1;
      });
    };

    // --- Hide the sticky bar while the finale is on screen (never double a CTA).
    const finale = document.querySelector<HTMLElement>(".pk-finale");

    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const pct = max > 0 ? (doc.scrollTop / max) * 100 : 0;
      if (fill) fill.style.width = pct + "%";

      if (sticky) {
        const pastHero = doc.scrollTop > window.innerHeight * 0.9;
        let overFinale = false;
        if (finale) {
          const fr = finale.getBoundingClientRect();
          overFinale = fr.top < window.innerHeight * 0.85;
        }
        sticky.classList.toggle("in", pastHero && !overFinale);
      }

      if (journey && journey.classList.contains("armed")) {
        const jr = journey.getBoundingClientRect();
        const refLine = window.innerHeight * 0.6; // fill tracks this line down the page
        let p = (refLine - jr.top) / journey.offsetHeight;
        p = Math.min(1, Math.max(0, p));
        journey.style.setProperty("--fill", p.toFixed(4));
        for (let i = 0; i < jnodes.length; i++) {
          const on = p >= (nodeFr[i] ?? 1) - 0.004;
          jnodes[i].closest(".pk-jstep")?.classList.toggle("active", on);
        }
      }
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        update();
        ticking = false;
      });
    };
    const onResize = () => {
      measureNodes();
      update();
    };

    // --- Reveal-on-scroll for below-fold sections only.
    let io: IntersectionObserver | null = null;
    if (!reduce && "IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("in");
              io?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 }
      );
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        if (el.getBoundingClientRect().top > window.innerHeight * 0.85) {
          el.classList.add("reveal");
          io!.observe(el);
        }
      });
    }

    // Arm the spine only when we can drive it; CSS otherwise leaves it full + lit.
    if (!reduce && journey) {
      journey.classList.add("armed");
      measureNodes();
    }

    // --- VSL play affordance: swap the poster frame for the real embed on click.
    const vsl = document.querySelector<HTMLElement>(".pk-vsl");
    const onPlay = () => {
      if (!vsl || vsl.classList.contains("playing")) return;
      const src = vsl.getAttribute("data-video-src");
      if (!src) return; // no embed wired yet -> keep the clean poster frame
      vsl.classList.add("playing");
      const frame = document.createElement("iframe");
      frame.className = "pk-vsl-frame";
      frame.src = src;
      frame.title = "FitWithPalak clinical track video";
      frame.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      frame.setAttribute("allowfullscreen", "");
      vsl.appendChild(frame);
    };
    if (vsl) {
      vsl.addEventListener("click", onPlay);
      vsl.addEventListener("keydown", (e) => {
        const k = (e as KeyboardEvent).key;
        if (k === "Enter" || k === " ") {
          e.preventDefault();
          onPlay();
        }
      });
    }

    // --- Case-study video modal: open only when a card has a wired data-video.
    const modal = document.getElementById("caseModal");
    const modalVideo = document.getElementById("caseModalVideo") as HTMLVideoElement | null;
    const openCase = (el: HTMLElement) => {
      const src = el.getAttribute("data-video");
      if (!src || !modal || !modalVideo) return; // no video wired yet -> no-op (no dead click)
      modalVideo.src = src;
      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
      modalVideo.play().catch(() => {});
    };
    const closeCase = () => {
      if (!modal || !modalVideo) return;
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");
      modalVideo.pause();
      modalVideo.removeAttribute("src");
      modalVideo.load();
    };
    const caseVideos = Array.from(document.querySelectorAll<HTMLElement>(".pk-case-video"));
    const caseHandlers = caseVideos.map((el) => {
      const onClick = () => openCase(el);
      const onKeydown = (e: Event) => {
        const k = (e as KeyboardEvent).key;
        if (k === "Enter" || k === " ") {
          e.preventDefault();
          openCase(el);
        }
      };
      el.addEventListener("click", onClick);
      el.addEventListener("keydown", onKeydown);
      return { el, onClick, onKeydown };
    });
    modal?.querySelectorAll<HTMLElement>("[data-close]").forEach((el) => el.addEventListener("click", closeCase));
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeCase(); };
    document.addEventListener("keydown", onKey);

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      io?.disconnect();
      vsl?.removeEventListener("click", onPlay);
      caseHandlers.forEach(({ el, onClick, onKeydown }) => {
        el.removeEventListener("click", onClick);
        el.removeEventListener("keydown", onKeydown);
      });
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <>
      <div className="scroll-progress" aria-hidden="true">
        <span ref={fillRef} />
      </div>

      <a className="sticky-cta" ref={stickyRef} href={bookHref} aria-label="Book My Clarity Call, Rs.599">
        <div className="pk-sticky-inner">
          <div className="pk-sticky-text">
            <span className="pk-sticky-lead">A 30-minute clinical assessment</span>
            <span className="pk-sticky-sub">1:1 with Palak &middot; clarity or your fee back</span>
          </div>
          <span className="pk-sticky-btn">
            Book My Clarity Call (Rs.599)
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 10h11M11 5.5L15.5 10 11 14.5" />
            </svg>
          </span>
        </div>
      </a>
    </>
  );
}
