/** @type {import('tailwindcss').Config} */
const svgToDataUri = require("mini-svg-data-uri");

// Tailwind v4 no longer ships the internal `flattenColorPalette` util, so we
// provide a local equivalent (recursively flattens the theme color object).
function flattenColorPalette(colors) {
  return Object.assign(
    {},
    ...Object.entries(colors ?? {}).flatMap(([color, values]) =>
      typeof values === "object" && values !== null
        ? Object.entries(flattenColorPalette(values)).map(([number, hex]) => ({
            [color + (number === "DEFAULT" ? "" : `-${number}`)]: hex,
          }))
        : [{ [color]: values }],
    ),
  );
}

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        border: "hsl(var(--border))",
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        /* The two logo colours. `primary` / `secondary` without a step
           are the theme-aware tokens (what `accent` aliases); the
           numbered steps are the fixed brand ramps, with 500 being the
           exact colour sampled from the artwork. */
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          50: "var(--primary-50)",
          100: "var(--primary-100)",
          200: "var(--primary-200)",
          300: "var(--primary-300)",
          400: "var(--primary-400)",
          500: "var(--primary-500)",
          600: "var(--primary-600)",
          700: "var(--primary-700)",
          800: "var(--primary-800)",
          900: "var(--primary-900)",
          950: "var(--primary-950)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          50: "var(--secondary-50)",
          100: "var(--secondary-100)",
          200: "var(--secondary-200)",
          300: "var(--secondary-300)",
          400: "var(--secondary-400)",
          500: "var(--secondary-500)",
          600: "var(--secondary-600)",
          700: "var(--secondary-700)",
          800: "var(--secondary-800)",
          900: "var(--secondary-900)",
          950: "var(--secondary-950)",
        },
      },
      screens: {
        xs: "360px",
      },
      dropShadow: {
        accent: "0 0 1em hsl(var(--accent))",
      },
      boxShadow: {
        input: `0px 2px 3px -1px rgba(0,0,0,0.1), 0px 1px 0px 0px rgba(25,28,33,0.02), 0px 0px 0px 1px rgba(25,28,33,0.08)`,
      },
      animation: {
        "radar-spin": "radar-spin 10s linear infinite",
        "skew-scroll": "skew-scroll 20s linear infinite",
      },
      keyframes: {
        "radar-spin": {
          from: {
            transform: "rotate(20deg)",
          },
          to: {
            transform: "rotate(380deg)",
          },
        },
        "skew-scroll": {
          "0%": {
            transform:
              "rotatex(20deg) rotateZ(-20deg) skewX(20deg) translateZ(0) translateY(0)",
          },
          "100%": {
            transform:
              "rotatex(20deg) rotateZ(-20deg) skewX(20deg) translateZ(0) translateY(-100%)",
          },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    addVariablesForColors,
    function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          "bg-dot-thick": (value) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="2.5"></circle></svg>`,
            )}")`,
          }),
        },
        {
          values: flattenColorPalette(theme("backgroundColor")),
          type: "color",
        },
      );
    },
  ],
};

function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors)
      // Only expose palette colors (literal values like "#edb200") as CSS vars
      // for JS/SVG usage. Skip semantic tokens whose value is already a CSS
      // variable (e.g. "hsl(var(--background))") — re-emitting those here would
      // overwrite the real :root values with a broken self-reference
      // (`--background: hsl(var(--background))`), which invalidates the color
      // and makes the whole theme fall back to defaults (light).
      .filter(([, val]) => typeof val === "string" && !val.includes("var("))
      .map(([key, val]) => [`--${key}`, val]),
  );

  addBase({
    ":root": newVars,
  });
}

// #8016e9
