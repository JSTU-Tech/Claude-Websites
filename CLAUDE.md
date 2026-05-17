@AGENTS.md
@DESIGN.md

## Project context

This is a brand-new website design + production agency's demo site. The site itself is the portfolio piece — cold prospects from outreach will judge the founder by it.

Read `DESIGN.md` before writing any code. The brief is locked. Bans are absolute. If a design or copy decision isn't covered there, ask before guessing.

## Build conventions

- **Components**: colocated. Page-scoped components live in `app/<route>/_components/`. Shared primitives in `components/`.
- **Styling**: Tailwind v4 only. Theme tokens in `app/globals.css` `@theme inline`. No CSS modules, no styled-components.
- **Animation imports**: `import { motion } from "motion/react"` (Motion v12 path). Not `framer-motion`.
- **shadcn**: install primitives only when needed (`pnpm dlx shadcn@latest add button`). Override radius, color, type classes on every component before merging.
- **Images**: `next/image` only. AVIF preferred. `priority` on hero only.
- **Fonts**: load via `next/font/local` from `public/fonts/`. Display: **Gambarino** (Fontshare, regular only). Body: **Switzer Variable** (Fontshare, axis 100–900 + italic). Exposed as `--font-display` and `--font-body` Tailwind v4 theme tokens. Never fall back to Google Fonts.

## Workflow

1. Read the relevant section of `DESIGN.md`.
2. Read the Next.js 16 docs for any API surface you touch.
3. Sketch the section structure in unstyled HTML first.
4. Style component-by-component. Don't generate a full page in one pass.
5. After each component, run a Playwright screenshot and apply the "taste test" from `DESIGN.md` §10.
6. Lighthouse + accessibility check before any PR merges.

## What to never do

- Install a font from Google Fonts.
- Use the shadcn default look.
- Add a `whileHover={{ scale }}` on a card.
- Ship a section without naming a reference in the commit message.
- Add a CMS, analytics tool, or third-party widget without checking with the founder.

## When in doubt

Default to less. Less motion, less color, less type variation, less section. Editorial sites earn impact through restraint, not addition.
