import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { FoldMark } from "@/components/motion/fold-mark";
import {
  RevealSection,
  RevealItem,
} from "@/components/motion/reveal-section";
import { VerticalIcon } from "@/components/motion/vertical-icon";
import { ContainerScroll } from "@/components/motion/container-scroll";
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

      {/* BIG VISUAL — ContainerScroll 3D card reveal */}
      <section aria-label={`${study.client} site preview`}>
        <ContainerScroll
          titleComponent={
            <div className="flex flex-col gap-3">
              <span className="eyebrow">Live site preview</span>
              <h2
                className="font-display font-normal text-ink leading-[1.02] tracking-[-0.02em] max-w-[18ch] mx-auto"
                style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
              >
                The work, in situ.
              </h2>
            </div>
          }
        >
          <div className="relative h-full w-full flex flex-col">
            {/* Faux browser chrome */}
            <div className="flex items-center justify-between border-b border-rule px-4 py-2.5">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-rule" />
                <span className="h-2.5 w-2.5 rounded-full bg-rule" />
                <span className="h-2.5 w-2.5 rounded-full bg-rule" />
              </div>
              <span className="text-[0.6875rem] tracking-[0.06em] uppercase text-muted">
                {study.slug}.co.uk
              </span>
              <span className="h-3 w-3" />
            </div>

            {/* Inner editorial composition — placeholder until a real screenshot exists */}
            <div className="flex-1 grid grid-cols-12 grid-rows-6 gap-px bg-rule">
              <div className="col-span-12 row-span-4 bg-paper px-8 py-10 md:px-14 md:py-16 flex flex-col justify-end">
                <span className="eyebrow mb-3">{study.verticalLabel}</span>
                <p
                  className="font-display font-normal text-ink leading-[0.98] tracking-[-0.02em] max-w-[20ch]"
                  style={{ fontSize: "clamp(1.5rem, 3.5vw, 3.25rem)" }}
                >
                  {study.title}
                </p>
              </div>
              <div className="col-span-4 row-span-2 bg-paper p-5 flex flex-col justify-between">
                <span className="eyebrow">Outcome</span>
                <span
                  className="font-display font-normal text-accent leading-none tracking-[-0.02em]"
                  style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.5rem)" }}
                >
                  {study.outcome.value}
                </span>
              </div>
              <div className="col-span-4 row-span-2 bg-paper p-5 flex flex-col justify-between">
                <span className="eyebrow">Client</span>
                <span className="text-ink text-[0.9375rem]">
                  {study.client}
                </span>
              </div>
              <div className="col-span-4 row-span-2 bg-paper p-5 flex items-center justify-end">
                <span
                  aria-hidden="true"
                  className="text-ink/40 text-[1.25rem]"
                >
                  &rarr;
                </span>
              </div>
            </div>
          </div>
        </ContainerScroll>
      </section>

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
