"use client";
import { cn } from "@/lib/utils";
import { useMotionValue, motion, useMotionTemplate } from "framer-motion";
import React from "react";

export const HeroHighlight = ({
  className,
  containerClassName,
}: {
  className?: string;
  containerClassName?: string;
}) => {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) {
    if (!currentTarget) return;
    let { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }
  return (
    <div
      className={cn(
        "group relative flex w-full items-center justify-center bg-transparent",
        containerClassName,
      )}
      onMouseMove={handleMouseMove}
    >
      <div className="bg-dot-thick-neutral-200 pointer-events-none absolute inset-0" />
      <motion.div
        className="bg-dot-thick-indigo-500 pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          WebkitMaskImage: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
          maskImage: useMotionTemplate`
            radial-gradient(
              200px circle at ${mouseX}px ${mouseY}px,
              black 0%,
              transparent 100%
            )
          `,
        }}
      />

      <div className={cn("relative z-20", className)}>
        <span className="text-accent">
          {" "}
          Built for the counter, the shop floor, the road
        </span>
      </div>
    </div>
  );
};

export const Highlight = ({ className }: { className?: string }) => {
  return (
    <motion.span
      initial={{
        backgroundSize: "0% 100%",
      }}
      animate={{
        backgroundSize: "100% 100%",
      }}
      transition={{
        duration: 2,
        ease: "linear" as const,
        delay: 0.5,
      }}
      style={{
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left center",
        display: "inline-block",
      }}
      className={cn(
        `from-primary/20 to-secondary/20 relative inline-block rounded-lg bg-gradient-to-r px-2 py-2 backdrop-blur-sm`,
        className,
      )}
    >
      <span className="text-accent text-base font-bold sm:text-xl md:text-2xl">
        Software that keeps working when the signal doesn&apos;t
      </span>
    </motion.span>
  );
};
