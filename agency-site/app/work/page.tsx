import Link from "next/link";
import type { Metadata } from "next";
import { FoldMark } from "@/components/motion/fold-mark";
import {
  RevealSection,
  RevealItem,
} from "@/components/motion/reveal-section";
import { VerticalIcon } from "@/components/motion/vertical-icon";
import { caseStudies } from "@/lib/case-studies";

export const metadata: Metadata = {
  title: "Work — Stuckey",
  description:
    "Four projects across trades, hospitality and professional services. Real builds, real timelines, one live preview.",
};

export default function WorkPage() {
  return (
    <div className="px-6 md:px-10 py-16 md:py-24">
      <FoldMark index="01" label="Selected work" />

      <RevealSection
        className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-10 items-end"
        amount={0.2}
      >
        <RevealItem
          as="h1"
          className="md:col-span-9 font-display font-normal leading-[0.98] tracking-[-0.02em] text-ink"
          style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
        >
          Four projects.
          <br />
          One live preview.
        </RevealItem>
        <RevealItem
          as="p"
          className="md:col-span-3 text-ink/90 max-w-[42ch]"
          style={{ fontSize: "var(--text-body-lg)", lineHeight: 1.55 }}
        >
          Most studies sit alongside their case writeup. Kiln House is built
          and live — visit the actual site from the work page below.
        </RevealItem>
      </RevealSection>

      <RevealSection
        className="mt-20 md:mt-28 flex flex-col border-t border-rule"
        amount={0.1}
      >
        {caseStudies.map((study, i) => (
          <RevealItem
            key={study.slug}
            className="border-b border-rule"
          >
            <Link
              href={`/work/${study.slug}`}
              data-cursor="Read"
              className="group grid grid-cols-1 md:grid-cols-12 gap-y-6 md:gap-x-10 items-baseline py-10 md:py-14 transition-colors duration-300 ease-[var(--ease-quart)] hover:bg-paper -mx-6 md:-mx-10 px-6 md:px-10"
            >
              <span className="md:col-span-1 eyebrow tabular-nums self-center">
                0{i + 1}
              </span>

              <div className="md:col-span-2 flex items-center gap-4 self-center">
                <VerticalIcon
                  variant={study.vertical}
                  className="text-ink h-9 w-9"
                />
                <span className="eyebrow">{study.verticalLabel}</span>
              </div>

              <div className="md:col-span-6">
                <h2
                  className="font-display font-normal leading-[1.05] tracking-[-0.015em] text-ink max-w-[26ch]"
                  style={{ fontSize: "clamp(1.75rem, 3.25vw, 2.75rem)" }}
                >
                  {study.title}
                </h2>
                <p className="mt-3 text-[0.875rem] text-muted flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span>{study.client}</span>
                  <span aria-hidden="true">·</span>
                  <span>{study.year}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-accent">{study.status}</span>
                  {study.liveDemo ? (
                    <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 border border-accent text-accent text-[0.6875rem] tracking-[0.08em] uppercase">
                      Live preview
                    </span>
                  ) : null}
                </p>
              </div>

              <div className="md:col-span-2 flex flex-col items-start md:items-end">
                <span
                  className="font-display font-normal text-accent leading-none tracking-[-0.02em]"
                  style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)" }}
                >
                  {study.outcome.value}
                </span>
                <span className="text-[0.75rem] text-muted mt-2 md:text-right">
                  {study.outcome.caption}
                </span>
              </div>

              <div className="md:col-span-1 flex md:justify-end self-center">
                <span
                  aria-hidden="true"
                  className="inline-block text-ink/40 group-hover:text-accent group-hover:translate-x-1 transition-[color,transform] duration-300 ease-[var(--ease-quart)]"
                >
                  &rarr;
                </span>
              </div>
            </Link>
          </RevealItem>
        ))}
      </RevealSection>
    </div>
  );
}
