import type { Metadata } from "next";
import { FoldMark } from "@/components/motion/fold-mark";
import {
  RevealSection,
  RevealItem,
} from "@/components/motion/reveal-section";
import { studio } from "@/lib/studio";
import { ContactCalEmbed } from "./_components/cal-embed";
import { ContactFormFallback } from "./_components/form-fallback";

export const metadata: Metadata = {
  title: "Book a call — Stuckey",
  description:
    "Twenty-minute call. No deck. We'll look at your site live and tell you whether the maths works for your business before you spend a pound.",
};

export default function ContactPage() {
  return (
    <div className="px-6 md:px-10 py-16 md:py-24">
      <FoldMark index="00" label="Book a call" />

      <RevealSection
        className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-12 gap-y-10 md:gap-x-10 items-end"
        amount={0.25}
      >
        <RevealItem
          as="h1"
          className="md:col-span-9 font-display font-normal leading-[0.98] tracking-[-0.02em] text-ink max-w-[22ch]"
          style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
        >
          Twenty minutes. No deck.
        </RevealItem>
        <RevealItem
          as="p"
          className="md:col-span-3 text-ink/90 max-w-[42ch]"
          style={{ fontSize: "var(--text-body-lg)", lineHeight: 1.55 }}
        >
          We&apos;ll look at your site live on the call. I&apos;ll tell you
          whether the maths works for your business before you spend a pound.
        </RevealItem>
      </RevealSection>

      <RevealSection
        className="mt-16 md:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-y-16 lg:gap-x-12"
        amount={0.1}
      >
        {/* Cal embed primary */}
        <RevealItem className="lg:col-span-8">
          <p className="eyebrow mb-5">Pick a time</p>
          <ContactCalEmbed />
        </RevealItem>

        {/* Side rail: form fallback + contact details */}
        <RevealItem className="lg:col-span-4 flex flex-col gap-10">
          <div>
            <p className="eyebrow mb-5">Prefer email?</p>
            <ContactFormFallback />
          </div>

          <div className="border-t border-rule pt-8 flex flex-col gap-2 text-[0.9375rem] text-ink/90">
            <p>
              <a
                href={`mailto:hello@stuckey.studio`}
                className="link-underline"
              >
                hello@stuckey.studio
              </a>
            </p>
            <p>
              <a
                href={studio.founderLinkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline"
              >
                LinkedIn — {studio.founderName}
              </a>
            </p>
            <p className="text-muted text-[0.875rem] mt-2">Based in Bath, UK</p>
          </div>
        </RevealItem>
      </RevealSection>
    </div>
  );
}
