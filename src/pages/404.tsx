import Head from "next/head";
import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";

import { company } from "@/data/company";

/**
 * 404.
 *
 * Gives the visitor somewhere to go rather than just naming the error.
 * The old page was a bare "404 : Page not found" — accurate and useless.
 */
export default function PageNotFound() {
  return (
    <>
      <Head>
        <title>{`Page not found — ${company.name}`}</title>
        <meta name="robots" content="noindex" />
      </Head>
      <div className="flex min-h-[70vh] items-center justify-center px-4 py-20">
        <div className="text-center">
          <p
            className="text-accent font-grotesk text-7xl font-black sm:text-8xl"
            style={{ textShadow: "0 0 50px hsl(var(--accent) / 0.35)" }}
          >
            404
          </p>
          <h1 className="text-foreground mt-4 text-2xl font-bold sm:text-3xl">
            This page doesn&apos;t exist
          </h1>
          <p className="text-muted-foreground mx-auto mt-3 max-w-md text-sm sm:text-base">
            The link may be old, or the page may have moved. Everything we build
            is on the home page.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="bg-accent text-accent-foreground hover:shadow-accent/30 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-shadow duration-300 hover:shadow-lg"
            >
              <IconArrowLeft size={16} stroke={2.2} />
              Back to home
            </Link>
            <Link
              href="/#products"
              className="border-border text-foreground hover:border-accent hover:text-accent inline-flex items-center rounded-xl border px-5 py-3 text-sm font-semibold transition-colors duration-300"
            >
              See our products
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
