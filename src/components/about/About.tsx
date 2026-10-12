import Link from "next/link";
import { IconArrowUpRight, IconMessage2 } from "@tabler/icons-react";

import SectionBackground from "@/components/ui/section-background";

import { Reveal } from "@/animation/reveal";
import { story } from "@/data/about";
import { focusAreas, type FocusArea } from "@/data/focus";
import { whatsappUrl, WHATSAPP_GREETING } from "@/data/company";

/**
 * About — intro block plus an offset grid of the five focus areas.
 *
 * The grid is a 4-column staircase rather than a plain row: the intro
 * occupies the first two columns of row one, two cards fill the rest of
 * it, and row two carries the remaining three cards plus the contact
 * prompt. That asymmetry is what stops five similar cards reading as a
 * spreadsheet, and it is why the layout is written as explicit column
 * spans instead of `grid-flow`.
 */
export default function About() {
  return (
    <section id="about" className="relative overflow-hidden">
      <SectionBackground variant={1} />

      <div className="relative px-4 pt-32 pb-20 sm:px-6 sm:pt-36 sm:pb-24 md:px-14 md:pt-64 md:pb-32 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {/* ── Intro: first two columns of row one ─────────────── */}
            <Reveal className="md:col-span-2 lg:pr-8">
              <span className="text-primary inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.22em] uppercase">
                <span className="bg-primary h-2 w-2 rotate-45 shadow-[0_0_10px_hsl(var(--primary)/0.9)]" />
                What we do
              </span>

              <h2 className="font-grotesk text-foreground mt-5 text-3xl leading-[1.08] font-black tracking-tight sm:text-4xl md:text-5xl">
                {story.heading}
              </h2>

              <p className="text-muted-foreground mt-5 max-w-lg text-sm leading-relaxed sm:text-base">
                {story.lead}
              </p>

              <Link
                href="#services"
                className="text-foreground hover:text-primary group mt-7 inline-flex items-center gap-2 text-sm font-bold transition-colors duration-300"
              >
                See all services
                <span className="border-border/70 group-hover:border-primary grid h-7 w-7 place-items-center rounded-full border transition-colors duration-300">
                  <IconArrowUpRight size={14} stroke={2.2} />
                </span>
              </Link>
            </Reveal>

            {/* ── Cards 1–2 complete row one, 3–5 open row two ────────
                Each card is its own <Reveal>, not an item in a
                `display: contents` stagger group: an element with no
                box cannot be observed entering the viewport, so the
                cards inside one stayed at opacity 0. */}
            {focusAreas.map((area, i) => (
              <Reveal key={area.slug} delay={(i % 3) * 0.08}>
                <FocusCard area={area} />
              </Reveal>
            ))}

            {/* ── Contact prompt closes row two ───────────────────── */}
            <Reveal delay={0.1}>
              <div className="flex h-full flex-col justify-center md:pl-2">
                <span className="text-secondary-300 inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.18em] uppercase">
                  <IconMessage2 size={14} stroke={2} />
                  Still deciding?
                </span>
                <p className="font-grotesk text-foreground mt-3 text-xl leading-snug font-black sm:text-2xl">
                  Just send us a message
                </p>
                <a
                  href={whatsappUrl(WHATSAPP_GREETING)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="from-primary to-primary-600 text-primary-foreground shadow-primary/30 hover:shadow-primary/50 mt-5 inline-flex h-11 w-fit items-center gap-2 rounded-xl bg-gradient-to-r px-5 text-sm font-bold shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                >
                  Contact us
                  <IconArrowUpRight size={15} stroke={2.4} />
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * One focus-area card.
 *
 * The featured variant is filled with the brand gradient; the rest are
 * glass. Exactly one card carries `featured`, which gives the grid a
 * focal point without the eye having to choose between five equals.
 */
function FocusCard({ area }: { area: FocusArea }) {
  const Icon = area.icon;

  if (area.featured) {
    return (
      <Link
        href={area.href}
        className="from-primary to-primary-700 shadow-primary/40 group flex h-full flex-col rounded-2xl bg-gradient-to-br p-5 shadow-xl transition-transform duration-300 hover:-translate-y-1"
      >
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/15 text-white backdrop-blur-sm">
          <Icon size={20} stroke={1.8} />
        </span>
        <p className="mt-5 text-[10px] font-bold tracking-[0.16em] text-white/70 uppercase">
          {area.category}
        </p>
        <h3 className="mt-1.5 text-base leading-snug font-bold text-white">
          {area.title}
        </h3>
        <p className="mt-2 text-xs leading-relaxed text-white/75">
          {area.blurb}
        </p>
        <span className="mt-auto grid h-8 w-8 translate-y-4 place-items-center rounded-full bg-white/20 text-white transition-transform duration-300 group-hover:translate-x-1">
          <IconArrowUpRight size={15} stroke={2.2} />
        </span>
      </Link>
    );
  }

  return (
    <Link
      href={area.href}
      className="border-border/60 bg-background/40 hover:border-primary/50 group flex h-full flex-col rounded-2xl border p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1"
    >
      <span className="bg-primary/12 text-primary group-hover:bg-primary group-hover:text-primary-foreground grid h-11 w-11 place-items-center rounded-xl transition-colors duration-300">
        <Icon size={20} stroke={1.8} />
      </span>
      <p className="text-muted-foreground mt-5 text-[10px] font-bold tracking-[0.16em] uppercase">
        {area.category}
      </p>
      <h3 className="text-foreground mt-1.5 text-base leading-snug font-bold">
        {area.title}
      </h3>
      <p className="text-muted-foreground mt-2 text-xs leading-relaxed">
        {area.blurb}
      </p>
      <span className="border-border/70 text-muted-foreground group-hover:border-primary group-hover:text-primary mt-auto grid h-8 w-8 translate-y-4 place-items-center rounded-full border transition-all duration-300 group-hover:translate-x-1">
        <IconArrowUpRight size={15} stroke={2.2} />
      </span>
    </Link>
  );
}
