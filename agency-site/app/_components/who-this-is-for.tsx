import { FoldMark } from "@/components/motion/fold-mark";
import {
  RevealSection,
  RevealItem,
} from "@/components/motion/reveal-section";
import { VerticalIcon, type Vertical } from "@/components/motion/vertical-icon";

/**
 * Who this is for — three buyer verticals. Hand-drawn editorial single-line
 * marks anchor each card. Cards use a 2–4px Y shift + border tone change on
 * hover (per §5), never scale. The accent flourish is the FoldMark glyph at
 * the section head — cards stay ink-on-bone.
 *
 * Reference: Tomorrow Studio's "Who we serve" anti-grid; Pentagram print
 * specimen spreads.
 */

type Card = {
  variant: Vertical;
  trade: string;
  outcome: string;
  example: string;
};

const cards: Card[] = [
  {
    variant: "trades",
    trade: "Trades & home services",
    outcome:
      "Plumbers, electricians, roofers, builders. A site that books the call before they reach a competitor.",
    example: "Saltworks Plumbing — 60% more booked jobs in 90 days.",
  },
  {
    variant: "hospitality",
    trade: "Hospitality",
    outcome:
      "Restaurants, hotels, venues. A site that turns a Google Maps tap into a confirmed reservation.",
    example: "The Wickham — 38% lift in direct bookings, 28-day build.",
  },
  {
    variant: "professional",
    trade: "Professional services",
    outcome:
      "Accountants, consultants, solicitors, surveyors. A site that pre-qualifies the lead before the first call.",
    example: "Hatch & Co. — 4× qualified enquiries, all measurable.",
  },
];

export function WhoThisIsFor() {
  return (
    <section
      aria-labelledby="who-heading"
      className="px-6 md:px-10 py-24 md:py-32"
    >
      <FoldMark index="03" label="Who this is for" />

      <RevealSection
        className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-px bg-rule border border-rule"
        amount={0.15}
      >
        {cards.map((card) => (
          <RevealItem
            key={card.variant}
            className="group relative bg-bg p-8 md:p-10 flex flex-col gap-8 transition-[transform,border-color,background-color] duration-300 ease-[var(--ease-quart)] hover:bg-paper hover:-translate-y-[3px]"
          >
            <VerticalIcon
              variant={card.variant}
              className="text-ink h-16 w-16"
            />
            <div className="flex-1 flex flex-col gap-4">
              <h3
                className="font-display italic font-extralight leading-[1.1] tracking-[-0.01em]"
                style={{ fontSize: "var(--text-h3)" }}
              >
                {card.trade}
              </h3>
              <p
                className="text-ink/90"
                style={{ fontSize: "var(--text-body)", lineHeight: 1.55 }}
              >
                {card.outcome}
              </p>
            </div>
            <p className="text-[0.8125rem] text-muted leading-snug border-t border-rule pt-5">
              <span className="eyebrow inline-block mb-1.5">Example</span>
              <br />
              <span className="text-ink/90">{card.example}</span>
            </p>

            <span
              aria-hidden="true"
              className="absolute right-8 top-8 inline-block text-[0.75rem] tracking-[0.08em] uppercase text-muted opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            >
              0{cards.findIndex((c) => c.variant === card.variant) + 1} / 03
            </span>
          </RevealItem>
        ))}
      </RevealSection>
    </section>
  );
}
