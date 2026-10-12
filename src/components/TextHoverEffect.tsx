"use client";
import React, { useRef, useEffect, useLayoutEffect, useState } from "react";
import { motion } from "framer-motion";

/** Font size of the outline text, in viewBox units. */
const FONT_SIZE = 72;
/** Breathing room so the stroke is never shaved off.
 *  LEFT is deliberately tiny: the text is anchored to the left edge and
 *  sits above the hero's headline, so any left padding reads as the
 *  heading being indented relative to the column. Slack goes on the
 *  right, where it is invisible. */
const PAD_LEFT = 2;
const PAD_RIGHT = 28;
const PAD_Y = 18;

/**
 * Rough text width, used before the browser can measure the real one.
 *
 * Helvetica Bold averages ~0.56em per character over mixed-case text.
 * This is only the SSR / first-paint estimate — the layout effect below
 * replaces it with the true bounding box before paint — so an imperfect
 * guess costs nothing. It exists so the box starts close to correct
 * instead of visibly resizing on hydration.
 */
function estimateWidth(text: string) {
  return Math.ceil(text.length * FONT_SIZE * 0.56) + PAD_LEFT + PAD_RIGHT;
}

/**
 * Animated outline text.
 *
 * The viewBox is derived from the text instead of being fixed. It was
 * hard-coded to `0 0 448 100`, which happened to fit the one string the
 * template shipped with; anything longer silently overflowed and was
 * clipped at both ends by the SVG viewport — "We build software"
 * rendered as "e build softwa". Measuring means any heading fits.
 */
export const TextHoverEffect = ({
  text,
  duration,
}: {
  text: string;
  duration?: number;
  automatic?: boolean;
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const measureRef = useRef<SVGTextElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });
  const [box, setBox] = useState(() => ({
    width: estimateWidth(text),
    height: FONT_SIZE + PAD_Y * 2,
  }));

  // Measure the real glyph box and size the viewBox to it. A layout
  // effect so the correction lands before the browser paints; a plain
  // effect would show one frame at the estimated width.
  useLayoutEffect(() => {
    const node = measureRef.current;
    if (!node) return;
    try {
      const bbox = node.getBBox();
      if (bbox.width > 0) {
        setBox({
          width: Math.ceil(bbox.width) + PAD_LEFT + PAD_RIGHT,
          height: Math.ceil(bbox.height) + PAD_Y * 2,
        });
      }
    } catch {
      // getBBox throws in some engines when the node is not rendered
      // (a display:none ancestor). The estimate stays, which is a
      // perfectly usable fallback.
    }
  }, [text]);

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });
    }
  }, [cursor]);

  // Shared by every copy of the text so they stay exactly registered.
  // Anchored to the LEFT edge, not centred: this heading sits directly
  // above "GoExtend Technologies" in the hero, and a centred string in
  // a full-width box started further right than the line beneath it,
  // breaking the left margin the rest of the column shares.
  const textProps = {
    x: PAD_LEFT,
    y: "50%",
    textAnchor: "start" as const,
    dominantBaseline: "middle" as const,
    fontSize: FONT_SIZE,
    strokeWidth: 0.7,
  };

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox={`0 0 ${box.width} ${box.height}`}
      // Fit inside the container (never crop) and pin to its left edge,
      // so any leftover width shows as space on the right rather than
      // indenting the text away from the column's margin.
      preserveAspectRatio="xMinYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className="block w-full select-none"
    >
      <defs>
        <linearGradient id="textGradient" gradientUnits="userSpaceOnUse">
          {hovered && (
            <>
              <stop offset="0%" stopColor="var(--primary-300)" />
              <stop offset="25%" stopColor="var(--primary-500)" />
              <stop offset="50%" stopColor="var(--primary-400)" />
              <stop offset="75%" stopColor="var(--secondary-400)" />
              <stop offset="100%" stopColor="var(--secondary-500)" />
            </>
          )}
        </linearGradient>

        <motion.radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          r="20%"
          animate={maskPosition}
          transition={{ duration: duration ?? 0, ease: "easeOut" as const }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id="textMask">
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#revealMask)"
          />
        </mask>
      </defs>

      {/* Measurement copy: invisible and never animated, so getBBox
          reports the full glyph run rather than a partially drawn
          stroke caught mid-animation. */}
      <text
        ref={measureRef}
        {...textProps}
        strokeWidth={0}
        className="fill-transparent font-[helvetica] font-bold"
        aria-hidden="true"
      >
        {text}
      </text>

      <text
        {...textProps}
        className="stroke-foreground fill-transparent font-[helvetica] font-bold"
        style={{ opacity: hovered ? 0.7 : 0 }}
      >
        {text}
      </text>
      <motion.text
        {...textProps}
        className="stroke-foreground fill-transparent font-[helvetica] font-bold"
        initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
        animate={{
          strokeDashoffset: 0,
          strokeDasharray: 1000,
        }}
        transition={{
          duration: 4,
          ease: "easeInOut" as const,
        }}
      >
        {text}
      </motion.text>
      <text
        {...textProps}
        stroke="url(#textGradient)"
        mask="url(#textMask)"
        className="fill-transparent font-[helvetica] font-bold"
      >
        {text}
      </text>
    </svg>
  );
};
