"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import Image from "next/image";

/**
 * Scroll-pinned chapter — pulls from Magic MCP insight on
 * "Interactive Scrolling Story Component" (sticky-pin pattern). Outer
 * div has height = chapters * 100vh; inner div is `sticky top-0` and
 * stays pinned through scroll. Active chapter is computed from
 * scrollYProgress; text + image swap by mapping progress through
 * useTransform with a clipPath wipe per beat.
 *
 * Three beats: the fire, the chef, the sourcing.
 */

const beats = [
  {
    eyebrow: "I — The fire",
    headline: "Olive and oak, lit at four.",
    body:
      "We bank the fire at four every afternoon so the kiln is at temperature by six. The first plate goes to a table at seven. Nothing leaves the pass that isn't touched by smoke.",
    image:
      "https://images.unsplash.com/photo-1593246049226-ded77bf90326?auto=format&fit=crop&w=1600&q=80",
    alt: "Glowing embers in the wood-fire oven at temperature",
    figure: "720°C · service heat",
  },
  {
    eyebrow: "II — The chef",
    headline: "One menu. One hand on the pass.",
    body:
      "Chef Imo Ngata cooks for thirty-two guests a night — four courses, paired or unpaired, with an optional supplement of West Country cheese. There is no à la carte. There is no second sitting.",
    image:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1600&q=80",
    alt: "Chef plating a course in the kitchen",
    figure: "One sitting · 32 covers",
  },
  {
    eyebrow: "III — The sourcing",
    headline: "Everything inside a forty-mile arc.",
    body:
      "Mendip lamb, Somerset goat's curd, garden herbs from a former schoolyard plot in Lansdown. What isn't local is on the wine list — and even that leans Bristol Channel.",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1600&q=80",
    alt: "Plated wood-fire dish with seasonal produce",
    figure: "40-mile sourcing radius",
  },
];

