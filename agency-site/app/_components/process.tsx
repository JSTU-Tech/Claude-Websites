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
    title: "Audit",
    body: "I dig into your current site and pull the data on what's broken. One week, fixed price. You get a one-page report whether you hire me or not.",
  },
  {
    n: "02",
    title: "Brief",
    body: "We agree what the site needs to do and write it down on one page of plain English. No deliverables list, no Gantt chart, no scope-creep clause.",
  },
  {
    n: "03",
    title: "Build",
    body: "Design, copy, build, ship. Two to four weeks depending on size. You see progress weekly, not at the end. Changes are free until launch day.",
  },
  {
    n: "04",
    title: "Track",
    body: "Once it's live, I measure. If the numbers don't move in 90 days, I rebuild the section that's underperforming on me, not you.",
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
          className="md:col-span-4 font-display italic font-extralight text-ink/90 leading-[1.1] tracking-[-0.01em]"
          style={{ fontSize: "var(--text-h2)" }}
        >
          Four steps. No surprises. Fixed prices.
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
                  className="font-display italic font-extralight text-accent leading-none tabular-nums self-start"
                  style={{ fontSize: "clamp(2.5rem, 4vw, 3.5rem)" }}
                >
                  {step.n}
                </span>
                <div className="flex flex-col gap-3 self-center">
                  <h3
                    className="font-display italic font-extralight leading-[1.05] tracking-[-0.01em]"
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
