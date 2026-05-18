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
        "5-figure design quality",
        "4-figure price",
        "2-week delivery",
        "Sites from £1,200",
        "Live in 14 days",
        "Built in Bath, UK",
      ]}
      separator="✦"
      durationSec={42}
    />
  );
}
