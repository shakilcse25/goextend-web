import {
  IconWifiOff,
  IconLanguage,
  IconBrandGooglePlay,
  IconMapPin,
  type Icon,
} from "@tabler/icons-react";

/**
 * The About section's copy.
 *
 * Deliberately NO vanity metrics. A young company's "500+ happy
 * clients" is the single fastest way to lose a buyer who can count, and
 * the numbers GoExtend can honestly quote today are small. So the proof
 * on this page is capability-shaped rather than volume-shaped: things
 * that are verifiable by clicking something.
 *
 * When real numbers exist — shops running the product, transactions
 * processed, uptime measured over a year — swap them in. Until then,
 * nothing here can be contradicted.
 */

export const story = {
  heading: "A software company that ships",
  lead: "GoExtend Technologies builds the software small businesses actually run on — starting with the ones in Bangladesh that most software quietly ignores.",
  paragraphs: [
    "Most business software is written for conditions that do not exist here: constant power, reliable data, an English-speaking operator, a card terminal. A pharmacy in Naogaon has none of those guaranteed on a given evening, and the software it is sold breaks in exactly those moments.",
    "So we build the other way around. Offline first, because the connection will drop. Bengali first, because that is the language of the counter. bKash first, because that is how the country pays. The hard parts are not technical novelties — they are the unglamorous details that decide whether a shop can take the next customer's money.",
    "We are a small team that works on a small number of things properly. Everything on this site is something we have shipped and still maintain in production, not a capability deck.",
  ],
};

/** A principle we hold, with the practical consequence. */
export type Principle = {
  title: string;
  description: string;
};

export const principles: Principle[] = [
  {
    title: "Works offline, or it doesn't work",
    description:
      "If the product needs the internet to take a payment, it will fail on the day it matters most. Local-first is the default, not a feature.",
  },
  {
    title: "Built for the actual user",
    description:
      "The person using it is standing up, in a hurry, on a mid-range Android phone with a cracked screen. That constraint shapes every screen we draw.",
  },
  {
    title: "Money code gets paranoid treatment",
    description:
      "Anything touching a transaction is written to reconcile itself — verified server-side, idempotent, and recoverable when a callback never arrives.",
  },
  {
    title: "We say what we haven't done",
    description:
      "Scope we cut, features we moved to phase two, limits we hit. A client who hears it from us first never hears it from their customers.",
  },
];

/** A verifiable fact, shown as a chip. `href` makes it checkable. */
export type Fact = {
  label: string;
  value: string;
  icon: Icon;
  href?: string;
};

export const facts: Fact[] = [
  {
    label: "Live on Google Play",
    value: "GoExtend Pharma",
    icon: IconBrandGooglePlay,
    href: "https://play.google.com/store/apps/details?id=com.goextend.pharma",
  },
  {
    label: "Built offline-first",
    value: "Sells with no signal",
    icon: IconWifiOff,
  },
  {
    label: "Shipped bilingual",
    value: "বাংলা + English",
    icon: IconLanguage,
  },
  {
    label: "Based in",
    value: "Naogaon, Bangladesh",
    icon: IconMapPin,
  },
];

/**
 * Hero stat tiles.
 *
 * Deliberately capability facts, not volume metrics. A young company
 * quoting "250K+ users" is the fastest way to lose a buyer who can
 * count, and none of these can be contradicted: the product is on
 * Google Play, it genuinely runs with no connection, and it genuinely
 * ships in two languages.
 *
 * Replace them the moment real numbers exist — shops running the
 * product, transactions processed, uptime measured over a year. The
 * hero reads them from here, so it is a one-file edit.
 */
export type HeroStat = { value: string; label: string };

export const heroStats: HeroStat[] = [
  { value: "100%", label: "Offline-capable" },
  { value: "2", label: "Languages shipped" },
  { value: "1", label: "Product on Google Play" },
];
