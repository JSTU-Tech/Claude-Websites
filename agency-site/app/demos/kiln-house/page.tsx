import Link from "next/link";

/**
 * Kiln House — single-page demo client site. Demonstrates the agency's
 * range: warm hospitality palette, classic editorial serif (Boska), and
 * a different compositional language than the studio's own home page.
 */

export default function KilnHousePage() {
  return (
    <>
      <KilnNav />
      <Hero />
      <Story />
      <Menu />
      <Visit />
      <Footer />
    </>
  );
}

function KilnNav() {
  return (
    <nav
      aria-label="Primary"
      className="absolute top-0 left-0 right-0 z-20 px-6 md:px-12 pt-8 flex items-center justify-between"
    >
      <Link
        href="/demos/kiln-house"
        className="kiln-display italic text-[1.5rem] leading-none"
        style={{ color: "var(--kiln-ink)" }}
        aria-label="Kiln House — home"
      >
        Kiln House
      </Link>
      <ul className="flex items-center gap-8 text-[0.875rem]">
        <li><a href="#story" className="kiln-link">Story</a></li>
        <li><a href="#menu" className="kiln-link">Menu</a></li>
        <li><a href="#visit" className="kiln-link">Visit</a></li>
        <li>
          <a
            href="#book"
            className="inline-flex items-center gap-2 px-5 py-2 text-[0.875rem] font-medium tracking-wide transition-colors duration-200"
            style={{
              background: "var(--kiln-ink)",
              color: "var(--kiln-bg)",
            }}
          >
            Book a table
          </a>
        </li>
      </ul>
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative min-h-[100svh] flex flex-col px-6 md:px-12 pt-32 md:pt-44 pb-12 overflow-hidden">
      {/* Atmospheric wash — gradient warm light from the right (simulates
          the kiln glow without imagery) */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 80% 65%, rgba(176, 73, 42, 0.32), transparent 55%), radial-gradient(circle at 20% 10%, rgba(248, 230, 200, 0.6), transparent 60%)",
        }}
      />

      <div className="relative grid grid-cols-1 md:grid-cols-12 gap-y-10 md:gap-x-8 flex-1">
        <div className="md:col-span-7 flex flex-col gap-8 justify-center">
          <p className="kiln-eyebrow">Bath · Est. 2026</p>
          <h1
            className="kiln-display italic font-light leading-[0.95] tracking-[-0.02em]"
            style={{
              fontSize: "clamp(3.5rem, 9vw, 9rem)",
              color: "var(--kiln-ink)",
            }}
          >
            Wood,
            <br />
            smoke,
            <br />
            <span style={{ color: "var(--kiln-accent)" }}>and patience.</span>
          </h1>
          <p
            className="max-w-[42ch] text-[1.0625rem] leading-[1.55]"
            style={{ color: "var(--kiln-ink-soft)" }}
          >
            A 32-cover dining room above Pulteney Bridge. One wood-fire
            kitchen, regional wines, a seasonal menu rewritten twice a
            month. Open Wednesday through Sunday.
          </p>

          <div className="flex flex-wrap items-center gap-5 mt-4">
            <a
              href="#book"
              className="inline-flex items-center gap-3 px-7 py-4 text-[0.95rem] font-medium tracking-wide transition-colors duration-200"
              style={{
                background: "var(--kiln-accent)",
                color: "var(--kiln-bg)",
              }}
            >
              Book a table <span aria-hidden="true">&rarr;</span>
            </a>
            <a href="#menu" className="kiln-link text-[0.95rem]">
              See the menu
            </a>
          </div>
        </div>

        <div className="md:col-span-5 md:col-start-8 flex flex-col justify-end">
          <figure
            className="relative aspect-[4/5] overflow-hidden"
            style={{ background: "var(--kiln-bg-deep)" }}
          >
            {/* Stylised photo placeholder — warm gradient + monogram. Swap
                with a real food/room photo when shot. */}
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, #B0492A, transparent 60%), radial-gradient(circle at 70% 80%, #5A1F0F, transparent 65%), #2A1A11",
              }}
            />
            <figcaption
              className="absolute bottom-4 left-4 right-4 flex items-baseline justify-between text-[0.75rem] tracking-[0.18em] uppercase"
              style={{ color: "rgba(244, 235, 218, 0.85)" }}
            >
              <span>The kiln</span>
              <span>01 / 01</span>
            </figcaption>
          </figure>
        </div>
      </div>

      {/* Lower meta strip */}
      <div className="relative mt-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4 pt-6 kiln-rule">
        <p className="kiln-eyebrow">Wed–Sun · Dinner only</p>
        <p
          className="kiln-display italic text-[1.125rem]"
          style={{ color: "var(--kiln-ink-soft)" }}
        >
          &ldquo;A room you don&apos;t want to leave.&rdquo; — Olive Magazine
        </p>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section
      id="story"
      className="relative px-6 md:px-12 py-28 md:py-40"
      style={{ background: "var(--kiln-bg-deep)" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-12">
        <div className="md:col-span-3">
          <p className="kiln-eyebrow">Chapter 01 — The kitchen</p>
        </div>

        <div className="md:col-span-7 md:col-start-5 flex flex-col gap-8">
          <h2
            className="kiln-display italic font-light leading-[1.05] tracking-[-0.015em] max-w-[20ch]"
            style={{
              fontSize: "clamp(2.25rem, 5vw, 4rem)",
              color: "var(--kiln-ink)",
            }}
          >
            A single fire. A single chef. A different menu every fortnight.
          </h2>
          <div
            className="flex flex-col gap-5 max-w-[58ch] text-[1.0625rem] leading-[1.6]"
            style={{ color: "var(--kiln-ink-soft)" }}
          >
            <p>
              Chef Imo Ngata cooks one menu, on one wood-fire, for thirty-two
              guests a night. Four courses, paired or unpaired, with a small
              optional supplement of West Country cheese.
            </p>
            <p>
              Produce is sourced inside a forty-mile arc — Mendips lamb,
              Somerset goat&apos;s curd, garden herbs from a former
              schoolyard plot in Lansdown. What&apos;s not local is on the
              wine list, and even that leans Bristol Channel.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-6 pt-6 kiln-rule">
            <StatBlock label="Covers" value="32" />
            <StatBlock label="Service" value="One sitting" />
            <StatBlock label="Fire" value="Olive &amp; oak" />
          </div>
        </div>
      </div>
    </section>
  );
}

function StatBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-2 pt-4">
      <span className="kiln-eyebrow">{label}</span>
      <span
        className="kiln-display italic text-[1.5rem] leading-none"
        style={{ color: "var(--kiln-ink)" }}
      >
        {value}
      </span>
    </div>
  );
}

const courses = [
  {
    name: "Mendip lamb, hearth-roasted",
    note: "Burnt courgette, fermented chilli, lardo",
  },
  {
    name: "Cornish brill",
    note: "Mussel butter, sea purslane, smoked potato",
  },
  {
    name: "Somerset goat curd",
    note: "Roast cherry, honey, charred sourdough",
  },
  {
    name: "Burnt cream tart",
    note: "Olive oil, sea salt, oat-milk gelato",
  },
] as const;

function Menu() {
  return (
    <section id="menu" className="px-6 md:px-12 py-28 md:py-40">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-y-10 md:gap-x-12 items-end">
        <div className="md:col-span-7">
          <p className="kiln-eyebrow mb-6">Tasting menu — Autumn ’26</p>
          <h2
            className="kiln-display italic font-light leading-[1.02] tracking-[-0.015em] max-w-[22ch]"
            style={{
              fontSize: "clamp(2.25rem, 5.5vw, 4.25rem)",
              color: "var(--kiln-ink)",
            }}
          >
            Four courses, sixty-five pounds.
          </h2>
        </div>
        <div className="md:col-span-4 md:col-start-9">
          <p
            className="max-w-[36ch] text-[1rem] leading-[1.55]"
            style={{ color: "var(--kiln-ink-soft)" }}
          >
            Wine flight £42. Cheese supplement £9. The menu is rewritten on
            the first and fifteenth of each month — what&apos;s ready that
            week is what&apos;s served.
          </p>
        </div>
      </div>

      <ol className="mt-16 md:mt-20 flex flex-col">
        {courses.map((course, i) => (
          <li
            key={i}
            className="grid grid-cols-[3rem_1fr_auto] md:grid-cols-[4rem_1fr_auto] gap-x-6 md:gap-x-10 items-baseline py-7 md:py-9 kiln-rule first:border-t-0 transition-[background-color] duration-300 hover:cursor-default"
            style={{ borderTopColor: "var(--kiln-rule)" }}
          >
            <span
              className="kiln-display italic"
              style={{
                fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                color: "var(--kiln-accent)",
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="flex flex-col gap-1">
              <h3
                className="kiln-display italic font-light"
                style={{
                  fontSize: "clamp(1.25rem, 2.5vw, 2rem)",
                  color: "var(--kiln-ink)",
                  letterSpacing: "-0.01em",
                }}
              >
                {course.name}
              </h3>
              <p
                className="text-[0.9375rem]"
                style={{ color: "var(--kiln-muted)" }}
              >
                {course.note}
              </p>
            </div>
            <span
              aria-hidden="true"
              className="kiln-display italic"
              style={{ color: "var(--kiln-muted)" }}
            >
              ✦
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Visit() {
  return (
    <section
      id="visit"
      className="relative px-6 md:px-12 py-28 md:py-40 overflow-hidden"
      style={{ background: "var(--kiln-ink)", color: "var(--kiln-bg)" }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 75% 30%, rgba(215, 122, 86, 0.18), transparent 55%)",
        }}
      />

      <div className="relative grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-12 items-end">
        <div className="md:col-span-6">
          <p className="kiln-eyebrow" style={{ color: "rgba(244,235,218,0.55)" }}>
            Visit
          </p>
          <h2
            id="book"
            className="kiln-display italic font-light leading-[1.02] tracking-[-0.015em] mt-5 max-w-[18ch]"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              color: "var(--kiln-bg)",
            }}
          >
            14 Pulteney Bridge, BA2 4DA.
          </h2>
          <p
            className="mt-6 max-w-[44ch] text-[1.0625rem] leading-[1.6]"
            style={{ color: "rgba(244,235,218,0.85)" }}
          >
            Dinner Wednesday through Sunday, one sitting at 7pm. Pre-paid
            booking holds the seat — full refund on 48 hours notice.
          </p>

          <a
            href="https://resy.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-3 px-8 py-4 text-[0.95rem] font-medium tracking-wide transition-colors duration-200"
            style={{
              background: "var(--kiln-accent-soft)",
              color: "var(--kiln-ink)",
            }}
          >
            Book through Resy <span aria-hidden="true">&rarr;</span>
          </a>
        </div>

        <div className="md:col-span-5 md:col-start-8 flex flex-col gap-7">
          <Info label="Hours" lines={["Wed–Sun, 7pm only", "Closed Mon &amp; Tue"]} />
          <Info
            label="Reservations"
            lines={["+44 1225 555 0142", "hello@kilnhouse.uk"]}
          />
          <Info
            label="Private dining"
            lines={[
              "Up to 12 in the loft room",
              "Set menus from £85pp",
            ]}
          />
        </div>
      </div>
    </section>
  );
}

function Info({ label, lines }: { label: string; lines: string[] }) {
  return (
    <div
      className="pt-6"
      style={{ borderTop: "1px solid rgba(244,235,218,0.15)" }}
    >
      <p className="kiln-eyebrow" style={{ color: "rgba(244,235,218,0.55)" }}>
        {label}
      </p>
      <div className="mt-3 flex flex-col gap-1 text-[0.9375rem]" style={{ color: "rgba(244,235,218,0.9)" }}>
        {lines.map((line, i) => (
          <span key={i} dangerouslySetInnerHTML={{ __html: line }} />
        ))}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer
      className="px-6 md:px-12 py-10"
      style={{ background: "var(--kiln-bg-deep)" }}
    >
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div className="flex flex-col gap-2">
          <span
            className="kiln-display italic text-[1.75rem]"
            style={{ color: "var(--kiln-ink)" }}
          >
            Kiln House
          </span>
          <span
            className="kiln-eyebrow"
            style={{ color: "var(--kiln-muted)" }}
          >
            Bath · MMXXVI
          </span>
        </div>

        <div className="flex flex-col md:items-end gap-3 text-[0.8125rem]">
          <Link
            href="/"
            className="kiln-link inline-flex items-center gap-1.5"
            style={{ color: "var(--kiln-muted)" }}
          >
            Site by Stuckey <span aria-hidden="true">↗</span>
          </Link>
          <span style={{ color: "var(--kiln-muted)" }}>
            © Kiln House Ltd. Concept project — fictional client.
          </span>
        </div>
      </div>
    </footer>
  );
}
