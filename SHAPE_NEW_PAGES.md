# SHAPE — BUILD SPEC · Three post-conversion pages (FitWithPalak Clinical Track)

> SHAPE agent, BUILD mode. Structure + visual-treatment spec for `/checkout`, `/book-a-call`, `/thank-you`.
> Reuses the existing FitWithPalak skin verbatim (tokens in `public/palak.css`, idioms from `app/page.tsx`).
> **Copy is owned by another agent — no words here.** Do not edit `page.tsx` / `palak.css`; this is the spec to implement against.

---

## 0 · Verdict (one line)

These are utility pages, not persuasion theatre — so the rule that governs them is the inverse of the landing page: **keep them bright and light, never dark**, and only elevate the two places that genuinely carry a structure (the order-summary line-item ledger on checkout, and the walk-away / agenda ledgers). Everything else is clean set text or a thin card. The dark-plum stage is the sales page's emotional peak; re-introducing it *after* the customer has paid would read as pressure where you want relief.

### Tonal rhythm across the funnel
| Page | Stage tone | Why |
|---|---|---|
| Landing (existing) | ends **dark** (finale) | persuasion peak |
| **Checkout** | **light → soft**, one accent-tinted weld | arrival / calm / trust; anxiety-reducing |
| **Book-a-call** | **light → soft** | bright "you're in" relief; scheduling is an action, not a pitch |
| **Thank-you** | **light → soft** | warm administrative close |

No `data-theme="dark"` on any of the three pages. This is deliberate and load-bearing.

