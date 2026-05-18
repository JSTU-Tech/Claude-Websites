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
      // Double-ended open-jaw spanner running diagonally from top-left
      // to bottom-right. Each jaw has a V-notch on the outer edge —
      // the recognisable "open wrench" silhouette. Built horizontally
      // then rotated +45° around the centre of the viewBox.
      //
      // Top-left jaw — outline traces around the outer perimeter and
      // through the notch peak, ending where the handle joins.
      "M 44 39 L 47 36 L 39 28 L 36 30 L 37 37 L 30 36 L 28 39 L 36 47 L 39 44",
      // Bottom-right jaw — mirror of the top-left jaw.
      "M 81 76 L 84 73 L 93 81 L 90 84 L 83 83 L 84 90 L 81 93 L 73 84 L 76 81",
      // Handle — two parallel diagonal strokes between the jaw joins.
      "M 44 39 L 81 76",
      "M 39 44 L 76 81",
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
