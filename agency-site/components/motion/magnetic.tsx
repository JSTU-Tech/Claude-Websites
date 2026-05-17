"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import {
  useCallback,
  useRef,
  type CSSProperties,
  type PointerEvent,
  type ReactNode,
} from "react";

/**
 * Magnetic wrapper — element follows the cursor while within `radius` of
 * the element's center. Pull is capped at `maxPull` so the element never
 * leaves its layout slot in a noticeable way. Spring physics keeps the
 * return-to-rest feel organic.
 *
 * Used for the hero CTA and the wordmark. Respects prefers-reduced-motion.
 */

const SPRING = { stiffness: 180, damping: 16, mass: 0.4 } as const;

export function Magnetic({
  children,
  radius = 90,
  maxPull = 6,
  className,
  style,
}: {
  children: ReactNode;
  radius?: number;
  maxPull?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const prefersReduced = useReducedMotion();

  const x = useSpring(useMotionValue(0), SPRING);
  const y = useSpring(useMotionValue(0), SPRING);

  const handleMove = useCallback(
    (event: PointerEvent<HTMLSpanElement>) => {
      if (prefersReduced || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = event.clientX - cx;
      const dy = event.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist > radius) {
        x.set(0);
        y.set(0);
        return;
      }
      const t = 1 - dist / radius; // 0 at the edge, 1 at center
      x.set((dx / dist || 0) * maxPull * t);
      y.set((dy / dist || 0) * maxPull * t);
    },
    [prefersReduced, radius, maxPull, x, y],
  );

  const handleLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.span
      ref={ref}
      className={className}
      style={{ display: "inline-block", x, y, ...style }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {children}
    </motion.span>
  );
}
