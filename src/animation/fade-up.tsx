import { ReactNode } from "react";

import { motion } from "framer-motion";

export interface FadeUpProps {
  children: ReactNode;
  duration: number;
  delay?: number;
  whileInView?: boolean;
}

export default function FadeUp({
  children,
  duration,
  delay,
  whileInView = false,
}: FadeUpProps) {
  const animation = {
    opacity: 1,
    y: 0,
    transition: {
      duration,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      delay,
    },
  };
  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      {...(whileInView
        ? { whileInView: animation, viewport: { once: true } }
        : { animate: animation })}
    >
      {children}
    </motion.div>
  );
}
