import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="dark">
      <Head>
        {/* Brand marks. The 32px PNG is declared before the .ico so modern
            browsers take the crisp one, while the .ico stays for older
            clients and for tools that probe /favicon.ico directly. */}
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32.png"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        {/* Paints the mobile browser chrome to match the page, so a dark
            site doesn't sit under a white status bar. */}
        <meta name="theme-color" content="#0a0f20" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Syne:wght@400..800&family=Space+Grotesk:wght@400;500;600;700&family=Instrument+Serif:ital@1&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="bg-background text-foreground selection:bg-accent selection:text-background antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
