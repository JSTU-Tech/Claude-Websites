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
        "Now booking for autumn 2026",
        "Built in Bath",
        "Three projects at a time, no more",
        "Plain English, no retainers",
        "Fixed-price, fixed-scope",
      ]}
      separator="✦"
      durationSec={42}
    />
  );
}
