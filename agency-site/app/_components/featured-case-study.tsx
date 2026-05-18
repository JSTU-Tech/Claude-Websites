"use client";

import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "motion/react";
import { FoldMark } from "@/components/motion/fold-mark";

gsap.registerPlugin(ScrollTrigger);

/**
 * Featured case study — the site's one narrative scroll moment (DESIGN.md
 * §5 #4). A single GSAP timeline plays *once* when the section enters the
 * viewport: title rise → digit count-up of the headline stat → owner quote
 * → CTA. Not scrubbed — scrubbing reversed the count on scroll-back, which
 * the founder flagged as UX-harming. The reveal still feels scroll-driven
 * because it triggers on enter; it just doesn't undo itself.
 *
 * Reference: Locomotive's "Atelier" reveal; Tomorrow Studio's stat-as-
 * narrative case study pages.
 */

const study = {
  caseLabel: "Case 01 — Saltworks Plumbing (concept)",
  title: "From missing six calls a day to a waiting list.",
  statValue: 284,
  statPrefix: "£",
  statSuffix: "k",
  statCaption: "tracked in new bookings, year one",
  quote: "The site paid for itself in seven weeks.",
  attribution: "Owner, Saltworks Plumbing",
  cta: "Read the full case",
  ctaHref: "/work/saltworks",
} as const;

export function FeaturedCaseStudy() {
  const container = useRef<HTMLElement | null>(null);
  const eyebrowRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const statRef = useRef<HTMLSpanElement | null>(null);
  const quoteRef = useRef<HTMLDivElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);

  const prefersReduced = useReducedMotion();

  useGSAP(
    () => {
      if (prefersReduced) {
        gsap.set(
          [
            eyebrowRef.current,
            titleRef.current,
            quoteRef.current,
            ctaRef.current,
          ],
          { autoAlpha: 1, y: 0 },
        );
        if (statRef.current) {
          statRef.current.textContent = String(study.statValue);
        }
        return;
      }

      // Pre-set the to-animate elements to hidden so they don't flash
      // before ScrollTrigger fires.
      gsap.set(
        [eyebrowRef.current, titleRef.current, quoteRef.current, ctaRef.current],
        { autoAlpha: 0 },
      );

      const counter = { value: 0 };

      const tl = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.out" },
      });

      tl.to(eyebrowRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
      })
        .fromTo(
          titleRef.current,
          { y: 60, autoAlpha: 0 },
          { autoAlpha: 1, y: 0, duration: 1.1 },
          0.05,
        )
        .to(
          counter,
          {
            value: study.statValue,
            ease: "power2.out",
            duration: 1.8,
            snap: { value: 1 },
            onUpdate: () => {
              if (statRef.current) {
                statRef.current.textContent = Math.round(
                  counter.value,
                ).toString();
              }
            },
          },
          0.55,
        )
        .fromTo(
          quoteRef.current,
          { y: 40, autoAlpha: 0 },
          { autoAlpha: 1, y: 0, duration: 0.9 },
          1.6,
        )
        .fromTo(
          ctaRef.current,
          { y: 24, autoAlpha: 0 },
          { autoAlpha: 1, y: 0, duration: 0.6 },
          2.1,
        );

      const trigger = ScrollTrigger.create({
        trigger: container.current,
        start: "top 65%",
        once: true,
        onEnter: () => tl.play(),
      });

      return () => {
        trigger.kill();
        tl.kill();
      };
    },
    { scope: container, dependencies: [prefersReduced] },
  );

  return (
    <section
      ref={container}
      aria-labelledby="case-heading"
      className="bg-ink-deep text-ink"
    >
      <div className="relative min-h-[100svh] overflow-hidden flex flex-col">
        {/* Background hairline frame */}
        <div className="pointer-events-none absolute inset-x-6 md:inset-x-10 top-6 md:top-10 bottom-6 md:bottom-10 border border-ink/10" />

        <div className="relative flex-1 flex flex-col px-6 md:px-10 pt-14 md:pt-20 pb-10 md:pb-14">
          <FoldMark
            index="02"
            label="Featured case"
            className="text-ink [&_.eyebrow]:text-ink/60"
          />

          <div
            ref={eyebrowRef}
            className="mt-10 flex items-center gap-3 text-[0.75rem] tracking-[0.08em] uppercase text-ink/60"
          >
            <span className="inline-block h-px w-8 bg-ink/40" />
            <span>{study.caseLabel}</span>
          </div>

          <h2
            id="case-heading"
            ref={titleRef}
            className="font-display font-normal mt-6 max-w-[24ch] tracking-[-0.02em]"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
              lineHeight: 0.98,
            }}
          >
            {study.title}
          </h2>

          {/* Stat band — sits centred-low in the pin */}
          <div className="mt-auto pt-12 md:pt-16">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-16 border-t border-ink/10 pt-10 md:pt-14">
              <div className="md:max-w-[50%] flex flex-col gap-3">
                <span className="eyebrow text-ink/55">Outcome</span>
                <p
                  className="font-display font-normal text-accent-soft leading-[0.95] tracking-[-0.03em]"
                  style={{ fontSize: "clamp(4rem, 10vw, 9rem)" }}
                >
                  {study.statPrefix}
                  <span ref={statRef} className="tabular-nums">
                    0
                  </span>
                  {study.statSuffix}
                </p>
                <p
                  className="text-ink/80 max-w-[28ch]"
                  style={{
                    fontSize: "var(--text-body-lg)",
                    lineHeight: 1.5,
                  }}
                >
                  {study.statCaption}
                </p>
              </div>

              <div
                ref={quoteRef}
                className="md:max-w-[45%] flex flex-col gap-5"
              >
                <span className="eyebrow text-ink/55">Owner</span>
                <p
                  className="font-display font-normal text-ink leading-[1.15]"
                  style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)" }}
                >
                  &ldquo;{study.quote}&rdquo;
                </p>
                <p className="text-[0.8125rem] tracking-[0.06em] uppercase text-ink/55">
                  — {study.attribution}
                </p>
              </div>
            </div>

            <div
              ref={ctaRef}
              className="mt-10 md:mt-14 flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-t border-ink/10 pt-8"
            >
              <p className="text-[0.8125rem] tracking-[0.08em] uppercase text-ink/55">
                Concept project — methodology proven, client TBD
              </p>
              <Link
                href={study.ctaHref}
                className="group inline-flex items-center gap-3 text-ink text-[0.95rem] font-medium tracking-wide"
              >
                <span className="link-underline">{study.cta}</span>
                <span
                  aria-hidden="true"
                  className="inline-block transition-transform duration-300 ease-[var(--ease-quart)] group-hover:translate-x-1"
                >
                  &rarr;
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
