"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { company, whatsappUrl, WHATSAPP_GREETING } from "@/data/company";
import {
  ColorEmailIcon,
  ColorFBIcon,
  ColorGITIcon,
  ColorInstraIcon,
  ColorWhatsAppIcon,
  ColorLINKIcon,
} from "./social-icons";

const grad1 = {
  initial: {
    x1: "0%",
    x2: "0%",
    y1: "80%",
    y2: "100%",
  },
  animate: {
    x1: ["0%", "0%", "200%"],
    x2: ["0%", "0%", "180%"],
    y1: ["80%", "0%", "0%"],
    y2: ["100%", "20%", "20%"],
  },
};

const grad2 = {
  initial: {
    x1: "0%",
    x2: "0%",
    y1: "80%",
    y2: "100%",
  },
  animate: {
    x1: ["20%", "100%", "100%"],
    x2: ["0%", "90%", "90%"],
    y1: ["80%", "80%", "-20%"],
    y2: ["100%", "100%", "0%"],
  },
};
const grad3 = {
  initial: {
    x1: "0%",
    x2: "0%",
    y1: "80%",
    y2: "100%",
  },
  animate: {
    x1: ["20%", "100%", "100%"],
    x2: ["0%", "90%", "90%"],
    y1: ["80%", "80%", "-20%"],
    y2: ["100%", "100%", "0%"],
  },
};
const grad4 = {
  initial: {
    x1: "40%",
    x2: "50%",
    y1: "160%",
    y2: "180%",
  },
  animate: {
    x1: "0%",
    x2: "10%",
    y1: "-40%",
    y2: "-20%",
  },
};
const grad5 = {
  initial: {
    x1: "-40%",
    x2: "-10%",
    y1: "0%",
    y2: "20%",
  },
  animate: {
    x1: ["40%", "0%", "0%"],
    x2: ["10%", "0%", "0%"],
    y1: ["0%", "0%", "180%"],
    y2: ["20%", "20%", "200%"],
  },
};
/* Mirror of grad5 — the Instagram beam is the LinkedIn beam flipped. */
const grad6 = {
  initial: {
    x1: "140%",
    x2: "110%",
    y1: "0%",
    y2: "20%",
  },
  animate: {
    x1: ["60%", "100%", "100%"],
    x2: ["90%", "100%", "100%"],
    y1: ["0%", "0%", "180%"],
    y2: ["20%", "20%", "200%"],
  },
};
export const PulseBeams = () => {
  return (
    <div className="relative flex h-[22rem] w-full items-center justify-center overflow-hidden bg-transparent antialiased sm:h-[28rem] md:h-[40rem]">
      {/* Ambient theme glow */}
      <div className="bg-accent/15 pointer-events-none absolute top-1/2 left-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px] sm:h-80 sm:w-80" />

      {/* Center "Connect" node — sized as a % of the container so it scales
          together with the beams/icons on every screen. */}
      <div className="relative z-40 flex w-full items-center justify-center">
        {/* Pulsing rings */}
        <span className="border-accent/30 absolute aspect-[2.7/1] w-[40%] max-w-[340px] animate-ping rounded-full border" />
        <span
          className="border-accent/20 absolute aspect-[2.35/1] w-[47%] max-w-[400px] animate-ping rounded-full border"
          style={{ animationDuration: "2.6s" }}
        />

        <div className="from-primary/70 to-secondary/70 group relative w-[34%] max-w-[290px] min-w-[120px] rounded-full bg-gradient-to-r p-px shadow-[0_0_45px_-8px_hsl(var(--accent)/0.55)]">
          <div className="bg-background/95 relative z-10 flex aspect-[2.6/1] w-full items-center justify-center rounded-full ring-1 ring-white/10 backdrop-blur-sm">
            {/* inner radial sheen */}
            <span className="absolute inset-0 rounded-full bg-[radial-gradient(75%_120%_at_50%_0%,hsl(var(--accent)/0.25)_0%,transparent_70%)]" />
            <span className="from-primary to-secondary-300 relative inline-block bg-gradient-to-r bg-clip-text text-[clamp(0.9rem,3.4vw,1.875rem)] font-bold tracking-wide text-transparent">
              Connect
            </span>
          </div>
        </div>
      </div>

      {/* Core SVGs component */}
      <div className="absolute inset-0 flex items-center justify-center">
        <SVGs />
      </div>
    </div>
  );
};

