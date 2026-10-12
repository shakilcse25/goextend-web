import Image from "next/image";

import { RevealItem, RevealStagger } from "@/animation/reveal";
import type { ProductDetail } from "@/data/products";

/**
 * Screenshot gallery.
 *
 * Phone shots and desktop shots are treated as two different kinds of
 * object, because they are:
 *
 *   PHONES  The source art already contains a device frame. Wrapping it
 *           in a bordered card produced a frame around a frame, with a
 *           light slab from the artwork's own backdrop trapped between
 *           them — which is what made this section look pasted together
 *           on a dark page. The images are now cropped to the bezel, so
 *           the device IS the frame: no card, no border, just the phone
 *           lit from behind and standing on the page.
 *
 *   DESKTOP These are raw UI captures with no chrome of their own, so
 *           they still get a bordered card. Without one they would read
 *           as a stray rectangle of UI.
 *
 * The phones are staggered vertically rather than set in a flat row. A
 * row of three identical-height devices reads as a spec sheet; offset,
 * they read as a product someone is holding.
 */
export default function ProductGallery({
  shots,
}: {
  shots: ProductDetail["shots"];
}) {
  if (shots.length === 0) return null;

  const phones = shots.filter((s) => s.orientation === "phone");
  const desktops = shots.filter((s) => s.orientation === "desktop");

  return (
    <div className="space-y-12">
      {phones.length > 0 && (
        <RevealStagger
          className="-mx-4 flex snap-x snap-mandatory scrollbar-none items-end gap-6 overflow-x-auto overflow-y-hidden px-4 pt-6 pb-8 sm:mx-0 sm:gap-9 sm:px-0"
          stagger={0.1}
        >
          {phones.map((shot, i) => (
            <RevealItem
              key={shot.src}
              className="w-[62%] shrink-0 snap-start sm:w-[42%] lg:w-[27%]"
            >
              <figure
                className="group"
                /* The middle device sits higher than its neighbours. */
                style={{ transform: `translateY(${i === 1 ? -26 : 0}px)` }}
              >
                <div className="relative transition-transform duration-500 group-hover:-translate-y-2">
                  {/* Brand bloom behind the device — this is what makes
                      it read as lit rather than pasted on. */}
                  <div
                    aria-hidden="true"
                    className="bg-primary/25 pointer-events-none absolute inset-x-2 top-6 bottom-6 rounded-full blur-3xl"
                  />
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    width={620}
                    height={1290}
                    sizes="(max-width: 640px) 62vw, (max-width: 1024px) 42vw, 27vw"
                    /* The radius masks the last slivers of the artwork's
                       backdrop left in the bezel's rounded corners. */
                    className="relative h-auto w-full rounded-[7%] drop-shadow-[0_26px_50px_rgba(0,0,0,0.65)]"
                  />
                </div>
                <figcaption className="text-muted-foreground mt-5 text-center text-xs font-medium">
                  {shot.caption}
                </figcaption>
              </figure>
            </RevealItem>
          ))}
        </RevealStagger>
      )}

      {desktops.length > 0 && (
        <RevealStagger className="grid gap-5 lg:grid-cols-2" stagger={0.1}>
          {desktops.map((shot) => (
            <RevealItem key={shot.src}>
              <figure className="group">
                <div className="border-border/60 bg-muted/20 group-hover:border-primary/50 relative overflow-hidden rounded-xl border shadow-[0_18px_44px_-18px_rgba(0,0,0,0.8)] transition-colors duration-300">
                  {/* A browser-style title bar, so a bare UI capture
                      reads as a screen rather than a floating slab. */}
                  <div className="border-border/50 bg-background/70 flex items-center gap-1.5 border-b px-3 py-2">
                    <span className="h-2 w-2 rounded-full bg-red-400/70" />
                    <span className="h-2 w-2 rounded-full bg-amber-400/70" />
                    <span className="h-2 w-2 rounded-full bg-emerald-400/70" />
                  </div>
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    width={1400}
                    height={669}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="h-auto w-full"
                  />
                </div>
                <figcaption className="text-muted-foreground mt-3 text-xs font-medium">
                  {shot.caption}
                </figcaption>
              </figure>
            </RevealItem>
          ))}
        </RevealStagger>
      )}
    </div>
  );
}
