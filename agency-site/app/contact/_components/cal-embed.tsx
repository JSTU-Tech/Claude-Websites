/**
 * Cal.com embed slot. Swap in real Cal handle when the founder sets it up —
 * the env var path lets us deploy a placeholder while the link is being
 * approved. Wrapping the iframe in a hairline-framed container keeps the
 * editorial language consistent with the rest of the site.
 *
 * Real-world wiring (when ready):
 *   1. Install @calcom/embed-react: pnpm add @calcom/embed-react
 *   2. Replace this server component with the Cal hook for inline embedding
 *      with full theming. For now, iframe with the public link is enough.
 */

const CAL_USERNAME = process.env.NEXT_PUBLIC_CAL_USERNAME ?? "jack-stuckey";
const CAL_EVENT_TYPE =
  process.env.NEXT_PUBLIC_CAL_EVENT_TYPE ?? "intro-call";
const CAL_URL = `https://cal.com/${CAL_USERNAME}/${CAL_EVENT_TYPE}?embed=true&theme=light&brandColor=18433B`;

export function ContactCalEmbed() {
  return (
    <div className="relative border border-rule bg-paper overflow-hidden">
      <iframe
        src={CAL_URL}
        title="Book an intro call with Jack Stuckey"
        loading="lazy"
        className="w-full h-[640px] md:h-[720px] border-0"
      />
      <p className="absolute bottom-3 left-3 text-[0.6875rem] tracking-[0.08em] uppercase text-muted bg-paper/90 px-2 py-1">
        Embed placeholder — swap real Cal handle in .env
      </p>
    </div>
  );
}
