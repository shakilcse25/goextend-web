"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

import SectionLabel from "@/components/ui/section-label";
import SectionBackground from "@/components/ui/section-background";
import { processSteps } from "@/data/process";

/**
 * Process — pinned while the steps scroll past horizontally.
 *
 * The section sticks to the viewport and converts vertical scrolling
 * into horizontal movement of the step row, then releases to the next
 * section once the last step has passed.
 *
 * HOW THE DISTANCE IS DERIVED
 *   The row is translated by exactly `rowWidth - viewportWidth`, which
 *   is measured rather than guessed. A hard-coded percentage breaks the
 *   moment a step is added, the copy gets longer, or the font loads at
 *   a different width — the row would either stop short of the last
 *   card or scroll past into empty space. A ResizeObserver keeps the
 *   measurement current.
 *
 * WHEN IT IS NOT PINNED
 *   Pinning is disabled below `md` and whenever the visitor prefers
 *   reduced motion. Converting scroll into sideways movement is
 *   precisely the kind of motion that setting exists to refuse, and on
 *   a phone it fights the browser's own scrolling. In both cases the
 *   section falls back to an ordinary horizontally scrollable row —
 *   same markup, same content, no hijacking.
 */
export default function Process() {
  const wrapper = useRef<HTMLDivElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const row = useRef<HTMLDivElement>(null);

  const reduceMotion = useReducedMotion();
  const [wide, setWide] = useState(false);
  const [distance, setDistance] = useState(0);

  const pinned = wide && !reduceMotion;

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => setWide(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useLayoutEffect(() => {
    const rowEl = row.current;
    const viewEl = viewport.current;
    if (!rowEl || !viewEl) return;
    const measure = () =>
      setDistance(Math.max(0, rowEl.scrollWidth - viewEl.clientWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(rowEl);
    ro.observe(viewEl);
    return () => ro.disconnect();
  }, []);

  // The row is moved by a plain scroll listener rather than framer's
  // `useScroll` + `useTransform`. Two things make the manual version
  // the safer choice here, both structural rather than preferential:
  //
  //   • The pin is decided client-side, so `style` is absent on the
  //     first render and only later carries a motion value.
  //   • The travel distance is measured after mount, so any range built
  //     at render time starts from zero.
  //
  // Measuring live inside the frame sidesteps both. The write is a
  // single transform on a ref'd element, batched into an animation
  // frame, which is what a scroll handler should do anyway.
  useEffect(() => {
    const wrapEl = wrapper.current;
    const rowEl = row.current;
    if (!wrapEl || !rowEl) return;

    if (!pinned) {
      rowEl.style.transform = "";
      return;
    }

    let frame = 0;
    const apply = () => {
      frame = 0;
      const viewEl = viewport.current;
      if (!viewEl) return;
      const total = wrapEl.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      // Measured here rather than read from state, so the listener can
      // never hold a stale distance from before the row was laid out.
      const dist = Math.max(0, rowEl.scrollWidth - viewEl.clientWidth);
      const progress = Math.min(
        1,
        Math.max(0, -wrapEl.getBoundingClientRect().top / total),
      );
      rowEl.style.transform = `translate3d(${-dist * progress}px, 0, 0)`;
    };
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pinned]);

  return (
    <section id="process" className="relative">
      {/* The travel distance. Taller than the viewport by the amount the
          row has to move, so the pin lasts exactly as long as there is
          something left to reveal — no dead scrolling at either end. */}
      <div
        ref={wrapper}
        style={pinned ? { height: `calc(100vh + ${distance}px)` } : undefined}
        className="relative"
      >
        {/* `pt-32` reserves the strip the sticky navbar covers, and
            `justify-center-safe` centres only while everything fits:
            plain centring spills equally past both edges, which pushed
            the heading up underneath the navbar. On a short screen the
            spill now goes to the bottom instead. */}
        <div
          className={
            pinned
              ? "sticky top-0 flex h-screen flex-col justify-center-safe overflow-hidden pt-32 pb-6"
              : "overflow-hidden py-20 sm:py-24 md:py-32"
          }
        >
          {/* Inside the sticky container deliberately: the wrapper above
              is taller than the viewport to create the pin, so a
              backdrop placed there would slide away while the pinned
              content stayed put. */}
          <SectionBackground variant={2} />

          <div className="relative px-4 sm:px-6 md:px-14 lg:px-20">
            <div className="mx-auto max-w-7xl">
              <SectionLabel>How we work</SectionLabel>
              <h2 className="font-grotesk text-foreground mt-5 max-w-3xl text-3xl leading-[1.1] font-black tracking-tight sm:text-4xl md:text-5xl">
                From first conversation to live
              </h2>
              <p className="text-muted-foreground mt-5 max-w-2xl text-base leading-relaxed sm:text-lg">
                No mystery, no open-ended hourly billing. Here is the whole
                sequence, and how long each stage honestly takes.
              </p>
            </div>
          </div>

          <div ref={viewport} className="relative mt-12 md:mt-[min(4rem,5vh)]">
            {/* Oversized outlined word, riding behind the steps. */}
            <span
              aria-hidden="true"
              className="font-grotesk pointer-events-none absolute -top-[6vw] left-1/2 hidden -translate-x-1/2 text-[18vw] leading-none font-black tracking-tight whitespace-nowrap select-none md:block"
              style={{
                color: "transparent",
                WebkitTextStroke: "2px hsl(var(--primary) / 0.4)",
              }}
            >
              PROCESS
            </span>

            <div
              ref={row}
              className={[
                "relative flex w-max items-start gap-5 px-4 sm:px-6 md:px-14 lg:px-20",
                pinned
                  ? ""
                  : "w-auto snap-x snap-mandatory scrollbar-none overflow-x-auto overflow-y-hidden pb-6",
              ].join(" ")}
            >
              {processSteps.map((step, i) => (
                <article
                  key={step.step}
                  // The staircase step shrinks on short viewports so the
                  // lowest card still fits under the pinned heading.
                  style={
                    {
                      "--lift": `calc(${i} * min(34px, 3vh))`,
                    } as React.CSSProperties
                  }
                  className="border-border/60 bg-background hover:border-primary/60 w-[78vw] max-w-[420px] shrink-0 snap-start border p-7 transition-colors duration-300 sm:w-[44vw] sm:p-8 md:mt-[var(--lift)] lg:w-[25vw]"
                >
                  <p className="text-primary font-grotesk text-2xl font-black tabular-nums sm:text-3xl">
                    {step.step}
                  </p>
                  <h3 className="font-grotesk text-foreground mt-6 text-lg leading-snug font-bold sm:text-xl">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
