import { FoldMark } from "@/components/motion/fold-mark";
import {
  RevealSection,
  RevealItem,
} from "@/components/motion/reveal-section";

/**
 * Process — five numbered steps + one optional sixth. Vertical track
 * with a hairline spine. Numbers set in big Boska italic. Each step
 * reveals on scroll with stagger. Reference: Pentagram process
 * diagrams, Locomotive process pages.
 *
 * The system is the wedge (BUSINESS.md §2/§3) — no specific prices
 * or specific day counts appear in the public copy.
 */

const steps = [
  {
    n: "01",
    title: "Audit",
    body: "Send me your URL. You get a short Loom walkthrough of what's costing you customers — copy, layout, mobile, speed, conversion. No call required, no obligation, no charge.",
  },
  {
    n: "02",
    title: "Discovery",
    body: "We agree on what you actually need: pages, content, images, brand inputs. The scope is locked here so the price doesn't move later.",
  },
  {
    n: "03",
    title: "Quote",
    body: "I send a fixed price in writing — one number, all-inclusive. You either say yes or you don't. No haggling, no monthly invoices unless you choose the care plan.",
  },
  {
    n: "04",
    title: "Build",
    body: "Design and develop the site, direct working relationship with me throughout. Weekly progress shares, one round of revisions baked in. Fast turnaround — weeks, not months.",
  },
  {
    n: "05",
    title: "Launch",
    body: "Site goes live on your domain. You own it outright — no lock-in, no platform handcuffs. I handle the technical bit: domain, hosting, Google Business Profile, analytics.",
  },
  {
    n: "06",
    title: "Care plan — optional",
    body: "After launch, choose a monthly retainer if you want me on hand for content edits, copy tweaks, or small additions when your business changes. Cancel any time, never bundled into the build.",
  },
];

export function Process() {
  return (
    <section
      aria-labelledby="process-heading"
      className="px-6 md:px-10 py-24 md:py-32"
    >
      <FoldMark index="04" label="Process" />

      <h2 id="process-heading" className="sr-only">
        Process
      </h2>

      <RevealSection
        className="mt-12 md:mt-16 relative grid grid-cols-1 md:grid-cols-12 gap-x-10"
        amount={0.15}
      >
        {/* Intro */}
        <RevealItem
          as="p"
          className="md:col-span-4 font-display font-normal text-ink/90 leading-[1.1] tracking-[-0.01em]"
          style={{ fontSize: "var(--text-h2)" }}
        >
          A clear path from your current site to one that works. The system is the wedge.
        </RevealItem>

        {/* Steps track */}
        <RevealItem className="md:col-span-7 md:col-start-6 relative">
          <ol className="flex flex-col">
            {steps.map((step, i) => (
              <RevealItem
                as="li"
                key={step.n}
                className="grid grid-cols-[auto_1fr] gap-x-6 md:gap-x-10 py-8 md:py-10 border-t border-rule first:border-t-0"
              >
                <span
                  className="font-display font-normal text-accent leading-none tabular-nums self-start"
                  style={{ fontSize: "clamp(2.5rem, 4vw, 3.5rem)" }}
                >
                  {step.n}
                </span>
                <div className="flex flex-col gap-3 self-center">
                  <h3
                    className="font-display font-normal leading-[1.05] tracking-[-0.01em]"
                    style={{ fontSize: "var(--text-h3)" }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="text-ink/90 max-w-[52ch]"
                    style={{ fontSize: "var(--text-body)", lineHeight: 1.55 }}
                  >
                    {step.body}
                  </p>
                </div>
                {/* visual ignored — i, used for stagger via parent variants */}
                {i === -1 ? null : null}
              </RevealItem>
            ))}
          </ol>
        </RevealItem>
      </RevealSection>
    </section>
  );
}
