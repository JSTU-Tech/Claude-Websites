import { FoldMark } from "@/components/motion/fold-mark";
import {
  RevealSection,
  RevealItem,
} from "@/components/motion/reveal-section";

/**
 * Process — four numbered steps, vertical track with a hairline spine.
 * Numbers set in big Boska italic. Each step reveals on scroll with
 * stagger. Reference: Pentagram process diagrams, Locomotive process pages.
 */

const steps = [
  {
    n: "01",
    title: "Free Loom audit",
    body: "Send me your URL. You get a 10-minute Loom walkthrough of what's costing you customers — copy, layout, mobile, speed, conversion. No call required, no obligation, no charge.",
  },
  {
    n: "02",
    title: "Build",
    body: "Seven to 21 days depending on tier — 1-page Starter, 3–5-page Standard, or 6–8-page Premium. Fixed price quoted up front, no surprises, weekly progress shares.",
  },
  {
    n: "03",
    title: "Launch",
    body: "I handle the technical bit — domain, hosting, Google Business Profile, analytics. You approve, I press go. Live the day we agreed.",
  },
  {
    n: "04",
    title: "Care plan",
    body: "Optional ongoing — hosting, backups, monitoring from £63/month. Bigger tiers add content edits and dev time. Cancel any time, never bundled into the build.",
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
          Four steps. Live in two weeks. Fixed price up front.
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
