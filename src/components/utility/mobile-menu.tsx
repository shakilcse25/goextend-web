import { Dispatch, SetStateAction } from "react";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import { IconX } from "@tabler/icons-react";

import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";

import { type NavbarProps } from "@/layout/navbar";
import { classNames } from "@/utility/classNames";
import { company } from "@/data/company";

export interface MobileMenuProps extends NavbarProps {
  openMenu: boolean;
  setOpenMenu: Dispatch<SetStateAction<boolean>>;
}

export default function MobileMenu({
  openMenu,
  routes,
  setOpenMenu,
}: MobileMenuProps) {
  const pathName = usePathname();
  const router = useRouter();

  const handleClick = (href: string) => {
    setOpenMenu(false);
    router.push(href);
  };

  return (
    <Transition show={openMenu}>
      <Dialog
        as="div"
        className="relative md:hidden"
        style={{ zIndex: 9000 }}
        onClose={setOpenMenu}
      >
        {/* Backdrop */}
        <TransitionChild
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="bg-foreground/30 fixed inset-0 backdrop-blur-sm" />
        </TransitionChild>

        {/* Panel */}
        <div className="fixed inset-0">
          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="-translate-y-full opacity-0"
            enterTo="translate-y-0 opacity-100"
            leave="ease-in duration-200"
            leaveFrom="translate-y-0 opacity-100"
            leaveTo="-translate-y-full opacity-0"
          >
            <DialogPanel className="bg-background flex h-full w-full flex-col shadow-2xl">
              {/* Close button */}
              <div className="flex items-center justify-end px-5 pt-5">
                <button
                  onClick={() => setOpenMenu(false)}
                  className="border-accent/30 text-accent hover:bg-accent/10 flex h-10 w-10 items-center justify-center rounded-full border transition-colors"
                  aria-label="Close menu"
                >
                  <IconX size={20} />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex flex-1 flex-col items-center justify-center gap-8">
                {routes.map((link, i) => (
                  <button
                    key={i}
                    className="group text-foreground hover:text-accent relative py-1 text-2xl font-semibold transition-colors"
                    onClick={() => handleClick(link.href)}
                  >
                    <span
                      className={classNames(
                        pathName === link.href
                          ? "bg-accent w-full"
                          : "bg-accent w-0",
                        "absolute -bottom-1 left-1/2 h-0.5 -translate-x-1/2 rounded-full transition-[width] duration-300 group-hover:w-full",
                      )}
                    />
                    <span
                      className={pathName === link.href ? "text-accent" : ""}
                    >
                      {link.title}
                    </span>
                  </button>
                ))}
              </nav>

              {/* Footer */}
              <div className="text-muted-foreground pb-8 text-center text-xs">
                &copy;{new Date().getFullYear()} {company.name}
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}
