"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";

/**
 * Sticky floating reservation dock — appears bottom-centre after the
 * user scrolls past the hero fold (1 viewport), disappears when they
 * reach the kinetic footer (so it doesn't fight the page-end CTA).
 * On hover, the pill expands to show "Open seven days a week" detail.
 */

export function KilnReserveDock() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const aboveHero = y > window.innerHeight * 0.85;
    const beforeFooter = y < docHeight - window.innerHeight * 0.6;
    setVisible(aboveHero && beforeFooter);
  });

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="dock"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 28 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 left-1/2 z-30 -translate-x-1/2 pointer-events-none"
        >
          <a
            href="#book"
            className="group pointer-events-auto inline-flex items-center gap-3 pl-3 pr-2 py-2 text-[0.875rem] tracking-wide rounded-full backdrop-blur-md transition-all duration-300"
            style={{
              background: "rgba(28, 24, 20, 0.88)",
              color: "var(--kiln-bg)",
              border: "1px solid rgba(244,235,218,0.18)",
              boxShadow:
                "0 18px 48px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(244,235,218,0.04)",
            }}
          >
            <span
              aria-hidden="true"
              className="inline-block w-2 h-2 rounded-full"
              style={{
                background: "var(--kiln-accent-soft)",
                boxShadow: "0 0 10px rgba(215, 122, 86, 0.8)",
              }}
            />
            <span className="kiln-display italic text-[0.95rem] pr-1">
              Reserve
            </span>
            <span
              className="hidden sm:inline-block text-[0.75rem] tracking-[0.16em] uppercase opacity-70 max-w-0 group-hover:max-w-[14ch] overflow-hidden whitespace-nowrap transition-[max-width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
            >
              <span className="pl-2">Wed–Sun · 19:00</span>
            </span>
            <span
              aria-hidden="true"
              className="inline-flex items-center justify-center w-8 h-8 rounded-full text-[0.875rem] transition-transform duration-300 group-hover:translate-x-0.5"
              style={{
                background: "var(--kiln-accent)",
                color: "var(--kiln-bg)",
              }}
            >
              &rarr;
            </span>
          </a>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
