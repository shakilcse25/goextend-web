import {
  IconCode,
  IconBrain,
  IconBuildingStore,
  IconDeviceMobileCode,
  IconApps,
  type Icon,
} from "@tabler/icons-react";

/**
 * What GoExtend focuses on — the five service lines.
 *
 * Single source for both the hero's rotating line and the About
 * section's card grid. They previously held separate copies of the same
 * list, which is exactly how a site ends up advertising four services
 * in one place and five in another.
 *
 * `category` is the small label above each card title. It exists to
 * group the five at a glance — a reader scanning the grid sees the
 * shape of the practice, not five similar-length sentences.
 */
export type FocusArea = {
  slug: string;
  /** Small uppercase label above the title. */
  category: string;
  /** The service line, as written in the hero. */
  title: string;
  /** One line, shown on the card. */
  blurb: string;
  icon: Icon;
  /** Where the card's arrow goes. */
  href: string;
  /** Exactly one entry is the filled card in the grid. */
  featured?: boolean;
};

export const focusAreas: FocusArea[] = [
  {
    slug: "web",
    category: "Web",
    title: "Full Stack Web Development",
    blurb: "Next.js front ends on Python APIs, built to stay fast on a phone.",
    icon: IconCode,
    href: "#services",
  },
  {
    slug: "ai",
    category: "AI & Automation",
    title: "AI Integrations & Automation",
    blurb: "Document understanding and assistants wired into real workflows.",
    icon: IconBrain,
    href: "#services",
    featured: true,
  },
  {
    slug: "shopify",
    category: "E-commerce",
    title: "Shopify Development",
    blurb: "Custom storefronts and themes built for conversion, not templates.",
    icon: IconBuildingStore,
    href: "#services",
  },
  {
    slug: "mobile",
    category: "Mobile",
    title: "Mobile App Development",
    blurb: "Offline-first React Native apps that survive a dropped signal.",
    icon: IconDeviceMobileCode,
    href: "#services",
  },
  {
    slug: "saas",
    category: "Product",
    title: "SaaS Product Development",
    blurb: "Multi-tenant platforms with billing, roles and a path to launch.",
    icon: IconApps,
    href: "#services",
  },
];

/** Just the titles, for the hero's rotating line. */
export const focusTitles = focusAreas.map((f) => f.title);
