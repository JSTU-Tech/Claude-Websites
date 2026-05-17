"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Single-line editorial drawings for the three buyer verticals. Each is a
 * hand-authored SVG path animated with stroke-length on view-enter — like
 * an ink mark being drawn. No fills. Stays in ink color so the section's
 * accent quota remains untouched.
 */

const EASE_QUART: [number, number, number, number] = [0.22, 1, 0.36, 1];

export type Vertical = "trades" | "hospitality" | "professional";

const ICONS: Record<
  Vertical,
  { paths: string[]; viewBox: string; ariaLabel: string }
> = {
  trades: {
    viewBox: "0 0 120 120",
    ariaLabel: "Hammer mark",
    paths: [
      // Hammer head
      "M 58 24 L 102 24 L 102 46 L 58 46 Z",
      // Claw indent on head
      "M 62 32 L 70 38",
      // Neck transition into handle
      "M 64 44 L 50 58",
      // Handle, long diagonal
      "M 50 58 L 16 100",
      // Handle grip detail
      "M 24 92 L 30 86",
    ],
  },
  hospitality: {
    viewBox: "0 0 120 120",
    ariaLabel: "Wineglass mark",
    paths: [
      // Bowl, U-shape opening upward
      "M 36 16 C 32 50 48 64 60 64 C 72 64 88 50 84 16",
      // Lip rim, subtle
      "M 36 16 L 84 16",
      // Stem
      "M 60 64 L 60 100",
      // Base
      "M 40 102 L 80 102",
    ],
  },
  professional: {
    viewBox: "0 0 120 120",
    ariaLabel: "Fountain pen mark",
    paths: [
      // Nib triangle
      "M 18 100 L 32 106 L 38 92 Z",
      // Nib slit
      "M 26 99 L 33 103",
      // Body, long taper
      "M 38 92 L 96 30",
      // Cap join
      "M 80 46 L 90 36",
      // End cap
      "M 96 30 L 102 24",
    ],
  },
};

export function VerticalIcon({
  variant,
  className,
  delay = 0,
}: {
  variant: Vertical;
  className?: string;
  delay?: number;
}) {
  const prefersReduced = useReducedMotion();
  const { paths, viewBox, ariaLabel } = ICONS[variant];

  return (
    <motion.svg
      role="img"
      aria-label={ariaLabel}
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      {paths.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={{
            hidden: { pathLength: prefersReduced ? 1 : 0, opacity: 0.6 },
            visible: {
              pathLength: 1,
              opacity: 1,
              transition: {
                pathLength: {
                  duration: prefersReduced ? 0 : 0.85,
                  ease: EASE_QUART,
                  delay: prefersReduced ? 0 : delay + i * 0.08,
                },
                opacity: { duration: 0.3, delay: delay + i * 0.08 },
              },
            },
          }}
        />
      ))}
    </motion.svg>
  );
}
