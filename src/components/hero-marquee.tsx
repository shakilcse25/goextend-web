import { IconPointFilled } from "@tabler/icons-react";

/**
 * The phrases that scroll past. Kept short so several are legible at
 * once rather than one sentence crawling by.
 */
const PHRASES = [
  "Grow your vision and go beyond",
  "Offline-first mobile apps",
  "Full stack web development",
  "AI integrations & automation",
  "Shopify & SaaS products",
];

function Run() {
  return (
    <>
      {PHRASES.map((phrase) => (
        <span key={phrase} className="flex shrink-0 items-center">
          <span className="px-6 text-[15px] font-black tracking-[0.14em] whitespace-nowrap text-white uppercase sm:px-9 sm:text-[18px]">
            {phrase}
          </span>
          <IconPointFilled size={15} className="shrink-0 text-white/55" />
        </span>
      ))}
    </>
  );
}

/**
 * Diagonal band that straddles the seam between two sections.
 *
 * Rendered BETWEEN the hero and About in the page, not inside either.
 * That placement is the whole trick:
 *
 *   • Inside the hero it was clipped. The hero needs `overflow-hidden`
 *     to contain the video, and a rotated band wider than the viewport
 *     has corners well outside that box, so its lower-left was sliced
 *     off by the section's own edge.
 *   • Inside the hero it also could not reach the boundary. It sat
 *     above the hero's bottom padding with a dead gap beneath it, which
 *     is what made the two sections still look disconnected.
 *
 * The wrapper is `h-0`, so it occupies the seam exactly and adds no
 * layout height. The band is then pushed DOWN past it, far enough that
 * none of it shows on first paint — the hero is `min-h-screen`, so the
 * seam is the fold, and a band centred on it peeked into the first
 * view. The offset clears the band's full rotated height: at 4° the
 * ends sit about `0.75 * viewport * sin(4°)` below centre, plus half
 * the band itself — roughly 110px on a desktop and 45px on a phone at
 * the current type size. Change the font size or padding and these
 * offsets (and About's top padding) have to move with them.
 * Hence the responsive value — a single number would either leave it
 * visible on wide screens or strand it too low on narrow ones.
 *
 * Both neighbours leave room for it: the hero carries extra bottom
 * padding, About extra top padding. Those are not decorative; without
 * them the band lands on the stats row or the section eyebrow.
 *
 * Decorative, so `aria-hidden`: a screen reader hitting six repeated
 * marketing phrases mid-page gains nothing. Hovering pauses it, which
 * is the one accessibility affordance a moving band genuinely needs.
 */
export default function HeroMarquee() {
  return (
    <div
      aria-hidden="true"
      /* `overflow-x-clip`, NOT `overflow-hidden`. The band is 150% of
         the viewport wide, so it overflowed the document and gave the
         whole page a horizontal scrollbar. `hidden` would fix that but
         also clip vertically — and this wrapper is `h-0`, so the band
         would vanish entirely. `clip` on one axis leaves the other
         `visible`, which is precisely the case it exists for. */
      className="relative z-30 h-0 overflow-x-clip select-none"
    >
      <div className="marquee-band from-secondary-600 via-secondary to-primary pointer-events-auto absolute top-0 left-1/2 w-[150%] -translate-x-1/2 translate-y-[8px] rotate-[-4deg] overflow-hidden bg-gradient-to-r py-4 shadow-[0_20px_70px_-14px_hsl(var(--secondary)/0.9)] ring-1 ring-white/15 sm:py-5 md:translate-y-[84px]">
        <div className="marquee-track flex w-max items-center">
          <Run />
          <Run />
        </div>
      </div>
    </div>
  );
}
