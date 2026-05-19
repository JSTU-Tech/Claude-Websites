import { KineticStrip } from "@/components/motion/kinetic-strip";

/**
 * Kinetic type strip — runs between the proof bar and the featured case
 * study. Repeats a short studio statement plus availability signal, paced
 * by scroll velocity. The accent-coloured separator is the section's
 * single flourish.
 *
 * Reference: Basement Studio's statement strip; Pentagram print colophons.
 */

export function KineticSection() {
  return (
    <KineticStrip
      items={[
        "Audit. Discover. Quote. Build. Launch.",
        "Founder-led from start to finish",
        "Faster than an agency",
        "Fixed-price, no surprises",
        "Built in Bath, UK",
      ]}
      separator="✦"
      durationSec={42}
    />
  );
}
