# Creative Direction — Agency Demo Site

This is the brief. **Most of it is locked** (palette tokens, type families, copy, page architecture, slop ban list). **Some of it is intentionally loosened** to allow ambitious execution — see callouts below. When uncertain, ask before guessing.

**Operating principle:** ambitious *and* considered. Restraint is a tool, not a doctrine. Every section needs at least one signature moment (composition, motion, or interaction) that earns the price tag. "Clean enough" is failure.

---

## 1. The business this is selling

Solo founder. Website design + production agency. Wedge: a better website is the cheapest growth channel SMB clients aren't using. Buyers are trades, hospitality, professional services, e-commerce — owners with weak/dated sites, not marketing directors.

Positioning sentence (memorize):
> **"I build websites for [trades / hospitality / professional services] that book more jobs than the one you have now. Most sites pay for themselves in 60–90 days."**

Tone: founder-direct. Short sentences. Specifics. No "we." No agency-speak.

---

## 2. Aesthetic direction — editorial-typographic, with ambition

Reference set: **Basement Studio**, **Locomotive**, **Tomorrow**, **Ben Mingo**, **Active Theory** (for the bolder moments), **Pentagram** print specimens, **Lekker Studio**. Not Linear, not Vercel, not Stripe.

Compositional rules:
- Big type as primary visual layer. Type carries the page.
- Intentional asymmetry. Anti-grid where it earns.
- Generous negative space — bone/cream backgrounds, not pure white. Use it as canvas for one signature element per section, not as filler.
- Graphics are encouraged when they earn their place — see §3a. Decorative-for-decoration's-sake is not.

The site should read as "the founder operates at a different level" within 3 seconds. Quiet confidence with one loud-on-purpose moment per fold.

**Use the skills before you compose.** Run `frontend-design`, `ui-ux-pro-max`, and `modern-web-design` (and the motion skills, see §5) before sketching the section. They exist for exactly this brief.

---

## 3. Colour palette — Slate & Sage

Base tokens locked. UK-business calm; modern but not corporate-blue; warm cream + deep ink + forest-green signal accent. Don't add tones without updating this section.

```
--bg:         #F2F0EA   /* clean warm cream, page background */
--bg-deep:    #E7E2D6   /* deeper sand, secondary surfaces / banding */
--paper:      #FBF8F2   /* lifted paper tone for cards on bg */
--ink:        #131310   /* near-black, all text */
--ink-deep:   #08070A   /* deep ink, inverted sections (case study + final CTA) */
--accent:     #18433B   /* deep forest green — CTAs, key numbers, link underlines */
--accent-soft:#6BA38B   /* sage — accent on dark backgrounds, ornaments */
--mineral:    #2B3C3A   /* deep eucalyptus, reserved for future use */
--muted:      #6F6C66   /* neutral grey, secondary text */
--rule:       #1313101A /* 10% ink hairlines */
```

**Rules:**
- Forest green (`--accent`) is the *only* signal colour. It appears on CTAs, key numbers, link underlines, and the single editorial flourish per section. Don't dilute it.
- Sage (`--accent-soft`) is for inverted (dark) sections only — it's the accent colour on `--ink-deep`. Never use it on cream.
- `--mineral` and other future tones are *section-level* moves — entire inverted blocks — never accents on top of cream.
- No gradients on type. No gradient buttons. Atmospheric gradients are allowed only behind a hero treatment, only in palette colours, never multi-hue.
- No pure white. No pure black. No neon. No corporate blue.
- Photography is warm-toned (slight cream tint), never cool/blue.

### §3a. Graphics

Graphics are allowed and encouraged when they replace generic stock or carry meaning. Approved categories:

