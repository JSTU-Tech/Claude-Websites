"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { CSSProperties, ReactNode } from "react";

/**
 * Section-level scroll reveal — fires when the section is 25% in view.
 * Staggers direct children 60ms apart, each rising 12px while fading.
 * Total entrance ~700ms — under the §5 1000ms ceiling.
 *
 * Apply by wrapping a <section> and marking children with the .reveal-item
 * class via the <RevealItem> child below, or rely on the default first-level
 * descendant stagger (children must be motion-aware via RevealItem).
 */

const EASE_QUART: [number, number, number, number] = [0.22, 1, 0.36, 1];

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_QUART },
  },
};

export function RevealSection({
  children,
  className,
  amount = 0.25,
  style,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
  style?: CSSProperties;
  as?: "div" | "section" | "header" | "footer";
}) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    const Tag = as;
    return (
      <Tag className={className} style={style}>
        {children}
      </Tag>
    );
  }

  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      className={className}
      style={style}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
    >
      {children}
    </MotionTag>
  );
}

export function RevealItem({
  children,
  className,
  style,
  as = "div",
}: {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  as?: "div" | "p" | "h1" | "h2" | "h3" | "span" | "li" | "blockquote";
}) {
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag variants={item} className={className} style={style}>
      {children}
    </MotionTag>
  );
}
