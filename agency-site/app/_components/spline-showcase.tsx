import { FoldMark } from "@/components/motion/fold-mark";
import { SplineScene } from "@/components/spline-scene";

/**
 * Spline showcase band — a single 3D editorial moment that sits below the
 * proof bar. Hairline-framed, paper-tone surround, no decorative blob —
 * the brief still bans those. Pick a scene URL that supports the studio's
 * editorial vocabulary (a single geometric object, low-poly, monochrome).
 *
 * Set NEXT_PUBLIC_SPLINE_SCENE_URL in .env.local to your scene's
 * splinecode URL (export from spline.design → "Export → Code → React"
 * to get the URL). Falls back to a placeholder card when unset so the
 * route still renders.
 *
 * Reference scenes worth trying:
 *   • https://spline.design/community — search "monochrome", "wireframe"
 *   • Brand-on: a single geometric object slowly rotating, ink or sage
 *     coloured, no neon, no particles.
 */

const SCENE_URL = process.env.NEXT_PUBLIC_SPLINE_SCENE_URL ?? "";

export function SplineShowcase() {
  return (
    <section
      aria-label="Studio mark"
      className="px-6 md:px-10 py-20 md:py-28 bg-paper border-y border-rule"
    >
      <FoldMark index="✦" label="Studio mark" />

      <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-12 gap-y-10 md:gap-x-10 items-center">
        <div className="md:col-span-5">
          <h2
            className="font-display font-normal leading-[1.05] tracking-[-0.015em] text-ink"
            style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}
          >
            One object. One studio.
          </h2>
          <p
            className="mt-5 text-ink/90 max-w-[42ch]"
            style={{ fontSize: "var(--text-body-lg)", lineHeight: 1.55 }}
          >
            A single mark, slowly turning. The same restraint we bring to a
            home page: one strong idea, executed properly, nothing else
            competing for attention.
          </p>
        </div>

        <div className="md:col-span-7 md:col-start-6">
          <div className="relative aspect-[5/4] bg-bg border border-rule overflow-hidden">
            {SCENE_URL ? (
              <SplineScene scene={SCENE_URL} className="!w-full !h-full" />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center px-8">
                <p className="eyebrow">Spline scene placeholder</p>
                <p className="text-ink/90 max-w-[34ch] text-[0.9375rem]">
                  Set <code className="text-accent">NEXT_PUBLIC_SPLINE_SCENE_URL</code>{" "}
                  to your scene&apos;s splinecode URL to render the 3D mark.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
