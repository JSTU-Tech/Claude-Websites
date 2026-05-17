"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ReactNode } from "react";

/**
 * Editorial line-reveal. Each child is treated as one logical "line" of
 * type; revealed by sliding up from beneath an overflow-hidden clip mask.
 * Stagger between lines is 80ms with the §5 ease-quart curve.
 *
 * Use it like:
 *   <RevealLines>
 *     <span>I build websites</span>
 *     <span>that turn local searches</span>
 *     <span>into <BookedJobs /></span>
 *   </RevealLines>
 */

const EASE_QUART: [number, number, number, number] = [0.22, 1, 0.36, 1];

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const line: Variants = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: { duration: 0.8, ease: EASE_QUART },
  },
};

export function RevealLines({
  children,
  className,
  as: As = "span",
}: {
  children: ReactNode[];
  className?: string;
  as?: "span" | "div";
}) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return (
      <As className={className}>
        {children.map((child, i) => (
          <span key={i} className="block">
            {child}
          </span>
        ))}
      </As>
    );
  }

  return (
    <motion.span
      className={className}
      variants={container}
      initial="hidden"
      animate="visible"
      style={{ display: "block" }}
    >
      {children.map((child, i) => (
        <span
          key={i}
          className="block overflow-hidden"
          style={{ paddingBottom: "0.18em", marginBottom: "-0.18em" }}
        >
          <motion.span
            variants={line}
            style={{ display: "block", willChange: "transform" }}
          >
            {child}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
