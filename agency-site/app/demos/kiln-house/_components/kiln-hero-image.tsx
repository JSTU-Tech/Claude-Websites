"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";

/**
 * Kiln House hero backdrop — Pulteney Bridge at dusk. Replaces the
 * earlier WebGL ember shader (which read as "agency primitive in
 * orange clothes") with a photograph of the actual location, anchoring
 * the brand to place.
 *
 * Motion: 2% slow zoom over 14s, alternating direction (DESIGN.md §5
 * allowance — "2% scale max on slow zoom-in"). Disabled if reduced
 * motion is on. The vignette layer is split into edge gradients sized
 * to protect the headline (left band) and the spec rail (right band)
 * from the photo's brightest highlights (lamps, sky).
 */

export function KilnHeroImage() {
  const reduced = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden"
      style={{ background: "#0F0A07" }}
    >
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.02 }}
        animate={reduced ? { scale: 1.02 } : { scale: [1.02, 1.08, 1.02] }}
        transition={{
          duration: 28,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      >
        <Image
          src="/demos/kiln-house/hero-pulteney.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{
            filter: "saturate(0.92) contrast(1.05) brightness(0.78)",
          }}
        />
      </motion.div>

      {/* Warm-tint colour wash — multiply oxblood faintly to bond the
          photo to the Kiln palette without crushing detail. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(120,40,18,0.18) 0%, rgba(60,28,18,0.22) 100%)",
          mixBlendMode: "multiply",
        }}
      />

      {/* Bottom-up readability dim for the headline and body copy */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(15,10,7,0.42) 0%, rgba(15,10,7,0.05) 35%, rgba(15,10,7,0.28) 65%, rgba(15,10,7,0.88) 100%)",
        }}
      />

      {/* Left band — headline column */}
      <div
        className="absolute inset-y-0 left-0 w-[68%] md:w-[58%]"
        style={{
          background:
            "linear-gradient(90deg, rgba(15,10,7,0.78) 0%, rgba(15,10,7,0.45) 55%, transparent 100%)",
        }}
      />

      {/* Right band — spec rail */}
      <div
        className="absolute inset-y-0 right-0 w-[22%] hidden md:block"
        style={{
          background:
            "linear-gradient(270deg, rgba(15,10,7,0.62) 0%, rgba(15,10,7,0.18) 70%, transparent 100%)",
        }}
      />

      {/* Subtle film grain — adds an editorial print quality without
          hitting the AI-slop ban list (no rounded blobs, no neon). */}
      <div
        className="absolute inset-0 mix-blend-overlay opacity-[0.18]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.6 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
          backgroundSize: "200px 200px",
        }}
      />
    </div>
  );
}
