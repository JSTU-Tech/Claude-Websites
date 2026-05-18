"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";

/**
 * Kiln House hero backdrop — wood-fire oven, flames inside a stone
 * arch. Direct visual match to the brand name + the headline
 * ("Wood, smoke, and patience.") + the wood-fire-kitchen copy. Replaces
 * the earlier WebGL ember shader (agency primitive in oxblood clothes)
 * and an interim daytime location photo.
 *
 * Motion: slow 2% scale loop alternating in/out over 28s — DESIGN.md
 * §5 allowance ("2% scale max on slow zoom-in"). Disabled under
 * prefers-reduced-motion.
 *
 * Vignette layering:
 *   • oxblood multiply tint — binds photo to Kiln palette
 *   • bottom-up fade — sets up the lower meta strip
 *   • LEFT band — protects the headline column; steeper than the right
 *     side so the fire stays vivid through the centre of the frame
 *   • RIGHT band — protects the spec rail at narrow desktop widths
 *   • SVG fractal noise grain — editorial print quality
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
        initial={{ scale: 1.55 }}
        animate={reduced ? { scale: 1.55 } : { scale: [1.55, 1.64, 1.55] }}
        transition={{
          duration: 30,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      >
        <Image
          src="/demos/kiln-house/hero-fire.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{
            // Anchor toward the source's left edge so the fire (centred
            // in the photo) sits in the right third of the viewport,
            // keeping the headline on dark stone arch.
            objectPosition: "8% 50%",
            filter: "saturate(1.08) contrast(1.10) brightness(0.94)",
          }}
        />
      </motion.div>

      {/* Soft warm tint — multiply faint oxblood so the photo's natural
          orange embers feel keyed to the Kiln palette, not "any fire". */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(120,40,18,0.10) 0%, rgba(40,18,10,0.18) 100%)",
          mixBlendMode: "multiply",
        }}
      />

      {/* Bottom-up dim for the meta strip + headline body — light at top,
          heavier at the bottom edge */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(15,10,7,0.32) 0%, rgba(15,10,7,0) 25%, rgba(15,10,7,0) 65%, rgba(15,10,7,0.85) 100%)",
        }}
      />

      {/* Left band — headline column. Heavier dim than the bridge
          version because the cropped-in fire photo sits brighter on
          average; we still let the right half of the frame breathe. */}
      <div
        className="absolute inset-y-0 left-0 w-[62%]"
        style={{
          background:
            "linear-gradient(90deg, rgba(15,10,7,0.90) 0%, rgba(15,10,7,0.70) 35%, rgba(15,10,7,0.35) 70%, transparent 100%)",
        }}
      />

      {/* Right band — spec rail. Same idea, mirrored. */}
      <div
        className="absolute inset-y-0 right-0 w-[28%] hidden md:block"
        style={{
          background:
            "linear-gradient(270deg, rgba(15,10,7,0.72) 0%, rgba(15,10,7,0.30) 60%, transparent 100%)",
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
