/**
 * GoExtend Technologies — canonical company facts.
 *
 * Single source of truth for anything that must stay identical across
 * the site: identity, contact channels, the legal entity, and the
 * products we ship. Marketing COPY lives with its section; the values
 * here are the ones that would be wrong-not-just-stale if they drifted.
 *
 * Mirrors `landing/lib/site.ts` in the goextend-pharmabd repo, which is
 * the same company described from the product's side. If a fact changes
 * (a phone number, the registered address), it has to change in both —
 * payment gateways and app stores compare them.
 *
 * NOTHING here is invented. Fields we do not yet have a real value for
 * are left EMPTY and the UI simply does not render them; a plausible
 * placeholder on a live company site is worse than a visible gap,
 * because customers try it and gateways verify it.
 */

export const company = {
  /** Trading name, as used everywhere customer-facing. */
  name: "GoExtend Technologies",
  /** Short form for tight spaces (nav, footer bylines). */
  shortName: "GoExtend",

  /** Canonical production URL — no trailing slash. */
  url: "https://goextendtech.com",

  /** One line, used as the default meta description and the hero kicker. */
  tagline: "Software that runs real businesses",

  /**
   * What the company actually does, in the company's own words. Kept
   * here rather than in a section file because the About copy, the SEO
   * description and the OG card must not tell three different stories.
   */
  description:
    "GoExtend Technologies builds production software for businesses in Bangladesh and beyond — offline-first mobile apps, web platforms, and the cloud infrastructure behind them.",

  /** Where the company is registered and operates from. */
  location: {
    city: "Naogaon",
    country: "Bangladesh",
    /** As registered on the trade licence. */
    full: "Naogaon, Bangladesh",
  },

  /**
   * Contact channels, in the order a customer should try them.
   *
   * WhatsApp is first on purpose: it is how business is actually done
   * here, and it is the channel that is genuinely monitored.
   */
  contact: {
    /** wa.me format: international, no `+`, no leading zero. */
    whatsapp: "8801303529953",
    /** Pretty local form, for display only. */
    whatsappDisplay: "01303-529953",
    /** tel: href — international form with `+`. */
    phone: "+8801303529953",
    /** Business enquiries. */
    email: "goextendvibe@gmail.com",
  },

  /**
   * Social / professional profiles. Blank entries are not rendered, so
   * the footer stays honest while accounts are still being created.
   */
  social: {
    /** Shown in the footer; deliberately NOT in the hero channel row. */
    github: "https://github.com/shakilcse25",
    linkedin: "https://www.linkedin.com/company/goextend-technologies",
    facebook:
      "https://www.facebook.com/people/GoExtend-Technologies/61593915124919/",
    instagram: "https://www.instagram.com/goextendtechnologiesltd",
    /** Full https://t.me/… URL, not a bare @handle. */
    telegram: "",
    x: "",
  },

  /**
   * Founding year, used for the footer copyright range.
   *
   * Set to the earliest EVIDENCED activity — the first commit on
   * GoExtend Pharma, May 2026 — not a guess. Replace it with the date on
   * the trade licence once that is issued; the two should agree, because
   * a company site claiming to predate its own registration is exactly
   * the discrepancy a gateway reviewer notices.
   */
  founded: 2026,
} as const;

/**
 * The legal entity behind the products.
 *
 * "GoExtend Pharma" is a product; "GoExtend Technologies" is the company
 * that contracts with customers and holds the trade licence. Payment
 * gateways (SSLCommerz, bKash) verify during onboarding that the name on
 * the licence is identifiable on the website, so this must appear
 * publicly and must match the licence EXACTLY, spelling included.
 */
export const legalEntity = {
  name: company.name,
  address: company.location.full,
} as const;

/**
 * Statutory identifiers shown in the footer.
 *
 * SSLCommerz wants the trade licence number or TIN visible on the site
 * before approving a merchant account, and a missing number is a common
 * rejection. Fill each in from the certificate as it arrives — never a
 * placeholder, because a WRONG licence number on a live site is worse
 * than no number at all. Blank entries are not rendered.
 */
export const legalIdentifiers = {
  /** Trade Licence No., from the City Corporation / Union Parishad. */
  tradeLicense: "",
  /** Taxpayer's Identification Number (e-TIN). */
  tin: "",
  /** Business Identification Number (VAT registration). */
  bin: "",
} as const;

/** A shipped product, as listed on the Products section. */
export type Product = {
  slug: string;
  name: string;
  /** One line for the card. */
  summary: string;
  /** The market it serves — shown as a small label. */
  sector: string;
  /** Live marketing site, if the product has one. */
  site?: string;
  /** Web app sign-in, if it is a SaaS. */
  app?: string;
  /** Google Play listing, if it ships on Android. */
  play?: string;
  /** Shipping == publicly available. Anything else is honest about it. */
  status: "live" | "beta" | "building";
};

/**
 * Products GoExtend ships. Only things that genuinely exist — a company
 * site that lists aspirations as products is the fastest way to lose a
 * serious customer's trust on the first call.
 */
export const products: Product[] = [
  {
    slug: "pharma",
    name: "GoExtend Pharma",
    summary:
      "Offline-first POS, inventory, accounts and reports for pharmacies — built for shops that lose power and signal daily.",
    sector: "Pharmacy retail",
    site: "https://pharmabd.goextendtech.com",
    app: "https://pharmabdapp.goextendtech.com",
    play: "https://play.google.com/store/apps/details?id=com.goextend.pharma",
    status: "live",
  },
  {
    slug: "freightworktms",
    name: "FreightWorkTMS",
    summary:
      "A logistics platform for loads, assets, drivers, brokers and accounting — with real-time activity across teams.",
    sector: "Logistics & freight",
    site: "https://freightworktms.vercel.app/",
    status: "live",
  },
  {
    slug: "fantasybuzz",
    name: "FantasyBuzz",
    summary:
      "AI-driven draft insights and predictive rankings that turn raw sports data into a decision at the table.",
    sector: "Fantasy sports",
    site: "https://fanbuzzbmw.vercel.app",
    status: "live",
  },
  {
    slug: "avenzo",
    name: "Avenzo",
    summary:
      "A hand-built Liquid storefront — bespoke sections, product and collection pages, and native checkout.",
    sector: "E-commerce",
    site: "https://avenzo-wwygwmzs.myshopify.com/",
    status: "live",
  },
  {
    slug: "framer-odoo-automation",
    name: "Framer Site & Odoo CRM Automation",
    summary:
      "A Framer marketing site wired straight into Odoo CRM, with n8n handling email and lead handoff so nothing is retyped between tools.",
    sector: "Marketing & sales ops",
    status: "live",
  },
  {
    slug: "linkedin-rag",
    name: "LinkedIn Post Generator",
    summary:
      "A retrieval-augmented generator that drafts posts from your own material, so the voice stays yours instead of sounding like everyone else's.",
    sector: "AI content",
    status: "live",
  },
];

/** `https://wa.me/<number>?text=<msg>` helper for the contact CTAs. */
export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${company.contact.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Default greeting for "talk to us" buttons across the site. */
export const WHATSAPP_GREETING =
  "Hello GoExtend — I'd like to talk about a project.";
