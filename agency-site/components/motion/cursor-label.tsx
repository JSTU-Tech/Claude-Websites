"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

/**
 * Custom cursor label — house primitive. A small editorial pill that
 * follows the cursor and only appears when hovering elements that
 * declare an intent via [data-cursor]. No dot, no delayed ring (that's
 * the slop trope DESIGN.md §9 bans). Just a piece of type telling the
 * user what'll happen on click.
 *
 * Usage: add data-cursor="Read" (or any verb) to any element you want
 * the cursor to label.
 */

export function CursorLabel() {
  const [label, setLabel] = useState<string | null>(null);
  const [isCoarse, setIsCoarse] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 700, damping: 50, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 700, damping: 50, mass: 0.4 });

  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    setIsCoarse(mq.matches);
    const onChange = () => setIsCoarse(mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  useEffect(() => {
    if (isCoarse) return;

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = (e.target as HTMLElement | null)?.closest?.(
        "[data-cursor]",
      ) as HTMLElement | null;
      const next = target?.dataset.cursor ?? null;
      setLabel((prev) => (prev === next ? prev : next));
    };
    const onLeave = () => setLabel(null);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [isCoarse, x, y]);

  if (isCoarse) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[70] -translate-x-1/2 -translate-y-1/2"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        initial={false}
        animate={{
          opacity: label ? 1 : 0,
          scale: label ? 1 : 0.85,
        }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        className="bg-accent text-ink px-3 py-1.5 text-[0.6875rem] tracking-[0.08em] uppercase font-medium translate-x-4 translate-y-4"
      >
        {label ?? ""}
      </motion.div>
    </motion.div>
  );
}
