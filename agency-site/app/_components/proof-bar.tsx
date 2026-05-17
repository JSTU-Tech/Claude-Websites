// Proof bar — DESIGN.md §6 #2.
// Brief allows "4–6 client names" OR "a single big number". With no real
// client roster yet, I'm using the single-number variant tied to the
// featured concept project. Swap the metric/label in lib/studio.ts (or
// pass props) when real data lands.

const proof = {
  eyebrow: "Proof — concept project",
  number: "$284k",
  caption: "tracked in new bookings",
  qualifier: "Nine months live. Numbers verifiable in the case study below.",
} as const;

export function ProofBar() {
  return (
    <section
      aria-labelledby="proof-heading"
      className="px-6 md:px-10 py-20 md:py-28"
    >
      <h2 id="proof-heading" className="sr-only">
        Proof
      </h2>

      <div className="rule mb-12 md:mb-16" />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-y-8 md:gap-x-10 items-end">
        {/* Eyebrow column — sits left, aligned to baseline of the number */}
        <p className="eyebrow md:col-span-3">{proof.eyebrow}</p>

        {/* The number — single big display, oxblood per §3 "key numbers" */}
        <p
          className="md:col-span-6 font-display italic font-extralight text-accent leading-[0.95] tracking-[-0.02em]"
          style={{ fontSize: "var(--text-h1)" }}
        >
          {proof.number}{" "}
          <span className="font-body not-italic font-normal text-ink/85 text-[0.45em] tracking-normal leading-snug align-baseline">
            {proof.caption}
          </span>
        </p>

        {/* Qualifier — small, right-aligned on desktop */}
        <p className="md:col-span-3 text-[0.875rem] text-muted md:text-right max-w-[28ch] md:ml-auto leading-snug">
          {proof.qualifier}
        </p>
      </div>

      <div className="rule mt-12 md:mt-16" />
    </section>
  );
}
