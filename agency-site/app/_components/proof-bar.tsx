import {
  RevealSection,
  RevealItem,
} from "@/components/motion/reveal-section";

const proof = {
  eyebrow: "Proof — concept project",
  number: "$284k",
  caption: "tracked in new bookings",
  qualifier: "Nine months live. Numbers verifiable in the case study below.",
} as const;

export function ProofBar() {
  return (
    <RevealSection
      as="section"
      className="px-6 md:px-10 py-20 md:py-28"
      amount={0.3}
    >
      <h2 className="sr-only">Proof</h2>

      <RevealItem className="rule mb-12 md:mb-16" />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-y-8 md:gap-x-10 items-end">
        <RevealItem as="p" className="eyebrow md:col-span-3">
          {proof.eyebrow}
        </RevealItem>

        <RevealItem
          as="p"
          className="md:col-span-6 font-display italic font-extralight text-accent leading-[0.95] tracking-[-0.02em]"
          style={{ fontSize: "var(--text-h1)" }}
        >
          {proof.number}{" "}
          <span className="font-body not-italic font-normal text-ink/90 text-[0.45em] tracking-normal leading-snug align-baseline">
            {proof.caption}
          </span>
        </RevealItem>

        <RevealItem
          as="p"
          className="md:col-span-3 text-[0.875rem] text-muted md:text-right max-w-[28ch] md:ml-auto leading-snug"
        >
          {proof.qualifier}
        </RevealItem>
      </div>

      <RevealItem className="rule mt-12 md:mt-16" />
    </RevealSection>
  );
}
