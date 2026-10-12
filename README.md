# goextendtech.com

The company website for **GoExtend Technologies** — Naogaon, Bangladesh.

Built with Next.js 16 (Pages Router), React 19, Tailwind CSS 4 and
Framer Motion. Permanently dark-themed; the brand is the "iris" indigo
ramp shared with GoExtend Pharma.

## Running it

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # production build + sitemap
pnpm start        # serve the production build
pnpm lint         # eslint
pnpm format:fix   # prettier
```

## Where the content lives

All copy that is not layout sits in `src/data/`, so editing the site
does not mean editing components:

| File | Holds |
| --- | --- |
| `company.ts` | Identity, contact channels, legal entity, product index |
| `about.ts` | Company story, principles, verifiable facts |
| `services.ts` | The six services, each with the product it was proven in |
| `process.ts` | The five engagement steps, with deliverables + durations |
| `products.ts` | Full product entries, features, screenshots |
| `stack.ts` | Production technology + no-logo capabilities |
| `siteMetaData.mjs` | SEO defaults. Plain `.mjs` because the sitemap script runs it under bare Node |

### Two rules the content follows

**Nothing is claimed that cannot be clicked.** Every service names the
shipped product it came from; the About section uses verifiable facts
rather than invented metrics. A buyer who disproves one claim stops
believing the rest of the page.

**Unknown values stay empty, never placeholder.** `legalIdentifiers` and
the Telegram/X URLs are blank strings, and every component checks before
rendering them. A dead link or a wrong
trade licence number on a live site is worse than a visible gap — the
licence number in particular is checked by payment gateways during
merchant onboarding.

Fill them in as they become real:

- `legalIdentifiers.tradeLicense` / `.tin` / `.bin` — from the
  certificates, exactly as printed
- `company.founded` — currently the first commit on GoExtend Pharma
  (May 2026); replace with the trade licence date
- `siteMetadata.googleSiteVerification` — from Search Console

## Adding a product

1. Add an entry to `products` in `src/data/company.ts` (the index).
2. Add the matching full entry to `productDetails` in
   `src/data/products.ts`. A slug present in one and not the other
   throws at build time rather than rendering an empty page.
3. Drop screenshots in `public/images/products/<slug>/` and list them
   with `orientation: "phone" | "desktop"`.

The route (`/products/<slug>`) and the sitemap entry are generated.

## Contact form

The form posts to Web3Forms, which delivers each submission to the
inbox its access key was issued for. The key is built into
`src/components/contact-form/ContactUs.tsx`; set
`NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` (see `.env.example`) to use a
different one.

A server-side alternative already exists at `POST /api/sendmail`
(nodemailer, rate-limited to 5/hour per client) if you would rather not
expose keys to the browser.

## Deploying

```bash
docker build -t goextend-web .
docker run -p 3000:3000 goextend-web
```

The image is a standalone Next build running as the non-root `node`
user. Public env vars are inlined at **build** time, so to override the
Web3Forms key pass it with `--build-arg`, not `-e`.
