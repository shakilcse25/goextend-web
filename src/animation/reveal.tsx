"use client";
import { motion } from "framer-motion";
import React from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Delay before the reveal starts (seconds). */
  delay?: number;
  /** Vertical offset to animate from (px). */
  y?: number;
  /**
   * How much of the element must be in view before revealing.
   *
   * Defaults to "some" (any part), not a fraction: a fraction of a tall
   * element can exceed the viewport — a stacked grid on a short phone —
   * and then the reveal never fires and the content stays invisible.
   */
  amount?: number | "some" | "all";
  once?: boolean;
}

/** Smoothly fades + slides content in when it scrolls into view. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 32,
  amount = "some",
  once = true,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount, margin: "0px 0px -15% 0px" }}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerProps {
  children: React.ReactNode;
  className?: string;
  /** Delay between each child's reveal (seconds). */
  stagger?: number;
  amount?: number | "some" | "all";
  once?: boolean;
}

/** Wrap a group of <RevealItem> to reveal them one after another. */
export function RevealStagger({
  children,
  className,
  stagger = 0.1,
  amount = "some",
  once = true,
}: StaggerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount, margin: "0px 0px -15% 0px" }}
      variants={{ visible: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </motion.div>
  );
}

interface ItemProps {
  children: React.ReactNode;
  className?: string;
  y?: number;
}

/** A single item inside a <RevealStagger>. */
export function RevealItem({ children, className, y = 28 }: ItemProps) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: EASE },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
