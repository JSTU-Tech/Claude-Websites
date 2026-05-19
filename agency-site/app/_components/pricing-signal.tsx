import { FoldMark } from "@/components/motion/fold-mark";
import {
  RevealSection,
  RevealItem,
} from "@/components/motion/reveal-section";

/**
 * Investment signal — sells the system, not a price tag. Per
 * BUSINESS.md §6, public copy does NOT publish specific numbers or
 * specific delivery durations. The wedge is process, faster than an
 * agency, lower than an agency, quoted privately after the audit.
 *
 * Anchors three short statements (process / cost / care) without
 * naming a single £, $, day, or week.
 */

export function PricingSignal() {
  return (
    <section
      aria-labelledby="pricing-heading"
      className="bg-bg-deep/60 border-y border-rule"
    >
      <div className="px-6 md:px-10 py-24 md:py-32">
        <FoldMark index="06" label="Investment" />

        <RevealSection
          className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-12 gap-y-10 md:gap-x-10 items-end"
          amount={0.25}
        >
          <RevealItem
            as="h2"
            id="pricing-heading"
            className="md:col-span-8 font-display font-normal leading-[0.98] tracking-[-0.02em]"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
          >
            <span className="block text-ink">A modern process,</span>
            <span className="block text-accent">quoted per project.</span>
            <span className="block text-ink/90">No agency markup.</span>
          </RevealItem>

          <RevealItem
            as="div"
            className="md:col-span-4 flex flex-col gap-5 md:pb-3 max-w-[42ch]"
          >
            <p
              className="text-ink/90"
              style={{ fontSize: "var(--text-body-lg)", lineHeight: 1.55 }}
            >
              Founder-led from audit to launch. One fixed price for the build,
              sent in writing after the audit and discovery. Faster than a
              typical agency timeline — weeks of focused work, not a months-long
              account cycle.
            </p>
            <p className="text-[0.8125rem] text-muted leading-snug">
              Optional monthly care plan after launch — only if you want me on
              hand for ongoing tweaks. Cancel any time, never bundled into the
              build.
            </p>
          </RevealItem>
        </RevealSection>
      </div>
    </section>
  );
}
