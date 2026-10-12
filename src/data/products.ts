import { products as productIndex, type Product } from "@/data/company";

/**
 * Full product entries — the index in `company.ts` plus everything a
 * product's own section and detail page needs.
 *
 * Split that way on purpose: `company.ts` holds the facts other places
 * reference (names, URLs, status) and stays small enough to read in one
 * screen, while the narrative lives here. A product added to one and
 * not the other fails the `productDetails` lookup loudly at build time
 * rather than rendering a half-empty page.
 */
export type ProductDetail = Product & {
  /**
   * The rail card's image. Separate from `shots` because the best
   * screenshot to lead with is rarely the first one in the gallery —
   * and mixing a portrait phone mockup with 2:1 web captures in one
   * row makes the rail look broken rather than varied.
   *
   * Optional: projects awaiting screenshots render a branded panel
   * instead, which is honest rather than a broken image icon.
   */
  cover?: string;
  /** The problem, in the customer's words, before any solution.
   *  Optional: a project can be listed before its case study exists. */
  problem?: string;
  /** What we built. Two or three sentences, no feature-list prose. */
  solution?: string;
  /** Headline capabilities — card bullets and detail-page highlights. */
  features?: { title: string; description: string }[];
  /** Technology, for the readers who ask. Short names, not versions. */
  stack: string[];
  /** Who it is for. Shown as the audience line. */
  audience?: string;
  /**
   * Product screenshots.
   *
   * `orientation` drives layout, not styling taste: a 900x1910 phone
   * shot and a 1400x666 desktop shot cannot share a grid cell without
   * one of them being crushed, so the gallery lays each out to its own
   * shape. Captions describe what is genuinely on screen — every one of
   * these was checked against the image rather than guessed from the
   * filename, because a caption that misdescribes a screenshot is the
   * kind of small lie a technical buyer spots immediately.
   */
  shots: {
    src: string;
    alt: string;
    caption: string;
    orientation: "phone" | "desktop";
  }[];
};

const bySlug = Object.fromEntries(productIndex.map((p) => [p.slug, p]));

/**
 * Resolve an index entry, throwing if it is missing.
 *
 * Spreading `bySlug.whatever` directly would silently produce `{}` for a
 * typo and render a product card with no name and a dead link. This
 * turns that into a build failure, which is where the mistake belongs.
 */
function base(slug: string): Product {
  const entry = bySlug[slug];
  if (!entry) {
    throw new Error(
      `products.ts: no product "${slug}" in company.ts — add it there first.`,
    );
  }
  return entry;
}

/**
 * GoExtend Pharma — the flagship, and currently the only shipped
 * product. Listing one real product beats listing five aspirational
 * ones: a prospect who finds a dead link in a product grid stops
 * believing the rest of the page.
 */
