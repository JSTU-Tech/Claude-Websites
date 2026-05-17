"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Kinetic type strip — seamless infinite marquee. Two identical tracks
 * sit side by side inside an overflow-hidden window. Motion animates the
 * outer flex container x from 0 to -50% of its own width (= one full
 * track width). At -50% the second track sits exactly where the first
 * began, so the loop wraps invisibly. No useAnimationFrame, no scroll
 * coupling — it just runs.
 *
 * Reference: Basement Studio / Tomorrow studio statement strips.
 */

type Props = {
  items: string[];
  separator?: string;
  /** Seconds for one full loop. Higher = slower. */
  durationSec?: number;
};

export function KineticStrip({
  items,
  separator = "—",
  durationSec = 45,
}: Props) {
  const prefersReduced = useReducedMotion();

  const Track = () => (
    <div
      aria-hidden="true"
      className="flex shrink-0 items-center gap-x-14 pr-14"
    >
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-x-14">
          <span>{item}</span>
          <span className="text-accent">{separator}</span>
        </div>
      ))}
    </div>
  );

  return (
    <section
      aria-label="Studio statement"
      className="overflow-hidden border-y border-rule bg-bg-deep py-7 md:py-9"
    >
      <motion.div
        className="flex w-max will-change-transform"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(2.5rem, 5.5vw, 5rem)",
          fontStyle: "italic",
          fontWeight: 400,
          letterSpacing: "-0.02em",
          color: "var(--color-ink)",
        }}
        animate={
          prefersReduced ? undefined : { x: ["0%", "-50%"] }
        }
        transition={
          prefersReduced
            ? undefined
            : {
                duration: durationSec,
                ease: "linear",
                repeat: Infinity,
                repeatType: "loop",
              }
        }
      >
        <Track />
        <Track />
      </motion.div>
    </section>
  );
}
