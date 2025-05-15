// eslint.config.js
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import node from "eslint-plugin-n";
import prettier from "eslint-plugin-prettier";
import globals from "globals";

export default [
  eslint.configs.recommended, // base recommended rules

  // TypeScript + ESLint rules
  ...tseslint.configs.recommendedTypeChecked({
    parserOptions: {
      project: ["./tsconfig.json"],
    },
  }),

  // Node.js best practices
  {
    files: ["**/*.ts"],
    plugins: {
      node,
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,
      },
    },
    rules: {
      ...node.configs["recommended"].rules,
      "n/no-missing-import": "off", // let TS handle missing imports
    },
  },

  // Prettier plugin for formatting
  {
    plugins: { prettier },
    rules: {
      "prettier/prettier": "error",
    },
  },

  // Your custom rules
  {
    rules: {
      "@typescript-eslint/explicit-function-return-type": "warn",
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-misused-promises": "error",
      "no-console": "warn",
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    },
  },
];
