import { useEffect, useState } from "react";
import Link from "next/link";

import { AnimatePresence, motion } from "framer-motion";

import MenuLogo from "@/components/utility/menu-button";
import AnimatedLogo from "@/animation/animated-logo";
import MobileMenu from "@/components/utility/mobile-menu";
import { useRouter } from "next/router";

const scrollToElement = (element: Element, offset = 0) => {
  const top = element.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top, behavior: "smooth" });
};

export type NavbarRoute = {
  title: string;
  href: string;
};

export type NavbarRoutes = NavbarRoute[];

export interface NavbarProps {
  routes: NavbarRoutes;
}

interface TabProps {
  text: string;
  href: string;
  selected: boolean;
  setSelected: (text: string) => void;
}

const Tab = ({ text, selected, setSelected, href }: TabProps) => {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        setSelected(text);

        if (router.pathname !== "/") {
          router.push(`/`);
        } else {
          const element = document.querySelector(href);
          if (element) {
            scrollToElement(element, -100);
          }
        }
      }}
      className={`${
        selected
          ? "text-white"
          : "text-muted-foreground hover:text-foreground hover:font-bold"
      } relative rounded-md px-2 py-1 text-sm font-medium transition-colors`}
    >
      <span className="relative z-10">{text}</span>
      {selected && (
        <motion.span
          layoutId="tab"
          transition={{ type: "spring", duration: 0.4 }}
          className="bg-accent absolute inset-0 z-0 rounded-md"
        ></motion.span>
      )}
    </button>
  );
};

interface tabProps {
  tabs: NavbarRoutes;
}

const ButtonShapeTabs = ({ tabs }: tabProps) => {
  const router = useRouter();
  const [selected, setSelected] = useState<string>(tabs[0].title);

  // Scroll-spy: highlight the tab for the section currently in view.
  useEffect(() => {
    // Sections only exist on the home page.
    if (router.pathname !== "/") return;

    let frame = 0;
    const updateActive = () => {
      frame = 0;

      // At the very bottom of the page, force the last section active so the
      // final section can highlight even if it's shorter than the viewport.
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (atBottom) {
        setSelected(tabs[tabs.length - 1].title);
        return;
      }

      // Activation line sits a bit below the sticky navbar.
      const line = window.scrollY + 150;

      // Resolve each tab's section to its real position, then sort by position
      // so the active tab is correct regardless of the menu's array order.
      const positioned = tabs
        .map((tab) => {
          const el = document.querySelector(tab.href);
          return el
            ? {
                title: tab.title,
                top: el.getBoundingClientRect().top + window.scrollY,
              }
            : null;
        })
        .filter((s): s is { title: string; top: number } => s !== null)
        .sort((a, b) => a.top - b.top);

      let active = positioned[0]?.title ?? tabs[0].title;
      for (const section of positioned) {
        if (section.top <= line) active = section.title;
      }
      setSelected(active);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateActive);
    };

    updateActive(); // set initial state on mount
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [router.pathname, tabs]);

  return (
    <div className="hidden flex-wrap items-center gap-4 md:flex">
      {tabs.map((tab) => (
        <Tab
          text={tab.title}
          selected={selected === tab.title}
          setSelected={setSelected}
          key={tab.title}
          href={tab.href}
        />
      ))}
    </div>
  );
};

export default function Navbar(props: NavbarProps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isProjectDetail =
    router.pathname !== "/projects" && router.asPath.startsWith("/projects/");

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-500 mt-1 px-4 py-4 transition-all duration-300 sm:px-6 sm:py-6 md:px-14 md:py-8 lg:px-20 ${
        isProjectDetail
          ? isScrolled
            ? "bg-background/70 backdrop-blur-md"
            : "bg-transparent"
          : isScrolled
            ? "bg-background/90 backdrop-blur-md"
            : "bg-transparent"
      }`}
      style={{ zIndex: 500 }}
    >
      <div className="mx-auto flex items-center justify-between lg:max-w-7xl">
        <Link
          href="/"
          className="drop-shadow-teralight flex items-center justify-start"
          aria-label="Return to home page"
        >
          <div className="relative">
            <AnimatedLogo />
          </div>
        </Link>
        <ButtonShapeTabs tabs={props.routes} />
        <AnimatePresence>
          <MenuLogo open={isModalOpen} toggle={toggleModal} />
        </AnimatePresence>
      </div>
      <MobileMenu
        routes={props.routes}
        openMenu={isModalOpen}
        setOpenMenu={setIsModalOpen}
      />
    </header>
  );
}
