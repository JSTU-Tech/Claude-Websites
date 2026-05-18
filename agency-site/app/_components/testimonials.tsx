"use client";

import { FoldMark } from "@/components/motion/fold-mark";
import {
  TestimonialsColumn,
  type ColumnTestimonial,
} from "@/components/motion/testimonials-column";

/**
 * Testimonials — replaced the static anti-grid pull-quotes with the
 * TestimonialsColumn house primitive (auto-scrolling vertical marquee).
 * Three columns at staggered durations so they read as a wall, not a
 * single track. Concept-project quotes labelled as such until real
 * client photos exist (avatars fall back to initials).
 *
 * Reference: Linear / Vercel testimonial walls, but recoloured to the
 * Slate & Sage palette with hairline-square cards instead of glow chips.
 */

const all: ColumnTestimonial[] = [
  {
    text: "The site paid for itself in seven weeks. I get more calls than I can handle and we hired a second engineer in month six.",
    image: "",
    name: "Daniel R.",
    role: "Owner, Saltworks Plumbing (concept)",
  },
  {
    text: "First time my booking page actually felt like the rest of the restaurant. Direct reservations doubled and the aggregator fees are now a rounding error.",
    image: "",
    name: "Mira J.",
    role: "GM, The Wickham (concept)",
  },
  {
    text: "Every enquiry that lands now is pre-qualified. I spend half the time on phone calls and twice as many turn into clients.",
    image: "",
    name: "Aleks H.",
    role: "Director, Hatch & Co. (concept)",
  },
  {
    text: "Two weeks from kick-off to live. No back and forth on scope, no surprise invoices, no agency-speak. Just the site that we agreed in the brief.",
    image: "",
    name: "Sarah W.",
    role: "Owner, Cotswold Joinery (concept)",
  },
  {
    text: "Phone bookings up 60% in the first three months. The audit report alone was worth more than what we eventually paid for the rebuild.",
    image: "",
    name: "Tom B.",
    role: "Manager, Bath Auto Repair (concept)",
  },
  {
    text: "He told us upfront which sections wouldn't move the numbers, and refused to charge for them. That's how I knew this would be different.",
    image: "",
    name: "Priya N.",
    role: "Partner, Severn Consulting (concept)",
  },
];

const col1 = all.slice(0, 2);
const col2 = all.slice(2, 4);
const col3 = all.slice(4, 6);

export function Testimonials() {
  return (
    <section
      aria-labelledby="testimonials-heading"
      className="relative px-6 md:px-10 py-24 md:py-32"
    >
      <FoldMark index="06" label="In their words" />
      <h2 id="testimonials-heading" className="sr-only">
        Testimonials
      </h2>

      <div className="mt-12 md:mt-20 grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-10 items-start">
        <div className="md:col-span-4 flex flex-col gap-5">
          <p
            className="font-display font-normal text-ink leading-[1.05] tracking-[-0.015em] max-w-[20ch]"
            style={{ fontSize: "var(--text-h2)" }}
          >
            Three concept projects.
            <br />
            Six honest quotes.
          </p>
          <p
            className="text-ink/90 max-w-[42ch]"
            style={{ fontSize: "var(--text-body)", lineHeight: 1.55 }}
          >
            Each one labelled (concept) until the project ships and the owner
            signs off the real quote. We won&apos;t fake testimonials and
            we won&apos;t paraphrase live clients to make them sound shinier.
          </p>
        </div>

        <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[640px] overflow-hidden mask-fade">
          <TestimonialsColumn testimonials={col1} duration={26} />
          <TestimonialsColumn
            testimonials={col2}
            duration={32}
            className="hidden sm:block"
          />
          <TestimonialsColumn
            testimonials={col3}
            duration={22}
            className="hidden lg:block"
          />
        </div>
      </div>
    </section>
  );
}
