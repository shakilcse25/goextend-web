import Image from "next/image";

/**
 * Decorative section backdrop.
 *
 * Extracted because four sections now need the same three pieces — a
 * full-bleed image plus a fade at each seam — and the About section had
 * already hand-rolled them. One copy means the feather depth cannot
 * drift between sections, which is exactly the kind of thing nobody
 * notices until two neighbours disagree.
 *
 * The art is served through `next/image` rather than a CSS background
 * so it is resized and re-encoded; the sources are ~1.1 MB PNGs, which
 * would otherwise be shipped verbatim to every visitor.
 */
export default function SectionBackground({
  variant,
  className = "",
}: {
  /** Which backdrop. They alternate down the page: 2 leans right, 3
   *  mirrors it left, so consecutive sections do not repeat. */
  variant: 1 | 2 | 3;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <Image
        src={`/images/bg/bg-${variant}.webp`}
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      {/* Feather both seams so a section does not announce itself with
          two hard horizontal lines against its neighbours. */}
      <div
        className="absolute inset-x-0 top-0 h-28"
        style={{
          background:
            "linear-gradient(to bottom, hsl(var(--background)), transparent)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-28"
        style={{
          background:
            "linear-gradient(to top, hsl(var(--background)), transparent)",
        }}
      />
    </div>
  );
}