- **Typographic ornaments** — large italic `&`, `§`, `¶`, fractional numerals used as section anchors.
- **Custom monogram / printer's mark** for the studio wordmark that recurs at fold breaks.
- **Single-line editorial drawings** for verticals (e.g. trades / hospitality / professional services). Vector, ink-coloured, hand-drawn feel.
- **Process diagrams** for the 4-step section — schematic, ink-line.
- **Real photography** when shot specifically for the studio (founder portrait, work-in-progress shots, deliverable mockups). Never Unsplash.
- **Animated SVG ornaments** that respond to scroll position or cursor (subtle, not gimmicks).
- **Spline 3D scenes** (via `components/spline-scene.tsx`) — a single editorial 3D object per site, lazy-loaded, monochrome or palette-coloured. Never decorative blobs.
- **ContainerScroll 3D card reveal** (via `components/motion/container-scroll.tsx`) — scroll-driven tilt of a screen-shaped card showing the live site preview. Use for the case study "big visual" or a flagship feature reveal.
- **ShaderHero atmospheric fold** (via `components/motion/shader-hero.tsx`) — WebGL2 fragment-shader nebula on `--ink-deep`, palette-tinted clouds. Hero or mid-page atmospheric section. Pauses rendering when scrolled out of view to spare battery + GPU.

`SplineScene`, `ContainerScroll` and `ShaderHero` are the **house kit** — wire each one into every new studio build at the appropriate moment, not just this one. They're the differentiators.

Banned graphic categories listed in §9 still apply (no 3D blobs, no AI-generated abstract gradients, no stock laptop-with-charts).

---

## 4. Typography — Fontshare

Locked. Free for commercial use via fontshare.com. Files live in `agency-site/public/fonts/`.

```
Display:  General Sans    (variable axis 200–700 + italic — regular weight for hero, medium for H2)
Body:     Switzer         (variable axis 100–900 + italic; 400 body, 500 emphasis)
Mono:     none loaded     (use ui-monospace system stack if needed for case-study metrics)
```

General Sans is the upgrade from Boska italic. The brief was "less artsy, more UK business" — General Sans reads as modern, confident, used by the kind of agencies a SMB owner actually hires. Italics are reserved for the rare in-line emphasis, never as the default display style.

Loaded via `next/font/local` and exposed as Tailwind v4 theme tokens: `--font-display` (General Sans), `--font-body` (Switzer). Use `font-display` and `font-body` utility classes. Boska files may stay in `public/fonts/` for now but are not referenced — do not import them.

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

**Kinetic type is allowed.** Horizontal marquees, scroll-velocity-driven sliders, character-by-character reveals on entrance, scrambled-to-resolved hero loads. Use the `motion-framer` and `gsap-scrolltrigger` skills to choreograph.

---

## 5. Motion language — restrained craftsmanship, not minimalism

Every section ships with a motion plan. Static = unfinished.

**Easing curves:**
```
Primary:    cubic-bezier(0.22, 1, 0.36, 1)     /* ease-out-quart */
Sections:   cubic-bezier(0.83, 0, 0.17, 1)     /* ease-in-out-quart, sections only */
```

**Durations:**
- UI interactions: 200–400ms
- Entrance/scroll reveals: 600–900ms
- Hero pageload choreography may chain reveals — total under 2000ms
- Never single-segment over 1000ms

**Stagger:** 40–80ms between sibling reveals.

**Required motion moments** (the site MUST ship these — they are the wow factor):

1. **Hero pageload choreography** — split-text line reveal under clip-mask, accent underline draws in, CTA fades up. Sequenced, not simultaneous.
2. **Magnetic CTA primary** — and magnetic wordmark + nav. 6px max pull, spring physics.
3. **Scroll-triggered section reveals** — every section past the fold uses an in-view reveal pattern, staggered.
4. **One narrative scroll moment** — pinned GSAP ScrollTrigger sequence in the featured case study or about-process section. Scrub-controlled type or before/after reveal. ONE site-wide.
5. **Kinetic type strip** — at least one section (between proof and case study, or between process and pricing). Infinite marquee modulated by scroll velocity.
6. **View Transitions API** for route changes — shared-element morph from `/work` card thumbnail to case study hero.
7. **Hover micro-interactions** that surprise — animated underlines, button text-up-text-up swaps, magnetic pulls. No `whileHover scale`.