export const productDetails: ProductDetail[] = [
  {
    ...base("pharma"),
    cover: "/images/products/pharma/reports-desktop.webp",
    audience: "Independent pharmacies and small chains in Bangladesh",
    problem:
      "A pharmacy counter cannot stop. Power cuts, dead mobile data and a queue of customers are normal conditions, not edge cases — and most retail software assumes a connection it will not have. Meanwhile stock walks out the door untracked, expiry dates are caught too late, and the day's real profit is a guess.",
    solution:
      "An offline-first POS that runs entirely on the device and syncs when the network returns, so a sale never waits on a signal. Stock, expiry, customer dues, suppliers and accounts live in one app, in Bengali or English, on hardware a shop already owns.",
    features: [
      {
        title: "Sells without a connection",
        description:
          "The whole till runs locally. Sync resumes on its own, and nothing is lost in between.",
      },
      {
        title: "Stock and expiry tracking",
        description:
          "Batch-level inventory with expiry warnings early enough to return or discount stock.",
      },
      {
        title: "Customer dues",
        description:
          "Baki tracked per customer, with reminders — the ledger most shops still keep on paper.",
      },
      {
        title: "Prescription scanning",
        description:
          "Photograph a prescription and have the medicines read off it, with the pharmacist confirming.",
      },
      {
        title: "Reports that answer questions",
        description:
          "Daily profit, slow movers, cash flow — the numbers an owner actually asks for.",
      },
      {
        title: "Works on the shop's own phone",
        description:
          "Android first, with a web app for the desktop in the back office.",
      },
    ],
    stack: [
      "React Native",
      "Expo",
      "PowerSync",
      "SQLite",
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Next.js",
    ],
    shots: [
      {
        src: "/images/products/pharma/dashboard.webp",
        alt: "GoExtend Pharma dashboard in Bengali, showing tiles for stock, sales, reports, expenses, expiry, customers and dues",
        caption: "The whole shop on one screen — in Bengali",
        orientation: "phone",
      },
      {
        src: "/images/products/pharma/expiry.webp",
        alt: "Stock list filtered to medicines nearing expiry, each row showing batch count and a red expiry badge",
        caption: "Expiry caught early, batch by batch",
        orientation: "phone",
      },
      {
        src: "/images/products/pharma/receipt.webp",
        alt: "A printed pharmacy invoice with medicines, quantities, discount and total in Bengali numerals",
        caption: "Receipts customers can actually read",
        orientation: "phone",
      },
      {
        src: "/images/products/pharma/reports-desktop.webp",
        alt: "Desktop reports screen with sales count, revenue, profit, a daily chart and a best-sellers table",
        caption: "Sales, profit and best sellers on the desktop",
        orientation: "desktop",
      },
      {
        src: "/images/products/pharma/stock-desktop.webp",
        alt: "Desktop stock screen listing medicines with generic name, manufacturer, price, batch count and low-stock badges",
        caption: "The same stock, on the back-office machine",
        orientation: "desktop",
      },
    ],
  },
  {
    ...base("freightworktms"),
    cover: "/images/products/freightworktms/cover.webp",
    audience: "Freight brokers and carriers",
    problem:
      "A freight operation runs on scattered systems — loads in one tool, drivers in another, accounting in a spreadsheet. Nobody can answer where a load is and what it earned without opening four tabs.",
    solution:
      "One platform covering loads, assets, drivers, brokers, customers and accounting, with live activity visible across the whole team.",
    features: [
      {
        title: "Load management and tracking",
        description:
          "Every load's status in transit, so dispatch can answer a customer without a phone call.",
      },
      {
        title: "Assets and drivers",
        description:
          "Trucks, trailers and driver assignment scheduled and tracked in one place.",
      },
      {
        title: "Accounting and invoicing",
        description:
          "Financial reporting, invoicing and expense tracking against the loads that generated them.",
      },
      {
        title: "Teams and permissions",
        description:
          "Access levels per role, with activity visible to the people who need it.",
      },
    ],
    stack: ["React", "Node.js", "Tailwind CSS", "MongoDB", "MapBox", "AWS"],
    shots: [
      {
        src: "/images/products/freightworktms/cover.webp",
        alt: "FreightWorkTMS load management dashboard",
        caption: "Loads and live status",
        orientation: "desktop",
      },
      {
        src: "/images/products/freightworktms/shot-2.webp",
        alt: "FreightWorkTMS asset and driver management screen",
        caption: "Assets and drivers",
        orientation: "desktop",
      },
      {
        src: "/images/products/freightworktms/shot-3.webp",
        alt: "FreightWorkTMS accounting and reporting screen",
        caption: "Accounting and reporting",
        orientation: "desktop",
      },
    ],
  },
  {
    ...base("fantasybuzz"),
    cover: "/images/products/fantasybuzz/cover.webp",
    audience: "Competitive fantasy sports players",
    problem:
      "Draft day rewards whoever processed the most data beforehand. The numbers exist, but turning injury reports, form and scoring rules into a decision in the ninety seconds you have is the hard part.",
    solution:
      "A platform that runs mock drafts and produces live rankings, using language models to compress the research into a recommendation you can act on at the table.",
    features: [
      {
        title: "Mock draft simulation",
        description:
          "Practise against realistic opponents before the real draft, across league formats.",
      },
      {
        title: "Live player rankings",
        description:
          "Continuously updated from live feeds, injuries and projections.",
      },
      {
        title: "AI-driven insights",
        description:
          "Complex sports data turned into a short, specific reason to pick one player over another.",
      },
      {
        title: "Built to stay responsive",
        description:
          "Real-time sync, so what you see during a draft is current rather than cached.",
      },
    ],
    stack: ["Next.js", "NestJS", "Supabase", "LLM"],
    shots: [
      {
        src: "/images/products/fantasybuzz/cover.webp",
        alt: "FantasyBuzz draft insights dashboard",
        caption: "Draft insights",
        orientation: "desktop",
      },
      {
        src: "/images/products/fantasybuzz/shot-2.webp",
        alt: "FantasyBuzz mock draft simulation screen",
        caption: "Mock draft simulation",
        orientation: "desktop",
      },
      {
        src: "/images/products/fantasybuzz/shot-3.webp",
        alt: "FantasyBuzz player rankings screen",
        caption: "Live rankings",
        orientation: "desktop",
      },
    ],
  },
  {
    ...base("avenzo"),
    cover: "/images/products/avenzo/cover.webp",
    audience: "Direct-to-consumer retail",
    problem:
      "A theme-built store looks like every other store on the same theme, and the parts that drive conversion are the ones a theme will not let you change.",
    solution:
      "A storefront hand-built in Liquid: bespoke sections, custom product and collection pages, and Shopify's native checkout left intact so payments and trust are not reinvented.",
    features: [
      {
        title: "Bespoke sections",
        description:
          "Layouts built for this catalogue rather than adapted from a template.",
      },
      {
        title: "Product and collection pages",
        description:
          "Merchandising control over how ranges are presented and browsed.",
      },
      {
        title: "Native checkout",
        description:
          "Shopify's own checkout kept in place — the highest-converting part of the stack.",
      },
      {
        title: "Built for speed",
        description:
          "Hand-written Liquid and assets instead of a theme carrying features the store never uses.",
      },
    ],
    stack: ["Shopify", "Liquid", "JavaScript", "CSS"],
    shots: [
      {
        src: "/images/products/avenzo/cover.webp",
        alt: "Avenzo storefront home page",
        caption: "The storefront",
        orientation: "desktop",
      },
      {
        src: "/images/products/avenzo/shot-2.webp",
        alt: "Avenzo collection page",
        caption: "Collections",
        orientation: "desktop",
      },
      {
        src: "/images/products/avenzo/shot-3.webp",
        alt: "Avenzo product detail page",
        caption: "Product pages",
        orientation: "desktop",
      },
    ],
  },
  {
    ...base("framer-odoo-automation"),
    sector: "Marketing & sales ops",
    cover: "/images/products/framer-odoo-automation/cover.webp",
    stack: ["Framer", "Odoo", "n8n", "Email"],
    shots: [
      {
        src: "/images/products/framer-odoo-automation/workflow.webp",
        alt: "n8n workflow that takes a website form submission, filters spam, checks for an existing customer or lead and builds the CRM lead",
        caption: "Website form to CRM lead, in n8n",
        orientation: "desktop",
      },
    ],
  },
  {
    ...base("linkedin-rag"),
    sector: "AI content",
    cover: "/images/products/linkedin-rag/cover.webp",
    stack: ["RAG", "LLM", "Vector search", "Next.js"],
    shots: [
      {
        src: "/images/products/linkedin-rag/cover.webp",
        alt: "n8n workflow in three lanes: cataloguing documents from OneDrive, drafting posts with Gemini to keep a queue full, and approving drafts over Telegram",
        caption: "Catalogue, draft and approve — the n8n workflow",
        orientation: "desktop",
      },
    ],
  },
];

/** Lookup used by the product detail route. */
export function getProductBySlug(slug: string): ProductDetail | undefined {
  return productDetails.find((p) => p.slug === slug);
}

/** Every slug, for `getStaticPaths`. */
export const productSlugs = productDetails.map((p) => p.slug);
