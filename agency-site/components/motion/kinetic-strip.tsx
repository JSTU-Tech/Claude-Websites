"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
  useReducedMotion,
} from "motion/react";
import { useRef } from "react";

/**
 * Kinetic type strip. Two duplicate text tracks scroll horizontally at a
 * baseline velocity. The user's scroll velocity is fed in through a spring
 * to modulate speed — fast scroll punches the marquee, idle scroll keeps
 * it at a slow drift. The text "wraps" via a motion value so the two
 * tracks repeat seamlessly.
 *
 * Reference: Basement Studio / Tomorrow studio statement strips.
 */

type Props = {
  items: string[];
  separator?: string;
  /** Base translation in pixels per second. Negative = right→left. */
  baseVelocity?: number;
  /** How much scroll velocity influences the strip (default 0.04). */
  scrollInfluence?: number;
};

export function KineticStrip({
  items,
  separator = "—",
  baseVelocity = -50,
  scrollInfluence = 0.04,
}: Props) {
  const prefersReduced = useReducedMotion();

  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(
    smoothVelocity,
    [0, 1000],
    [0, scrollInfluence * 1000],
    { clamp: false },
  );

  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const directionFactor = useRef(1);

  useAnimationFrame((_, delta) => {
    if (prefersReduced) return;
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    const vFactor = velocityFactor.get();
    if (vFactor < 0) {
      directionFactor.current = -1;
    } else if (vFactor > 0) {
      directionFactor.current = 1;
    }
    moveBy += directionFactor.current * moveBy * vFactor * 0.5;
    baseX.set(baseX.get() + moveBy);
  });

  const track = (
    <span className="inline-flex items-center gap-x-12 pr-12">
      {items.map((item, i) => (
        <span key={i} className="inline-flex items-center gap-x-12">
          <span>{item}</span>
          <span className="text-accent">{separator}</span>
        </span>
      ))}
    </span>
  );

  return (
    <section
      aria-hidden="true"
      className="overflow-hidden border-y border-rule bg-bg-deep/50 py-7 md:py-9"
    >
      <motion.div
        className="whitespace-nowrap font-display italic font-extralight text-ink/90 will-change-transform"
        style={{
          fontSize: "clamp(2.5rem, 5.5vw, 5rem)",
          letterSpacing: "-0.02em",
          x: prefersReduced ? 0 : x,
        }}
      >
        {track}
        {track}
        {track}
        {track}
      </motion.div>
    </section>
  );
}
