@AGENTS.md
@DESIGN.md
@BUSINESS.md

## Project context

Brand-new website design + production agency's demo site. The site IS the portfolio — cold prospects judge the founder by it. Read DESIGN.md and BUSINESS.md before any code. Brief is locked. Bans absolute. Pricing is locked.

**Tooling-first rule (applies to every Claude session on every studio project):** Before writing any code, search the installed MCPs / plugins / skills for the work. The Magic MCP (21st.dev) is the starting point for components, not a last resort. The frontend-design / motion-framer / gsap-scrolltrigger / modern-web-design / ui-ux-pro-max skills are invoked *before* authoring, not after. This is non-negotiable — the studio's differentiator is what these tools enable.

When writing pricing copy, target-vertical language, or service descriptions: reference BUSINESS.md exclusively. Do not invent prices, tiers, or service names.

## Tools you MUST use (not optional)

These plugins, skills, and MCPs are installed for a reason. Use them on every build step. If you skip one, the output will look like generic AI work.

### Per-section workflow

For EVERY section/component you build, in this order:

1. **frontend-design plugin** — invoke before writing any markup. State the aesthetic anchor (editorial-typographic), name 2 reference sites from DESIGN.md §2, declare what this section bans from §9.
2. **Context7 MCP** — fetch version-correct docs for any API you touch (Next.js 16, Motion v12, Tailwind v4). Never write from memory.
3. **ui-ux-pro-max** — run accessibility + type-pairing + spacing audit before commit. Fix every flag.
4. **motion-framer skill** — invoke before any animation. Apply DESIGN.md §5 easing and durations exactly. No defaults.
5. **gsap-scrolltrigger skill** — only for the single narrative scroll moment on the case study page. Nowhere else.
6. **lottie-animations / scroll-reveal-libraries / locomotive-scroll** — skills are installed, DO NOT use them. DESIGN.md §5 bans them.
7. **modern-web-design** — reference for any pattern decision you're unsure about.
8. **magic MCP (21st.dev)** — **FIRST stop for any new section / component.** Run `21st_magic_component_inspiration` to search the full 21st.dev library before authoring anything from scratch. Use `21st_magic_component_builder` to scaffold, then `21st_magic_component_refiner` for tweaks. Override every default class (radius, color, type) before committing — generic Magic UI defaults are banned but the library itself is the starting point, never the fallback. If you author a section without invoking Magic first, justify it explicitly in the commit message.
9. **higgsfield MCP** — generate all hero imagery and case-study visuals. No stock photos. Prompt for warm-toned, editorial, single-subject compositions.
10. **playwright MCP** — screenshot the section at 1440px and 390px after every change. Compare against DESIGN.md §10 taste test in writing.
11. **chrome-devtools MCP** — run a Lighthouse + perf trace before declaring a page done. Numbers must hit DESIGN.md §11.
12. **web-quality-skills (addyosmani)** — invoke `web-quality-audit` before any commit to main. Hard gate.

**Default is: invoke. Skipping requires a written justification in the commit message.** This list is the floor, not a menu — every step above runs every section, every time. The output looking generic = a tool was skipped.

## Build conventions

- **Components**: colocated. `app/<route>/_components/`. Shared primitives in `components/`.
- **Styling**: Tailwind v4 only. Tokens in `app/globals.css` `@theme inline`.
- **Animation imports**: `import { motion } from "motion/react"`. Never `framer-motion`.
- **shadcn**: install primitives only when needed. Override every default class.
- **Images**: `next/image` only. AVIF. `priority` on hero only.
- **Fonts**: `next/font/local` for Pangram Pangram. Never Google Fonts.

## Workflow

1. Read the relevant section of DESIGN.md.
2. Read Next.js 16 docs in `node_modules/next/dist/docs/` for any API touched.
3. Run the 12-step tool workflow above for the section.
4. Sketch unstyled HTML first, style after.
5. Component-by-component. Never generate a full page in one pass.
6. Playwright screenshot + taste test (DESIGN.md §10) before commit.
7. Lighthouse + a11y gate before push.

## Never

- Install a Google Font.
- Use shadcn defaults.
- whileHover scale on a card.
- Ship a section without naming a reference in the commit message.
- Skip a tool from the 12-step workflow without justification.
- Add a CMS, analytics, third-party widget without approval.

## Commit message format

Every commit:

```
<section>: <what changed>

Reference: <site/print piece this pulls from>
Bans: <what AI-slop pattern this avoids>
Tools used: <which plugins/MCPs invoked>
```

## When in doubt

Default to less. Less motion, less color, less type variation, less section.
