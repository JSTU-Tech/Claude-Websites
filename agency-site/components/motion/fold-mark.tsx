"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * FoldMark — recurring section ornament. Pairs an italic ampersand-like
 * glyph (drawn as an SVG path that animates its stroke length in on scroll)
 * with a section index numeral set in Boska italic. Used at section heads
 * to anchor the editorial language between folds.
 *
 * The glyph is a hand-authored bezier loop — not a literal "&" — designed
 * to read as a printer's mark rather than a typographic substitution.
 */

const EASE_QUART: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Single-stroke ampersand-style figure — entry at bottom-left, exit at upper-right.
// Drawn within a 60x60 viewBox.
const AMPERSAND_PATH =
  "M 8 52 C 8 32, 28 28, 32 40 C 36 52, 18 56, 14 48 C 10 38, 24 26, 36 18 C 44 12, 52 16, 52 24 C 52 32, 42 36, 36 32";

export function FoldMark({
  index,
  label,
  className,
}: {
  index: string;
  label?: string;
  className?: string;
}) {
  const prefersReduced = useReducedMotion();

  return (
    <div
      className={[
        "flex items-center gap-5",
        "text-ink",
        className ?? "",
      ].join(" ")}
    >
      <motion.svg
        width="56"
        height="56"
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
      >
        <motion.path
          d={AMPERSAND_PATH}
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={{
            hidden: { pathLength: prefersReduced ? 1 : 0, opacity: 0.6 },
            visible: {
              pathLength: 1,
              opacity: 1,
              transition: {
                pathLength: {
                  duration: prefersReduced ? 0 : 0.95,
                  ease: EASE_QUART,
                },
                opacity: { duration: 0.4 },
              },
            },
          }}
        />
        {/* Small filled square — printer's-mark anchor */}
        <motion.rect
          x="52"
          y="32"
          width="4"
          height="4"
          fill="var(--color-accent)"
          variants={{
            hidden: { opacity: 0, scale: 0.4 },
            visible: {
              opacity: 1,
              scale: 1,
              transition: {
                duration: 0.4,
                ease: EASE_QUART,
                delay: prefersReduced ? 0 : 0.9,
              },
            },
          }}
          style={{ transformOrigin: "54px 34px" }}
        />
      </motion.svg>

      <div className="flex items-baseline gap-4">
        <span
          className="font-display font-normal leading-none tracking-[-0.02em] text-ink/90"
          style={{ fontSize: "clamp(2.5rem, 4vw, 3.75rem)" }}
        >
          {index}
        </span>
        {label ? <span className="eyebrow">{label}</span> : null}
      </div>
    </div>
  );
}
