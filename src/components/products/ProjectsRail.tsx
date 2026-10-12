"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";

import { Reveal } from "@/animation/reveal";
import type { ProductDetail } from "@/data/products";

/**
 * Horizontally scrolling rail of project cards.
 *
 * THE LIFT IS A MARGIN, NOT A TRANSFORM — and that is the whole reason
 * this works. `overflow-x-auto` forces the cross axis to clip too, so a
 * card pushed down with `translateY` had its title and tag row cut off
 * at the container's edge, which is exactly what happened to
 * FreightWorkTMS. A transform is visual only: the scroll container has
 * no idea the content moved. A margin participates in layout, so the
 * container grows to contain it and nothing is clipped.
 *
 * The rail is a real scroll container rather than a transform-based
 * carousel, so trackpad, touch swipe, shift-wheel and keyboard focus
 * all work without being reimplemented.
 *
 * `overflow-y-hidden` IS LOAD-BEARING. Setting only `overflow-x-auto`
 * makes the browser compute the y axis to `auto` as well, and the rail
 * does overflow vertically: cards still off to the right have not been
 * revealed yet, so they sit 32px low on <Reveal>'s starting transform.
 * That gave the rail its own small vertical scroll, and a wheel or
 * trackpad scroll that began over a card was spent on it instead of
 * the page. Hidden keeps the rail horizontal-only, so vertical
 * scrolling always passes through.
 */
export default function ProjectsRail({
  projects,
}: {
  projects: ProductDetail[];
}) {
  const rail = useRef<HTMLDivElement>(null);

  const next = () => {
    const el = rail.current;
    if (!el) return;
    // Wrap to the start at the end, so the single arrow the design
    // calls for can never strand the viewer at a dead end.
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 8;
    el.scrollTo({
      left: atEnd ? 0 : el.scrollLeft + el.clientWidth * 0.8,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      <div
        ref={rail}
        className="-mx-4 flex snap-x snap-mandatory scrollbar-none items-start gap-6 overflow-x-auto overflow-y-hidden px-4 pb-4 sm:mx-0 sm:gap-8 sm:px-0"
      >
        {projects.map((project, i) => (
          <div
            key={project.slug}
            // The staircase. A custom property because Tailwind cannot
            // generate a class from a runtime value, and `mt` rather
            // than `translate-y` for the clipping reason above.
            style={{ "--lift": `${(i % 2) * 56}px` } as React.CSSProperties}
            className="w-[76%] shrink-0 snap-start sm:w-[46%] lg:mt-[var(--lift)] lg:w-[31%]"
          >
            <Reveal delay={(i % 3) * 0.08}>
              <ProjectCard project={project} />
            </Reveal>
          </div>
        ))}
      </div>

      {/* Single circular control, as in the reference. */}
      {projects.length > 1 && (
        <button
          type="button"
          onClick={next}
          aria-label="Show more projects"
          className="bg-primary text-primary-foreground shadow-primary/40 hover:shadow-primary/60 mt-8 grid h-12 w-12 place-items-center rounded-full shadow-lg transition-all duration-300 hover:-translate-y-0.5"
        >
          <IconArrowRight size={19} stroke={2.3} />
        </button>
      )}
    </div>
  );
}

function ProjectCard({ project }: { project: ProductDetail }) {
  return (
    <Link href={`/products/${project.slug}`} className="group block">
      <div className="bg-muted/30 border-border/50 group-hover:border-primary/50 relative overflow-hidden border transition-colors duration-300">
        {project.cover ? (
          <Image
            src={project.cover}
            alt={`${project.name} screenshot`}
            width={1200}
            height={600}
            sizes="(max-width: 640px) 76vw, (max-width: 1024px) 46vw, 31vw"
            className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          /* Awaiting screenshots. A branded panel at the same 2:1 the
             real covers use, so the rail keeps its rhythm instead of
             collapsing a card to nothing. */
          <div className="from-primary-950/60 to-background relative flex aspect-[2/1] w-full items-center justify-center bg-gradient-to-br">
            <span className="font-grotesk text-foreground/15 text-5xl font-black select-none sm:text-6xl">
              {project.name.charAt(0)}
            </span>
            <span className="text-muted-foreground/70 absolute bottom-3 text-[10px] font-semibold tracking-[0.16em] uppercase">
              Screenshots soon
            </span>
          </div>
        )}
        <div
          aria-hidden="true"
          className="from-background/70 absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-40"
        />
      </div>

      <h3 className="font-grotesk text-foreground group-hover:text-primary mt-5 text-xl font-bold transition-colors duration-300 sm:text-2xl">
        {project.name}
      </h3>

      <p className="text-muted-foreground mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
        {[project.sector, ...project.stack.slice(0, 2)].map((tag) => (
          <span key={tag} className="inline-flex items-center gap-1.5">
            <span className="bg-muted-foreground/60 h-1 w-1 rounded-full" />
            {tag}
          </span>
        ))}
      </p>
    </Link>
  );
}
