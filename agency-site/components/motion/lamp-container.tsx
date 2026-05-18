"use client";

import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Lamp container — house primitive. Aceternity-style spotlight with two
 * converging conic cones, a glowing horizontal line, and a centred halo.
 * Recoloured from the original cyan-on-slate to sage-on-ink-deep so it
 * fits the Slate & Sage palette.
 *
 * Wrap any short headline / number fold to give it dramatic lighting.
 * Lives on its own min-h-screen section by default — use as a deliberate
 * single fold, not as a decorative wrapper.
 */

const SAGE = "#6BA38B";

export const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-ink-deep w-full z-0",
        className,
      )}
    >
      <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0">
        {/* Left cone */}
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          viewport={{ once: true, amount: 0.25 }}
          style={{
            backgroundImage: `conic-gradient(from 70deg at center top, ${SAGE}, transparent, transparent)`,
          }}
          className="absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem]"
        >
          <div className="absolute w-[100%] left-0 bg-ink-deep h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute w-40 h-[100%] left-0 bg-ink-deep bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>

        {/* Right cone */}
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          viewport={{ once: true, amount: 0.25 }}
          style={{
            backgroundImage: `conic-gradient(from 290deg at center top, transparent, transparent, ${SAGE})`,
          }}
          className="absolute inset-auto left-1/2 h-56 w-[30rem]"
        >
          <div className="absolute w-40 h-[100%] right-0 bg-ink-deep bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute w-[100%] right-0 bg-ink-deep h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>

        {/* Centred blur layers + halo + line */}
        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-ink-deep blur-2xl" />
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md" />
        <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-accent-soft opacity-40 blur-3xl" />

        <motion.div
          initial={{ width: "8rem" }}
          whileInView={{ width: "16rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          viewport={{ once: true, amount: 0.25 }}
          className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full bg-accent-soft blur-2xl"
        />

        <motion.div
          initial={{ width: "15rem" }}
          whileInView={{ width: "30rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          viewport={{ once: true, amount: 0.25 }}
          className="absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem] bg-accent-soft"
        />

        <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-ink-deep" />
      </div>

      <div className="relative z-50 flex -translate-y-80 flex-col items-center px-5 text-bg">
        {children}
      </div>
    </div>
  );
};
