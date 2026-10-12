import { cn } from "@/lib/utils";
import React from "react";
import { Button } from "./moving-border";
import Link from "next/link";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-3 sm:gap-4 md:auto-rows-[24rem] md:grid-cols-3",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  techs,
  slug,
  index = 0,
  isSingle = true,
  gitHub = "",
  liveLink = "",
}: {
  className?: string;
  slug?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  techs: string[];
  index?: number;
  isSingle: boolean;
  gitHub: string;
  liveLink: string;
}) => {
  const titleTechClass = isSingle
    ? ""
    : "flex flex-col md:flex-row justify-between";
  return (
    <div
      className={cn(
        "group/bento border-border/50 bg-muted/30 hover:border-accent/30 hover:shadow-accent/5 row-span-1 flex flex-col justify-between space-y-4 overflow-hidden rounded-xl border p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
        className,
      )}
    >
      {/* Image with hover zoom */}
      <div className="overflow-hidden rounded-lg transition-transform duration-500 group-hover/bento:scale-[1.02]">
        {header}
      </div>

      <div className="transition duration-200 group-hover/bento:translate-x-2">
        <div className={titleTechClass}>
          <div className="text-foreground group-hover/bento:text-accent mt-2 mb-2 font-sans font-bold transition-colors duration-300">
            {title}
          </div>
          <div className="mt-1 mb-3 flex flex-wrap gap-1">
            {techs.map((tech, idx) => (
              <span
                key={idx}
                className="border-accent/30 bg-accent/5 text-accent rounded border px-2.5 py-0.5 text-xs font-bold"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
        <div className="text-muted-foreground font-sans text-xs font-normal">
          {description}
        </div>
        <div className="mt-5 flex items-center gap-3">
          <div className="flex items-center">
            {gitHub.length > 0 && (
              <button
                type="button"
                onClick={() => window.open(gitHub, "_blank")}
                className="bg-foreground/10 text-foreground hover:bg-foreground/20 focus:ring-foreground/10 me-2 mb-2 inline-flex items-center rounded-lg px-3 py-2 text-center text-sm font-medium transition-colors focus:ring-4 focus:outline-none"
              >
                <svg
                  className="me-2 h-4 w-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                    clipRule="evenodd"
                  />
                </svg>
                Source Code
              </button>
            )}
            {liveLink.length > 0 && (
              <Button
                btnType="primary"
                btnWidthHightClass="h-9 w-24 mb-2"
                onButtonClick={() => window.open(liveLink, "_blank")}
              >
                View Live
              </Button>
            )}
          </div>

          <div className="mb-[10px]">
            <Link href={`/projects/${slug}`} passHref>
              <Button btnWidthHightClass="h-9 w-28">View Details</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
