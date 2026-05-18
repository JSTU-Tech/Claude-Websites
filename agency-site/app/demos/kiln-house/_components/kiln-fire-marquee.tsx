"use client";

import Image from "next/image";

/**
 * Two-row infinite photo marquee — the editorial gallery between Story
 * and Menu. Top row drifts left, bottom row drifts right. CSS keyframe
 * marquee (no JS), pause on hover. Each card is a warm-toned food /
 * room photograph with a small editorial caption.
 *
 * Images are curated Unsplash hotlinks (restaurant / fire / produce).
 * Concept-project labelled — would be swapped for the restaurant's own
 * shoot in production.
 */

const ROW_A: Photo[] = [
  {
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80",
    caption: "Pass · 19:42",
    alt: "A wood-fire plated dish under low light",
    crop: { w: 760, h: 950 },
  },
  {
    src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80",
    caption: "The fire · oak & olive",
    alt: "Flames in a wood-fire oven",
    crop: { w: 720, h: 950 },
  },
  {
    src: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=1200&q=80",
    caption: "Plating · course 02",
    alt: "Hands plating a finished course",
    crop: { w: 820, h: 950 },
  },
  {
    src: "https://images.unsplash.com/photo-1547573854-74d2a71d0826?auto=format&fit=crop&w=1200&q=80",
    caption: "Pour · Loire white",
    alt: "Wine poured into a glass at the table",
    crop: { w: 700, h: 950 },
  },
  {
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    caption: "The room · 32 covers",
    alt: "Dim-lit restaurant dining room interior",
    crop: { w: 880, h: 950 },
  },
];

const ROW_B: Photo[] = [
  {
    src: "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1200&q=80",
    caption: "Plate · brill, mussel butter",
    alt: "Overhead plated white fish dish",
    crop: { w: 840, h: 760 },
  },
  {
    src: "https://images.unsplash.com/photo-1532634922-8fe0b757fb13?auto=format&fit=crop&w=1200&q=80",
    caption: "Cellar · 80 labels",
    alt: "Charcuterie and wine on a wooden board",
    crop: { w: 760, h: 760 },
  },
  {
    src: "https://images.unsplash.com/photo-1593246049226-ded77bf90326?auto=format&fit=crop&w=1200&q=80",
    caption: "Hearth · 720°C",
    alt: "Glowing embers in the wood-fire oven",
    crop: { w: 780, h: 760 },
  },
  {
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1200&q=80",
    caption: "Course 04 · burnt cream",
    alt: "Dessert burnt cream tart",
    crop: { w: 820, h: 760 },
  },
];

type Photo = {
  src: string;
  caption: string;
  alt: string;
  crop: { w: number; h: number };
};

export function KilnFireMarquee() {
  return (
    <section
      aria-label="The room and the fire"
      className="relative overflow-hidden py-24 md:py-36"
      style={{ background: "#1C0F08", color: "var(--kiln-bg)" }}
    >
      {/* Top edge ember glow */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-40 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(176, 73, 42, 0.32), transparent 70%)",
        }}
      />

      <div className="relative px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-6 mb-14 md:mb-20">
        <div className="md:col-span-3">
          <p
            className="kiln-eyebrow"
            style={{ color: "rgba(244,235,218,0.55)" }}
          >
            II — Notes from service
          </p>
        </div>
        <h2
          className="md:col-span-7 kiln-display italic font-light leading-[1.02] tracking-[-0.015em]"
          style={{
            fontSize: "clamp(1.875rem, 4vw, 3.25rem)",
            color: "var(--kiln-bg)",
          }}
        >
          Service is at seven. The fire goes in at four.
          <span style={{ color: "var(--kiln-accent-soft)" }}> Everything in between</span>
          {" "}is the menu.
        </h2>
      </div>

      <div className="relative flex flex-col gap-10">
        <MarqueeRow photos={ROW_A} direction="left" duration={68} />
        <MarqueeRow photos={ROW_B} direction="right" duration={84} />
      </div>

      <div
        className="relative mt-16 md:mt-24 px-6 md:px-12 flex items-center justify-between gap-6 pt-8"
        style={{ borderTop: "1px solid rgba(244,235,218,0.15)" }}
      >
        <p
          className="kiln-eyebrow"
          style={{ color: "rgba(244,235,218,0.55)" }}
        >
          Photography — concept demo
        </p>
        <p
          className="kiln-display italic text-[0.95rem]"
          style={{ color: "rgba(244,235,218,0.7)" }}
        >
          To be replaced with house shoot · winter ’26
        </p>
      </div>

      <style>{`
        @keyframes kiln-marquee-left {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes kiln-marquee-right {
          from { transform: translate3d(-50%, 0, 0); }
          to   { transform: translate3d(0, 0, 0); }
        }
        .kiln-marquee-track {
          animation: var(--m-name) var(--m-dur) linear infinite;
          will-change: transform;
        }
        .kiln-marquee-track:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .kiln-marquee-track { animation: none; }
        }
      `}</style>
    </section>
  );
}

function MarqueeRow({
  photos,
  direction,
  duration,
}: {
  photos: Photo[];
  direction: "left" | "right";
  duration: number;
}) {
  // Render twice for seamless loop
  const list = [...photos, ...photos];
  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="kiln-marquee-track flex gap-6 md:gap-10 w-max"
        style={
          {
            "--m-name":
              direction === "left" ? "kiln-marquee-left" : "kiln-marquee-right",
            "--m-dur": `${duration}s`,
          } as React.CSSProperties
        }
      >
        {list.map((p, i) => (
          <figure
            key={i}
            className="relative flex-shrink-0 overflow-hidden group"
            style={{
              width: `clamp(220px, ${p.crop.w / 14}vw, ${p.crop.w}px)`,
              height: `clamp(${(p.crop.h / p.crop.w) * 220}px, ${
                p.crop.h / 14
              }vw, ${p.crop.h}px)`,
              background: "rgba(244,235,218,0.06)",
            }}
          >
            <Image
              src={p.src}
              alt={p.alt}
              fill
              sizes="(max-width: 768px) 70vw, 40vw"
              className="object-cover transition-[filter] duration-700"
              style={{ filter: "saturate(0.85) brightness(0.85)" }}
              unoptimized
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(180deg, transparent 55%, rgba(28,15,8,0.78) 100%)",
              }}
            />
            <figcaption
              className="absolute bottom-4 left-4 right-4 flex items-baseline justify-between text-[0.7rem] tracking-[0.18em] uppercase"
              style={{ color: "rgba(244,235,218,0.92)" }}
            >
              <span>{p.caption}</span>
              <span style={{ color: "var(--kiln-accent-soft)" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
