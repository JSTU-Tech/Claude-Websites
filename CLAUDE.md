@AGENTS.md
@DESIGN.md

## Project context

This is a brand-new website design + production agency's demo site. The site itself is the portfolio piece — cold prospects from outreach will judge the founder by it. The bar is **production-grade studio**, not "clean enough." Bland fails the brief.

Read `DESIGN.md` before writing any code. Most design and copy intent is locked there; if a decision isn't covered, ask before guessing. **Restraint is a tool, not a doctrine** — don't undershoot ambition by defaulting to minimal.

## Tools that are NOT optional

These are first-class collaborators for every visual change. Skipping them to save time is the #1 reason output looks generic. Invoke them BEFORE writing code, not after.

### Skills (invoke via `Skill` tool)

| When you're touching… | Skills to invoke first |
| --- | --- |
| Any visual / layout / component | `frontend-design:frontend-design`, `ui-ux-pro-max:ui-ux-pro-max`, `modern-web-design:modern-web-design` |
| Animation / micro-interactions | `motion-framer:motion-framer` |
| Scroll choreography, pin/scrub moments, parallax | `gsap-scrolltrigger:gsap-scrolltrigger`, `locomotive-scroll:locomotive-scroll` |
| Simple in-view reveals | `scroll-reveal-libraries:scroll-reveal-libraries` |
| Animated icons or hand-keyed JSON anims | `lottie-animations:lottie-animations` |
| Pre-merge quality | `web-quality-audit`, `core-web-vitals`, `performance`, `seo`, `accessibility`, `best-practices` |

Invoke **multiple** at once when relevant. They don't share context — you do.

### MCPs (deferred tools — fetch via `ToolSearch` then call)

- **chrome-devtools** — primary browser inspection. Use after every section change: screenshot, console messages, lighthouse audit, network, performance trace.
- **playwright** — alternate browser automation when chrome-devtools doesn't fit.
- **context7** — fetch up-to-date library docs (Next.js 16, Motion 12, GSAP, Tailwind v4, etc.) **before** writing API-touching code. Your training data is not authoritative.
- **magic** — component inspiration, builder, and logo search. Use the inspiration tool when stuck for a section direction.

### What "skipping the tools" looks like

- Writing a hero without running `frontend-design` first → generic editorial.
- Adding motion without `motion-framer` reference → reaching for `whileHover scale`.
- Building a scroll moment without `gsap-scrolltrigger` → janky, no scrub control.
- Shipping a section without a `chrome-devtools` screenshot + console check → silent layout/console bugs.
- Calling a Next.js / Motion API without `context7` → stale signature from training data.

If you find yourself starting straight from code, stop and run the skill first.

## Build conventions

- **Components**: colocated. Page-scoped components live in `app/<route>/_components/`. Shared primitives in `components/`. Motion primitives in `components/motion/`.
- **Styling**: Tailwind v4 only. Theme tokens in `app/globals.css` `@theme inline`. No CSS modules, no styled-components.
- **Animation imports**: `import { motion } from "motion/react"` (Motion v12 path). Not `framer-motion`. Components pasted from external snippets that use `framer-motion` must be migrated on entry.
- **House primitives — use in every new site, not just this one**: five components form the studio's standard kit. Wire each one into the appropriate moment on every new build, not just this project.
  - `SplineScene` (`components/spline-scene.tsx`) — single editorial 3D object, lazy-loaded.
  - `ContainerScroll` (`components/motion/container-scroll.tsx`) — scroll-driven screen-tilt reveal for a featured case study / flagship moment.
  - `ShaderHero` (`components/motion/shader-hero.tsx`) — WebGL2 fragment-shader atmospheric fold with type overlay (forest-green nebula). Self-contained section with primary + secondary CTAs.
  - `WebGLShader` (`components/motion/webgl-shader.tsx`) — Three.js RGB-scanline background layer for atmospheric sections. Absolute-positioned inside its parent; pauses when off-screen.
  - `TestimonialsColumn` (`components/motion/testimonials-column.tsx`) — vertical auto-scrolling testimonial marquee column. Use 2–3 stacked at different durations for a wall.
  - `CursorLabel` (`components/motion/cursor-label.tsx`) — site-wide custom cursor label that reads `data-cursor="..."` from any element. Mount once in the root layout.
  - `LampContainer` (`components/motion/lamp-container.tsx`) — Aceternity-style conic spotlight (sage on ink-deep). Use for one dramatic single-line / single-stat fold per site, no more.
  - `AnimatedTextCycle` (`components/motion/animated-text-cycle.tsx`) — auto-cycling word swap with blur+y transition and natural width measurement. Use to rotate a list of buyers / verticals / services inside a sentence.
  - External snippets (e.g. 21st.dev, Aceternity) must be migrated from `framer-motion` → `motion/react` and recoloured to the project palette before they ship — never paste classes like `bg-black`, `from-orange-500`, `hover:scale-105` without retoning.
- **GSAP**: import only inside `"use client"` components, lazy-init inside `useEffect`/`useGSAP`. ScrollTrigger goes through the `gsap-scrolltrigger` skill's recipes — don't freelance it.
- **shadcn**: install primitives only when needed (`pnpm dlx shadcn@latest add button`). Override radius, color, type classes on every component before merging.
- **Images**: `next/image` only. AVIF preferred. `priority` on hero only.
- **Fonts**: load via `next/font/local` from `public/fonts/`. Display: **General Sans** (Fontshare, variable 200–700 + italic). Body: **Switzer Variable** (Fontshare, axis 100–900 + italic). Exposed as `--font-display` and `--font-body` Tailwind v4 theme tokens. Never fall back to Google Fonts. Boska files remain in `public/fonts/` but are not loaded — left in place for possible future flourish use only.
- **Language**: British English throughout. £ not $, autumn not fall, maths not math, organise not organize. No quarter-talk (Q1/Q2/Q3/Q4) — say "this autumn" or "in the next three months."

## Workflow (apply to every section)

1. **Invoke skills first.** Identify which design/motion skills apply (see table above) and run them. Note the patterns they return.
2. **Read the relevant section of `DESIGN.md`.**
3. **Pull current docs via `context7`** for any framework/library API you'll touch.
4. **Sketch the section structure** in unstyled HTML first.
5. **Style and animate component-by-component.** Don't generate a full page in one pass.
6. **Inspect via `chrome-devtools`** after each component: screenshot at 1440 and 390 widths, check console messages, check network for missing assets.
7. **Apply the "taste test"** from `DESIGN.md` §10 in the commit message body.
8. **Quality gates before merge**: invoke `web-quality-audit` / `core-web-vitals` / `accessibility` skills. Lighthouse targets per `DESIGN.md` §11.

## What to never do

- Install a font from Google Fonts.
- Use the shadcn default look.
- Add `whileHover={{ scale }}` on a card (use the hover rules in `DESIGN.md` §5 instead).
- Ship a section without naming a reference in the commit message.
- Add a CMS, analytics tool, or third-party widget without checking with the founder.
- Start coding a visual change without first invoking the relevant skill(s). This is the most common slop trigger.

## When in doubt

Be ambitious *and* considered. A section is finished when it has: (a) a clear reference, (b) at least one signature motion or compositional moment, (c) survives the §10 taste test, (d) passes the §9 ban list. Less is not the goal — *intentional* is.
