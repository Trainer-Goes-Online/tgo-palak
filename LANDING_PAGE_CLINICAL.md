# FITWITHPALAK — CLINICAL TRACK LANDING PAGE (VSL FUNNEL)

> Draft landing page script for the VSL funnel. Clinical track only (thyroid, Hashimoto's, advanced PCOS, complex gut). Drives to the paid Rs.599 Clarity Call. Program price (Tier 2, Rs.55,000) is deliberately held back for the call itself.
>
> **Revision 2:** Plain Indian English, all metaphor removed. Hero is now feelings-first (no lab value in the opening line). Lab specifics (TSH, antibodies, ferritin, insulin) live in section 4 where they build credibility.
>
> **Revision 3 (synced to updated VSL, 2026-07-02):** Applied live in `app/page.tsx`; the reworked sections below are now authoritative in the code. Changes: (1) **Price Rs.499 → Rs.599** everywhere. (2) **Hero re-anchored** off the retired "TSH 3.8" open to the new medication-led open (on thyroid meds for years, dose keeps climbing, still feel just as tired/bloated/stuck); eyebrow now "for women on thyroid medication who still do not feel like themselves". (3) **Section 4 reframed** from a missed-markers ledger to the VSL's **four root causes nobody fixed** — gut, blood sugar, vitamins & minerals (B12/D/iron), nervous system — each carrying its specific marker as evidence (fasting insulin, ferritin 18 vs functional 50). Foot now folds in "feeling 45 at 32". (4) **Palak story:** the "lost my father at 23" line removed (kept 8 years corporate + 5 years practice). (5) **New objection added** (offer section + FAQ): do not wait for your reports, you see the doctor first and they tell you which tests to run; bloodwork is the first step inside the program. (6) **Thyroid-first close** in the fit section (Hashimoto/thyroid deepest; PCOS/complex gut/energy = same method extended). Metaphor kept OUT of the page (garden/soil lives only in the video); "Clarity Call" brand name kept. (7) **Frame correction across the whole page:** the audience is **diagnosed and medicated and already knows something is wrong** (she is on thyroid medicine). Removed the old "your reports come back normal / doctor says you are fine (mystery)" undiagnosed framing wherever it addressed the client (mirror quote, Palak bond headline, fit bullet 1, final CTA "normal reports"). Replaced with: she knows her body, the dose keeps climbing, her number is "controlled" on medication while she still feels terrible, and the real causes were never investigated. Kept: the single-marker "ferritin marked normal at 18 vs functional 50" point (specific, valid) and Palak's own backstory of normal tests (her genuine origin, VSL-aligned). The section prose further down this file is Rev-2 and partly stale — `app/page.tsx` is the current word-for-word source until backfilled.

---

## NO-BRAINER spine

- **Awareness:** sophisticated, burned market. She has already tested, medicated, watched the dose climb, so the page wins on a NEW NAMED MECHANISM (20+ marker functional workup + the 4-step order), not a louder claim.
- **Dominant emotion:** being dismissed. The hottest beat is "let me look into it" vs "it is what it is."
- **Config:** mechanism-led, calm clinical voice. The Rs.599 fee is framed as a filter (takeaway selling), risk erased with clarity-or-refund. The deep Numbers reveal and the Tier-2 price are deliberately held back for the call itself.

---

## HERO HEADLINE OPTIONS (concise, heading-length; Option 1 is built into the page below)

**OPTION 1 (recommended, in use) — TSH, matches the VSL open:**
> **Headline:** Your TSH is 3.8. Your doctor says normal. You still feel exhausted every single day.
> **Subhead:** You are not imagining it, and it is not because you are not trying hard enough. Watch the short video below: I will show you what your reports are missing.
> *Continuity with the VSL "3.8" open, names the exact woman, lands the hook in one line; blame-relief and next click in the subhead.*

**OPTION 2 — TSH, dose-led:**
> **Headline:** Your TSH says normal. Your dose keeps going up. You still feel terrible.
> **Subhead:** There is a real reason you can feel this bad while a report says you are fine. In the short video below, I will show you exactly what is being missed.
> *Punchier; leads on the rising dose, but loses the exact "3.8" hook that ties to the video.*

**OPTION 3 — feelings-first:**
> **Headline:** Tired all the time. Bloated. And every report says you are fine.
> **Subhead:** You are not being dramatic, and this is not in your head. Watch the short video below and I will show you what your tests are actually missing.
> *Widest gate for a cold viewer who does not know what TSH is; does not echo the video open.*

**OPTION 4 — feelings-first, dismissal-led:**
> **Headline:** "Your reports are normal. You're just stressed." You know something is still wrong.
> **Subhead:** That feeling is not you overthinking, it is real. In the short video below, I will show you what nobody has checked yet.
> *Hottest emotion from line one; narrower, assumes she has been brushed off out loud.*

**OPTION 5 — hybrid, validates her instinct:**
> **Headline:** Your reports say normal. Your body says otherwise. You are right.
> **Subhead:** Your TSH reads fine, your dose keeps rising, and you still feel exhausted. The short video below shows you why, and what your tests are missing.
> *Validates her instinct in three short beats up front; TSH/dose detail drops to the subhead.*

---

## 1. HERO (above the video)

**EYEBROW:** FOR WOMEN WHOSE REPORTS COME BACK "NORMAL" WHILE THEIR BODY CLEARLY IS NOT

**Headline:** Your TSH is 3.8. Your doctor says that is fine. Your dose keeps climbing, and you are still exhausted every single day.

**Subhead:** You are not imagining it, and it is not your fault. A standard report only checks a few markers, so it misses what is actually driving how you feel and calls it normal. The real cause is something nobody has looked for yet, and it can be found. *(Video sits directly under the headline on the page, so the "watch the video" line is dropped here.)*

**Primary CTA:** Book My Clarity Call (Rs.599)
**Microcopy:** 30 minutes, 1:1 with Palak. A clinical assessment, not a sales pitch. Clarity or your fee back.

---

## 2. THE VSL VIDEO BLOCK

> Note: the page hero opens on the same "Your TSH is 3.8" line as the VSL, so the page and video stay continuous. No re-shoot needed.

**Above player:** Press play. Turn the sound on. Watch this before you book any more tests.

*(Embed existing VSL. No rewrite.)*

**Below player:** If that sounded exactly like what you have been feeling, keep reading. Everything below is what we look at, in the exact order we look at it.

---

## 3. THE "YOU" MIRROR

**EYEBROW:** IF THIS IS YOU, YOU ARE IN THE RIGHT PLACE

**Headline:** On the outside you have it all together. On the inside your body feels like it is working against you.

You are the woman everyone assumes has it sorted. You show up, you get things done, you eat your protein, you go for your walks, you booked the appointment and you took the medication exactly as told. By everything anyone can see, you are doing it all right.

And you are still very tired. You are still very bloated. You feel off in a way you cannot fully explain, and somehow the dose only goes up, never down. You have said it more than once: "My reports came back normal, but I still don't feel good."

Then your doctor told you "this is just how it is," and you were expected to accept that and go home. You did not feel reassured. You felt dismissed. That feeling that something is being missed is not you overthinking. It is real, and it is worth listening to.

---

## 4. WHY THIS KEEPS HAPPENING

**EYEBROW:** THIS WAS NEVER A DISCIPLINE PROBLEM

**Headline:** The problem is not you. The problem is that nobody ran the tests that would have shown what is actually wrong.

A standard checkup is built to catch serious disease, not to explain why a healthy, capable woman feels exhausted by the afternoon every day. So it checks only a few markers, sees nothing alarming, and calls it "normal." Then you are given medication that handles the symptom while the real cause keeps going underneath, untouched. That is why the dose keeps rising but the way you feel never improves.

Here is what those few markers keep missing:

- Your TSH reads 3.8 and your doctor says it is fine, but nobody ran **Free T3, Free T4, or the thyroid antibody test (anti-TPO)**, which tells you whether your own immune system is the real cause.
- Your weight will not move no matter what you cut, but nobody checked your **fasting insulin**.
- Your **ferritin** is 18 and was marked "normal," but the functional range starts around 50. That gap between "not flagged" and "actually good" is the reason you feel so tired.
- The markers that connect all of this, **AMH, homocysteine, DHEA, hsCRP**, were never on the form at all.

None of this is your fault. You cannot fix something that was never measured. You were given an incomplete picture and then expected to feel better from it.

---

## 5. THE METHOD

**EYEBROW:** HOW HEALING ACTUALLY WORKS

**Headline:** You can eat perfectly and take every supplement, but if your gut is not absorbing it, none of it reaches your body.

This is the part almost everyone skips. You can do everything right with your food and your supplements, but if your gut is not working, your body cannot actually use any of it, so nothing changes. Fix that first, and the same effort finally starts to work. This is the difference between managing symptoms forever and actually getting your body back. It happens in this order, and the order is the reason it works:

**Step 1: See the full picture.** A complete functional workup, the 20+ markers a regular checkup skips, so we find the actual cause instead of guessing.

**Step 2: Heal the gut.** Until your gut is working, your body cannot absorb most of what you eat. This is why "I eat so clean and nothing changes" is so common. We fix this first.

**Step 3: Repair the metabolism.** Thyroid, insulin, and the markers that actually control your energy and your weight, corrected at the source instead of chased with a higher dose.

**Step 4: Calm the nervous system.** We bring your body out of constant stress mode so the results hold instead of slipping back the moment life gets busy.

Most plans start at step three and skip the first two completely. That is why they stop working. We start at step one.

---

## 6. PALAK / AUTHORITY

**EYEBROW:** WHO YOU WOULD BE WORKING WITH

**Headline:** I built this because I was exactly where you are: sitting across from a doctor with "normal" reports and no answers.

I am Palak, a clinical functional nutritionist. I lost my father at 23 and spent the next 8 years in corporate life, running on stress with a body that felt stuck and heavy. Every test I took came back normal. Every doctor told me some version of "you're just stressed." I knew that was not the full story, so I trained in functional nutrition myself to find the part everyone kept missing.

Five years and hundreds of test panels later, this is all I do. I run the 20+ marker workups that doctors skip, and I read the body at a level a regular appointment is not built to reach. I am not guessing at your situation from the outside. I have lived the version where the reports say you are fine and your body says otherwise, and I know exactly where to look.

---

## 7. PROOF

**EYEBROW:** WOMEN WHO WERE TOLD "THIS IS JUST HOW IT IS"

**Headline:** This is what happens when someone finally looks into it properly.

> Built as **case-study cards** (sreshtha pattern): thumbnail + play + name + condition tag + 5 stars + the client's own words. Copy below is drawn from each client's actual audio testimonial, first person. No unverified numbers.

**Divya** (tag: Hashimoto's · "Markers improved in 12 weeks"): "My endocrinologist had almost made me feel like it is what it is. Palak went through every single report, looked for the root cause, and every time I came to her the answer was 'let me look into it.' After 12 weeks my markers have improved, I have more energy, I sleep better, and I finally feel hopeful working towards Hashimoto's remission."

**Upasana** (tag: Thyroid · hormones · "Thyroid & gut improving"): "Before Fit with Palak I was struggling with hormonal issues, especially my thyroid, gut health, bowel movement and low energy. After following the routine for three months I have seen good improvement in all of these. I am sure a few more months and I will be completely over these problems."

**Grishma** (tag: Daily acidity · gut · "Off her daily acidity meds"): "My acidity used to trouble me constantly and I popped those medicines every single day. Now I do not even remember where they are in my house. Even following the plan around sixty to seventy percent, with better meal timings and a morning breathing routine, my acidity is completely gone."

**Amoolya** (tag: Hidden inflammation · "Inflammation found on bloodwork"): "For years my weight would not drop and I kept slipping back into old habits. The blood work Palak asked me to do showed I had inflammation in my body, something I had no idea even affected weight loss. Once I cut gluten, dairy and sugar the weight came down smoothly, my iron levels improved and I stopped feeling tired all the time."

**Closing line:** Different women, same pattern: the answer was never to try harder, it was to look deeper.

---

## 8. THE OFFER (the paid clinical assessment call)

**EYEBROW:** THE NEXT STEP

**Headline:** Book a Clarity Call: a 30-minute clinical assessment of what is actually going on with your body.

This is not generic advice, and it is not a chit-chat sales call. It is a focused, 1:1 clinical assessment with me. In 30 minutes we look at your specific situation, and you walk away with three things you do not have right now:

- What is most likely causing *your* tiredness, bloating, and stuck weight, based on your history and your reports.
- Which tests you actually need next, the specific markers your current reports are missing.
- What to fix first, so you stop spending money and energy in the wrong order.

You leave with real clarity about your own body, whether or not we ever decide to work together after that.

**On the fee:** The call is Rs.599. That is on purpose. It is not what my time is worth, it is a filter. It keeps this for women who are genuinely ready to fix this and not just collecting more opinions. If that is you, the fee will be the easiest decision on this page.

**The guarantee:** And the risk is on me, not on you. If you finish the call and do not walk away with real clarity on what is happening and what to do next, your fee comes straight back. The only thing you are putting in is 30 minutes.

**Primary CTA:** Book My Clarity Call (Rs.599)
**Microcopy:** Books instantly via Exley. 30 minutes, 1:1 with Palak. Clarity or your fee back.

---

## 9. WHO THIS IS / IS NOT FOR

**EYEBROW:** LET US BE HONEST ABOUT FIT

**Headline:** This is for a specific woman. It is not for everyone.

**This is for you if:**

- Your reports keep coming back "normal" while your body clearly is not.
- You are on thyroid medication and the dose keeps going up, not down.
- You have, or think you might have, Hashimoto's, a thyroid condition, advanced PCOS, or a complex gut issue.
- You have been told "this is just how it is" and something in you refuses to accept that.
- You are ready to find and fix the real cause, not manage symptoms for the rest of your life.

**This is not for you if:**

- You are looking for a quick fix or a crash plan with no testing behind it.
- You want someone to simply hand you a diet and not look at why your body is not responding.
- You are not willing to run the bloodwork that finding the real cause requires.

I would rather you decide this is not for you now than book a call that was never going to fit. If you are still reading, you are very likely the woman this was built for.

---

## 10. FAQ

**EYEBROW:** BEFORE YOU BOOK

**"I have already done blood tests. More than once."** Almost every woman I work with has, and they were right to. The issue is not that you have not tested, it is *which* markers were run. A standard panel checks only a few things and stops. On the call I will tell you exactly which markers your existing reports are missing, so even if you have tested three times, you will finally see what was never measured.

**"My doctor says I am fine."** Your doctor is checking for serious disease, and on that level you may well be fine. Feeling exhausted, bloated, and off is a different question, and a regular appointment is not built to answer it. Being "fine" on a disease check and actually feeling well are not the same thing, and the gap between them is exactly what we look at.

**"Why is the call paid?"** Because it filters. A small fee means the women on my calendar are serious about fixing this, which is the only way I can give each one a real clinical assessment instead of a rushed pitch. And it is risk-free for you: if you do not leave with real clarity, the fee comes back.

**"Will this work with my Hashimoto's and my thyroid medication?"** This is exactly who this is built for. We never ask you to stop any medication. We work alongside it, find what is actually driving the condition, and fix the cause, which is often why women on medication still feel unwell. Divya and Shivani both started here. You read what changed for them.

**"I already eat very clean and take my supplements. What more is there?"** That is often the most frustrating place to be, and it usually points to step two. If your gut is not absorbing, even perfect food and supplements cannot reach your body. This is the 180g-of-protein, still-not-improving situation. The effort was never the problem. Your gut not absorbing it was.

**"What actually happens on the call?"** 30 minutes, 1:1, on video. We go through your situation, I tell you what is most likely causing it, which tests you need, and what to fix first. You leave with a clear picture of your own body, whether or not we work together afterwards.

---

## 11. FINAL CTA

**EYEBROW:** YOU HAVE FELT THIS LONG ENOUGH

**Headline:** You already know your body is not "just fine." You have known it for a long time.

You have been told to accept a body that leaves you exhausted and bloated, while the dose keeps climbing. You do not have to accept it, and you were never the reason things have not improved. The picture was incomplete. We complete it, in the right order, starting with the actual cause.

Thirty minutes from now you could finally know what is really going on, which is more than years of "normal reports" have given you. That is the whole point of this call: the moment someone says "let me look into it" instead of "it is what it is."

**Primary CTA:** Book My Clarity Call (Rs.599)
**Microcopy:** 30 minutes, 1:1 with Palak. A clinical assessment, not a sales pitch. Clarity or your fee back. Books instantly via Exley.

**Under the button:** Worst case, you spend 30 minutes and still walk away knowing more about your body than you do today. There is no version of this where you lose.

---

## Open flags (resolve before publishing)

1. **Refund vs. filter framing:** kept refund conditional on *clarity delivered*, not satisfaction, so the paid filter still holds. Confirm framing.
2. **Client proof (RESOLVED):** the proof section now uses each client's actual audio testimonial in their own words (Divya, Upasana, Grishma, Amoolya), with no unverified lab numbers. Still needed from Atul: client thumbnail images at `public/assets/case-studies/{divya,upasana,grishma,amoolya}.jpg` and the audio/video URLs to wire each card's `data-video`.

## Reserved for the call (not on this page)

- **Deep Numbers reveal:** the full unit picture of her markers and the specific test list, delivered live on the Clarity Call.
- **Deepest proof (I):** personalised, applied to her own reports on the call.
- **Tier-2 Clinical Track (Rs.55,000, 3-month Deep Healing Protocol):** entirely reserved for after the call, by design.
