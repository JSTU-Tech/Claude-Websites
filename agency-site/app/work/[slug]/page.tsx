import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { FoldMark } from "@/components/motion/fold-mark";
import {
  RevealSection,
  RevealItem,
} from "@/components/motion/reveal-section";
import { VerticalIcon } from "@/components/motion/vertical-icon";
import { caseStudies, getCaseStudy } from "@/lib/case-studies";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return { title: "Case study — Stuckey" };
  return {
    title: `${study.client} — Stuckey`,
    description: study.title,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();
  const next = getCaseStudy(study.nextSlug);

  return (
    <article>
      {/* HERO */}
      <header className="bg-ink-deep text-ink">
        <div className="relative min-h-[80svh] flex flex-col px-6 md:px-10 pt-14 md:pt-20 pb-12 md:pb-16">
          <div className="pointer-events-none absolute inset-x-6 md:inset-x-10 top-6 md:top-10 bottom-6 md:bottom-10 border border-ink/10" />

          <div className="relative">
            <FoldMark
              index="01"
              label="Case study"
              className="text-ink [&_.eyebrow]:text-ink/60"
            />

            <div className="mt-10 flex flex-wrap items-center gap-3 text-[0.75rem] tracking-[0.08em] uppercase text-ink/60">
              <span className="inline-block h-px w-8 bg-ink/40" />
              <span>{study.verticalLabel}</span>
              <span aria-hidden="true">·</span>
              <span>{study.year}</span>
              <span aria-hidden="true">·</span>
              <span className="text-accent-soft">{study.status}</span>
            </div>

            <h1
              className="font-display font-normal mt-8 max-w-[20ch] tracking-[-0.025em]"
              style={{
                fontSize: "clamp(2.75rem, 6.5vw, 6rem)",
                lineHeight: 0.98,
              }}
            >
              {study.title}
            </h1>

            <p
              className="mt-6 text-ink/80 max-w-[50ch]"
              style={{ fontSize: "var(--text-body-lg)", lineHeight: 1.55 }}
            >
              {study.client}
            </p>
          </div>

          {/* Outcome strip */}
          <div className="relative mt-auto pt-12">
            <div className="border-t border-ink/10 pt-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div className="flex flex-col gap-3">
                <span className="eyebrow text-ink/55">Outcome</span>
                <p
                  className="font-display font-normal text-accent-soft leading-[0.95] tracking-[-0.03em]"
                  style={{ fontSize: "clamp(3.5rem, 9vw, 7.5rem)" }}
                >
                  {study.outcome.value}
                </p>
                <p
                  className="text-ink/80 max-w-[28ch]"
                  style={{ fontSize: "var(--text-body-lg)", lineHeight: 1.5 }}
                >
                  {study.outcome.caption}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* THE PROBLEM */}
      <Block index="02" label="The problem">
        {study.problem.map((p, i) => (
          <RevealItem key={i} as="p">
            {p}
          </RevealItem>
        ))}
      </Block>

      {/* THE APPROACH */}
      <Block index="03" label="The approach">
        {study.approach.map((p, i) => (
          <RevealItem key={i} as="p">
            {p}
          </RevealItem>
        ))}
      </Block>

      {/* THE RESULT */}
      <Block index="04" label="The result" emphasis>
        {study.result.map((p, i) => (
          <RevealItem key={i} as="p">
            {p}
          </RevealItem>
        ))}
        <RevealItem
          as="blockquote"
          className="mt-10 md:mt-14 border-l-2 border-accent pl-6"
        >
          <p
            className="font-display font-normal text-ink leading-[1.2]"
            style={{ fontSize: "clamp(1.5rem, 2.75vw, 2.25rem)" }}
          >
            &ldquo;{study.quote.body}&rdquo;
          </p>
          <footer className="mt-5 text-[0.8125rem] tracking-[0.06em] uppercase text-muted">
            — {study.quote.name}, {study.quote.role}
          </footer>
        </RevealItem>

        {study.liveDemo ? (
          <RevealItem className="mt-12 md:mt-16 flex flex-col items-start gap-4">
            <span className="eyebrow">Visit the live site</span>
            <Link
              href={study.liveDemo}
              target="_blank"
              rel="noopener"
              data-cursor="Open"
              className="group inline-flex items-center gap-3 bg-accent text-ink-deep px-7 py-4 text-[0.95rem] font-medium tracking-wide transition-colors duration-200 ease-[var(--ease-quart)] hover:bg-accent-soft"
            >
              {study.client.toLowerCase()}.studio
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-300 ease-[var(--ease-quart)] group-hover:translate-x-1"
              >
                ↗
              </span>
            </Link>
          </RevealItem>
        ) : null}
      </Block>

      {/* NEXT */}
      {next ? (
        <section className="bg-bg-deep border-t border-rule">
          <div className="px-6 md:px-10 py-20 md:py-28">
            <p className="eyebrow">Next case</p>
            <Link
              href={`/work/${next.slug}`}
              className="group mt-6 flex flex-col gap-4 max-w-[40ch]"
            >
              <h3
                className="font-display font-normal leading-[1.05] tracking-[-0.015em] text-ink"
                style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}
              >
                {next.title}
              </h3>
              <div className="flex items-center gap-3 text-[0.875rem] text-muted">
                <VerticalIcon
                  variant={next.vertical}
                  className="text-ink h-7 w-7"
                />
                <span>
                  {next.client} · {next.verticalLabel}
                </span>
                <span
                  aria-hidden="true"
                  className="inline-block ml-2 text-ink/40 group-hover:text-accent group-hover:translate-x-1 transition-[color,transform] duration-300 ease-[var(--ease-quart)]"
                >
                  &rarr;
                </span>
              </div>
            </Link>
          </div>
        </section>
      ) : null}
    </article>
  );
}

function Block({
  index,
  label,
  emphasis = false,
  children,
}: {
  index: string;
  label: string;
  emphasis?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      aria-label={label}
      className={[
        "px-6 md:px-10 py-20 md:py-28 border-t border-rule",
        emphasis ? "bg-paper" : "",
      ].join(" ")}
    >
      <FoldMark index={index} label={label} />
      <RevealSection
        className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-6"
        amount={0.2}
      >
        <div className="md:col-span-1" />
        <div
          className="md:col-span-8 flex flex-col gap-6 text-ink/90 max-w-[62ch]"
          style={{ fontSize: "var(--text-body-lg)", lineHeight: 1.6 }}
        >
          {children}
        </div>
      </RevealSection>
    </section>
  );
}
