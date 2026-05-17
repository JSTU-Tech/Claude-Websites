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
        "Available Q3, 2026",
        "Built in Bath, UK",
        "Taking three clients per quarter",
        "Plain English, no retainers",
      ]}
      separator="✦"
      durationSec={42}
    />
  );
}
