import Image from "next/image";
import GMark from "@/assets/images/goextend-g.png";
import { company } from "@/data/company";

/**
 * The GoExtend lockup: brand mark + wordmark.
 *
 * The full `logo.png` artwork is NOT used here. Its "Go" lettering is
 * dark navy — drawn for a light background — and this site is near
 * black, so on a dark header the word all but disappeared while only
 * "Extend" stayed readable. Using the mark (bright blue/violet on
 * transparency, legible on any ground) with the name set as live text
 * fixes the contrast, stays crisp at every size, and means the company
 * name is real text for screen readers and search rather than pixels.
 *
 * The entrance is a CSS animation rather than a framer-motion one. It
 * previously started at `opacity: 0` and was only ever revealed by JS,
 * so any run where that animation did not complete left the header with
 * no logo at all. A CSS keyframe cannot leave the element stuck
 * invisible, and it switches itself off for reduced-motion users.
 */
export default function AnimatedLogo() {
  return (
    <span className="logo-in flex items-center gap-2 md:gap-2.5">
      <Image
        src={GMark}
        alt=""
        aria-hidden="true"
        priority
        sizes="(max-width: 768px) 30px, 38px"
        className="h-[30px] w-auto md:h-[38px]"
      />
      <span className="font-grotesk text-foreground text-[19px] leading-none font-extrabold tracking-tight md:text-[23px]">
        Go<span className="text-primary">Extend</span>
      </span>
      {/* Visible to assistive tech and search, not to the eye: the
          lockup reads as "GoExtend", but the registered name is what
          belongs in the accessibility tree. */}
      <span className="sr-only">{company.name}</span>
    </span>
  );
}
