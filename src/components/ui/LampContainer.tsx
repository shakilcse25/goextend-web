"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "bg-background relative z-0 flex min-h-screen w-full flex-col items-center justify-center overflow-hidden rounded-md",
        className,
      )}
    >
      <div className="relative isolate z-0 flex w-full flex-1 scale-y-[1.8] items-center justify-center">
        <motion.div
          initial={{ opacity: 0.5, width: "8rem" }}
          whileInView={{ opacity: 1, width: "min(30rem, 80vw)" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut" as const,
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="bg-gradient-conic from-accent absolute inset-auto right-1/2 h-56 overflow-visible via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
        >
          <div className="bg-background absolute bottom-0 left-0 z-20 h-40 w-[100%] [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="bg-background absolute bottom-0 left-0 z-20 h-[100%] w-20 [mask-image:linear-gradient(to_right,white,transparent)] sm:w-40" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0.5, width: "8rem" }}
          whileInView={{ opacity: 1, width: "min(30rem, 80vw)" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut" as const,
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="bg-gradient-conic to-accent absolute inset-auto left-1/2 h-56 from-transparent via-transparent text-white [--conic-position:from_290deg_at_center_top]"
        >
          <div className="bg-background absolute right-0 bottom-0 z-20 h-[100%] w-20 [mask-image:linear-gradient(to_left,white,transparent)] sm:w-40" />
          <div className="bg-background absolute right-0 bottom-0 z-20 h-40 w-[100%] [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>
        <div className="bg-background absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 blur-2xl"></div>
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
        <div className="bg-accent absolute inset-auto z-50 h-24 w-[16rem] -translate-y-1/2 rounded-full opacity-50 blur-3xl sm:h-36 sm:w-[28rem]"></div>
        <motion.div
          initial={{ width: "4rem" }}
          whileInView={{ width: "min(16rem, 60vw)" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut" as const,
          }}
          className="bg-accent absolute inset-auto z-30 h-24 -translate-y-[6rem] rounded-full blur-2xl sm:h-36"
        ></motion.div>
        <motion.div
          initial={{ width: "8rem" }}
          whileInView={{ width: "min(30rem, 80vw)" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut" as const,
          }}
          className="bg-accent absolute inset-auto z-50 h-0.5 -translate-y-[7rem]"
        ></motion.div>

        <div className="bg-background absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem]"></div>
      </div>

      <div className="relative z-50 flex w-full flex-col items-center px-3 sm:px-5">
        {children}
      </div>
    </div>
  );
};
