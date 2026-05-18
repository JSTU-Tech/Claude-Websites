import { ShaderHero } from "@/components/motion/shader-hero";
import { studio } from "@/lib/studio";

/**
 * House-primitive showcase band — sits between proof bar and kinetic
 * strip. Currently mounts the ShaderHero with a forest-green nebula
 * (WebGL). Swap to SplineScene when a real Spline scene URL exists; both
 * primitives are first-class house members per DESIGN.md §3a.
 *
 * The shader's IntersectionObserver pauses rendering when scrolled out of
 * view to spare battery + GPU.
 */

export function SplineShowcase() {
  return (
    <ShaderHero
      eyebrow="The work behind the work"
      headline={{
        line1: "Built by hand.",
        line2: "Measured in pounds.",
      }}
      subtitle="One studio, one founder, one ledger that says whether the site moved the number. If it didn't, it gets rebuilt — on me, not you."
      buttons={{
        primary: {
          text: "Book a call",
          href: studio.bookingUrl,
        },
        secondary: {
          text: "See the work",
          href: "/work",
        },
      }}
    />
  );
}
