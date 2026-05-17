"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { studio } from "@/lib/studio";
import { Magnetic } from "@/components/motion/magnetic";
import { RevealLines } from "@/components/motion/reveal-lines";

/**
 * Final CTA — closing fold. Mirrors the hero's pageload choreography on
 * scroll-enter: line-by-line reveal under clip mask, magnetic CTA, founder
 * sign-off. The accent flourish is the underlined verb in the closer.
 *
 * Reference: closing colophons in print magazines; Tomorrow Studio's
 * final-call pages.
 */

const EASE_QUART: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function FinalCta() {
  const prefersReduced = useReducedMotion();

  const fade = (delay: number) =>
    prefersReduced
      ? {}
      : {
          initial: { opacity: 0, y: 12 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.4 } as const,
          transition: { duration: 0.7, ease: EASE_QUART, delay },
        };

  return (
    <section
      aria-labelledby="final-heading"
      className="bg-ink-deep text-bg px-6 md:px-10 py-28 md:py-40"
    >
      <motion.p className="eyebrow text-bg/55" {...fade(0)}>
        Closing — Book a call
      </motion.p>

      <h2
        id="final-heading"
        className="font-display italic font-extralight mt-10 md:mt-14 tracking-[-0.02em] text-bg"
        style={{ fontSize: "clamp(3rem, 9vw, 8.5rem)", lineHeight: 0.96 }}
      >
        <RevealLines>
          {[
            <>The cheapest growth</>,
            <>channel you&apos;re not</>,
            <>
              <span className="relative inline-block">
                <span className="relative z-10">using.</span>
                <motion.span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-[0.1em] h-[0.07em] bg-accent-soft origin-left"
                  initial={prefersReduced ? { scaleX: 1 } : { scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    duration: 0.8,
                    ease: EASE_QUART,
                    delay: prefersReduced ? 0 : 1.0,
                  }}
                />
              </span>
            </>,
          ]}
        </RevealLines>
      </h2>

      <motion.div
        className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-12 gap-y-10 md:gap-x-10 items-end"
        {...fade(1.1)}
      >
        <p
          className="md:col-span-7 lg:col-span-6 text-bg/80 max-w-[55ch]"
          style={{ fontSize: "var(--text-body-lg)", lineHeight: 1.55 }}
        >
          Twenty-minute call. No deck. I&apos;ll ask three questions, look at
          your current site live on the call, and tell you whether the
          maths even works for your business before you spend a pound.
        </p>

        <div className="md:col-span-5 lg:col-span-6 md:col-start-8 lg:col-start-7 flex flex-col items-start md:items-end gap-6">
          <Magnetic radius={120} maxPull={7}>
            <Link
              href={studio.bookingUrl}
              className="group inline-flex items-center gap-3 bg-bg text-ink-deep px-8 py-5 text-[1rem] font-medium tracking-wide transition-colors duration-200 ease-[var(--ease-quart)] hover:bg-accent-soft hover:text-bg"
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

            <span className="sr-only">{studio.founderName}, Founder</span>
          </Magnetic>

          <p className="text-[0.8125rem] tracking-[0.06em] uppercase text-bg/55">
            — {studio.founderName}, {studio.founderRole}
          </p>
        </div>
      </motion.div>
    </section>
  );
}
