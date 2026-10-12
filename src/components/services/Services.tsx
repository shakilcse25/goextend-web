import SectionLabel from "@/components/ui/section-label";
import SectionBackground from "@/components/ui/section-background";
import { Reveal, RevealItem, RevealStagger } from "@/animation/reveal";
import { services, type Service } from "@/data/services";

/**
 * Services — a 3×2 grid of hexagon-badged cards.
 *
 * Square corners and a hexagon icon frame are deliberate: the rest of
 * the site is built from rounded glass panels, so this section needs a
 * different silhouette or it reads as more of the same. One card is
 * filled rather than outlined, which gives the grid a focal point —
 * without it, six equal cards read as a table rather than a
 * composition.
 */
export default function Services() {
  return (
    <section
      id="services"
      className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-24 md:px-14 md:py-32 lg:px-20"
    >
      <SectionBackground variant={3} />

      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <SectionLabel>What we do</SectionLabel>
          <h2 className="font-grotesk text-foreground mt-5 max-w-3xl text-3xl leading-[1.1] font-black tracking-tight sm:text-4xl md:text-5xl">
            Services we can point at
          </h2>
          <p className="text-muted-foreground mt-5 max-w-2xl text-base leading-relaxed sm:text-lg">
            Every card below is something we have built and still run in
            production. If it is not here, we will tell you instead of learning
            on your budget.
          </p>
        </Reveal>

        <RevealStagger
          className="mt-12 grid gap-5 sm:grid-cols-2 md:mt-16 lg:grid-cols-3"
          stagger={0.07}
        >
          {services.map((service) => (
            <RevealItem key={service.slug} className="h-full">
              <ServiceCard service={service} />
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}

/** Pointy-top hexagon, drawn as an SVG so the outline is a true stroke
 *  rather than a clip-path fake that cannot be given a border. */
function Hexagon({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    >
      <polygon
        points="50,2 94,26 94,74 50,98 6,74 6,26"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={filled ? 0 : 2}
        className={filled ? "text-primary" : "text-border"}
      />
    </svg>
  );
}

function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;
  const featured = Boolean(service.featured);

  return (
    <div
      className={[
        "group relative flex h-full flex-col items-center overflow-hidden border px-7 py-12 text-center transition-all duration-300 hover:-translate-y-1",
        featured
          ? "border-secondary/50 from-secondary-700 via-secondary-800 to-secondary-900 bg-gradient-to-b shadow-[0_24px_60px_-24px_hsl(var(--secondary)/0.8)]"
          : "border-border/60 from-primary-950/45 to-background/80 hover:border-primary/50 hover:from-primary-950/70 bg-gradient-to-b",
      ].join(" ")}
    >
      {/* Topographic wash on the filled card, matching the reference's
          contour texture. Pure CSS: concentric hairline rings, far
          cheaper than shipping a background image for one card. */}
      {featured && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              "repeating-radial-gradient(circle at 28% 18%, transparent 0 22px, rgba(255,255,255,0.045) 22px 23px)",
          }}
        />
      )}

      <span className="relative grid h-[84px] w-[84px] shrink-0 place-items-center">
        <Hexagon filled={featured} />
        <Icon
          size={30}
          stroke={1.6}
          className={`relative ${featured ? "text-white" : "text-primary-300"}`}
        />
      </span>

      <h3 className="font-grotesk text-foreground relative mt-7 text-xl font-black tracking-tight sm:text-2xl">
        {service.title}
      </h3>

      <p
        className={`relative mt-4 mb-auto max-w-xs text-sm leading-relaxed ${
          featured ? "text-white/80" : "text-muted-foreground"
        }`}
      >
        {service.summary}
      </p>
    </div>
  );
}
