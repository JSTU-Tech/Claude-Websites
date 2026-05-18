"use client";

import { motion, useMotionValue, useSpring, AnimatePresence } from "motion/react";
import { useRef, useState } from "react";
import Image from "next/image";

/**
 * Kinetic menu — cursor-anchored image preview pattern (Magic MCP
 * insight: Project Showcase). Hovering a course pins its dish photo to
 * the cursor with spring smoothing; row underline animates left→right
 * (DESIGN.md §5: no scale, fill swap only).
 *
 * Mobile fallback: the image card is hidden — the list reads as a
 * straightforward typographic menu.
 */

type Course = {
  number: string;
  name: string;
  note: string;
  image: string;
  alt: string;
};

const courses: Course[] = [
  {
    number: "01",
    name: "Mendip lamb, hearth-roasted",
    note: "Burnt courgette, fermented chilli, lardo",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80",
    alt: "Hearth-roasted lamb shoulder, smoke-blackened, plated dark",
  },
  {
    number: "02",
    name: "Cornish brill",
    note: "Mussel butter, sea purslane, smoked potato",
    image:
      "https://images.unsplash.com/photo-1535473895227-bdecb20fb157?auto=format&fit=crop&w=900&q=80",
    alt: "White flesh fish dish with butter sauce",
  },
  {
    number: "03",
    name: "Somerset goat curd",
    note: "Roast cherry, honey, charred sourdough",
    image:
      "https://images.unsplash.com/photo-1559561853-08451507cbe7?auto=format&fit=crop&w=900&q=80",
    alt: "Goat curd cheese plate with stone fruit and bread",
  },
  {
    number: "04",
    name: "Burnt cream tart",
    note: "Olive oil, sea salt, oat-milk gelato",
    image:
      "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=900&q=80",
    alt: "Burnt-top cream tart dessert close-up",
  },
];

export function KilnMenu() {
  const wrapRef = useRef<HTMLElement>(null);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springX = useSpring(cursorX, { stiffness: 220, damping: 30, mass: 0.5 });
  const springY = useSpring(cursorY, { stiffness: 220, damping: 30, mass: 0.5 });
  const [active, setActive] = useState<number | null>(null);

  const onMove = (e: React.MouseEvent) => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const rect = wrap.getBoundingClientRect();
    cursorX.set(e.clientX - rect.left);
    cursorY.set(e.clientY - rect.top);
  };

  return (
    <section
      id="menu"
      ref={wrapRef}
      onMouseMove={onMove}
      className="relative px-6 md:px-12 py-28 md:py-44"
      style={{ background: "var(--kiln-bg)" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-y-10 md:gap-x-12 items-end">
        <div className="md:col-span-7">
          <p
            className="kiln-eyebrow mb-6"
            style={{ color: "var(--kiln-muted)" }}
          >
            III — Tasting menu, Autumn ’26
          </p>
          <h2
            className="kiln-display italic font-light leading-[1.0] tracking-[-0.02em] max-w-[22ch]"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              color: "var(--kiln-ink)",
            }}
          >
            Four courses,
            <br />
            <span style={{ color: "var(--kiln-accent)" }}>sixty-five pounds.</span>
          </h2>
        </div>
        <div className="md:col-span-4 md:col-start-9">
          <p
            className="max-w-[36ch] text-[1rem] leading-[1.6]"
            style={{ color: "var(--kiln-ink-soft)" }}
          >
            Paired wine flight £42. Cheese supplement £9. The menu is
            rewritten on the first and fifteenth of each month — what is
            ready that week is what is served.
          </p>
        </div>
      </div>

      <ol className="relative mt-20 md:mt-28">
        {courses.map((course, i) => (
          <CourseRow
            key={course.number}
            course={course}
            active={active === i}
            onEnter={() => setActive(i)}
            onLeave={() => setActive((curr) => (curr === i ? null : curr))}
          />
        ))}
      </ol>

      {/* Cursor-pinned dish preview */}
      <motion.div
        aria-hidden="true"
        className="hidden md:block absolute top-0 left-0 z-20 pointer-events-none"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <AnimatePresence>
          {active !== null ? (
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.94, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.96, filter: "blur(8px)" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden"
              style={{
                width: "22rem",
                height: "28rem",
                background: "rgba(28,24,20,0.1)",
                boxShadow:
                  "0 20px 60px rgba(28,24,20,0.35), 0 4px 10px rgba(28,24,20,0.2)",
              }}
            >
              <Image
                src={courses[active].image}
                alt={courses[active].alt}
                fill
                sizes="22rem"
                className="object-cover"
                unoptimized
              />
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 60%, rgba(28,24,20,0.6) 100%)",
                }}
              />
              <figcaption
                className="absolute bottom-4 left-4 right-4 text-[0.7rem] tracking-[0.2em] uppercase"
                style={{ color: "rgba(244,235,218,0.95)" }}
              >
                <span style={{ color: "var(--kiln-accent-soft)" }}>
                  {courses[active].number} /
                </span>{" "}
                Course
              </figcaption>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.div>

      <p
        className="mt-16 md:mt-24 kiln-display italic text-[1rem] max-w-[58ch]"
        style={{ color: "var(--kiln-muted)" }}
      >
        Dietary requirements are accommodated on 48 hours notice. A 12.5%
        service charge is added to the bill — it goes straight to the team.
      </p>
    </section>
  );
}

function CourseRow({
  course,
  active,
  onEnter,
  onLeave,
}: {
  course: Course;
  active: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  return (
    <li
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="relative grid grid-cols-[2.5rem_1fr_auto] md:grid-cols-[4rem_1fr_auto] gap-x-6 md:gap-x-10 items-baseline py-7 md:py-10"
      style={{
        borderTop: "1px solid var(--kiln-rule)",
        cursor: "crosshair",
      }}
    >
      {/* Active row underline — animates left-to-right */}
      <span
        aria-hidden="true"
        className="absolute -top-px left-0 h-[1px] origin-left"
        style={{
          width: "100%",
          background: "var(--kiln-accent)",
          transform: active ? "scaleX(1)" : "scaleX(0)",
          transition: "transform 600ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />
      <span
        className="kiln-display italic transition-colors duration-300"
        style={{
          fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)",
          color: active ? "var(--kiln-accent)" : "var(--kiln-muted)",
        }}
      >
        {course.number}
      </span>
      <div className="flex flex-col gap-1.5">
        <h3
          className="kiln-display italic font-light leading-[1.05] transition-colors duration-300"
          style={{
            fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
            color: "var(--kiln-ink)",
            letterSpacing: "-0.01em",
          }}
        >
          {course.name}
        </h3>
        <p
          className="text-[0.95rem]"
          style={{ color: "var(--kiln-muted)" }}
        >
          {course.note}
        </p>
      </div>
      <span
        aria-hidden="true"
        className="kiln-display italic transition-all duration-300"
        style={{
          color: active ? "var(--kiln-accent)" : "var(--kiln-muted)",
          fontSize: active ? "1.125rem" : "1rem",
          opacity: active ? 1 : 0.6,
        }}
      >
        {active ? "←  on the pass" : "✦"}
      </span>
    </li>
  );
}
