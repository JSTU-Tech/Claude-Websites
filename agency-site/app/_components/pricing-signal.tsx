import { FoldMark } from "@/components/motion/fold-mark";
import {
  RevealSection,
  RevealItem,
} from "@/components/motion/reveal-section";

/**
 * Pricing signal — anchor + range + speed claim. Numbers locked in
 * BUSINESS.md §5. No guarantee language, no "pay-for-itself" lift —
 * the edge is speed and value, not ROI promises.
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
            className="md:col-span-8 font-display font-normal leading-[0.98] tracking-[-0.02em]"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
          >
            <span className="block text-ink">Sites from</span>
            <span className="block text-accent">£1,200.</span>
            <span className="block text-ink/90">
              Most projects{" "}
              <span className="whitespace-nowrap">£2,400&nbsp;–&nbsp;£4,000</span>.
            </span>
          </RevealItem>

          <RevealItem
            as="div"
            className="md:col-span-4 flex flex-col gap-5 md:pb-3 max-w-[40ch]"
          >
            <p
              className="text-ink/90"
              style={{ fontSize: "var(--text-body-lg)", lineHeight: 1.55 }}
            >
              Live in two weeks. Fixed price, fixed scope. One quote covers
              copy, design, build, domain, hosting and Google Business Profile
              setup.
            </p>
            <p className="text-[0.8125rem] text-muted leading-snug">
              Care plans from £63/month — hosting, backups, monitoring.
              Optional, not bundled.
            </p>
          </RevealItem>
        </RevealSection>
      </div>
    </section>
  );
}
