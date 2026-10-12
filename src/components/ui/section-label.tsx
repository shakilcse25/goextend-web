import React from "react";

interface SectionLabelProps {
  children: React.ReactNode;
  /** Center the label (with flanking lines on both sides). */
  center?: boolean;
  className?: string;
}

/**
 * Creative, reusable section eyebrow/label.
 * Left-aligned: ◆ LABEL ──▸ (trailing gradient line)
 * Centered:     ──  ◆ LABEL ◆  ── (flanked both sides)
 */
export default function SectionLabel({
  children,
  center = false,
  className = "",
}: SectionLabelProps) {
  return (
    <span
      className={`font-grotesk text-accent inline-flex items-center gap-3 text-sm font-semibold tracking-[0.2em] uppercase md:text-[15px] ${
        center ? "justify-center" : ""
      } ${className}`}
    >
      {center && (
        <span className="from-accent h-px w-10 bg-gradient-to-l to-transparent" />
      )}
      <span className="bg-accent inline-block h-2 w-2 rotate-45 shadow-[0_0_10px_hsl(var(--accent)/0.7)]" />
      <span>{children}</span>
      <span className="from-accent h-px w-10 bg-gradient-to-r to-transparent" />
    </span>
  );
}