export const SVGs = () => {
  const [delays] = useState(() =>
    Array.from({ length: 6 }, () => Math.random() * 2),
  );
  return (
    <svg
      width="858"
      height="434"
      viewBox="0 0 900 500" // Increased viewBox height and width for better fit
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex w-full overflow-visible"
      preserveAspectRatio="xMidYMid meet"
    >
      <path
        d="M269 220.5H16.5C10.9772 220.5 6.5 224.977 6.5 230.5V398.5"
        stroke="var(--slate-800)"
      />
      <path
        d="M568 200H841C846.523 200 851 195.523 851 190V40"
        stroke="var(--slate-800)"
      />
      <path
        d="M425.5 274V333C425.5 338.523 421.023 343 415.5 343H152C146.477 343 142 347.477 142 353V426.5"
        stroke="var(--slate-800)"
      />
      <path
        d="M493 274V333.226C493 338.749 497.477 343.226 503 343.226H760C765.523 343.226 770 347.703 770 353.226V427"
        stroke="var(--slate-800)"
      />
      <path
        d="M380 168V17C380 11.4772 384.477 7 390 7H414"
        stroke="var(--slate-800)"
      />
      <path
        d="M330 168V70C330 64.4772 325.523 60 320 60H190"
        stroke="var(--slate-800)"
      />

      {/* Gradient Beams */}
      <path
        d="M269 220.5H16.5C10.9772 220.5 6.5 224.977 6.5 230.5V398.5"
        stroke="url(#grad1)"
        strokeWidth="1.5"
      />
      <path
        d="M568 200H841C846.523 200 851 195.523 851 190V40"
        stroke="url(#grad2)"
        strokeWidth="1.5"
      />
      <path
        d="M425.5 274V333C425.5 338.523 421.023 343 415.5 343H152C146.477 343 142 347.477 142 353V426.5"
        stroke="url(#grad3)"
        strokeWidth="1.5"
      />
      <path
        d="M493 274V333.226C493 338.749 497.477 343.226 503 343.226H760C765.523 343.226 770 347.703 770 353.226V427"
        stroke="url(#grad4)"
        strokeWidth="1.5"
      />
      <path
        d="M380 168V17C380 11.4772 384.477 7 390 7H414"
        stroke="url(#grad5)"
        strokeWidth="1.5"
      />
      <path
        d="M330 168V70C330 64.4772 325.523 60 320 60H190"
        stroke="url(#grad6)"
        strokeWidth="1.5"
      />

      <defs>
        <motion.linearGradient
          variants={grad5}
          animate="animate"
          initial="initial"
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear" as const,
            repeatDelay: 2,
            delay: delays[0],
          }}
          id="grad5"
        >
          <GradientColors />
        </motion.linearGradient>
        <motion.linearGradient
          variants={grad1}
          animate="animate"
          initial="initial"
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear" as const,
            repeatDelay: 2,
            delay: delays[1],
          }}
          id="grad1"
        >
          <GradientColors />
        </motion.linearGradient>
        <motion.linearGradient
          variants={grad2}
          animate="animate"
          initial="initial"
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear" as const,
            repeatDelay: 2,
            delay: delays[2],
          }}
          id="grad2"
        >
          <GradientColors />
        </motion.linearGradient>
        <motion.linearGradient
          variants={grad3}
          animate="animate"
          initial="initial"
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear" as const,
            repeatDelay: 2,
            delay: delays[3],
          }}
          id="grad3"
        >
          <GradientColors />
        </motion.linearGradient>
        <motion.linearGradient
          variants={grad4}
          animate="animate"
          initial="initial"
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear" as const,
            repeatDelay: 2,
            delay: delays[4],
          }}
          id="grad4"
        >
          <GradientColors />
        </motion.linearGradient>
        <motion.linearGradient
          variants={grad6}
          animate="animate"
          initial="initial"
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear" as const,
            repeatDelay: 2,
            delay: delays[5],
          }}
          id="grad6"
        >
          <GradientColors />
        </motion.linearGradient>
      </defs>

      {/* Channel nodes.
          Positions are fixed by the beam artwork, so each node keeps its
          coordinates and is simply omitted when we have no account for
          it — an `href=""` renders as a link that reloads the page,
          which is worse than an empty slot nobody notices. */}
      {channelNodes.map((node) => (
        <a
          key={node.key}
          href={node.href}
          target={node.href.startsWith("mailto:") ? undefined : "_blank"}
          rel={
            node.href.startsWith("mailto:") ? undefined : "noopener noreferrer"
          }
          className="social-node"
          aria-label={node.label}
        >
          <foreignObject x={node.x} y={node.y} width="140" height="140">
            <node.Icon />
          </foreignObject>
        </a>
      ))}
    </svg>
  );
};

/**
 * The six beam endpoints, in artwork order. `enabled` is what keeps a
 * channel we do not actually have off the diagram — see the note at the
 * render site.
 */
const channelNodes = [
  {
    key: "github",
    label: "GitHub",
    href: company.social.github,
    Icon: ColorGITIcon,
    x: "825",
    y: "0",
    enabled: Boolean(company.social.github),
  },
  {
    key: "facebook",
    label: "Facebook",
    href: company.social.facebook,
    Icon: ColorFBIcon,
    x: "745",
    y: "427",
    enabled: Boolean(company.social.facebook),
  },
  {
    key: "whatsapp",
    label: "WhatsApp",
    href: whatsappUrl(WHATSAPP_GREETING),
    Icon: ColorWhatsAppIcon,
    x: "117",
    y: "427",
    enabled: Boolean(company.contact.whatsapp),
  },
  {
    key: "email",
    label: "Email",
    href: `mailto:${company.contact.email}`,
    Icon: ColorEmailIcon,
    x: "0",
    y: "395",
    enabled: Boolean(company.contact.email),
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    href: company.social.linkedin,
    Icon: ColorLINKIcon,
    x: "410.5",
    y: "-15",
    enabled: Boolean(company.social.linkedin),
  },
  {
    key: "instagram",
    label: "Instagram",
    href: company.social.instagram,
    Icon: ColorInstraIcon,
    x: "115",
    y: "22.5",
    enabled: Boolean(company.social.instagram),
  },
].filter((n) => n.enabled);

const GradientColors = () => {
  return (
    <>
      <stop stopColor="#18CCFC" stopOpacity="0"></stop>
      <stop stopColor="#18CCFC"></stop>
      <stop offset="0.325" stopColor="#6344F5"></stop>
      <stop offset="1" stopColor="#AE48FF" stopOpacity="0"></stop>
    </>
  );
};
