# Creative Direction — Agency Demo Site

This is the brief. Everything below is locked. Don't deviate without explicit approval.

---

## 1. The business this is selling

Solo founder. Website design + production agency. Wedge: a better website is the cheapest growth channel SMB clients aren't using. Buyers are trades, hospitality, professional services, e-commerce — owners with weak/dated sites, not marketing directors.

Positioning sentence (memorize):
> **"I build websites for [trades / hospitality / professional services] that book more jobs than the one you have now. Most sites pay for themselves in 60–90 days."**

Tone: founder-direct. Short sentences. Specifics. No "we." No agency-speak.

---

## 2. Aesthetic direction: Editorial-typographic, restrained motion

Reference set: print magazines, type specimens, museum catalogues. Not Linear, not Vercel, not Stripe. Closer to **Basement Studio**, **Locomotive**, **Tomorrow**, **Ben Mingo**.

Compositional rules:
- Big type as primary visual. Type carries the page, not graphics.
- Intentional asymmetry. Anti-grid where it earns.
- Generous negative space — bone/cream backgrounds, not pure white.
- One photograph or one piece of media per fold, max. No collages.

The site should read as "the founder knows what they're doing" within 3 seconds. Quiet confidence, not loud.

---

## 3. Color palette — Ink & Bone

Locked. Use these tokens, no others.

```
--bg:        #F4F1EA   /* warm bone, page background */
--ink:       #171514   /* warm off-black, all text */
--accent:    #7A1F1B   /* oxblood, single accent only */
--muted:     #8A847B   /* warm grey, secondary text */
--rule:      #1715141A /* 10% ink for hairlines */
```

**Rules:**
- One accent only. Oxblood appears on: CTA buttons, key numbers, link underlines, the single editorial flourish per section. Nothing else gets the accent.
- No gradients anywhere. Ever.
- No pure white. No pure black.
- Photography is warm-toned (slight cream tint), not cool/blue.

---

## 4. Typography — Fontshare

Locked. Free for commercial use via fontshare.com. Files live in `agency-site/public/fonts/`.

```
Display:  Boska           (variable axis 200–900 + italic — extralight italic for hero, regular for H2-H3)
Body:     Switzer         (variable axis 100–900 + italic; 400 body, 500 emphasis)
Mono:     none loaded     (use ui-monospace system stack if needed for case-study metrics)
```

Loaded via `next/font/local` and exposed as Tailwind v4 theme tokens: `--font-display` (Boska), `--font-body` (Switzer). Use `font-display` and `font-body` utility classes.

**Sizing scale** (rem):
```
Hero display:   6.5–10   (clamp, fluid)
H1:             3.5–5
H2:             2.25–3
H3:             1.5–1.75
Body large:     1.125
Body:           1
Small/eyebrow:  0.75 (uppercase, tracked +0.08em)
```

Line-height: 0.95 on display, 1.1 on H1–H2, 1.55 on body.

**Eyebrow labels** (small uppercase tracked) appear above every section title. This is part of the editorial language.

---

## 5. Motion language

Locked. Restraint > maximalism.

**Easing curves:**
```
Primary:    cubic-bezier(0.22, 1, 0.36, 1)     /* ease-out-quart */
Sections:   cubic-bezier(0.83, 0, 0.17, 1)     /* ease-in-out-quart, sections only */
```

**Durations:**
- UI interactions: 200–400ms
- Entrance/scroll reveals: 600–900ms
- Never over 1000ms

**Stagger:** 40–80ms between sibling reveals.

**Library use:**
- **Motion** (already installed as `framer-motion` v12 — but use the `motion` import path going forward) is primary.
- **GSAP + ScrollTrigger**: only for ONE narrative scroll moment (case-study reveal). If we don't have one, don't ship GSAP.
- **Lottie**: skip. We don't have a real illustrator.
- **Locomotive Scroll**: skip. Native scroll only. (Yes, even though it's installed in our plugin set — that's for client work where it earns. Not here.)
- **View Transitions API**: ship it for route changes. Next.js 16 supports it.

**Hover/interaction rules:**
- Cards: 2–4px Y shift + border color change. **No scale.**
- Buttons: background fill swap (200ms), no scale.
- Links: animated underline (200ms left→right).
- Images: 2% scale max on slow zoom-in (case studies only).

---

## 6. Page architecture

Five pages. No more.

```
/                    Home — sells the proposition
/work                Index — 3 case studies (real or "concept" labeled)
/work/[slug]         Case study — proof, big visual, named outcome
/about               Founder face + 4-step process + pricing signal
/contact             Cal.com embed + form fallback
```

**No services page.** Services is a section inside Home.

### Home — section order (top to bottom)

1. **Hero** — value prop sentence, one supporting line, one CTA ("Book a call"). Founder name + small photo. No carousel, no animated background.
2. **Proof bar** — 4–6 client names as text (not logos), OR a single big number ("$3.2M in tracked client revenue").
3. **Featured case study** — one, full-width, real outcome visible without clicking.
4. **Who this is for** — 3 plain cards: Trades & home services / Hospitality / Professional services. Each card has a one-liner outcome.
5. **Process** — 4 numbered steps, one sentence each. SMB anxiety-killer.
6. **Pricing signal** — "Projects from $X. Most clients invest between $X–$Y." Will out-convert any testimonial.
7. **Testimonials** — 2–3 real quotes from real owners with real photos.
8. **About the founder** — 2–3 sentences, photo, LinkedIn link.
9. **Final CTA** — repeat. "Book a call."

