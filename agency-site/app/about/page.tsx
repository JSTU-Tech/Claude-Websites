import type { Metadata } from "next";
import { AboutFounder } from "../_components/about-founder";
import { Process } from "../_components/process";
import { PricingSignal } from "../_components/pricing-signal";
import { FinalCta } from "../_components/final-cta";
import { FoldMark } from "@/components/motion/fold-mark";
import {
  RevealSection,
  RevealItem,
} from "@/components/motion/reveal-section";

export const metadata: Metadata = {
  title: "About — Stuckey",
  description:
    "One founder. One studio. No middle layer. The process, the pricing, and the person behind the work.",
};

export default function AboutPage() {
  return (
    <>
      {/* Page header — sets up the about route specifically rather than reusing
          the home hero. */}
      <section className="px-6 md:px-10 py-16 md:py-24">
        <FoldMark index="00" label="About the studio" />
        <RevealSection
          className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-12 gap-y-10 md:gap-x-10 items-end"
          amount={0.25}
        >
          <RevealItem
            as="h1"
            className="md:col-span-9 font-display font-normal leading-[0.98] tracking-[-0.02em] text-ink max-w-[22ch]"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
          >
            The person, the process, the price.
          </RevealItem>
          <RevealItem
            as="p"
            className="md:col-span-3 text-ink/90 max-w-[42ch]"
            style={{ fontSize: "var(--text-body-lg)", lineHeight: 1.55 }}
          >
            Nothing on this page is hidden behind a discovery call. Read it
            here, decide before we speak.
          </RevealItem>
        </RevealSection>
      </section>

      <AboutFounder />
      <Process />
      <PricingSignal />
      <FinalCta />
    </>
  );
}
