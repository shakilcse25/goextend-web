import type { FC, SVGProps } from "react";
import {
  SiAnthropic,
  SiDocker,
  SiExpo,
  SiFastapi,
  SiMongodb,
  SiNextdotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRedis,
  SiSqlite,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

/** One logo'd technology. `icon` is any component that takes SVG props,
 *  which is what every react-icons component is. */
export type StackItem = {
  name: string;
  icon: FC<SVGProps<SVGSVGElement>>;
};

/** A named group of technologies, as rendered. */
export type StackGroup = {
  sectionName: string;
  skills: StackItem[];
};

/**
 * The technology GoExtend actually runs in production.
 *
 * Sourced from the GoExtend Pharma codebase rather than from a list of
 * things we would enjoy using — a stack page is a claim a technical
 * buyer will test in the first ten minutes of a call, and "we use
 * Kubernetes" is a bad thing to say to someone who then asks where.
 *
 * Icons come from `react-icons/si` instead of local SVG files: the set
 * is already a dependency, the marks are the official ones, and nothing
 * has to be redrawn by hand when a logo changes.
 */
export const STACK: StackGroup[] = [
  {
    sectionName: "Mobile",
    skills: [
      { name: "React Native", icon: SiReact },
      { name: "Expo", icon: SiExpo },
      { name: "TypeScript", icon: SiTypescript },
      { name: "SQLite", icon: SiSqlite },
    ],
  },
  {
    sectionName: "Web",
    skills: [
      { name: "Next.js", icon: SiNextdotjs },
      { name: "React", icon: SiReact },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "TypeScript", icon: SiTypescript },
    ],
  },
  {
    sectionName: "Backend",
    skills: [
      { name: "Python", icon: SiPython },
      { name: "FastAPI", icon: SiFastapi },
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "Redis", icon: SiRedis },
      { name: "MongoDB", icon: SiMongodb },
    ],
  },
  {
    sectionName: "Infrastructure & AI",
    skills: [
      { name: "Docker", icon: SiDocker },
      { name: "Claude", icon: SiAnthropic },
    ],
  },
];

/**
 * Capabilities a buyer cares about that have no logo — the things that
 * actually distinguish the work. Rendered as plain labelled chips.
 */
export const CAPABILITIES: string[] = [
  "Offline-first sync",
  "bKash direct checkout",
  "SSLCommerz",
  "Bengali + English",
  "SMS OTP",
  "Document OCR",
  "Play Store releases",
  "Multi-tenant SaaS",
];
