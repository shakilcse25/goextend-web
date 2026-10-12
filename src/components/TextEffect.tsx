import { cn } from "@/lib/utils";

/** The paragraph finishes revealing within this many seconds, however
 *  many words it has. */
const TOTAL_REVEAL_SECONDS = 1.4;
/** Never slower than this per word, so a short line still staggers. */
const MAX_PER_WORD = 0.07;

/**
 * Word-by-word reveal for a block of copy.
 *
 * Driven entirely by CSS (`.word-reveal` in globals.css), not by
 * JavaScript. Two bugs motivated that:
 *
 *   1. The original used `stagger(0.2)`, so this fifty-word paragraph
 *      took TEN SECONDS to finish appearing. The per-word delay is now
 *      derived from the word count, so any length lands in ~1.4s.
 *   2. More seriously, the starting `opacity: 0` and `blur(10px)` were
 *      INLINE styles cleared only by the JS animation. Anything that
 *      prevented it running — a reduced-motion preference, a failed
 *      hydration, a crawler, reader mode — left the hero's primary
 *      description permanently blank or blurred. Hidden body text in
 *      the hero is both an accessibility failure and an SEO one.
 *
 * With CSS, no-JS means no animation, which means plain readable text.
 * The component is also now a server component — no "use client", no
 * framer-motion in the bundle for this.
 */
export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.45,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}) => {
  const wordsArray = words.split(" ");
  const perWord = Math.min(
    MAX_PER_WORD,
    TOTAL_REVEAL_SECONDS / Math.max(wordsArray.length, 1),
  );

  return (
    <div className={cn("mt-4 font-normal sm:mt-6 md:mt-8", className)}>
      <div className="mt-2 sm:mt-4">
        <div className="text-foreground/80 text-xs leading-relaxed tracking-wide sm:text-sm md:text-xl md:leading-snug">
          <p className={filter ? "word-reveal" : undefined}>
            {wordsArray.map((word, idx) => (
              <span
                key={word + idx}
                className="text-muted-foreground"
                style={{
                  // Only timing is inline. If the animation never runs,
                  // these are inert and the word renders normally.
                  animationDelay: `${(idx * perWord).toFixed(3)}s`,
                  animationDuration: `${duration}s`,
                }}
              >
                {word}{" "}
              </span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
};
