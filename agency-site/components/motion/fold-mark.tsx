"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * FoldMark — recurring section ornament. Pairs a quiet editorial bullet
 * (oxblood-accent square + short hairline rule, drawn in on scroll) with
 * a section index numeral set in Boska italic.
 *
 * Replaces the original curly bezier "ampersand" glyph (cut on 2026-05-18
 * — read as a generic decorative flourish rather than a Stuckey mark).
 * The new mark mirrors the hairlines used throughout the site, so the
 * section index reads as part of the editorial grid rather than an
 * ornament tacked onto it.
 */

const EASE_QUART: [number, number, number, number] = [0.22, 1, 0.36, 1];

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
        width="44"
        height="20"
        viewBox="0 0 44 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
      >
        {/* Oxblood accent square — the bullet */}
        <motion.rect
          x="0"
          y="6"
          width="8"
          height="8"
          fill="var(--color-accent)"
          variants={{
            hidden: { opacity: 0, scale: 0.4 },
            visible: {
              opacity: 1,
              scale: 1,
              transition: {
                duration: 0.45,
                ease: EASE_QUART,
                delay: prefersReduced ? 0 : 0.05,
              },
            },
          }}
          style={{ transformOrigin: "4px 10px" }}
        />
        {/* Hairline rule — draws in left→right to point at the numeral */}
        <motion.line
          x1="14"
          y1="10"
          x2="42"
          y2="10"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          variants={{
            hidden: { pathLength: prefersReduced ? 1 : 0, opacity: 0.6 },
            visible: {
              pathLength: 1,
              opacity: 0.55,
              transition: {
                pathLength: {
                  duration: prefersReduced ? 0 : 0.6,
                  ease: EASE_QUART,
                  delay: prefersReduced ? 0 : 0.15,
                },
                opacity: { duration: 0.3 },
              },
            },
          }}
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