export function KilnStory() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });

  // Active beat index: 0 → beats.length-1
  const activeIndex = useTransform(scrollYProgress, (v) => {
    const idx = Math.min(beats.length - 1, Math.floor(v * beats.length));
    return idx;
  });

  // Image column slides with held plateaus — image stays put during the
  // text fade-in/hold, then transitions to next during the text fade-out.
  // For 3 beats: hold @0, slide to -100 between 0.27-0.4, hold, slide to -200
  // between 0.6-0.73, hold to end.
  const imageY = useTransform(
    scrollYProgress,
    [0, 0.27, 0.4, 0.6, 0.73, 1],
    ["0%", "0%", "-100%", "-100%", "-200%", "-200%"],
  );

  return (
    <section
      id="story"
      ref={wrapRef}
      style={{
        position: "relative",
        height: `${beats.length * 100}vh`,
        background: "var(--kiln-paper)",
        color: "var(--kiln-ink)",
      }}
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
        {/* Chapter rail header */}
        <div className="relative z-10 px-6 md:px-12 pt-10 md:pt-14 grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline">
          <p
            className="md:col-span-3 kiln-eyebrow"
            style={{ color: "var(--kiln-muted)" }}
          >
            Chapter — Kitchen
          </p>
          <div className="md:col-span-9 flex items-center gap-3">
            {beats.map((_, i) => (
              <ChapterTick key={i} index={i} activeIndex={activeIndex} />
            ))}
            <span
              className="ml-auto kiln-display italic text-[0.95rem]"
              style={{ color: "var(--kiln-muted)" }}
            >
              <BeatLabel activeIndex={activeIndex} />
            </span>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-x-12 px-6 md:px-12 py-12 md:py-16 items-center">
          {/* Text column — three beats stacked, fade through scroll progress */}
          <div className="md:col-span-6 relative h-full flex items-center">
            <div className="relative w-full h-[26rem]">
              {beats.map((beat, i) => (
                <BeatText
                  key={i}
                  index={i}
                  total={beats.length}
                  scrollYProgress={scrollYProgress}
                  beat={beat}
                />
              ))}
            </div>
          </div>

          {/* Image column — slides up by index*100% */}
          <div className="md:col-span-5 md:col-start-8 relative h-[28rem] md:h-[34rem] overflow-hidden">
            <motion.div
              className="absolute inset-0 flex flex-col"
              style={{ y: imageY }}
            >
              {beats.map((beat, i) => (
                <figure
                  key={i}
                  className="relative w-full h-full flex-shrink-0 overflow-hidden"
                  style={{ background: "rgba(28,24,20,0.08)" }}
                >
                  <Image
                    src={beat.image}
                    alt={beat.alt}
                    fill
                    sizes="(max-width: 768px) 90vw, 40vw"
                    className="object-cover"
                    style={{ filter: "saturate(0.92)" }}
                    unoptimized
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, transparent 60%, rgba(28,24,20,0.55) 100%)",
                    }}
                  />
                  <figcaption
                    className="absolute bottom-4 left-4 right-4 flex items-baseline justify-between text-[0.7rem] tracking-[0.18em] uppercase"
                    style={{ color: "rgba(244,235,218,0.95)" }}
                  >
                    <span>{beat.figure}</span>
                    <span style={{ color: "var(--kiln-accent-soft)" }}>
                      {String(i + 1).padStart(2, "0")} / {beats.length}
                    </span>
                  </figcaption>
                </figure>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ChapterTick({
  index,
  activeIndex,
}: {
  index: number;
  activeIndex: import("motion/react").MotionValue<number>;
}) {
  const opacity = useTransform(activeIndex, (i) => (i === index ? 1 : 0.3));
  const width = useTransform(activeIndex, (i) => (i === index ? "2.5rem" : "1.25rem"));
  return (
    <motion.span
      aria-hidden="true"
      className="h-[2px]"
      style={{
        opacity,
        width,
        background: "var(--kiln-accent)",
        transition: "width 400ms cubic-bezier(0.22,1,0.36,1)",
      }}
    />
  );
}

function BeatLabel({
  activeIndex,
}: {
  activeIndex: import("motion/react").MotionValue<number>;
}) {
  const label = useTransform(activeIndex, (i) => beats[i]?.eyebrow ?? "");
  return <motion.span>{label}</motion.span>;
}

function BeatText({
  index,
  total,
  scrollYProgress,
  beat,
}: {
  index: number;
  total: number;
  scrollYProgress: import("motion/react").MotionValue<number>;
  beat: (typeof beats)[number];
}) {
  const step = 1 / total;
  const start = index * step;
  const center = start + step / 2;
  const end = (index + 1) * step;
  // Clamp endpoints to [0,1] and ensure strict monotonic increase
  const clamp = (v: number) => Math.max(0, Math.min(1, v));
  const opOffsets: [number, number, number, number] = [
    clamp(start - 0.02),
    clamp(start + step * 0.2),
    clamp(end - step * 0.2),
    clamp(end + 0.02),
  ];
  // Nudge equal endpoints by epsilon to keep strict monotonic
  for (let i = 1; i < opOffsets.length; i++) {
    if (opOffsets[i] <= opOffsets[i - 1]) {
      opOffsets[i] = opOffsets[i - 1] + 0.0001;
    }
  }
  const yOffsets: [number, number, number] = [
    clamp(start - 0.02),
    clamp(center),
    clamp(end + 0.02),
  ];
  for (let i = 1; i < yOffsets.length; i++) {
    if (yOffsets[i] <= yOffsets[i - 1]) {
      yOffsets[i] = yOffsets[i - 1] + 0.0001;
    }
  }

  const opacity = useTransform(scrollYProgress, opOffsets, [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, yOffsets, [40, 0, -40]);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col justify-center gap-6"
      style={{ opacity, y }}
    >
      <p
        className="kiln-eyebrow"
        style={{ color: "var(--kiln-accent)" }}
      >
        {beat.eyebrow}
      </p>
      <h2
        className="kiln-display italic font-light leading-[1.02] tracking-[-0.015em] max-w-[18ch]"
        style={{
          fontSize: "clamp(2.25rem, 5.5vw, 4.5rem)",
          color: "var(--kiln-ink)",
        }}
      >
        {beat.headline}
      </h2>
      <p
        className="max-w-[44ch] text-[1.0625rem] leading-[1.65]"
        style={{ color: "var(--kiln-ink-soft)" }}
      >
        {beat.body}
      </p>
    </motion.div>
  );
}
