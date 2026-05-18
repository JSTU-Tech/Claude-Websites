"use client";

import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

/**
 * Word-cycle primitive — house kit. Pasted in as Aceternity-style
 * AnimatedTextCycle; migrated to motion/react. Auto-measures the visible
 * word so surrounding inline text shifts smoothly when the word changes.
 *
 * Use to make a static list of buyers / verticals / services rotate in
 * place inside a sentence. Per the brief, sage-coloured display for the
 * cycling word reads as the section accent.
 */

interface AnimatedTextCycleProps {
  words: string[];
  interval?: number;
  className?: string;
}

export default function AnimatedTextCycle({
  words,
  interval = 4200,
  className = "",
}: AnimatedTextCycleProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [width, setWidth] = useState<string>("auto");
  const measureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!measureRef.current) return;
    const elements = measureRef.current.children;
    if (elements.length > currentIndex) {
      const w = elements[currentIndex].getBoundingClientRect().width;
      setWidth(`${w}px`);
    }
  }, [currentIndex]);

  useEffect(() => {
    const t = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % words.length);
    }, interval);
    return () => clearInterval(t);
  }, [interval, words.length]);

  const variants = {
    hidden: { y: -16, opacity: 0, filter: "blur(6px)" },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 0.4, ease: "easeOut" },
    },
    exit: {
      y: 16,
      opacity: 0,
      filter: "blur(6px)",
      transition: { duration: 0.28, ease: "easeIn" },
    },
  } as const;

  return (
    <>
      {/* Hidden measurement layer */}
      <div
        ref={measureRef}
        aria-hidden="true"
        className="absolute opacity-0 pointer-events-none"
        style={{ visibility: "hidden" }}
      >
        {words.map((word, i) => (
          <span key={i} className={className}>
            {word}
          </span>
        ))}
      </div>

      {/* Visible cycling word */}
      <motion.span
        className="relative inline-block align-baseline"
        animate={{
          width,
          transition: {
            type: "spring",
            stiffness: 150,
            damping: 15,
            mass: 1.2,
          },
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={currentIndex}
            className={`inline-block ${className}`}
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ whiteSpace: "nowrap" }}
          >
            {words[currentIndex]}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </>
  );
}