### Chrome (shared, all three pages — confirmed reuse)
- **Top strip:** `.urgency-strip.pk-topstrip` (reuse). Copy changes per step (copy agent's job); structure identical.
- **Nav:** `.pk-nav` + `.pk-nav-inner` + `.pk-brand` (reuse). The `.pk-nav-cta` is **relabelled or dropped per page** (checkout: drop or show a static "Secure checkout" chip; book/thank-you: drop). Structure unchanged.
- **Footer:** `.pk-colophon` (+ `.pk-colophon-nav`) exactly as on the landing page.
- **FunnelEffects:** reuse **reveal-on-scroll only** (`data-reveal`, fail-open). **Omit** the sticky bottom CTA (`.sticky-cta`) and VSL logic — these pages have a single in-flow primary action. Scroll-progress bar optional; recommend dropping on checkout (no long scroll).
- **Grid system:** `.wrap` (1200px) for full-width two-column blocks; `.wrapn` (980px) for single-column reading/confirmation blocks; `.sec-head` for every masthead.

---

## PAGE 1 · `/checkout`

**Conversion role:** the transaction. Reassure + collect details + confirm what/how-much + pay. Lowest-distraction page in the funnel.

### Section order

| # | Section | Meaning | Render decision | Idiom / class |
|---|---|---|---|---|
| 1 | Chrome | brand + step context | reuse | `.pk-topstrip` + `.pk-nav` |
| 2 | Checkout header | reassuring headline + price/product context + **security badges** | `.sec-head` **text** for headline; **structured breadth row** for badges | `.sec-head` + new `.pk-checkout-price` + new `.pk-trustrow` |
| 3 | Two-column main | **Your Details** form (left) + **order summary** ledger (right) | **structured** — form = input-set, summary = line-item accumulation ledger | new `.pk-checkout` grid + `.pk-form`/`.pk-field` + `.pk-summary` |
| 4 | Trust / guarantee line | clarity-or-refund assurance | **structured weld** | **reuse `.pk-guarantee` + `.pk-seal`** (verbatim from landing) |
| 5 | Pay button | the action | reuse | **`.cta-big`** (relabelled "Pay Now ₹599") inside new `.pk-pay-block` |
| 6 | Legal footer | terms/privacy microcopy + colophon | text | new `.pk-pay-legal` + `.pk-colophon` |

### Shape calls
- **Order summary = line-item ledger** (accumulation → total). This is the one genuinely structured element and it gets the treatment: a bordered card with `was → now` strike, a ruled total row, and a payment-methods breadth row. Mirrors the landing `.pk-price` reframe idiom so it reads as the same brand.
- **Security badges & payment methods = breadth** → thin icon/label rows (`.pk-trustrow`, `.pk-paymethods`), same DNA as `.pk-cta-points`. Not decoration: they lower checkout anxiety.
- **Form = input-set**, rendered as a clean 2-col field grid inside one card. No animation — a checkout that "pops" erodes trust.

### Layout & stages
- Stage: **`.section--light`** for header, **`.section--soft`** for the main checkout block (gives the form/summary a subtle lift off the page). Guarantee weld sits inside the soft block.
- Grid: `.wrap` → `.pk-checkout` = `1.25fr 0.85fr` (form wider, summary narrower). Summary is `position:sticky; top:88px` on desktop so it stays in view while the form scrolls.
- **Mobile stacking: order summary goes ABOVE the form** (`order:-1`). Justification: this audience is anxiety-driven and the item is a single paid line (₹599). Leading with the summary re-anchors *what they're buying, the was→now value, and the total* before they invest effort in fields — it re-sells and de-risks at the exact moment of doubt. The summary is short, so it does not push the form meaningfully down. (Standard "form-first" mobile logic is for multi-item carts where the summary is long; not this case.)

---

## PAGE 2 · `/book-a-call`

**Conversion role:** post-payment activation. Confirm payment, get the time on the calendar, reassure, pre-empt two objections.

### Section order

| # | Section | Meaning | Render decision | Idiom / class |
|---|---|---|---|---|
| 1 | Chrome | brand + context | reuse | `.pk-topstrip` + `.pk-nav` |
| 2 | Success header | payment confirmed + value subhead | **success seal** (focal) + `.sec-head` text | new `.pk-success` + `.pk-success-seal` + `.sec-head` |
| 3 | Scheduler + 3 bullets | pick a slot (focal action) + 3 supporting reassurances | **focal-media placeholder** + **breadth** bullets | new `.pk-book` grid + `.pk-scheduler` (embed slot) + `.pk-book-support` |
| 4 | What you walk away with | 3-item value accumulation | **structured ledger** | **reuse `.pk-walkaway` + `.pk-wa`** (verbatim from landing offer) |
| 5 | Short nudge | book now, don't sit on it | text | new `.pk-book-nudge` |
| 6 | 2-item FAQ | pre-call objections | **objection-set** | **reuse `.pk-faq` + `.pk-faq-item`** |
| 7 | Footer | colophon | reuse | `.pk-colophon` |

### Shape calls
- **Success seal** = the same `.pk-seal` geometry (pink→deep gradient, checkmark) promoted to a page-level focal badge. Gives instant "it worked" without a dark celebratory stage.
- **Scheduler = focal-media**, rendered as a clean bordered frame (`.pk-scheduler`) exactly like the `.pk-vsl` frame idiom, but light. It holds a placeholder (calendar icon + mono label) until the Exley/Calendly embed is injected into `.pk-scheduler-slot` — **fail-open, no broken-embed state**, same discipline as the VSL poster.
- **3 bullets = breadth**, a slim checklist beside the scheduler that reassures *while* they choose a time.
- **Walk-away ledger:** reuse `.pk-wa` unchanged — it is the same "what you get" accumulation shape it was built for. (Because thank-you also uses a list, see the variation note there.)

### Layout & stages
- Stage: header **`.section--light`**; scheduler block **`.section--light`**; walk-away ledger **`.section--soft`**; FAQ **`.section--soft`** (or light) — gentle light/soft alternation, no dark.
- Grid: `.wrap` → `.pk-book` = `1.4fr 0.85fr` (scheduler dominant, bullets support). Walk-away + FAQ in `.wrapn`.
- Mobile: `.pk-book` collapses to one column, **scheduler first**, bullets below.

---

## PAGE 3 · `/thank-you`

**Conversion role:** terminal reassurance + priming for the call. Confirm the booking, set expectations, tell them how to prepare, close warmly.

### Section order

| # | Section | Meaning | Render decision | Idiom / class |
|---|---|---|---|---|
| 1 | Chrome | brand + context | reuse | `.pk-topstrip` + `.pk-nav` |
| 2 | Success header | booked + confirmation | **success seal** + `.sec-head` | **reuse `.pk-success` / `.pk-success-seal`** (from page 2) + `.sec-head` |
| 3 | What we'll discuss | ordered agenda of the call | **numbered ledger** | **reuse `.pk-walkaway` + `.pk-wa`** (01/02/03 agenda) |
| 4 | How to prepare | action checklist | **checkbox checklist** (varied from #3) | new `.pk-prep` + `.pk-prep-check` |
| 5 | Closing reassurance | you made the right call | text | new `.pk-close` |
| 6 | Footer | colophon | reuse | `.pk-colophon` |

### Shape calls & the variation rule
Sections 3 and 4 are **two adjacent structured lists** — craft rule says siblings must not reuse the same option:
- **"What we'll discuss" = ordered agenda** → `.pk-wa` numbered ledger (mono `01/02/03` + label + body). Sequence/accumulation reads as numbers.
- **"How to prepare" = action checklist** → new `.pk-prep` with a **checkbox affordance** (rounded pink check tile, reusing the `.pk-fit-item` checkmark DNA). Distinct silhouette (checkboxes vs numbered rail) so the two never visually rhyme.

### Layout & stages
- Stage: header **`.section--light`**; agenda **`.section--soft`**; prep checklist **`.section--light`**; closing **`.section--soft`**. Light/soft alternation, no dark.
- Grid: everything in **`.wrapn`** (980px) — single-column reading page. `.pk-wa` walk-away max-width already handled by the offer idiom; `.pk-prep` capped at 720px.
- Mobile: all single-column already; `.pk-prep-item` grid stays (34px check + text), no change needed.

---

## NEW CSS TO ADD (below the SHAPE line in `public/palak.css`)

All written against existing tokens (`--accent`, `--accent-deep`, `--hair`, `--canvas`, `--canvas-2`, `--radius-*`, `--f-mono`, `--f-display`, `--f-sans`, `--ink*`). Border weight, radii and whitespace match the established cards (`#E9D9DE`-equivalent = `var(--hair)`; soft radii; mono labels).

```css
/* =============================================================== CHECKOUT */
/* header price context (sits under the .sec-head headline) */
.pk-checkout-price { display:inline-flex; align-items:baseline; gap:12px; margin-top:14px;
  font-family:var(--f-mono); font-size:12px; letter-spacing:.1em; text-transform:uppercase; color:var(--ink-3); }
.pk-checkout-price .fig { font-family:var(--f-display); font-size:clamp(26px,3vw,34px); letter-spacing:-.01em;
  color:var(--accent-deep); text-transform:none; }

/* security badges row (breadth of trust) — icon + label, wraps on mobile */
.pk-trustrow { list-style:none; margin:22px auto 0; padding:0; display:flex; flex-wrap:wrap;
  justify-content:center; align-items:center; gap:10px 20px; }
.pk-trustrow li { display:inline-flex; align-items:center; gap:8px; white-space:nowrap;
  font-family:var(--f-mono); font-size:11px; font-weight:500; letter-spacing:.06em; text-transform:uppercase; color:var(--ink-2); }
.pk-trustrow svg { width:15px; height:15px; flex:none; color:var(--accent-deep); }

/* two-column main: form (left) + order summary (right) */
.pk-checkout { display:grid; grid-template-columns:1.25fr 0.85fr; gap:clamp(22px,3vw,40px);
  max-width:1000px; margin:0 auto; align-items:start; }

/* form card */
.pk-form { background:var(--canvas); border:1px solid var(--hair); border-radius:var(--radius-l);
  padding:clamp(24px,3vw,36px); }
.pk-form-legend { font-family:var(--f-mono); font-size:11px; letter-spacing:.14em; text-transform:uppercase;
  color:var(--ink); margin:0 0 22px; padding-bottom:16px; border-bottom:1px solid var(--hair); }
.pk-fields { display:grid; grid-template-columns:1fr 1fr; gap:16px 18px; }
.pk-field { display:flex; flex-direction:column; gap:7px; }
.pk-field--full { grid-column:1 / -1; }
.pk-field label { font-family:var(--f-mono); font-size:10.5px; letter-spacing:.12em; text-transform:uppercase; color:var(--ink-3); }
.pk-field input { width:100%; font-family:var(--f-sans); font-size:15.5px; color:var(--ink);
  background:var(--canvas-2); border:1px solid var(--hair); border-radius:var(--radius-s);
  padding:13px 15px; transition:border-color .25s ease, box-shadow .25s ease; }
.pk-field input::placeholder { color:var(--ink-3); }
.pk-field input:focus { outline:none; border-color:var(--accent);
  box-shadow:0 0 0 3px color-mix(in oklab,var(--accent) 16%,transparent); }

/* order summary card (line-item ledger — mirrors the .pk-price reframe DNA) */
.pk-summary { position:sticky; top:88px; background:var(--canvas-2);
  border:1px solid color-mix(in oklab,var(--accent) 22%,transparent); border-radius:var(--radius-l);
  padding:clamp(22px,2.6vw,30px);
  box-shadow:0 22px 50px -30px color-mix(in oklab,var(--accent-deep) 26%,transparent); }
.pk-summary-title { font-family:var(--f-mono); font-size:11px; letter-spacing:.14em; text-transform:uppercase;
  color:var(--ink); margin:0 0 18px; }
.pk-summary-item { display:flex; align-items:flex-start; justify-content:space-between; gap:16px;
  padding:16px 0; border-top:1px solid var(--hair); }
.pk-summary-item:first-of-type { border-top:0; padding-top:0; }
.pk-summary-name { font-family:var(--f-display); font-weight:600; font-size:17px; color:var(--ink); margin:0 0 4px; }
.pk-summary-meta { font-family:var(--f-mono); font-size:10.5px; letter-spacing:.1em; text-transform:uppercase; color:var(--accent-deep); }
.pk-summary-fig { font-family:var(--f-sans); font-weight:600; font-size:16px; color:var(--ink); white-space:nowrap; text-align:right; }
.pk-summary-fig .was { display:block; font-weight:400; font-size:13px;
  text-decoration:line-through; text-decoration-color:color-mix(in oklab,var(--ink-3) 70%,transparent); color:var(--ink-3); }
.pk-summary-total { display:flex; align-items:baseline; justify-content:space-between; gap:16px;
  margin-top:6px; padding-top:18px; border-top:1.5px solid color-mix(in oklab,var(--accent) 30%,transparent); }
.pk-summary-total .lbl { font-family:var(--f-mono); font-size:11px; letter-spacing:.12em; text-transform:uppercase; color:var(--ink-2); }
.pk-summary-total .amt { font-family:var(--f-display); font-weight:600; font-size:clamp(26px,3vw,32px);
  color:var(--accent-deep); text-shadow:0 0 26px color-mix(in oklab,var(--accent) 30%,transparent); }

/* accepted payment methods (breadth) */
.pk-paymethods { margin-top:20px; padding-top:18px; border-top:1px solid var(--hair);
  display:flex; align-items:center; gap:10px 12px; flex-wrap:wrap; }
.pk-paymethods .lbl { width:100%; font-family:var(--f-mono); font-size:10px; letter-spacing:.12em; text-transform:uppercase; color:var(--ink-3); margin-bottom:2px; }
.pk-paymethods .chip { font-family:var(--f-mono); font-size:10.5px; letter-spacing:.06em; color:var(--ink-2);
  border:1px solid var(--hair); border-radius:6px; padding:6px 10px; background:var(--canvas); }

/* pay button + legal */
.pk-pay-block { max-width:1000px; margin:clamp(24px,3vw,34px) auto 0; text-align:center; }
.pk-pay-block .cta-big { width:100%; max-width:440px; justify-content:center; }
.pk-pay-legal { max-width:60ch; margin:20px auto 0; text-align:center; font-size:12.5px; line-height:1.55; color:var(--ink-3); }
.pk-pay-legal a { color:var(--accent-deep); text-decoration:underline; text-underline-offset:2px; }

@media (max-width:760px){
  .pk-checkout { grid-template-columns:1fr; }
  .pk-summary { position:static; order:-1; }   /* summary ABOVE the form on mobile */
  .pk-fields { grid-template-columns:1fr; }
  .pk-pay-block .cta-big { max-width:none; }
}

/* =============================================================== SUCCESS (book + thank-you) */
.pk-success { text-align:center; margin:0 auto 22px; }
.pk-success-seal { position:relative; width:74px; height:74px; margin:0 auto 22px; border-radius:50%;
  display:grid; place-items:center; color:#fff;
  background:linear-gradient(180deg,var(--accent),var(--accent-deep));
  box-shadow:0 14px 34px -10px color-mix(in oklab,var(--accent-deep) 55%,transparent),
             0 0 0 6px color-mix(in oklab,var(--accent) 12%,transparent); }
.pk-success-seal svg { width:36px; height:36px; }
.pk-success-seal .ring { position:absolute; inset:0; border-radius:50%;
  border:1px solid color-mix(in oklab,var(--accent) 55%,transparent); animation:vslRipple 2.8s ease-out infinite; }
@media (prefers-reduced-motion:reduce){ .pk-success-seal .ring { animation:none; } }

/* =============================================================== SCHEDULER (book-a-call) */
.pk-book { display:grid; grid-template-columns:1.4fr 0.85fr; gap:clamp(22px,3vw,40px);
  max-width:1040px; margin:0 auto; align-items:start; }
.pk-scheduler { position:relative; min-height:520px; border-radius:var(--radius-l); overflow:hidden;
  border:1px solid var(--hair); background:var(--canvas);
  box-shadow:0 22px 50px -30px color-mix(in oklab,var(--accent-deep) 22%,transparent); }
.pk-scheduler-slot { position:absolute; inset:0; z-index:1; }   /* embed injected here */
/* fail-open placeholder shown behind the slot until the embed loads (no broken-embed state) */
.pk-scheduler-ph { position:absolute; inset:0; z-index:0; display:grid; place-content:center; gap:14px;
  text-align:center; padding:32px;
  background:radial-gradient(ellipse 90% 60% at 50% 0%, color-mix(in oklab,var(--accent) 8%,transparent) 0%, transparent 60%), var(--canvas-2); }
.pk-scheduler-ph .ic { width:52px; height:52px; margin:0 auto; color:var(--accent-deep); }
.pk-scheduler-ph .lbl { font-family:var(--f-mono); font-size:11px; letter-spacing:.14em; text-transform:uppercase; color:var(--ink-3); }
.pk-scheduler-ph .note { font-size:14px; color:var(--ink-2); max-width:34ch; margin:0 auto; line-height:1.55; }

.pk-book-support { list-style:none; margin:0; padding:6px 0 0; display:flex; flex-direction:column; gap:16px; }
.pk-book-support li { display:grid; grid-template-columns:24px 1fr; gap:12px;
  font-size:clamp(14.5px,1.5vw,16px); line-height:1.5; color:var(--ink-2); }
.pk-book-support .ic { margin-top:2px; color:var(--accent-deep); }
.pk-book-support .ic svg { width:20px; height:20px; }
.pk-book-nudge { max-width:60ch; margin:clamp(28px,3.5vw,40px) auto 0; text-align:center;
  font-size:clamp(15px,1.5vw,17px); line-height:1.6; color:var(--ink-2); }
.pk-book-nudge strong { color:var(--ink); font-weight:600; }

@media (max-width:760px){
  .pk-book { grid-template-columns:1fr; }
  .pk-scheduler { min-height:460px; }
}

/* =============================================================== PREP CHECKLIST (thank-you) */
/* checkbox affordance — deliberately distinct from the numbered .pk-wa agenda above it */
.pk-prep { max-width:720px; margin:0 auto; display:flex; flex-direction:column; gap:12px; }
.pk-prep-item { display:grid; grid-template-columns:34px 1fr; gap:16px; align-items:start;
  background:var(--canvas); border:1px solid var(--hair); border-radius:var(--radius-m); padding:18px 20px; }
.pk-prep-check { flex:none; width:26px; height:26px; border-radius:8px; display:grid; place-items:center; margin-top:1px;
  background:color-mix(in oklab,var(--accent) 12%,transparent);
  border:1px solid color-mix(in oklab,var(--accent) 40%,transparent); color:var(--accent-deep); }
.pk-prep-check svg { width:15px; height:15px; }
.pk-prep-text { font-size:clamp(15px,1.5vw,16.5px); line-height:1.55; color:var(--ink-2); }
.pk-prep-text strong { color:var(--ink); font-weight:600; }

/* closing reassurance */
.pk-close { max-width:60ch; margin:clamp(30px,4vw,44px) auto 0; text-align:center;
  font-size:clamp(15.5px,1.55vw,18px); line-height:1.62; color:var(--ink-2); }
.pk-close strong { color:var(--ink); font-weight:600; }
```

### Icons (reuse existing SVG language from `page.tsx`)
- Security / trust: shield-check path already in `.pk-cta-points` / `.pk-seal`.
- Clock (30-min): circle + `M12 7v5l3 2` from `.pk-cta-points`.
- Checkmarks: `M5 12.5l4 4 10-10.5` (yes-list) or `M8.5 12l2.4 2.4 4.6-4.8` (seal).
- Calendar (scheduler placeholder): a simple rounded rect + two top ticks + grid dots, drawn in the same 1.6 stroke style as the journey icons.

---

## Implementation notes
- Three new route folders: `app/checkout/page.tsx`, `app/book-a-call/page.tsx`, `app/thank-you/page.tsx`. Each imports the chrome markup pattern from the landing `page.tsx` (topstrip + nav + colophon) — copy the JSX, do not abstract prematurely.
- Reuse `FunnelEffects` for `data-reveal` only; pass no `bookHref` sticky bar (or a variant that no-ops the sticky CTA) on these pages.
- The form posts to the payment provider; `.pk-summary` figures (was ₹___ → now ₹599, total ₹599) are static markup, copy agent supplies the numbers/labels.
- Everything honours `prefers-reduced-motion` (only animated additions are the CTA breath — inherited — and the optional success-seal `.ring`, which is disabled under reduced-motion).

## LEARN flag (for the structure library, if maintained)
Two patterns here are reusable across future funnels and worth filing under their categories once shipped:
- **Order-summary line-item ledger** (`.pk-summary`) — category: accumulation/ledger; a checkout variant of the `.pk-price` reframe. Tag `[SHIPPED]`.
- **Fail-open embed frame** (`.pk-scheduler`) — category: focal-media; light sibling of the `.pk-vsl` dark frame, with a no-broken-state placeholder. Tag `[SHIPPED]`.