**Library use:**
- **Motion** (v12, import from `"motion/react"`) is primary. Invoke the `motion-framer` skill before authoring.
- **GSAP + ScrollTrigger** for the one narrative scroll moment AND for any scroll-scrubbed sequence. Invoke the `gsap-scrolltrigger` skill.
- **Locomotive Scroll** is permitted when a section's pacing genuinely benefits from smooth-scroll inertia. Don't enable it globally without checking against `prefers-reduced-motion` and CLS impact. Invoke the `locomotive-scroll` skill.
- **Lottie** is permitted for the process diagram or studio mark animation, *if* the JSON is hand-keyed or sourced from a real designer — not AI-generated. Invoke the `lottie-animations` skill.
- **AOS / `scroll-reveal-libraries`** is the simple fallback for in-view reveals when motion isn't needed.

**Hover/interaction rules:**
- Cards: 2–4px Y shift + border color change + optional internal text/image shift. **No scale.**
- Buttons: background fill swap (200ms) + internal text/icon micro-motion. No scale.
- Links: animated underline (200ms left→right).
- Images: 2% scale max on slow zoom-in (case studies only).

**Always respect `prefers-reduced-motion`.** Use Motion's `useReducedMotion` and gate transitions.

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

1. **Hero** — value prop sentence, one supporting line, one CTA ("Book a call"). Founder name + small photo. Pageload choreography per §5 #1.
2. **Proof bar** — 4–6 client names as text (not logos), OR a single big number ("$3.2M in tracked client revenue"). Single oxblood accent.
3. **Kinetic type strip** — infinite marquee, scroll-velocity modulated. Studio statement / availability / location.
4. **Featured case study** — full-width, real outcome visible without clicking. Hosts the narrative scroll moment (§5 #4) — pinned scrub, before/after, or stat reveal.
5. **Who this is for** — 3 plain cards: Trades & home services / Hospitality / Professional services. Each card has a one-liner outcome plus a single-line editorial drawing of the vertical (§3a).
6. **Process** — 4 numbered steps, one sentence each. Schematic ink-line diagram or Lottie. Scroll-revealed in sequence.
7. **Pricing signal** — "Projects from $X. Most clients invest between $X–$Y."
8. **Testimonials** — 2–3 real quotes from real owners with real photos.
9. **About the founder** — 2–3 sentences, photo, LinkedIn link.
10. **Final CTA** — repeat. "Book a call." With its own motion treatment.

### Case study page — section order

1. Hero: client name, year, one-line outcome (the number). Shared-element transition from `/work` card.
2. Big visual — single image or video, full-bleed.
3. The problem — 2 short paragraphs.
4. The approach — 2 short paragraphs + 1 supporting image.
5. The result — the number, the quote, before/after if applicable. May host the narrative scroll moment if not used on Home.
6. Next case study link.

---

## 7. Copy direction

**Language: British English.** This is a UK business selling to UK SMBs. Use British spellings (organisation, colour, optimise, enquiry, programme), British currency (£ not $), and plainspoken UK phrasing.

**No quarter-talk, no SaaS-speak.** Don't say "Q3" or "this quarter" — say "this autumn" or "in the next three months." Don't say "leverage," "scale up," "stakeholders," "ecosystem." Talk like an actual British tradesperson would understand.

### Banned words/phrases

```
crafting, craft (verb), elevate, bespoke, tailored, seamless,
synergy, experiences, journey, tomorrow, next-generation,
empower, unleash, supercharge, revolutionize, pixel-perfect,
leverage (verb), scale up, stakeholders, ecosystem, solutions,
Q1/Q2/Q3/Q4, "this quarter", "next quarter",
"we" (when you mean "I"), "trusted by 1000+ companies"
```

### Americanisms to avoid

```
$ → £
"math" → "maths"
"organize" → "organise" (and -ize → -ise generally)
"color" → "colour"
"realize" → "realise"
"sidewalk" → "pavement"
"fall" (season) → "autumn"
"vacation" → "holiday"
"check" (verb for inspect) — keep "check" but not "checking-out" for buy
"gotten" → "got"
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

## 8. Tech stack

Already scaffolded — don't change framework choices.

```
Framework:     Next.js 16 (App Router) — already installed
React:         19.2 — already installed
Styling:       Tailwind v4 with CSS-first @theme config
Components:    shadcn — Button, Form, Dialog ONLY, heavily overridden
Motion:        framer-motion v12 (import from "motion/react") — installed
Scroll:        GSAP + ScrollTrigger (add when wiring the narrative moment)
               Locomotive Scroll (add only if a section earns it)
Lottie:        lottie-react / @dotlottie/react (add only when a real JSON exists)
Transitions:   Native View Transitions API
Images:        next/image, AVIF, priority on hero only
CMS:           None. MDX or hard-coded TSX.
Hosting:       Vercel
Analytics:     Plausible or Vercel Analytics. Not GA4.
```

**Tailwind v4 theme tokens** live in `app/globals.css` under `@theme inline`. Define palette + font tokens there; reference everywhere with semantic names (`bg-bg`, `text-ink`, `text-accent`).

**shadcn override discipline:** every shadcn component imported must have its radius, border, type, and color classes replaced before it ships. The default look is banned.

---

## 9. The AI-slop ban list (protective floor — keeps us out of generic territory)

Every default Claude Code reaches for. Explicit bans:

### Fonts
- Inter, Roboto, DM Sans, Manrope, Geist, Poppins, Outfit, Arial, any Google Sans-Serif default.
- Boska italic as a *default display* — kept on disk for future flourish use only, never as the recurring headline font.

### Colors
- Any purple → blue gradient
- Indigo-500 anything
- Neon mint accent
- Default shadcn `slate`/`zinc` palette
- Pure white (#FFFFFF) or pure black (#000000)
- Type-on-gradient

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
- Universal `initial={{ opacity: 0, y: 20 }}` section fade-up applied identically to every section
- Animated number counters in the hero (counters elsewhere may earn their place — case study results section is fine)
- Custom cursor that's literally a dot + delayed ring
- Parallax stars / particle backgrounds
- Mr. Robot text-scramble effect *as decoration* (a single intentional resolve on a key word can work)
- Section-snap scroll-jacking

### Imagery
- Stock photos of laptops with charts
- AI-generated abstract gradient blobs as hero backgrounds
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

Before any section ships, answer in writing (in commit message body):

1. **What reference is this section pulling from?** Name a real site or print piece.
2. **What problem does this section solve for the prospect?** Not "looks nice" — what decision does it move them toward?
3. **What is the signature moment in this section?** Composition, motion, interaction — name one specific thing the reader will remember.
4. **Would this section work without color?** If yes, it's well-composed. If no, the color is doing too much work.
5. **What does this section ban from the §9 list?** Point to it.
6. **Which skills did you invoke to design this?** Name them. If none, the section is probably reverting to defaults.

If any answer is hand-wavy, the section is slop. Rebuild.

---

## 11. Definition of done for the demo

- All five pages built
- One real case study (or one labeled "concept project")
- All seven required motion moments from §5 shipped
- Lighthouse: Performance ≥90, Accessibility ≥95, Best Practices ≥95, SEO ≥95
- LCP ≤2.5s, INP ≤200ms, CLS ≤0.1
- Cal.com embed working on /contact
- No console errors, no Tailwind warnings, no React keys warnings
- Playwright smoke test passing on all five routes
- View Transitions firing between routes
- Founder photo + headshot taken (or placeholder labeled as such)
- `prefers-reduced-motion` respected (all motion gates verified)
