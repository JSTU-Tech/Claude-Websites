"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { studio } from "@/lib/studio";
import { RevealLines } from "@/components/motion/reveal-lines";
import { Magnetic } from "@/components/motion/magnetic";

const EASE_QUART: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function Hero() {
  const prefersReduced = useReducedMotion();
  const reveal = (delay: number) =>
    prefersReduced
      ? {}
      : {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, ease: EASE_QUART, delay },
        };

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative flex-1 flex flex-col px-6 md:px-10 pt-10 md:pt-14 pb-10"
    >
      {/* Eyebrow row */}
      <div className="flex items-baseline justify-between">
        <motion.p className="eyebrow" {...reveal(0.05)}>
          Studio of {studio.founderName}, {studio.year}&nbsp;—
        </motion.p>
        <motion.p className="eyebrow tabular-nums" {...reveal(0.1)}>
          Index / 01
        </motion.p>
      </div>

      {/* Display headline — line-by-line clip-mask reveal */}
      <h1
        id="hero-heading"
        className="font-display italic font-extralight mt-12 md:mt-16 lg:mt-20 text-ink"
        style={{
          fontSize: "var(--text-hero)",
          lineHeight: 0.95,
          letterSpacing: "-0.02em",
        }}
      >
        <RevealLines>
          {[
            <>I build websites</>,
            <>that turn local searches</>,
            <>
              into{" "}
              <span className="relative inline-block">
                <span className="relative z-10">booked jobs.</span>
                <motion.span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-[0.1em] h-[0.07em] bg-accent origin-left"
                  initial={prefersReduced ? { scaleX: 1 } : { scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    duration: 0.7,
                    ease: EASE_QUART,
                    delay: prefersReduced ? 0 : 1.15,
                  }}
                />
              </span>
            </>,
          ]}
        </RevealLines>
      </h1>

      {/* Lower meta band */}
      <motion.div className="rule mt-auto pt-8 md:pt-10" {...reveal(1.35)} />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-y-8 md:gap-x-10 pt-8 md:pt-10">
        <motion.p
          className="md:col-span-7 lg:col-span-6 text-ink/85 max-w-[55ch]"
          style={{ fontSize: "var(--text-body-lg)", lineHeight: 1.5 }}
          {...reveal(1.4)}
        >
          Most small business sites lose customers before they ever pick up the
          phone. Mine don&apos;t. I work with trades, hospitality, and
          professional services to ship sites that pay for themselves in 60–90
          days.
        </motion.p>

        <motion.div
          className="md:col-span-5 lg:col-span-6 md:col-start-8 lg:col-start-7 flex flex-col items-start gap-6 md:items-end"
          {...reveal(1.5)}
        >
          <Magnetic radius={110} maxPull={6}>
            <Link
              href={studio.bookingUrl}
              className="group inline-flex items-center gap-3 bg-accent text-bg px-7 py-4 text-[0.95rem] font-medium tracking-wide transition-colors duration-200 ease-[var(--ease-quart)] hover:bg-ink"
            >
              <span className="relative overflow-hidden inline-block">
                <span className="inline-block transition-transform duration-300 ease-[var(--ease-quart)] group-hover:-translate-y-full">
                  Book a call
                </span>
                <span
                  aria-hidden="true"
                  className="absolute inset-0 inline-block translate-y-full transition-transform duration-300 ease-[var(--ease-quart)] group-hover:translate-y-0"
                >
                  Book a call
                </span>
              </span>
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-300 ease-[var(--ease-quart)] group-hover:translate-x-1"
              >
                &rarr;
              </span>
            </Link>
          </Magnetic>

          <div className="flex items-center gap-3 text-[0.875rem] text-muted">
            <span
              aria-hidden="true"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-rule font-display text-[0.8125rem] text-ink"
            >
              JS
            </span>
            <span>
              {studio.founderName},{" "}
              <span className="text-ink">{studio.founderRole}</span>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
