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
      "By month nine, £284k of new bookings were attributable to the site through Cal.com confirmations. The site cost £8,400 to build. Payback was seven weeks.",
    ],
    quote: {
      body: "The site paid for itself in seven weeks. I get more calls than I can handle and we hired a second engineer in month six.",
      name: "Daniel R.",
      role: "Owner, Saltworks Plumbing",
    },
    nextSlug: "wickham",
  },
  {
    slug: "wickham",
    client: "The Wickham",
    vertical: "hospitality",
    verticalLabel: "Hospitality",
    year: "2026",
    status: "concept",
    title: "A booking page that finally looks like the restaurant.",
    outcome: {
      value: "+38%",
      caption: "direct reservations in 90 days",
    },
    problem: [
      "The Wickham is a 32-cover restaurant with a serious wine list and a Sunday lunch waiting list. Their booking page looked like a 2014 OpenTable form glued onto a WordPress theme. Half of bookings were going through aggregators that took 18%.",
      "The GM wanted to claw back direct bookings without burning the agency-managed Sunday-lunch traffic the aggregators provided.",
    ],
    approach: [
      "Built a single-page reservation flow that opened with the room (one full-bleed photo, shot by the chef on his phone, colour-graded warm) and put the booking widget over it. Removed every form field except party size, date, and a single optional note.",
      "Embedded Resy as the booking engine but skinned it so it visually inherited the page's typography and palette — guests don't bounce to a third-party site mid-flow.",
    ],
    result: [
      "Direct bookings lifted 38% in the first 90 days. Aggregator share dropped from 51% to 34%. Average party size on direct bookings ran 0.4 covers higher than aggregator bookings — fewer fees, bigger tables.",
      "Build took 28 days from kick-off to live. The site itself paid for itself in fee savings within four months.",
    ],
    quote: {
      body: "First time my booking page actually felt like the rest of the restaurant. Direct reservations doubled and the aggregator fees are now a rounding error.",
      name: "Mira J.",
      role: "GM, The Wickham",
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
    title: "Every enquiry that lands is pre-qualified.",
    outcome: {
      value: "4×",
      caption: "qualified enquiries, half the call time",
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
      "Conversion rate from qualified enquiry to retained client: 61%. From total enquiry: also 61% — because the unqualified ones don't make it through the form.",
    ],
    quote: {
      body: "Every enquiry that lands now is pre-qualified. I spend half the time on phone calls and twice as many of them turn into clients.",
      name: "Aleks H.",
      role: "Director, Hatch & Co.",
    },
    nextSlug: "saltworks",
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}
