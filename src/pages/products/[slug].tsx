import Head from "next/head";
import Link from "next/link";
import { generateNextSeo } from "next-seo/pages";
import type { GetStaticPaths, GetStaticProps } from "next";
import {
  IconArrowLeft,
  IconBrandGooglePlay,
  IconCheck,
  IconExternalLink,
} from "@tabler/icons-react";

import SectionLabel from "@/components/ui/section-label";
import ProductGallery from "@/components/products/ProductGallery";
import { Reveal, RevealItem, RevealStagger } from "@/animation/reveal";
import { siteMetadata } from "@/data/siteMetaData.mjs";
import { company, whatsappUrl } from "@/data/company";
import {
  getProductBySlug,
  productSlugs,
  type ProductDetail,
} from "@/data/products";

type Props = { product: ProductDetail };

/**
 * A product case study.
 *
 * Statically generated from `productDetails`, so adding a product to
 * the data file is the only step needed to get a page — there is no
 * second list of routes to forget to update.
 */
export default function ProductPage({ product }: Props) {
  const pageTitle = `${product.name} — ${company.name}`;
  const pageUrl = `${siteMetadata.siteUrl}/products/${product.slug}`;

  return (
    <>
      <Head>
        {generateNextSeo({
          title: pageTitle,
          description: product.summary,
          canonical: pageUrl,
          openGraph: {
            url: pageUrl,
            title: pageTitle,
            description: product.summary,
            siteName: siteMetadata.siteName,
            type: "article",
            images: [
              {
                url: `${siteMetadata.siteUrl}${siteMetadata.twitterImage}`,
                alt: product.name,
              },
            ],
          },
          twitter: { cardType: "summary_large_image" },
        })}
      </Head>

      <article className="px-4 pt-10 pb-20 sm:px-6 sm:pt-14 md:px-14 md:pb-28 lg:px-20">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <Link
              href="/#products"
              className="text-muted-foreground hover:text-accent inline-flex items-center gap-1.5 text-sm font-semibold transition-colors"
            >
              <IconArrowLeft size={16} stroke={2} />
              All products
            </Link>

            <div className="mt-6">
              <SectionLabel>{product.sector}</SectionLabel>
            </div>

            <h1 className="font-grotesk text-foreground mt-4 text-4xl leading-[1.05] font-black tracking-tight sm:text-5xl md:text-6xl">
              {product.name}
            </h1>
            <p className="text-muted-foreground mt-4 max-w-3xl text-base leading-relaxed sm:text-lg">
              {product.summary}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              {product.play && (
                <a
                  href={product.play}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-accent text-accent-foreground hover:shadow-accent/30 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-shadow duration-300 hover:shadow-lg"
                >
                  <IconBrandGooglePlay size={17} stroke={1.9} />
                  Get it on Google Play
                </a>
              )}
              {product.site && (
                <a
                  href={product.site}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-border text-foreground hover:border-accent hover:text-accent inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-colors duration-300"
                >
                  <IconExternalLink size={16} stroke={1.9} />
                  Product site
                </a>
              )}
            </div>
          </Reveal>

          {/* Problem / solution. Rendered only once the case study has
              been written — a project can be listed before then. */}
          {(product.problem || product.solution) && (
            <Reveal delay={0.05}>
              <div className="mt-14 grid gap-8 md:grid-cols-2">
                <div className="border-border bg-muted/20 rounded-2xl border p-6">
                  <h2 className="text-muted-foreground text-[11px] font-bold tracking-[0.16em] uppercase">
                    The problem
                  </h2>
                  <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
                    {product.problem}
                  </p>
                </div>
                <div className="border-accent/30 bg-accent/5 rounded-2xl border p-6">
                  <h2 className="text-accent text-[11px] font-bold tracking-[0.16em] uppercase">
                    What we built
                  </h2>
                  <p className="text-foreground/90 mt-3 text-sm leading-relaxed">
                    {product.solution}
                  </p>
                </div>
              </div>
            </Reveal>
          )}

          {/* Screenshots */}
          {product.shots.length > 0 && (
            <section className="mt-16">
              <Reveal>
                <h2 className="font-grotesk text-foreground text-2xl font-black sm:text-3xl">
                  What it looks like
                </h2>
              </Reveal>
              <div className="mt-6">
                <ProductGallery shots={product.shots} />
              </div>
            </section>
          )}

          {/* Features */}
          {product.features && product.features.length > 0 && (
            <section className="mt-16">
              <Reveal>
                <h2 className="font-grotesk text-foreground text-2xl font-black sm:text-3xl">
                  What it does
                </h2>
              </Reveal>
              <RevealStagger
                className="mt-6 grid gap-4 sm:grid-cols-2"
                stagger={0.06}
              >
                {product.features.map((f) => (
                  <RevealItem key={f.title}>
                    <div className="border-border bg-muted/20 hover:border-accent/40 h-full rounded-2xl border p-5 transition-colors duration-300">
                      <div className="flex gap-3">
                        <span className="bg-accent/15 text-accent mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full">
                          <IconCheck size={12} stroke={3} />
                        </span>
                        <div>
                          <h3 className="text-foreground text-sm font-bold">
                            {f.title}
                          </h3>
                          <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
                            {f.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </RevealItem>
                ))}
              </RevealStagger>
            </section>
          )}

          {/* Stack */}
          <section className="mt-16">
            <Reveal>
              <h2 className="font-grotesk text-foreground text-2xl font-black sm:text-3xl">
                Built with
              </h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {product.stack.map((tech) => (
                  <span
                    key={tech}
                    className="border-border bg-muted/40 text-muted-foreground rounded-lg border px-3 py-1.5 text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </Reveal>
          </section>

          {/* CTA */}
          <Reveal>
            <div className="border-accent/30 from-accent/10 mt-16 rounded-3xl border bg-gradient-to-br to-transparent p-8 text-center sm:p-10">
              <h2 className="font-grotesk text-foreground text-2xl font-black sm:text-3xl">
                Need something like this?
              </h2>
              <p className="text-muted-foreground mx-auto mt-3 max-w-xl text-sm leading-relaxed sm:text-base">
                We built {product.name} end to end — the app, the backend, the
                payments and the store release. We can do the same for your
                business.
              </p>
              <a
                href={whatsappUrl(
                  `Hello GoExtend — I saw ${product.name} and I'd like to discuss a project.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-accent text-accent-foreground hover:shadow-accent/30 mt-6 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-shadow duration-300 hover:shadow-lg"
              >
                Talk to us on WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </article>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: productSlugs.map((slug) => ({ params: { slug } })),
  // Every product is known at build time; an unknown slug is a 404, not
  // a page we should try to render on demand.
  fallback: false,
});

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = typeof params?.slug === "string" ? params.slug : "";
  const product = getProductBySlug(slug);
  if (!product) return { notFound: true };
  return { props: { product } };
};
