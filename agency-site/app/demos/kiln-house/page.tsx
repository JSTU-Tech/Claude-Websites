import Link from "next/link";
import { KilnHeroImage } from "./_components/kiln-hero-image";
import { KineticHeadline } from "./_components/kinetic-headline";
import { KilnIntro } from "./_components/kiln-intro";
import { KilnReserveDock } from "./_components/kiln-reserve-dock";
import { KilnFireMarquee } from "./_components/kiln-fire-marquee";
import { KilnKineticFooter } from "./_components/kiln-kinetic-footer";
import { KilnStory } from "./_components/kiln-story";
import { KilnMenu } from "./_components/kiln-menu";
import { KilnVisit } from "./_components/kiln-visit";
import { KilnScrollProgress } from "./_components/kiln-scroll-progress";

/**
 * Kiln House — single-page demo client site. Demonstrates the agency's
 * range: warm hospitality palette, classic editorial serif (Boska), a
 * custom WebGL ember shader, kinetic typography, scroll-pinned chapters,
 * an atmospheric photo marquee, and a giant kinetic wordmark footer.
 */

export default function KilnHousePage() {
  return (
    <>
      <KilnIntro />
      <KilnScrollProgress />
      <KilnNav />
      <Hero />
      <KilnStory />
      <KilnFireMarquee />
      <KilnMenu />
      <KilnVisit />
      <KilnKineticFooter />
      <KilnReserveDock />
    </>
  );
}

function KilnNav() {
  return (
    <nav
      aria-label="Primary"
      className="absolute top-0 left-0 right-0 z-30 px-6 md:px-12 pt-8 flex items-center justify-between"
      style={{ color: "var(--kiln-bg)" }}
    >
      <Link
        href="/demos/kiln-house"
        className="kiln-display italic text-[1.5rem] leading-none flex items-center gap-2"
        aria-label="Kiln House — home"
      >
        <span
          aria-hidden="true"
          style={{
            display: "inline-block",
            width: "0.55rem",
            height: "0.55rem",
            borderRadius: "999px",
            background: "var(--kiln-accent-soft)",
            boxShadow: "0 0 12px rgba(215,122,86,0.65)",
          }}
        />
        Kiln House
      </Link>
      <ul className="hidden md:flex items-center gap-8 text-[0.875rem]">
        <li><a href="#story" className="kiln-link">Story</a></li>
        <li><a href="#menu" className="kiln-link">Menu</a></li>
        <li><a href="#visit" className="kiln-link">Visit</a></li>
        <li>
          <a
            href="#book"
            className="inline-flex items-center gap-2 px-5 py-2 text-[0.875rem] font-medium tracking-wide transition-colors duration-200"
            style={{
              background: "var(--kiln-bg)",
              color: "var(--kiln-ink)",
            }}
          >
            Reserve
          </a>
        </li>
      </ul>
    </nav>
  );
}

function Hero() {
  return (
    <section
      className="relative min-h-[100svh] flex flex-col px-6 md:px-12 pt-32 md:pt-44 pb-12 overflow-hidden"
      style={{ background: "#0F0A07", color: "var(--kiln-bg)" }}
    >
      {/* Pulteney Bridge at dusk — slow Ken Burns + layered vignette */}
      <KilnHeroImage />

      <div className="relative grid grid-cols-1 md:grid-cols-12 gap-y-10 md:gap-x-8 flex-1">
        <div className="md:col-span-8 flex flex-col gap-9 justify-center">
          <p
            className="kiln-eyebrow"
            style={{ color: "rgba(244,235,218,0.6)" }}
          >
            Bath · Est. 2026 · 14 Pulteney Bridge
          </p>
          <KineticHeadline
            className="kiln-display italic font-light leading-[0.92] tracking-[-0.025em]"
            style={{
              fontSize: "clamp(3.75rem, 11vw, 11rem)",
              color: "var(--kiln-bg)",
            }}
            lines={[
              { words: [{ text: "Wood," }] },
              { words: [{ text: "smoke," }] },
              { words: [{ text: "and" }, { text: "patience.", accent: true }] },
            ]}
          />
          <p
            className="max-w-[44ch] text-[1.0625rem] leading-[1.6]"
            style={{ color: "rgba(244,235,218,0.82)" }}
          >
            A thirty-two-cover dining room above Pulteney Bridge. One
            wood-fire kitchen, regional wines, a seasonal menu rewritten
            twice a month. Open Wednesday through Sunday — one sitting,
            seven o&apos;clock.
          </p>

          <div className="flex flex-wrap items-center gap-6 mt-2">
            <a
              href="#book"
              className="group inline-flex items-center gap-3 px-8 py-4 text-[0.95rem] font-medium tracking-wide transition-colors duration-200"
              style={{
                background: "var(--kiln-bg)",
                color: "var(--kiln-ink)",
              }}
            >
              Reserve a table
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                &rarr;
              </span>
            </a>
            <a
              href="#menu"
              className="kiln-link text-[0.95rem]"
              style={{ color: "rgba(244,235,218,0.85)" }}
            >
              Read the menu
            </a>
          </div>
        </div>

        <aside
          className="md:col-span-3 md:col-start-10 flex flex-col justify-end gap-7"
          style={{ color: "rgba(244,235,218,0.78)" }}
        >
          <HeroSpec label="Cuisine" value="Wood-fire, regional" />
          <HeroSpec label="Hours" value="Wed–Sun, 19:00" />
          <HeroSpec label="Sitting" value="Single, 32 covers" />
          <HeroSpec label="Tasting" value="Four courses · £65" />
        </aside>
      </div>

      {/* Lower meta strip */}
      <div
        className="relative mt-14 flex flex-col md:flex-row md:items-end md:justify-between gap-4 pt-7"
        style={{ borderTop: "1px solid rgba(244,235,218,0.18)" }}
      >
        <p
          className="kiln-eyebrow"
          style={{ color: "rgba(244,235,218,0.55)" }}
        >
          Olive Mag ★★★★ · Code Hospitality ★★★★½ · Bath Life ★★★★★
        </p>
        <p
          className="kiln-display italic text-[1.0625rem]"
          style={{ color: "rgba(244,235,218,0.85)" }}
        >
          &ldquo;A room you don&apos;t want to leave.&rdquo;
        </p>
      </div>
    </section>
  );
}

function HeroSpec({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="flex flex-col gap-1 pt-3"
      style={{ borderTop: "1px solid rgba(244,235,218,0.18)" }}
    >
      <span
        className="kiln-eyebrow"
        style={{ color: "rgba(244,235,218,0.5)" }}
      >
        {label}
      </span>
      <span
        className="kiln-display italic text-[1.0625rem] leading-tight"
        style={{ color: "rgba(244,235,218,0.95)" }}
      >
        {value}
      </span>
    </div>
  );
}

