import Link from "next/link";
import { FoldMark } from "@/components/motion/fold-mark";
import {
  RevealSection,
  RevealItem,
} from "@/components/motion/reveal-section";
import { studio } from "@/lib/studio";

/**
 * About the founder — single asymmetric block. Portrait placeholder
 * sits left, founder voice + name + LinkedIn sits right. The
 * placeholder is honest about being one (per §11 definition of done).
 * Photo box uses paper tone to differentiate from page bg.
 */

export function AboutFounder() {
  return (
    <section
      aria-labelledby="about-heading"
      className="px-6 md:px-10 py-24 md:py-32"
    >
      <FoldMark index="07" label="About" />

      <RevealSection
        className="mt-12 md:mt-20 grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-12 items-end"
        amount={0.2}
      >
        {/* Portrait placeholder */}
        <RevealItem className="md:col-span-4 lg:col-span-3">
          <div
            className="relative aspect-[4/5] bg-paper border border-rule overflow-hidden"
            role="img"
            aria-label="Founder portrait placeholder"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className="font-display font-normal text-ink/35 leading-none tracking-[-0.02em]"
                style={{ fontSize: "clamp(4rem, 9vw, 8rem)" }}
              >
                JS
              </span>
            </div>
            <span className="absolute bottom-3 left-3 text-[0.6875rem] tracking-[0.08em] uppercase text-ink/40">
              Portrait placeholder — to be shot
            </span>
          </div>
        </RevealItem>

        {/* Voice column */}
        <RevealItem className="md:col-span-7 md:col-start-6 lg:col-span-8 lg:col-start-5 flex flex-col gap-8">
          <h2
            id="about-heading"
            className="font-display font-normal leading-[1.05] tracking-[-0.015em] max-w-[20ch]"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
          >
            One founder. One studio. No middle layer.
          </h2>

          <div
            className="flex flex-col gap-5 text-ink/90 max-w-[58ch]"
            style={{ fontSize: "var(--text-body-lg)", lineHeight: 1.55 }}
          >
            <p>
              I&apos;m {studio.founderName}. I started this studio because
              traditional agencies are expensive, slow, and put a project
              manager between the client and the work. The tools and the AI
              have changed. The pricing model and the timelines haven&apos;t
              caught up. I think they should.
            </p>
            <p>
              I don&apos;t do logos, ads, or social. I build the one website
              your business deserves — audited, quoted, built, launched — with
              my own hands, end to end. Faster than an agency, founder-led
              from the first email to the last commit.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-2">
            <Link
              href={studio.founderLinkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-[0.9375rem]"
            >
              LinkedIn
            </Link>
            <span aria-hidden="true" className="h-3 w-px bg-rule" />
            <Link
              href="mailto:hello@stuckey.studio"
              className="link-underline text-[0.9375rem]"
            >
              hello@stuckey.studio
            </Link>
            <span aria-hidden="true" className="h-3 w-px bg-rule" />
            <span className="text-[0.8125rem] text-muted">Based in Bath, UK</span>
          </div>
        </RevealItem>
      </RevealSection>
    </section>
  );
}
