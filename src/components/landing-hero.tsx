import {
  FaWhatsapp,
  FaLinkedinIn,
  FaTelegramPlane,
  FaFacebookF,
  FaInstagram,
  FaEnvelope,
} from "react-icons/fa";
import { IconArrowRight } from "@tabler/icons-react";

import FadeUp from "@/animation/fade-up";
import HeroVideo from "./hero-video";
import HeroAiWidget from "./hero-ai-widget";
import TextFlip from "./TextFlips";
import { company, whatsappUrl, WHATSAPP_GREETING } from "@/data/company";
import { heroStats } from "@/data/about";

/**
 * Channels shown beside the stats.
 *
 * Built from `company` so an account that does not exist yet is simply
 * absent rather than a dead icon — the rule the footer and contact
 * section already follow. GitHub is intentionally not here: it belongs
 * in the footer, not in a hero aimed at buyers rather than developers.
 *
 * Telegram has no account yet; it renders as soon as its URL is filled
 * in at `src/data/company.ts`.
 */
const channels = [
  {
    icon: FaWhatsapp,
    href: whatsappUrl(WHATSAPP_GREETING),
    label: "WhatsApp",
    enabled: Boolean(company.contact.whatsapp),
  },
  {
    icon: FaLinkedinIn,
    href: company.social.linkedin,
    label: "LinkedIn",
    enabled: Boolean(company.social.linkedin),
  },
  {
    icon: FaTelegramPlane,
    href: company.social.telegram,
    label: "Telegram",
    enabled: Boolean(company.social.telegram),
  },
  {
    icon: FaFacebookF,
    href: company.social.facebook,
    label: "Facebook",
    enabled: Boolean(company.social.facebook),
  },
  {
    icon: FaInstagram,
    href: company.social.instagram,
    label: "Instagram",
    enabled: Boolean(company.social.instagram),
  },
  {
    icon: FaEnvelope,
    href: `mailto:${company.contact.email}`,
    label: "Email",
    enabled: Boolean(company.contact.email),
  },
].filter((c) => c.enabled);

/** Smooth-scroll to a section without pushing a hash onto the URL. */
const scrollTo = (selector: string) => {
  const el = document.querySelector(selector);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 100;
  window.scrollTo({ top, behavior: "smooth" });
};

/**
 * Hero — narrow left rail, display headline right, live video behind.
 *
 * The video is NOT dimmed. Legibility is solved locally instead of with
 * a blanket scrim: the headline carries its own shadow, and every
 * secondary block (the AI card, the proof strip) sits on frosted glass.
 * The footage therefore stays vivid and visible between and through the
 * content rather than being reduced to a dark texture.
 *
 * On anything below `lg` the two columns stack and the headline leads —
 * the AI card is supporting material, so on a phone it belongs after
 * the message, not above it.
 */
