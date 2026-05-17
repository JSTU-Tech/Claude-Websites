import { FoldMark } from "@/components/motion/fold-mark";
import {
  RevealSection,
  RevealItem,
} from "@/components/motion/reveal-section";

/**
 * Pricing signal — out-converts any testimonial (DESIGN.md §6 #7). The
 * range is the editorial moment; the qualifier-line is type, not bullets.
 * One inverted band on --bg-deep to set it apart from the surrounding
 * sections without burning the dark takeover (kept for case study only).
 */

export function PricingSignal() {
  return (
    <section
      aria-labelledby="pricing-heading"
      className="bg-bg-deep/60 border-y border-rule"
    >
      <div className="px-6 md:px-10 py-24 md:py-32">
        <FoldMark index="05" label="Investment" />

        <RevealSection
          className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-12 gap-y-10 md:gap-x-10 items-end"
          amount={0.25}
        >
          <RevealItem
            as="h2"
            className="md:col-span-8 font-display italic font-extralight leading-[0.98] tracking-[-0.02em]"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
          >
            <span className="block text-ink">Projects from</span>
            <span className="block text-accent">£4,800.</span>
            <span className="block text-ink/90">
              Most clients invest{" "}
              <span className="whitespace-nowrap">£6k&nbsp;–&nbsp;£12k</span>.
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
              One quote, fixed for the project. Copy, design, build, Cal.com
              booking, on-page SEO, analytics and a 90-day performance
              guarantee are all in.
            </p>
            <p className="text-[0.8125rem] text-muted leading-snug">
              No retainers. No charge for the audit. No bolt-on invoices once
              the work begins.
            </p>
          </RevealItem>
        </RevealSection>
      </div>
    </section>
  );
}
