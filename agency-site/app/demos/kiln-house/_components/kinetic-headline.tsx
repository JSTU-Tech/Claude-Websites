"use client";

import { motion, useReducedMotion } from "motion/react";
import type { CSSProperties, ReactNode } from "react";

/**
 * Letter-by-letter mask reveal for the Kiln House hero headline. Each
 * word slides up from below a clip mask with a 24ms inter-letter stagger
 * and a 60ms inter-word delay. DESIGN.md §5 easing (ease-out-quart) +
 * 700ms duration. Respects prefers-reduced-motion.
 */

type Line = {
  words: { text: string; accent?: boolean }[];
  // optional offset for additional inter-line delay (s)
  delay?: number;
};

export function KineticHeadline({
  lines,
  className = "",
  style,
}: {
  lines: Line[];
  className?: string;
  style?: CSSProperties;
}) {
  const reduced = useReducedMotion();

  let letterIndex = 0;
  const totalDelayFor = (i: number) => (reduced ? 0 : i * 0.024);

  return (
    <h1 className={className} style={style} aria-label={lines.map(l => l.words.map(w => w.text).join(" ")).join(" ")}>
      {lines.map((line, li) => (
        <span key={li} className="block">
          {line.words.map((word, wi) => {
            const wordNodes: ReactNode[] = [];
            for (const ch of word.text) {
              const delay = totalDelayFor(letterIndex) + (line.delay ?? 0);
              wordNodes.push(
                <span
                  key={`${li}-${wi}-${letterIndex}`}
                  className="inline-block overflow-hidden align-baseline"
                  style={{ lineHeight: "inherit" }}
                  aria-hidden="true"
                >
                  <motion.span
                    className="inline-block"
                    style={{
                      color: word.accent ? "var(--kiln-accent)" : "inherit",
                      willChange: "transform",
                    }}
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{
                      duration: 0.7,
                      ease: [0.22, 1, 0.36, 1],
                      delay,
                    }}
                  >
                    {ch}
                  </motion.span>
                </span>,
              );
              letterIndex += 1;
            }
            // inter-word space — keep selectable, no animation needed
            const space = wi < line.words.length - 1 ? (
              <span key={`sp-${li}-${wi}`} aria-hidden="true">{" "}</span>
            ) : null;
            return [
              <span key={`w-${li}-${wi}`} className="inline-block">
                {wordNodes}
              </span>,
              space,
            ];
          })}
        </span>
      ))}
    </h1>
  );
}
