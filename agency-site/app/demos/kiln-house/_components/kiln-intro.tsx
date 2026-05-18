"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

/**
 * Cinematic intro reveal — plays once per session. Two ember bars wipe
 * apart vertically, revealing a centered "KILN HOUSE" wordmark which
 * holds for ~400ms and then itself wipes upward to expose the page.
 * Skippable by scroll, key press, click. Reduced-motion fallback: a
 * single 200ms fade.
 */

const STORAGE_KEY = "kiln-intro-played-v1";

export function KilnIntro() {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState<boolean | null>(null);

  useEffect(() => {
    // Show once per session
    try {
      const played = sessionStorage.getItem(STORAGE_KEY);
      setOpen(!played);
    } catch {
      setOpen(true);
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const skip = () => setOpen(false);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") skip();
    };
    window.addEventListener("keydown", onKey);

    const total = reduced ? 250 : 2600;
    const t = setTimeout(skip, total);
    return () => {
      window.removeEventListener("keydown", onKey);
      clearTimeout(t);
    };
  }, [open, reduced]);

  useEffect(() => {
    if (open === false) {
      document.body.style.overflow = "";
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {}
    }
  }, [open]);

  if (open === null) return null;

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="kiln-intro"
          className="fixed inset-0 z-[60] flex items-center justify-center cursor-pointer select-none"
          style={{ background: "#1C0F08" }}
          onClick={() => setOpen(false)}
          aria-label="Intro animation — click or press any key to skip"
          role="button"
          tabIndex={0}
          exit={{
            opacity: 0,
            transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
          }}
        >
          {/* Top wipe bar */}
          <motion.div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 origin-top"
            style={{
              height: "50%",
              background:
                "linear-gradient(180deg, #1C0F08 0%, #2A1610 75%, #3A2218 100%)",
              borderBottom: "1px solid rgba(215, 122, 86, 0.25)",
            }}
            initial={{ y: 0 }}
            animate={reduced ? { y: 0 } : { y: "-100%" }}
            transition={{
              duration: 1.1,
              delay: 1.3,
              ease: [0.83, 0, 0.17, 1],
            }}
          />
          {/* Bottom wipe bar */}
          <motion.div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 origin-bottom"
            style={{
              height: "50%",
              background:
                "linear-gradient(0deg, #1C0F08 0%, #2A1610 75%, #3A2218 100%)",
              borderTop: "1px solid rgba(215, 122, 86, 0.25)",
            }}
            initial={{ y: 0 }}
            animate={reduced ? { y: 0 } : { y: "100%" }}
            transition={{
              duration: 1.1,
              delay: 1.3,
              ease: [0.83, 0, 0.17, 1],
            }}
          />

          {/* Wordmark */}
          <div className="relative z-10 flex flex-col items-center gap-4 px-6">
            <motion.span
              className="kiln-eyebrow"
              style={{ color: "rgba(244,235,218,0.55)" }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              exit={{ opacity: 0 }}
            >
              Bath · MMXXVI
            </motion.span>
            <div className="overflow-hidden">
              <motion.h1
                className="kiln-display italic font-light text-center leading-[0.9]"
                style={{
                  fontSize: "clamp(3rem, 10vw, 8rem)",
                  color: "var(--kiln-bg)",
                  letterSpacing: "-0.02em",
                }}
                initial={{ y: "100%" }}
                animate={{ y: "0%" }}
                transition={{
                  duration: 0.95,
                  delay: 0.35,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                Kiln{" "}
                <span style={{ color: "var(--kiln-accent-soft)" }}>House</span>
              </motion.h1>
            </div>
            <motion.div
              aria-hidden="true"
              className="h-px w-24 mt-2"
              style={{ background: "rgba(244,235,218,0.35)" }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.span
              className="kiln-display italic text-[0.95rem]"
              style={{ color: "rgba(244,235,218,0.7)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.05 }}
            >
              Wood · smoke · patience
            </motion.span>
          </div>

          {/* Skip hint */}
          <motion.span
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[0.6875rem] tracking-[0.22em] uppercase"
            style={{ color: "rgba(244,235,218,0.45)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.5 }}
          >
            press any key to enter
          </motion.span>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
