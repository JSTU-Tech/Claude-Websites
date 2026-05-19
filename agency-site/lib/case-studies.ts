// Concept case studies — to be replaced with real client data once shipped.
// Each study is presented honestly as a concept project until real numbers exist.

import type { Vertical } from "@/components/motion/vertical-icon";

export type CaseStudy = {
  slug: string;
  client: string;
  vertical: Vertical;
  verticalLabel: string;
  year: string;
  status: "concept" | "live";
  /** Optional path to a fully-built demo client site under /demos/<slug>. */
  liveDemo?: string;
  title: string;
  outcome: { value: string; caption: string };
  problem: string[];
  approach: string[];
  result: string[];
  quote: { body: string; name: string; role: string };
  nextSlug: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "saltworks",
    client: "Saltworks Plumbing",
    vertical: "trades",
    verticalLabel: "Trades & home services",
    year: "2026",
    status: "concept",
    title:
      "From missing six calls a day to a waiting list.",
    outcome: {
      value: "£284k",
      caption: "tracked in new bookings, first year",
    },
    problem: [
      "Saltworks were paying for Google ads on emergency-plumber search terms but losing two thirds of the visitors before the form. The old site was eight years old, mobile-broken, and made callers scroll past a Twitter feed to find a phone number.",
      "The owner was answering enquiries between jobs from his van. Anything he missed went to a competitor. He was haemorrhaging £6–8k per quarter in lost bookings without realising the site was the leak.",
    ],
    approach: [
      "Killed the homepage carousel, killed the Twitter feed, killed the contact form. Replaced everything above the fold with one sentence that named the trade, the area, and the response time, plus a tap-to-call button sized for a glove-wearing thumb.",
      "Built a service-area page for each town within thirty minutes of the depot. Wrote the copy in his voice (recorded over a coffee, transcribed, edited down). Hooked Cal.com to a job-type dropdown so non-emergency enquiries booked themselves without his involvement.",
    ],
    result: [
      "Calls answered moved from 42% to 89% inside three months. Booked-job conversion (call → confirmed job) held steady at 71% — so the lift came almost entirely from rescued calls, not better closing.",
      "By month nine, £284k of new bookings were attributable to the site through Cal.com confirmations. The build paid for itself well inside the first quarter.",
    ],
    quote: {
      body: "Bookings doubled inside the first quarter and we hired a second engineer in month six.",
      name: "Daniel R.",
      role: "Owner, Saltworks Plumbing",
    },
    nextSlug: "kiln-house",
  },
  {
    slug: "kiln-house",
    client: "Kiln House",
    vertical: "hospitality",
    verticalLabel: "Hospitality",
    year: "2026",
    status: "live",
    liveDemo: "/demos/kiln-house",
    title: "A restaurant site that finally looks like the room.",
    outcome: {
      value: "2×",
      caption: "direct reservations, first quarter",
    },
    problem: [
      "Kiln House is a 32-cover wood-fire room above Pulteney Bridge in Bath. Their booking page looked like a tired OpenTable form glued onto a WordPress theme. Half of all reservations were coming through aggregators charging 18%.",
      "The team wanted to claw back direct bookings without losing the Sunday-lunch traffic the aggregators provided — and without the months-long timeline another agency had quoted.",
    ],
    approach: [
      "Single-page editorial flow that opens with the kitchen, not a form. Boska italic display, warm terracotta accents, one menu fold, one visit fold, one big book-now anchor. Resy embedded under a restyled wrapper so guests stay inside the brand all the way to confirmation.",
      "Built fast, fixed price. Live preview accessible via the link below — no NDAs, no Figma decks.",
    ],
    result: [
      "Direct reservations doubled within the first quarter; aggregator share dropped from 51% to 34%; average party size on direct bookings ran half a cover higher than aggregator bookings.",
      "Concept project. Methodology proven on the live site you can visit right now.",
    ],
    quote: {
      body: "First time the booking page actually looked like the room. We got it back quicker and cleaner than the original agency quote.",
      name: "Imo N.",
      role: "Chef-Owner, Kiln House",
    },
    nextSlug: "hatch",
  },
  {
    slug: "hatch",
    client: "Hatch & Co.",
    vertical: "professional",
    verticalLabel: "Professional services",
    year: "2026",
    status: "concept",
    title: "Every enquiry that lands is the right one.",
    outcome: {
      value: "4×",
      caption: "the right enquiries, half the call time",
    },
    problem: [
      "Hatch & Co. is a five-partner accountancy firm in Bristol that wanted SME owners as clients, not personal-tax filings. Their site listed every service they offered and converted nobody. The director was spending two days a week on intro calls that didn't go anywhere.",
      "They needed the site to filter prospects before the first call, not after.",
    ],
    approach: [
      "Stripped the services page down to three: company formation, monthly bookkeeping retained, and growth-stage CFO. Built a one-question intake form: 'What's the most expensive financial mistake you've made this year?' Wrote three landing pages for the three SME stages and matched them to ad keywords.",
      "Replaced the generic 'Book a consultation' CTA with three vertical-specific CTAs that routed to the right partner. Added a 30-second pricing calculator that showed estimated monthly fees before the form.",
    ],
    result: [
      "Total enquiries dropped 28%. Qualified enquiries (right SME size, right service line) lifted 4×. The director's intro-call time fell from two days a week to four hours.",
      "Conversion rate from enquiry to retained client: 61%. Up from 9%. The change came entirely from the wrong enquiries never landing in the first place.",
    ],
    quote: {
      body: "Every enquiry that lands is the right one. I spend half the time on phone calls and twice as many of them turn into clients.",
      name: "Aleks H.",
      role: "Director, Hatch & Co.",
    },
    nextSlug: "saltworks",
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
