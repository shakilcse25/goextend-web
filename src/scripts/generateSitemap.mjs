import { writeFileSync } from "fs";
import { globby } from "globby";
import prettier from "prettier";
import { siteMetadata } from "../data/siteMetaData.mjs";

async function generateSitemap() {
  const prettierConfig = await prettier.resolveConfig(
    "../../prettier.config.js",
  );

  const pages = await globby([
    "src/pages/**/*.tsx",
    "!src/pages/_*.tsx",
    "!src/pages/api",
    "!src/pages/404.tsx",
  ]);

  // Dynamic routes are skipped below, because a source file called
  // `[slug].tsx` is not a URL. The pages it EXPANDS to are real URLs
  // though, and leaving them out of the sitemap hides the product case
  // studies — the most linkable pages on the site — from search.
  //
  // So read them from the build output instead of maintaining a second
  // list that can drift: `postbuild` runs after `next build`, and every
  // prerendered page exists as HTML by then. No slug is duplicated
  // anywhere; the data file stays the only source.
  const prerendered = await globby([
    ".next/server/pages/**/*.html",
    "!.next/server/pages/**/_*.html",
    "!.next/server/pages/404.html",
    "!.next/server/pages/500.html",
  ]);

  const dynamicPaths = prerendered
    .map((file) =>
      file.replace(".next/server/pages", "").replace(/\.html$/, ""),
    )
    // Static routes are already covered by the source glob above.
    .filter((path) => path.includes("/") && path.split("/").length > 2);

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${pages
              .map((page) => {
                const path = page
                  .replace(".tsx", "")
                  .replace("src/pages/", "/")
                  .replace("/index", "");

                // exclude dynamic routes
                if (path.includes("[") || path.includes("]")) {
                  return "";
                }

                return `<url>
                            <loc>${siteMetadata.siteUrl}${path}</loc>
                        </url>
                    `;
              })
              .join("")}
            ${dynamicPaths
              .map(
                (path) => `<url>
                            <loc>${siteMetadata.siteUrl}${path}</loc>
                        </url>`,
              )
              .join("")}
        </urlset>
  `;

  const formatted = await prettier.format(sitemap, {
    ...prettierConfig,
    parser: "html",
  });

  writeFileSync("public/sitemap.xml", formatted);
  writeFileSync("public/robots.txt", robotsTxt);

  console.log(
    "Successfully generated\n-> Sitemap at public/sitemap.xml\n-> Robots.txt at public/robots.txt",
  );
}

const robotsTxt = `User-agent: *
Allow: /
Sitemap: ${siteMetadata.siteUrl}/sitemap.xml`;

generateSitemap();
