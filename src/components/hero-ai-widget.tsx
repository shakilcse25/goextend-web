import { IconArrowUp, IconSparkles } from "@tabler/icons-react";

/**
 * Hero AI widget — PLACEHOLDER.
 *
 * Deliberately non-functional: nothing is wired to a model, the input
 * is disabled and the "conversation" is fixed copy. It exists so the
 * hero's left rail has its intended shape and weight while the real
 * assistant is built, and it is labelled "Preview" / "coming soon" so
 * no visitor mistakes it for something they can use.
 *
 * It is NOT a grey box. A dead placeholder in the most prominent column
 * of the page makes the whole site look unfinished, so this is built as
 * the real card will be: a gradient-lit glass frame over the video, a
 * sample exchange, an equaliser, and the input that will later take
 * focus. Swapping the dummy data for a real transport should leave the
 * markup largely intact.
 *
 * Glass rather than a solid fill is the point — the hero video stays
 * visible through and around the card instead of being covered up.
 */
export default function HeroAiWidget() {
  return (
    /* Gradient frame: a 1px padded wrapper whose background is the brand
       gradient gives a lit edge a plain `border` cannot, and it is what
       makes the card read as the focal object of the rail rather than a
       dim panel floating on the video. */
    <div className="from-primary/80 via-secondary/45 rounded-[18px] bg-gradient-to-br to-transparent p-px shadow-[0_30px_80px_-28px_hsl(var(--primary)/0.9)]">
      <div className="bg-background/55 relative overflow-hidden rounded-[17px] backdrop-blur-2xl">
        <div
          aria-hidden="true"
          className="via-primary absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent to-transparent"
        />
        <div
          aria-hidden="true"
          className="bg-primary/25 pointer-events-none absolute -top-12 -right-10 h-36 w-36 rounded-full blur-3xl"
        />

        <div className="border-border/50 relative flex items-center justify-between border-b px-4 py-3">
          <span className="flex items-center gap-2">
            <span className="from-primary to-secondary text-primary-foreground grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br shadow-[0_0_18px_-2px_hsl(var(--primary)/0.9)]">
              <IconSparkles size={15} stroke={2} />
            </span>
            <span className="text-foreground text-[13px] font-bold">
              GoExtend AI
            </span>
          </span>
          <span className="border-primary/40 bg-primary/15 text-primary-200 rounded-full border px-2 py-0.5 text-[9px] font-bold tracking-[0.12em] uppercase">
            Preview
          </span>
        </div>

        <div className="relative space-y-3 px-4 py-4">
          <div className="flex justify-end">
            <p className="from-primary/30 to-primary/15 border-primary/30 text-foreground max-w-[88%] rounded-2xl rounded-br-sm border bg-gradient-to-br px-3 py-2 text-[12px] leading-relaxed">
              Can you build an app that works without internet?
            </p>
          </div>

          <div className="flex justify-start">
            <div className="bg-muted/45 border-border/60 max-w-[92%] rounded-2xl rounded-bl-sm border px-3 py-2.5">
              <p className="text-foreground/80 text-[12px] leading-relaxed">
                Yes — that is what we build. GoExtend Pharma sells through power
                cuts and syncs when the signal returns.
              </p>

              <div
                className="mt-2.5 flex items-end gap-[3px]"
                aria-hidden="true"
              >
                {[0.0, 0.18, 0.36, 0.12, 0.44, 0.26, 0.08].map((delay, i) => (
                  <span
                    key={i}
                    className="ai-bar from-primary to-secondary h-3.5 w-[3px] rounded-full bg-gradient-to-t"
                    style={{ animationDelay: `${delay}s` }}
                  />
                ))}
                <span className="text-muted-foreground ml-2 text-[10px] font-semibold">
                  thinking
                </span>
                {[0, 0.15, 0.3].map((d, i) => (
                  <span
                    key={i}
                    className="ai-dot bg-primary ml-[2px] h-1 w-1 rounded-full"
                    style={{ animationDelay: `${d}s` }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-start">
            <div className="bg-muted/35 border-border/50 w-[72%] space-y-1.5 rounded-2xl rounded-bl-sm border px-3 py-2.5">
              <span className="ai-sheen block h-1.5 w-full rounded-full" />
              <span className="ai-sheen block h-1.5 w-[78%] rounded-full" />
            </div>
          </div>
        </div>

        <div className="border-border/50 relative border-t px-3 py-3">
          <div className="border-border/70 bg-background/60 focus-within:border-primary/60 flex items-center gap-2 rounded-xl border px-3 py-2 transition-colors">
            <input
              type="text"
              disabled
              aria-label="Ask GoExtend AI (coming soon)"
              placeholder="Ask about our work…"
              className="text-foreground placeholder:text-muted-foreground/80 min-w-0 flex-1 bg-transparent text-[12px] outline-none"
            />
            <span
              aria-hidden="true"
              className="from-primary to-secondary text-primary-foreground grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-gradient-to-br"
            >
              <IconArrowUp size={13} stroke={2.6} />
            </span>
          </div>
          <p className="text-muted-foreground mt-2 text-center text-[10px] font-medium">
            Assistant coming soon
          </p>
        </div>
      </div>
    </div>
  );
}
