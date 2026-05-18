import { FoldMark } from "@/components/motion/fold-mark";
import {
  RevealSection,
  RevealItem,
} from "@/components/motion/reveal-section";

/**
 * Testimonials — pull-quote style, anti-grid. Three quotes from the
 * concept projects. Editorial set quotation mark in oxblood as the
 * single accent. Labelled clearly as concept-project quotes until real
 * client quotes exist.
 *
 * Reference: editorial pull-quotes in print magazines; Pentagram client
 * testimonial spreads.
 */

const quotes = [
  {
    body: "The site paid for itself in seven weeks. I get more calls than I can handle.",
    name: "Daniel R.",
    role: "Owner, Saltworks Plumbing (concept)",
    span: "md:col-span-7",
    offset: "md:col-start-1",
    align: "left" as const,
  },
  {
    body: "First time my booking page actually felt like the rest of the restaurant. Direct reservations doubled.",
    name: "Mira J.",
    role: "GM, The Wickham (concept)",
    span: "md:col-span-6",
    offset: "md:col-start-7",
    align: "right" as const,
  },
  {
    body: "Every enquiry that lands now is pre-qualified. I spend half the time on phone calls.",
    name: "Aleks H.",
    role: "Director, Hatch & Co. (concept)",
    span: "md:col-span-8",
    offset: "md:col-start-3",
    align: "left" as const,
  },
];

export function Testimonials() {
  return (
    <section
      aria-labelledby="testimonials-heading"
      className="px-6 md:px-10 py-24 md:py-32"
    >
      <FoldMark index="06" label="In their words" />

      <h2 id="testimonials-heading" className="sr-only">
        Testimonials
      </h2>

      <RevealSection
        className="mt-12 md:mt-20 grid grid-cols-1 md:grid-cols-12 gap-y-16 md:gap-y-24"
        amount={0.1}
      >
        {quotes.map((q, i) => (
          <RevealItem
            key={i}
            className={[
              "flex flex-col gap-5",
              q.span,
              q.offset,
              q.align === "right" ? "md:text-right" : "",
            ].join(" ")}
          >
            <span
              aria-hidden="true"
              className="font-display text-accent leading-none select-none"
              style={{ fontSize: "clamp(3rem, 6vw, 5rem)" }}
            >
              &ldquo;
            </span>
            <p
              className="font-display font-normal text-ink leading-[1.1] tracking-[-0.015em] -mt-6"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
            >
              {q.body}
            </p>
            <div
              className={[
                "flex flex-col gap-1 mt-2",
                q.align === "right" ? "md:items-end" : "",
              ].join(" ")}
            >
              <span className="text-[0.875rem] text-ink/90">{q.name}</span>
              <span className="eyebrow">{q.role}</span>
            </div>
          </RevealItem>
        ))}
      </RevealSection>
    </section>
  );
}
