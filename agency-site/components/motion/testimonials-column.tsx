"use client";

import React from "react";
import { motion } from "motion/react";

export type ColumnTestimonial = {
  text: string;
  image: string;
  name: string;
  role: string;
};

/**
 * Vertical auto-scrolling testimonial column. House primitive. Pasted in
 * by the founder with shadcn-style rounded-3xl + shadow-primary/10
 * styling; retoned to the project's hairline-square editorial language
 * (no rounded chips, no shadow glow, paper-tone card on cream bg).
 *
 * Use in a multi-column layout with different durations per column for a
 * staggered marquee effect.
 */

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: ColumnTestimonial[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{
          duration: props.duration ?? 12,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[...new Array(2)].map((_, dup) => (
          <React.Fragment key={dup}>
            {props.testimonials.map(({ text, image, name, role }, i) => (
              <div
                key={`${dup}-${i}`}
                className="p-8 border border-rule bg-paper max-w-xs w-full flex flex-col gap-5"
              >
                <p
                  className="text-ink/90 leading-[1.45]"
                  style={{ fontSize: "var(--text-body)" }}
                >
                  &ldquo;{text}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-1 border-t border-rule">
                  {image ? (
                    <img
                      width={36}
                      height={36}
                      src={image}
                      alt={name}
                      className="h-9 w-9 object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="inline-flex h-9 w-9 items-center justify-center border border-rule font-display text-[0.8125rem] text-ink"
                    >
                      {name
                        .split(" ")
                        .map((p) => p[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </span>
                  )}
                  <div className="flex flex-col">
                    <span className="text-ink text-[0.875rem] leading-tight">
                      {name}
                    </span>
                    <span className="text-muted text-[0.75rem] leading-tight tracking-wide uppercase mt-0.5">
                      {role}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};
