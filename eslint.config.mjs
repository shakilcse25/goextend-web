import nextConfig from "eslint-config-next";
import prettierConfig from "eslint-config-prettier";

/** @type {import("eslint").Linter.Config[]} */
const eslintConfig = [
  ...nextConfig,
  prettierConfig,
  {
    ignores: ["node_modules/", ".next/", ".vscode/"],
  },
  {
    rules: {
      "@next/next/no-img-element": "off",
    },
  },
];

export default eslintConfig;
