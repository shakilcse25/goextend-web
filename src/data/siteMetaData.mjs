/**
 * SEO + Open Graph defaults for goextendtech.com.
 *
 * Deliberately a `.mjs` file with no imports: `src/scripts/generateSitemap.mjs`
 * runs this at build time under plain Node, outside the TypeScript
 * pipeline, so it cannot import `@/data/company`. The handful of values
 * duplicated from there (name, url) are the stable ones — if you change
 * the canonical URL, change it in BOTH places.
 */
export const siteMetadata = {
  title: "GoExtend Technologies — Software that runs real businesses",
  author: "GoExtend Technologies",
  headerTitle: "GoExtend Technologies",
  description:
    "GoExtend Technologies builds production software for businesses in Bangladesh and beyond — offline-first mobile apps, web platforms, and the cloud infrastructure behind them.",
  language: "en-us",
  theme: "dark",
  siteName: "goextendtech.com",
  siteUrl: "https://goextendtech.com",
  siteRepo: "https://github.com/shakilcse25",
  siteLogo: "/brand/logo.png",
  /** Square mark — for anywhere a logo must fit a 1:1 box. */
  siteIcon: "/brand/icon.png",
  /** Social share card. Generated in the final phase; 1200x630. */
  image: "/static/og.png",
  twitterImage: "/static/og.png",
  socialBanner: "/static/og.png",
  /** Business enquiries — keep in step with company.ts. */
  email: "goextendvibe@gmail.com",
  github: "https://github.com/shakilcse25",
  linkedin: "https://www.linkedin.com/company/goextend-technologies",
  facebook:
    "https://www.facebook.com/people/GoExtend-Technologies/61593915124919/",
  instagram: "https://www.instagram.com/goextendtechnologiesltd",
  locale: "en-US",
  /** Paste the token from Search Console once the domain is verified. */
  googleSiteVerification: "",
};
