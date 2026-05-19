"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { LampContainer } from "@/components/motion/lamp-container";
import { studio } from "@/lib/studio";

/**
 * Lamp fold — dramatic spotlight on the studio's pricing promise. Sits
 * between Process and PricingSignal so the prospect hits the lit
 * statement first, then the actual numbers below. One per site, no more.
 */

export function LampFold() {
  return (
    <LampContainer>
      <motion.p
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, amount: 0.4 }}
        className="eyebrow text-ink/60 mb-6"
      >
        Pricing in one line
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, amount: 0.4 }}
        className="font-display font-normal text-center text-ink leading-[0.98] tracking-[-0.025em] max-w-[18ch] mx-auto"
        style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
      >
        One quote. One build.
        <br />
        <span className="text-accent-soft">Care if you want it.</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, amount: 0.4 }}
        className="mt-8 text-ink/75 max-w-[52ch] text-center"
        style={{ fontSize: "var(--text-body-lg)", lineHeight: 1.55 }}
      >
        I quote the build in writing, fix the price, and ship it. After launch
        you can pick up an optional monthly care plan for ongoing tweaks — or
        you can take the site and run. Never bundled, never required.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.95, duration: 0.6 }}
        viewport={{ once: true, amount: 0.4 }}
        className="mt-10"
      >
        <Link
          href={studio.bookingUrl}
          data-cursor="Book"
          className="group inline-flex items-center gap-3 bg-ink text-ink-deep px-7 py-3.5 text-[0.95rem] font-medium tracking-wide transition-colors duration-200 ease-[var(--ease-quart)] hover:bg-accent-soft hover:text-ink"
        >
          Get a quote
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-300 ease-[var(--ease-quart)] group-hover:translate-x-1"
          >
            &rarr;
          </span>
        </Link>
      </motion.div>
    </LampContainer>
  );
}
