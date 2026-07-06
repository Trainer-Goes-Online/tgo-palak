# Skin — FitWithPalak (pink #e479af + white, serif display) · Layer 3 (project)

> Instantiates **the brain** (`/workspace/.claude/design-system.base.md`) for the *FitWithPalak Clinical Track VSL funnel*. Structurally derived from the TGO Wellness skin (same serif/mono/sans voices + recipes) but **re-palette to the FitWithPalak brand: pink `#e479af` + white**. Dark stages use a **deep plum/wine** (a dark shade of the pink hue) so the page keeps tonal depth (C5/C4) without introducing a third brand colour.
>
> **Precedence:** skin loses to brain. This file sets palette/fonts/CSS only; it cannot violate a concept's intent.

## Brand & voice
- **Offer:** FitWithPalak Clinical Track — book a paid 30-minute clinical assessment ("Clarity Call", Rs.599, clarity-or-refund). The page sells the CALL only; the Tier-2 program (Rs.55,000) is reserved for after the call.
- **Audience:** high-achieving urban Indian women, 28–40, on thyroid meds / Hashimoto's / advanced PCOS / complex gut, whose reports read "normal" while they feel exhausted, bloated and dismissed. HNI / premium.
- **Voice:** calm clinical operator. Plain Indian English, short clear sentences, no metaphor, no em dashes. Never blames the reader. Section eyebrows ALWAYS uppercase.
- **North-star:** sreshtha / dr-deepali wellness funnels; a deep-plum VSL stage for the hero + video block.

## Concept reads (how this skin reads the brain)
- **C1 (three-voice type) — held.** Display = **Lora** serif (italic `<em>` for headline emphasis). Body = **Inter Tight**. Mono = **JetBrains Mono** (eyebrows, labels). Serif never leaks into body.
- **C2/C3 (one accent / value catches light) — RE-EXPRESSED.** Single accent = **brand pink `#e479af`** (`--accent-deep #b23a78` is the legible rose for text/labels on white). The gold shimmer token is repurposed to a **pale pink-white** (`--gold #ffe1f0`) so CTA/strip/seam highlights read as light, not metallic.
- **C5 (atmosphere) — strong.** Signature = a **deep plum/wine VSL stage** (`[data-theme="dark"]`, a dark shade of the pink hue) for the hero + video; white + soft-pink page for the body sections.
- **C12 (token theming) — strong.** Cream page with selective dark stages (hero, VSL, final CTA), `--ink` re-themed locally inside the dark stage.
- **C4, C6–C11, C13 hold** as written, expressed via the wellness tokens.

## Tokens & CSS
Seeded into `public/palak.css` (RESET → TOKENS → TYPOGRAPHY → COMPONENTS → SIGNATURE EFFECTS). Palette: white canvas (`--canvas`), deep-plum ink (`--ink`), brand pink `--accent #e479af` / `--accent-deep #b23a78` / `--accent-soft #f7d9e8`, pale-pink shimmer `--gold #ffe1f0`. The `[data-theme="dark"]` stage is deep plum/wine with brighter pink accents for legibility. All section CSS below the SHAPE line consumes these tokens; the only hardcoded literals are the dark video-frame fill and the plum stage gradients.

## Build conventions (match other tgo projects)
- Next.js app-router. `app/layout.tsx` links Google Fonts + `/palak.css`. Single `app/page.tsx` with sections. `app/FunnelEffects.tsx` (client) for scroll progress, reveal-on-scroll, sticky bottom CTA, VSL play.
- Section structure decided by **SHAPE** (BUILD mode) against the approved copy in `LANDING_PAGE_CLINICAL.md`.
- Stack: Next.js. Fonts via Google Fonts. No 3D. Reveal/motion fail-open + honor `prefers-reduced-motion`.
