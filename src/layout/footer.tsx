import React from "react";
import Link from "next/link";
import {
  FaGithub,
  FaLinkedinIn,
  FaWhatsapp,
  FaFacebookF,
  FaInstagram,
  FaEnvelope,
} from "react-icons/fa";
import { IconArrowUp } from "@tabler/icons-react";
import AnimatedLogo from "@/animation/animated-logo";
import { Reveal } from "@/animation/reveal";
import {
  company,
  legalEntity,
  legalIdentifiers,
  whatsappUrl,
} from "@/data/company";
import { routes } from "@/data/navigationRoutes";

/**
 * Channels, derived from `company` rather than written out literally, so
 * an account that does not exist yet simply does not render. A footer
 * icon that opens a 404 costs more trust than a gap nobody notices.
 */
const socials = [
  {
    icon: FaWhatsapp,
    href: whatsappUrl(),
    label: "WhatsApp",
    external: true,
    enabled: Boolean(company.contact.whatsapp),
  },
  {
    icon: FaGithub,
    href: company.social.github,
    label: "GitHub",
    external: true,
    enabled: Boolean(company.social.github),
  },
  {
    icon: FaLinkedinIn,
    href: company.social.linkedin,
    label: "LinkedIn",
    external: true,
    enabled: Boolean(company.social.linkedin),
  },
  {
    icon: FaFacebookF,
    href: company.social.facebook,
    label: "Facebook",
    external: true,
    enabled: Boolean(company.social.facebook),
  },
  {
    icon: FaInstagram,
    href: company.social.instagram,
    label: "Instagram",
    external: true,
    enabled: Boolean(company.social.instagram),
  },
  {
    icon: FaEnvelope,
    href: `mailto:${company.contact.email}`,
    label: "Email",
    external: false,
    enabled: Boolean(company.contact.email),
  },
].filter((s) => s.enabled);

/** Footer nav mirrors the header, but as real `/#anchor` hrefs so the
 *  links still work from an inner page such as /products/pharma. */
const navLinks = routes
  .filter((r) => r.href !== "#home")
  .map((r) => ({ name: r.title, href: `/${r.href}` }));

/** Statutory numbers, in the order a gateway reviewer looks for them.
 *  Blank values are dropped — a WRONG licence number is worse than none. */
const identifiers = [
  { label: "Trade Licence", value: legalIdentifiers.tradeLicense },
  { label: "TIN", value: legalIdentifiers.tin },
  { label: "BIN", value: legalIdentifiers.bin },
].filter((i) => i.value);

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-border/50 bg-muted/20 relative w-full overflow-hidden border-t">
      {/* Accent glow */}
      <div className="bg-accent/10 pointer-events-none absolute top-1/4 right-[-8%] h-72 w-72 rounded-full blur-[130px]" />

      <div className="px-4 sm:px-6 md:px-14 lg:px-20">
        <div className="mx-auto w-full max-w-7xl pt-16 pb-14 md:pt-20 md:pb-16">
          <Reveal>
            {/* Big headline */}
            <h2 className="text-center text-[clamp(1.15rem,6.1vw,5.75rem)] leading-[0.95] font-black tracking-tight whitespace-nowrap uppercase">
              <span
                style={{
                  WebkitTextStroke: "1.6px hsl(var(--foreground) / 0.4)",
                  color: "transparent",
                }}
              >
                Let&apos;s Build{" "}
              </span>
              <span
                className="from-primary via-primary-300 to-secondary bg-gradient-to-r bg-clip-text text-transparent"
                style={{
                  filter: "drop-shadow(0 0 26px hsl(var(--accent) / 0.55))",
                }}
              >
                Together
              </span>
            </h2>

            {/* Logo */}
            <div className="mt-10 flex justify-center md:mt-14">
              <AnimatedLogo />
            </div>

            {/* Socials */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-4 sm:gap-x-8">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target={s.external ? "_blank" : undefined}
                  rel={s.external ? "noopener noreferrer" : undefined}
                  className="group flex items-center gap-2.5"
                >
                  <span className="bg-background text-foreground group-hover:bg-accent grid h-10 w-10 place-items-center rounded-full transition-all duration-300 group-hover:-translate-y-0.5 group-hover:text-white">
                    <s.icon className="h-[15px] w-[15px]" />
                  </span>
                  <span className="text-muted-foreground group-hover:text-foreground text-sm font-medium transition-colors duration-300">
                    {s.label}
                  </span>
                </a>
              ))}
            </div>

            {/* Nav */}
            <nav className="mt-9 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {navLinks.map((l) => (
                <Link
                  key={l.name}
                  href={l.href}
                  className="font-grotesk text-muted-foreground hover:text-accent text-sm font-semibold tracking-[0.14em] uppercase transition-colors duration-300"
                >
                  {l.name}
                </Link>
              ))}
            </nav>

            {/* Registered entity. Payment gateways check during merchant
                onboarding that the licensed business is identifiable on
                the site, so this is load-bearing, not decoration. */}
            <div className="text-muted-foreground mt-10 text-center text-xs">
              <p>
                <span className="text-foreground/80 font-semibold">
                  {legalEntity.name}
                </span>
                {" · "}
                {legalEntity.address}
              </p>
              {identifiers.length > 0 && (
                <p className="mt-1.5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
                  {identifiers.map((i) => (
                    <span key={i.label}>
                      {i.label}:{" "}
                      <span className="text-foreground/70">{i.value}</span>
                    </span>
                  ))}
                </p>
              )}
            </div>
          </Reveal>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-border/50 bg-background/40 border-t">
        <div className="px-4 sm:px-6 md:px-14 lg:px-20">
          <div className="text-muted-foreground mx-auto flex w-full max-w-7xl items-center justify-center py-5 text-center text-sm">
            <p>
              Copyright &copy;{" "}
              {company.founded === year ? year : `${company.founded}–${year}`}{" "}
              <span className="text-accent font-semibold">{company.name}</span>,
              All Rights Reserved.
            </p>
          </div>
        </div>
      </div>

      <BackToTop />
    </footer>
  );
};

const BackToTop = () => (
  <button
    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    aria-label="Back to top"
    className="group border-accent/40 bg-background/80 text-accent hover:border-accent hover:bg-accent absolute right-4 bottom-6 z-10 grid h-11 w-11 place-items-center rounded-full border backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:text-white sm:right-6 md:right-10"
  >
    <IconArrowUp size={18} stroke={2} />
  </button>
);

export default Footer;
