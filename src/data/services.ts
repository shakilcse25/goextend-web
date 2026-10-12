import {
  IconRobot,
  IconPlugConnected,
  IconDeviceMobileMessage,
  IconLayoutDashboard,
  IconServer2,
  IconDeviceMobile,
  type Icon,
} from "@tabler/icons-react";

/**
 * What GoExtend sells.
 *
 * Every entry here is something the company has ACTUALLY built and
 * shipped in production — the offline-first sync, the bKash and
 * SSLCommerz integrations, the Bengali/English product, the Play Store
 * release all exist in GoExtend Pharma. Nothing is listed because it
 * sounds good on a services page.
 *
 * That constraint is commercial, not moral: the first serious client
 * call goes "show me where you've done this", and a service you cannot
 * point at costs you the deal plus the credibility of everything else
 * on the list.
 */
export type Service = {
  /** Stable key — also the anchor id if a service ever gets its own page. */
  slug: string;
  title: string;
  /** One sentence. Shown on the card. */
  summary: string;
  /** The concrete things included, 3–4 items. Bullets on the card. */
  points: string[];
  /** Tabler icon rendered in the card's badge. */
  icon: Icon;
  /**
   * The shipped work this capability came from.
   *
   * NOT RENDERED. It used to appear as a "Shipped in …" line on each
   * card and was removed from the design. Kept as the internal record
   * of what backs each claim — useful when writing proposals or
   * deciding whether a service can honestly be offered at all.
   */
  provenFrom?: string;
  /** Exactly one service is the filled card in the grid. Giving the
   *  eye a single focal point is the difference between a grid that
   *  reads as a composition and one that reads as a table. */
  featured?: boolean;
};

export const services: Service[] = [
  {
    slug: "ai-automation",
    title: "AI Automation",
    summary:
      "Workflows that run themselves — document intake, data entry, reporting and follow-ups handled by software instead of staff.",
    points: [
      "Document and form processing pipelines",
      "Scheduled jobs with human review where it matters",
      "Cost and latency budgets agreed before launch",
      "Fallbacks for when the model gets it wrong",
    ],
    icon: IconRobot,
  },
  {
    slug: "ai-integration",
    title: "AI Integration",
    summary:
      "Language models wired into the software you already run, rather than a separate tool nobody opens.",
    points: [
      "LLM features inside existing products",
      "Retrieval over your own documents",
      "Provider-agnostic, so you are not locked in",
      "Graceful behaviour when the model is unavailable",
    ],
    icon: IconPlugConnected,
    provenFrom: "GoExtend Pharma prescription scanning",
    featured: true,
  },
  {
    slug: "ai-apps",
    title: "AI Web & Mobile Apps",
    summary:
      "Products built with AI at the core — assistants, smart search and document understanding, on web and on the phone.",
    points: [
      "React Native and Next.js front ends",
      "Streaming responses that feel instant",
      "On-device fallbacks where the network is unreliable",
      "Human review kept in the loop",
    ],
    icon: IconDeviceMobileMessage,
    provenFrom: "GoExtend Pharma prescription scanning",
  },
  {
    slug: "web-platforms",
    title: "Web platforms & dashboards",
    summary:
      "Admin consoles, customer portals and marketing sites that stay fast on a mid-range phone over mobile data.",
    points: [
      "Next.js and TypeScript",
      "Role-based admin consoles",
      "Reports and exports people actually use",
      "Built to pass Core Web Vitals, not just look good",
    ],
    icon: IconLayoutDashboard,
    provenFrom: "GoExtend Pharma admin console",
  },
  {
    slug: "backend-infrastructure",
    title: "Backend & cloud infrastructure",
    summary:
      "The part customers never see and notice immediately when it breaks: APIs, databases, jobs and deployments.",
    points: [
      "Python APIs on PostgreSQL and Redis",
      "Containerised deploys with staged environments",
      "Database migrations that run without downtime",
      "Monitoring, backups and a path back from mistakes",
    ],
    icon: IconServer2,
    provenFrom: "GoExtend Pharma API",
  },
  {
    slug: "offline-first-apps",
    title: "Offline-first mobile apps",
    summary:
      "Apps that keep working when the power cuts out and the signal drops — then sync cleanly the moment they're back.",
    points: [
      "React Native (Expo) for Android and iOS",
      "Local-first database with background sync",
      "Conflict handling that never loses a sale",
      "Bengali and English from day one",
    ],
    icon: IconDeviceMobile,
    provenFrom: "GoExtend Pharma",
  },
];
