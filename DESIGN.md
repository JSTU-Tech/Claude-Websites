# Creative Direction — Agency Demo Site

This is the brief. Everything below is locked. Don't deviate without explicit approval.

---

## 1. The business this is selling

Solo founder. Website design + production agency. Full pricing and service ladder is locked in `BUSINESS.md` — read it before any copy or pricing decision.

Five target verticals: **trades** (plumber, electrician, HVAC, roofer), **hospitality** (boutique hotels, cafes, restaurants), **professional services** (legal, accounting, financial, consultants), **tech startups** (seed–Series A marketing sites), **local services** (gyms, salons, clinics).

Wedge: **5-figure design quality. 4-figure price. 2-week delivery.** Traditional agencies charge $10K–$30K and take 8–16 weeks. I charge a fraction of that and ship in 14 days. The edge is process — modern tools, no agency overhead, direct founder communication.

Positioning sentence (memorize):
> **"I build the website your business should have had three years ago. Two weeks. A fraction of agency pricing."**

Tone: founder-direct. Short sentences. Specifics. No "we." No agency-speak. No ROI guarantees you can't back up.

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

## 4. Typography — Pangram Pangram

Locked. Both faces are variable. License from pangrampangram.com.

```
Display:  PP Editorial New     (italic ultralight for hero, regular for H2-H3)
Body:     PP Neue Montreal     (400 body, 500 emphasis)
Mono:     PP Fraktion Mono     (case-study metrics only, optional)
```

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
4. **Who this is for** — 5 plain cards: Trades / Hospitality / Professional services / Tech startups / Local services. Each card has a one-liner outcome (per BUSINESS.md §1).
5. **Process** — 4 numbered steps: (1) Strategic audit, (2) Build, (3) Launch, (4) Care plan. One sentence each. SMB anxiety-killer.
6. **Pricing signal** — exact copy from BUSINESS.md §5:
   > Sites from $1,500. Most projects $3,000–$5,000.
   > Live in two weeks.
   > Care plans from $79/month.
   No full menu, no tier comparison. Anchor + range + speed claim only.
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

> **I build the website your business should have had three years ago.**

Sub-headline:
> Two weeks. A fraction of agency pricing. Trades, hospitality, professional services, tech startups, local services — if your current site looks like 2018, this is for you.

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
