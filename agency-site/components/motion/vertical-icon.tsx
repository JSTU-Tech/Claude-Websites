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
    ariaLabel: "Spanner mark",
    paths: [
      // Box-end ring (outer circle) — top-left corner
      "M 16 30 a 14 14 0 1 0 28 0 a 14 14 0 1 0 -28 0",
      // Box-end ring (inner hole)
      "M 23 30 a 7 7 0 1 0 14 0 a 7 7 0 1 0 -14 0",
      // Shaft — diagonal from ring to open jaw
      "M 40 40 L 82 82",
      // Open-jaw fork — diamond-shaped wrench head at bottom-right
      "M 82 82 L 96 70 L 108 82 L 94 96 Z",
      // Inner notch of the open jaw — suggests the gripping surfaces
      "M 92 84 L 98 90",
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
    ariaLabel: "Necktie mark",
    paths: [
      // Tie silhouette — knot trapezoid into widening blade, narrowing
      // to a point at the bottom
      "M 50 18 L 70 18 L 66 36 L 76 84 L 60 104 L 44 84 L 54 36 Z",
      // Knot bottom edge — line where the knot meets the blade
      "M 54 36 L 66 36",
      // Dimple — small V just below the knot, classic "smart" tie detail
      "M 56 42 L 60 48 L 64 42",
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
