import { NavbarRoutes } from "@/layout/navbar";

/**
 * Primary nav. Single-page anchors, in the order the sections appear —
 * the navbar highlights by scroll position, so this array's order IS the
 * page order and the two cannot be allowed to disagree.
 */
export const routes: NavbarRoutes = [
  { title: "Home", href: "#home" },
  { title: "About", href: "#about" },
  { title: "Products", href: "#products" },
  { title: "Services", href: "#services" },
  { title: "Process", href: "#process" },
  { title: "Contact", href: "#contact" },
];