export default function LandingHero() {
  return (
    <section
      id="home"
      className="relative -mt-[72px] flex min-h-[96svh] flex-col justify-center overflow-hidden pt-[104px] pb-32 sm:-mt-[96px] sm:pt-[128px] md:-mt-[128px] md:min-h-screen md:pt-[150px] md:pb-40"
    >
      <HeroVideo />

      <div className="relative z-10 px-4 sm:px-6 md:px-14 lg:px-20">
        <div className="mx-auto w-full max-w-7xl">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,330px)] lg:gap-14">
            {/* ── Left rail: AI widget ───────────────────────────── */}
            {/* Assistant rail. The `order` classes MUST live on the grid
                child itself — they were once on a div nested inside
                <FadeUp>, which is what the grid actually lays out, so
                they did nothing and the card jumped above the headline
                on narrow screens. It sits right of the message on `lg`
                and below it everywhere else, because the card is
                supporting material, not the lead. */}
            <div className="order-2 w-full lg:order-2">
              <FadeUp duration={0.7} delay={0.25}>
                {/* This label sat as bare `text-primary` over the
                    brightest part of the footage and was effectively
                    invisible. It now gets its own glass chip and a live
                    dot, so it reads at a glance and introduces the card
                    rather than floating above it. */}
                <span className="border-primary/40 bg-background/50 mb-3 hidden items-center gap-2 rounded-full border px-3 py-1.5 backdrop-blur-md lg:inline-flex">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="bg-primary absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
                    <span className="bg-primary relative inline-flex h-1.5 w-1.5 rounded-full" />
                  </span>
                  <span className="text-primary-200 text-[11px] font-bold tracking-[0.16em] uppercase">
                    Ask our assistant
                  </span>
                </span>
                <HeroAiWidget />
              </FadeUp>
            </div>

            {/* ── Right: the message ─────────────────────────────── */}
            <div className="order-1 lg:order-1">
              <FadeUp duration={0.6}>
                {/* Plain uppercase lockup, per the reference: no rule,
                    no dot, no serif. The brand tint and wide tracking
                    are the whole treatment — anything more competes
                    with the headline directly beneath it. */}
                <p className="from-primary-200 to-secondary-300 bg-gradient-to-r bg-clip-text text-[11px] font-bold tracking-[0.3em] text-transparent uppercase sm:text-sm">
                  Welcome to {company.name}
                </p>
              </FadeUp>

              <FadeUp duration={0.6} delay={0.1}>
                {/* The shadow is what replaces the scrim: it keeps the
                    type readable over any frame of the video without
                    putting a dark panel between viewer and footage. */}
                <h1
                  className="font-grotesk text-foreground mt-5 text-[2.3rem] leading-[0.98] font-black tracking-tight sm:mt-6 sm:text-6xl md:text-7xl lg:text-[4.6rem] xl:text-[5.4rem]"
                  style={{
                    textShadow:
                      "0 2px 28px hsl(var(--background) / 0.95), 0 1px 4px hsl(var(--background) / 0.9)",
                  }}
                >
                  Grow your vision
                  <br />
                  and{" "}
                  <span
                    className="from-primary-200 via-primary-300 to-secondary-300 bg-gradient-to-r bg-clip-text text-transparent"
                    style={{
                      // `textShadow: none` is essential, not tidiness.
                      // The h1 sets a dark text-shadow for legibility,
                      // and a child with `bg-clip-text text-transparent`
                      // INHERITS it — the shadow then paints behind the
                      // transparent glyphs, so the gradient reads as
                      // near-black. Separation comes from a drop-shadow
                      // filter instead, which applies to the painted
                      // gradient rather than the (empty) text layer.
                      textShadow: "none",
                      filter:
                        "drop-shadow(0 2px 10px hsl(var(--background) / 0.95)) drop-shadow(0 0 34px hsl(var(--primary) / 0.5))",
                    }}
                  >
                    go beyond
                  </span>
                </h1>
              </FadeUp>

              <FadeUp duration={0.6} delay={0.2}>
                <div
                  className="text-foreground mt-4 flex flex-wrap items-baseline gap-x-2 text-base font-semibold sm:mt-5 sm:text-xl md:text-2xl"
                  style={{
                    textShadow: "0 1px 16px hsl(var(--background) / 0.95)",
                  }}
                >
                  <span className="text-muted-foreground">We make</span>
                  <TextFlip />
                </div>
              </FadeUp>

              {/* Calls to action.
                  Both buttons carry an explicit `h-12` and a border —
                  transparent on the gradient one. Sizing them by padding
                  alone made them UNEQUAL, because only the outline
                  button had a real border, and that 1px top and bottom
                  left it 2px taller than its neighbour. Fixing the box
                  height removes the whole class of mismatch rather than
                  compensating for this one instance of it. */}
              <FadeUp duration={0.6} delay={0.3}>
                <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:items-center">
                  <button
                    type="button"
                    onClick={() => scrollTo("#products")}
                    className="from-primary to-primary-600 text-primary-foreground shadow-primary/40 hover:shadow-primary/60 group inline-flex h-12 items-center justify-center gap-2 rounded-full border border-transparent bg-gradient-to-r px-6 text-sm font-bold shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                  >
                    See our work
                    <IconArrowRight
                      size={17}
                      stroke={2.3}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </button>
                  <a
                    href={whatsappUrl(WHATSAPP_GREETING)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-border/80 bg-background/35 text-foreground hover:border-primary hover:text-primary inline-flex h-12 items-center justify-center gap-2 rounded-full border px-6 text-sm font-bold backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <FaWhatsapp className="h-[17px] w-[17px]" />
                    Start a project
                  </a>
                </div>
              </FadeUp>

              {/* Stat row + channels, in the shape of the reference
                  hero's bottom band. The VALUES are capability facts
                  rather than invented volume metrics — see the note on
                  `heroStats` in data/about.ts for how to swap in real
                  numbers once they exist. */}
              <FadeUp duration={0.6} delay={0.4}>
                <div className="border-border/50 bg-background/30 mt-9 flex flex-wrap items-center gap-x-4 gap-y-5 rounded-2xl border px-5 py-4 backdrop-blur-md sm:mt-11 sm:gap-x-7">
                  {heroStats.map((stat, i) => (
                    <div key={stat.label} className="flex items-center gap-4">
                      {i > 0 && (
                        <span
                          aria-hidden="true"
                          className="bg-border/70 hidden h-9 w-px sm:block"
                        />
                      )}
                      <div>
                        <p className="font-grotesk from-primary-200 to-secondary-300 bg-gradient-to-r bg-clip-text text-xl font-black text-transparent sm:text-2xl">
                          {stat.value}
                        </p>
                        <p className="text-muted-foreground text-[10px] font-semibold tracking-wide uppercase sm:text-[11px]">
                          {stat.label}
                        </p>
                      </div>
                    </div>
                  ))}

                  {/* Channels, pushed right like the reference's social
                      cluster. Only the ones that exist render. */}
                  <div className="ml-auto flex items-center gap-2">
                    {channels.map((c) => (
                      <a
                        key={c.label}
                        href={c.href}
                        aria-label={c.label}
                        target={
                          c.href.startsWith("mailto:") ? undefined : "_blank"
                        }
                        rel={
                          c.href.startsWith("mailto:")
                            ? undefined
                            : "noopener noreferrer"
                        }
                        className="border-border/70 bg-background/50 text-muted-foreground hover:border-primary hover:text-primary grid h-9 w-9 place-items-center rounded-full border transition-all duration-300 hover:-translate-y-0.5"
                      >
                        <c.icon className="h-[15px] w-[15px]" />
                      </a>
                    ))}
                  </div>
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
