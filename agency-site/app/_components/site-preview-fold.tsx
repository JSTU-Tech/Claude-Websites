import { ContainerScroll } from "@/components/motion/container-scroll";
import { FoldMark } from "@/components/motion/fold-mark";

/**
 * Site preview fold — a flagship moment on the home page using the
 * ContainerScroll house primitive. As the user scrolls, the screen
 * tilts up from 20° to flat, simulating a laptop opening. Inside the
 * card lives an editorial composition of the featured concept project
 * — placeholder until real screenshots exist.
 */

export function SitePreviewFold() {
  return (
    <section
      aria-label="Studio work preview"
      className="bg-bg-deep border-y border-rule pt-16 md:pt-24"
    >
      <div className="px-6 md:px-10">
        <FoldMark index="03" label="The work" />
      </div>

      <ContainerScroll
        titleComponent={
          <div className="flex flex-col gap-4 px-6">
            <p
              className="font-display font-normal text-ink leading-[1.02] tracking-[-0.02em] mx-auto max-w-[20ch]"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
            >
              What a fixed-price site looks like.
            </p>
            <p
              className="text-ink/90 max-w-[48ch] mx-auto"
              style={{ fontSize: "var(--text-body-lg)", lineHeight: 1.5 }}
            >
              Concept project — Saltworks Plumbing. Real numbers shipping
              once the rebuild is live.
            </p>
          </div>
        }
      >
        <div className="relative h-full w-full flex flex-col">
          {/* Faux browser chrome */}
          <div className="flex items-center justify-between border-b border-rule px-4 py-2.5">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-rule" />
              <span className="h-2.5 w-2.5 rounded-full bg-rule" />
              <span className="h-2.5 w-2.5 rounded-full bg-rule" />
            </div>
            <span className="text-[0.6875rem] tracking-[0.06em] uppercase text-muted">
              saltworks-plumbing.co.uk
            </span>
            <span className="h-3 w-3" />
          </div>

          {/* Faux site composition — editorial type and a single big stat */}
          <div className="flex-1 grid grid-cols-12 grid-rows-6 gap-px bg-rule">
            <div className="col-span-12 row-span-4 bg-paper p-8 md:p-14 flex flex-col justify-end">
              <span className="eyebrow mb-3">Trades · Bristol &amp; Bath</span>
              <p
                className="font-display font-normal text-ink leading-[0.98] tracking-[-0.02em] max-w-[20ch]"
                style={{ fontSize: "clamp(1.75rem, 3.75vw, 3.5rem)" }}
              >
                Plumbing emergencies, answered in under three rings.
              </p>
            </div>
            <div className="col-span-4 row-span-2 bg-paper p-5 flex flex-col justify-between">
              <span className="eyebrow">Outcome</span>
              <span
                className="font-display font-normal text-accent leading-none tracking-[-0.02em]"
                style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.5rem)" }}
              >
                £284k
              </span>
            </div>
            <div className="col-span-4 row-span-2 bg-paper p-5 flex flex-col justify-between">
              <span className="eyebrow">Build time</span>
              <span className="text-ink text-[0.9375rem]">
                28 days, kick-off to live
              </span>
            </div>
            <div className="col-span-4 row-span-2 bg-paper p-5 flex items-center justify-end">
              <span
                aria-hidden="true"
                className="text-ink/40 text-[1.25rem]"
              >
                &rarr;
              </span>
            </div>
          </div>
        </div>
      </ContainerScroll>
    </section>
  );
}
