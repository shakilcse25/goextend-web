import SectionLabel from "@/components/ui/section-label";
import SectionBackground from "@/components/ui/section-background";
import { Reveal } from "@/animation/reveal";
import { productDetails } from "@/data/products";
import ProjectsRail from "./ProjectsRail";

/**
 * Projects — a scrolling rail of work, under an oversized word.
 *
 * Replaces the single expanded product panel that was here. That layout
 * could only ever show one thing well; a rail scales to however many
 * projects exist and keeps each one's detail on its own page, which is
 * where a case study belongs.
 */
export default function Products() {
  return (
    <section
      id="products"
      className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-24 md:px-14 md:py-32 lg:px-20"
    >
      <SectionBackground variant={2} />

      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <SectionLabel>Our work</SectionLabel>
          <h2 className="font-grotesk text-foreground mt-5 max-w-3xl text-3xl leading-[1.1] font-black tracking-tight sm:text-4xl md:text-5xl">
            Built by us, shipped and running
          </h2>
          <p className="text-muted-foreground mt-5 max-w-2xl text-base leading-relaxed sm:text-lg">
            Our own products and client work. Every one is live — open any of
            them and judge for yourself.
          </p>
        </Reveal>

        <div className="relative mt-14 md:mt-20">
          {/* Oversized word behind the rail, filled rather than outlined
              so it reads as a different kind of mark to the outlined
              "PROCESS" further down the page. `aria-hidden` — the
              heading above already says it. */}
          <span
            aria-hidden="true"
            className="font-grotesk text-foreground/[0.11] pointer-events-none absolute -top-[6vw] right-0 hidden text-[15vw] leading-none font-black tracking-tight whitespace-nowrap select-none md:block"
          >
            Projects
          </span>

          <div className="relative">
            <ProjectsRail projects={productDetails} />
          </div>
        </div>
      </div>
    </section>
  );
}
