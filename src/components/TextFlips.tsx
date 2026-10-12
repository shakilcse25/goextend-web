import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { focusTitles } from "@/data/focus";

/**
 * The rotating focus line.
 *
 * Shows one focus area at a time, unnumbered — the hero reads as a
 * sentence ("We make …"), and an index in the middle of it interrupts
 * that rather than adding information. The numbering belongs in the
 * Services section, where the list is seen all at once.
 */
const TextFlip = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((state) => (state >= focusTitles.length - 1 ? 0 : state + 1));
    }, 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="inline-flex items-baseline">
      {/* `initial={false}` suppresses the enter animation on FIRST
          mount only. Without it the first focus area starts at
          `opacity: 0` and is revealed solely by JS, so a slow
          hydration, a crawler or a failed script leaves "We make"
          followed by nothing. Subsequent swaps still animate. */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={index}
          className="from-primary-200 via-primary-300 to-secondary-300 bg-gradient-to-r bg-clip-text font-bold text-transparent"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.35 }}
          style={{ textShadow: "none" }}
        >
          {focusTitles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

export default TextFlip;
