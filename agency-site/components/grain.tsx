"use client";

import { usePathname } from "next/navigation";

/**
 * Paper-grain overlay — fixed, full-viewport, pointer-events:none.
 * SVG fractal noise blended into the page background for the print feel.
 * Subtle: 4-5% opacity so it reads as texture, not a screen door.
 * Skipped on /demos/* routes where client sites manage their own atmosphere.
 */

export function Grain() {
  const pathname = usePathname();
  if (pathname?.startsWith("/demos")) return null;
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[60] mix-blend-multiply"
      style={{ opacity: 0.05 }}
    >
      <svg
        className="h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <filter id="paper-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#paper-grain)" />
      </svg>
    </div>
  );
}
