"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The hero's background video.
 *
 * Split out from the hero itself because the loading policy is the
 * interesting part, not the markup.
 *
 * WHY THE VIDEO IS NOT SIMPLY AUTOPLAYED
 *   `web-banner.mp4` is 3.6 MB. This company's entire pitch is software
 *   built for power cuts and dead mobile data, so making a pharmacy
 *   owner in Naogaon pull 3.6 MB before they can read a headline would
 *   contradict the page's own argument. Instead:
 *
 *     • A 53 KB poster renders immediately and IS the design — the
 *       layout never depends on the video arriving.
 *     • The video is only attached after mount, so it never blocks
 *       first paint or competes with the LCP image.
 *     • Phones (and anything reporting a data saver or a 2g/3g
 *       connection) keep the poster and never download it at all.
 *     • `prefers-reduced-motion` keeps the poster too — this is
 *       decorative motion behind text, exactly what that setting is for.
 *
 * The element is `aria-hidden` and muted: it carries no information, and
 * an unmuted autoplay would be blocked by every browser anyway.
 */
export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // All of these checks have to run client-side — the server cannot
    // know the viewport, the connection or the motion preference.
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const small = window.matchMedia("(max-width: 767px)").matches;

    // `connection` is non-standard and absent on Safari, so every access
    // is optional — absence means "assume a normal connection".
    const conn = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    const frugal =
      conn?.saveData === true ||
      (conn?.effectiveType ? /2g|3g/.test(conn.effectiveType) : false);

    if (reduced || small || frugal) return;

    // Wait for the browser to be idle so the video never competes with
    // the fonts, the poster or hydration for bandwidth.
    const idle =
      window.requestIdleCallback?.(() => setEnabled(true), { timeout: 2500 }) ??
      window.setTimeout(() => setEnabled(true), 1200);

    return () => {
      if (window.cancelIdleCallback && typeof idle === "number") {
        window.cancelIdleCallback(idle);
      } else {
        clearTimeout(idle as unknown as number);
      }
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* The poster is a real <img>, not the video's own `poster`
          attribute: it then loads and paints even when the video is
          never attached, which is the common case on a phone. */}
      <img
        src="/images/hero/poster.webp"
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {enabled && (
        <video
          ref={videoRef}
          aria-hidden="true"
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
          onCanPlay={() => setReady(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            ready ? "opacity-100" : "opacity-0"
          }`}
        >
          <source src="/web-banner.mp4" type="video/mp4" />
        </video>
      )}

      {/* ── Edge feathering only ────────────────────────────────────
          The footage is deliberately left UNVEILED — no blanket scrim,
          no dark wash — so it reads fresh and alive rather than as a
          muted texture behind a panel. Legibility is handled where the
          text actually is instead: the headline carries its own shadow,
          and every secondary block sits on frosted glass, so the video
          stays visible through and around the content.

          What remains is only edge work, and only where the page would
          otherwise break:
            • a short fade under the navbar, so links stay readable over
              whatever frame happens to be playing behind them;
            • a fade into the page background at the very bottom, so the
              hero joins the next section instead of ending on a hard
              horizontal cut. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-52"
        style={{
          background:
            "linear-gradient(to bottom, hsl(var(--background) / 0.97) 0%, hsl(var(--background) / 0.9) 22%, hsl(var(--background) / 0.45) 58%, transparent 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-40"
        style={{
          background:
            "linear-gradient(to top, hsl(var(--background)), transparent)",
        }}
      />
    </div>
  );
}