### Case study page — section order

1. Hero: client name, year, one-line outcome (the number).
2. Big visual — single image or video, full-bleed.
3. The problem — 2 short paragraphs.
4. The approach — 2 short paragraphs + 1 supporting image.
5. The result — the number, the quote, before/after if applicable.
6. Next case study link.

---

## 7. Copy direction

### Banned words/phrases

```
crafting, craft (verb), elevate, bespoke, tailored, seamless,
synergy, experiences, journey, tomorrow, next-generation,
empower, unleash, supercharge, revolutionize, pixel-perfect,
"we" (when you mean "I"), "trusted by 1000+ companies"
```

### Hero headline (locked)

> **I build websites that turn local searches into booked jobs.**

Sub-headline:
> Most small business sites lose customers before they ever pick up the phone. Mine don't. I work with trades, hospitality, and professional services to ship sites that pay for themselves in 60–90 days.

CTA: **Book a call** (not "Get Started", not "Schedule a discovery consultation").

### Founder voice samples

- "Most trades sites lose 60% of their visitors in the first 3 seconds. Yours probably does too."
- "I don't do logos. I don't do social media. I build the one website your business has been losing customers because of."
- "If your site can't tell a stranger what you do in 5 seconds, you're paying for traffic you can't convert."

Use contractions. State opinions. Name buyers by trade. Quote numbers.

---

## 8. Tech stack (locked)

Already scaffolded — don't change framework choices.

```
Framework:     Next.js 16 (App Router) — already installed
React:         19.2 — already installed
Styling:       Tailwind v4 with CSS-first @theme config
Components:    shadcn — Button, Form, Dialog ONLY, heavily overridden
Motion:        framer-motion v12 (import from "motion/react") — installed
Transitions:   Native View Transitions API
Images:        next/image, AVIF, priority on hero only
CMS:           None. MDX or hard-coded TSX.
Hosting:       Vercel
Analytics:     Plausible or Vercel Analytics. Not GA4.
```

**Tailwind v4 theme tokens** live in `app/globals.css` under `@theme inline`. Define palette + font tokens there; reference everywhere with semantic names (`bg-bg`, `text-ink`, `text-accent`).

**shadcn override discipline:** every shadcn component I import must have its radius, border, type, and color classes replaced before it ships. The default look is banned.

---

## 9. The AI-slop ban list

Every default Claude Code reaches for. Explicit bans:

### Fonts
- Inter, Roboto, DM Sans, Manrope, Geist, Poppins, Outfit, Arial, any Google Sans-Serif default.

### Colors
- Any purple → blue gradient
- Indigo-500 anything
- Neon mint accent
- Default shadcn `slate`/`zinc` palette
- Pure white (#FFFFFF) or pure black (#000000)

### Components
- Three-column "Features" grid with rounded cards + Lucide icon at top of each
- Centered hero with glow behind headline
- Gradient text on headline
- Full-width primary button on desktop
- Default `rounded-md` button radius
- "Trusted by 1000+ companies" without naming any
- FAQ accordion with 8 vague questions
- Three numbered circles in a row for "How it works"

### Motion
- `whileHover={{ scale: 1.05 }}` on any card
- Universal `initial={{ opacity: 0, y: 20 }}` section fade-up
- Animated number counters in the hero
- Custom cursor (dot + delayed ring)
- Parallax stars / particle backgrounds
- Mr. Robot text-scramble effect
- Section-snap scroll-jacking

### Imagery
- Stock photos of laptops with charts
- AI-generated abstract gradients
- 3D blob shapes
- Generic Unsplash people-pointing-at-screens
- Lucide icons at default size in every section
- Emoji as section dividers
- ✨ anywhere on the page

### Layout
- Symmetrical centered everything
- Even bento grids (the trend has eaten itself)
- 12-column grid used as 3 equal columns three times in a row

---

## 10. The taste test — apply to every component before merging

Before any section ships, answer in writing (in PR description or commit message):

1. **What reference is this section pulling from?** Name a real site or print piece.
2. **What problem does this section solve for the prospect?** Not "looks nice" — what decision does it move them toward?
3. **Would this section work without color?** If yes, it's well-composed. If no, the color is doing too much work.
4. **What does this section ban from the AI-slop list?** Point to it.

If any answer is hand-wavy, the section is slop. Rebuild.

---

## 11. Definition of done for the demo

- All five pages built
- One real case study (or one labeled "concept project")
- Lighthouse: Performance ≥90, Accessibility ≥95, Best Practices ≥95, SEO ≥95
- LCP ≤2.5s, INP ≤200ms, CLS ≤0.1
- Cal.com embed working on /contact
- No console errors, no Tailwind warnings, no React keys warnings
- Playwright smoke test passing on all five routes
- View Transitions firing between routes
- Founder photo + headshot taken (or placeholder labeled as such)
