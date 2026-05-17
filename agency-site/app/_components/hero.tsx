import Link from "next/link";
import { studio } from "@/lib/studio";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative flex-1 flex flex-col px-6 md:px-10 pt-10 md:pt-14 pb-10"
    >
      {/* Eyebrow row — asymmetric: studio meta left, section index right */}
      <div className="flex items-baseline justify-between">
        <p className="eyebrow">
          Studio of {studio.founderName}, {studio.year}&nbsp;—
        </p>
        <p className="eyebrow tabular-nums">Index / 01</p>
      </div>

      {/* Display headline — Boska italic extralight, §4 hero scale */}
      <h1
        id="hero-heading"
        className="font-display italic font-extralight mt-12 md:mt-16 lg:mt-20 max-w-[18ch] text-ink"
        style={{
          fontSize: "var(--text-hero)",
          lineHeight: 0.95,
          letterSpacing: "-0.02em",
        }}
      >
        I build websites that turn local searches into{" "}
        <span className="relative inline-block">
          <span className="relative z-10">booked jobs.</span>
          <span
            aria-hidden="true"
            className="absolute inset-x-0 bottom-[0.1em] h-[0.07em] bg-accent"
          />
        </span>
      </h1>

      {/* Lower row — separator, then two-column meta band */}
      <div className="rule mt-auto pt-8 md:pt-10" />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-y-8 md:gap-x-10 pt-8 md:pt-10">
        {/* Sub-headline */}
        <p
          className="md:col-span-7 lg:col-span-6 text-ink/85 max-w-[55ch]"
          style={{ fontSize: "var(--text-body-lg)", lineHeight: 1.5 }}
        >
          Most small business sites lose customers before they ever pick up the
          phone. Mine don&apos;t. I work with trades, hospitality, and
          professional services to ship sites that pay for themselves in 60–90
          days.
        </p>

        {/* CTA + founder credit */}
        <div className="md:col-span-5 lg:col-span-6 md:col-start-8 lg:col-start-7 flex flex-col items-start gap-6 md:items-end">
          <Link
            href={studio.bookingUrl}
            className="group inline-flex items-center gap-3 bg-accent text-bg px-7 py-4 text-[0.95rem] font-medium tracking-wide transition-colors duration-200 ease-[var(--ease-quart)] hover:bg-ink"
          >
            Book a call
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-200 ease-[var(--ease-quart)] group-hover:translate-x-1"
            >
              &rarr;
            </span>
          </Link>

          <div className="flex items-center gap-3 text-[0.875rem] text-muted">
            <span
              aria-hidden="true"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-rule font-display text-[0.8125rem] text-ink"
            >
              JS
            </span>
            <span>
              {studio.founderName},{" "}
              <span className="text-ink">{studio.founderRole}</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
