import dynamic from "next/dynamic";
import Head from "next/head";
import { generateNextSeo } from "next-seo/pages";
import { siteMetadata } from "@/data/siteMetaData.mjs";
import LandingHero from "@/components/landing-hero";
import About from "@/components/about/About";
import HeroMarquee from "@/components/hero-marquee";

// Below-the-fold sections are code-split: the hero and About are what a
// visitor sees first, and everything after them can arrive as they
// scroll rather than inflating the initial bundle.
const Products = dynamic(() => import("@/components/products/Products"));

const Services = dynamic(() => import("@/components/services/Services"));

const Process = dynamic(() => import("@/components/process/Process"));

const ContactConnection = dynamic(
  () => import("@/components/contact-connection/ContactConnection"),
);

export default function Home() {
  return (
    <>
      <Head>
        {generateNextSeo({
          title: siteMetadata.title,
          description: siteMetadata.description,
          canonical: siteMetadata.siteUrl,
          openGraph: {
            url: siteMetadata.siteUrl,
            title: "GoExtend Technologies — Software that runs real businesses",
            description:
              "We build production software for businesses in Bangladesh and beyond: offline-first mobile apps, web platforms, and the cloud infrastructure behind them.",
            images: [
              {
                url: `${siteMetadata.siteUrl}${siteMetadata.twitterImage}`,
                alt: "GoExtend Technologies",
              },
            ],
            siteName: siteMetadata.siteName,
            type: "website",
          },
          twitter: {
            cardType: "summary_large_image",
          },
          additionalMetaTags: [
            {
              property: "keywords",
              content:
                "GoExtend Technologies, GoExtend, software company Bangladesh, Naogaon software company, pharmacy software Bangladesh, offline-first apps, React Native development, Next.js development, custom software development, POS software, business software Bangladesh",
            },
            {
              property: "author",
              content: siteMetadata.author,
            },
            {
              property: "robots",
              content: "index, follow",
            },
          ],
        })}
      </Head>

      {siteMetadata.googleSiteVerification && (
        <Head>
          <meta
            name="google-site-verification"
            content={siteMetadata.googleSiteVerification}
          />
        </Head>
      )}
      <LandingHero />
      {/* Sits ON the seam, overlapping both neighbours. */}
      <HeroMarquee />
      <About />
      <Products />
      <Services />
      <Process />
      <ContactConnection />
    </>
  );
}
