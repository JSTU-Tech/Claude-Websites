"use client";

import { motion, useScroll, useSpring } from "motion/react";

/**
 * Slim scroll-progress hairline pinned to the top of the viewport.
 * Single oxblood line that scales horizontally as the user scrolls.
 * Spring-smoothed so it doesn't twitch with momentum.
 */

export function KilnScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    mass: 0.4,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-40 h-[2px] origin-left pointer-events-none"
      style={{
        scaleX,
        background: "var(--kiln-accent)",
        boxShadow: "0 0 16px rgba(176, 73, 42, 0.55)",
      }}
    />
  );
}
