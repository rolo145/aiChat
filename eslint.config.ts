import { defineConfig } from "eslint/config";
import globals from "globals";
import vitestGlobals from "eslint-plugin-vitest-globals";
import eslint from "@eslint/js";
import { parser, configs } from "typescript-eslint";
import vueParser from "vue-eslint-parser";
import eslintPluginVue from "eslint-plugin-vue";
import importPlugin from "eslint-plugin-import";
import rules, { ESLINT_ERROR, ESLINT_OFF } from "./eslint.rules.config.js";
import { includeIgnoreFile } from "@eslint/compat";
import { fileURLToPath } from "node:url";
import vueTemplateParens from "eslint-plugin-vue-type-assertion-parens";
import stylistic from "@stylistic/eslint-plugin";

const gitignorePath = fileURLToPath(new URL(".gitignore", import.meta.url));

export default defineConfig([
  includeIgnoreFile(gitignorePath, "Imported .gitignore patterns"),
  stylistic.configs.customize({
    indent: 2,
    quotes: "double",
    semi: true,
    quoteProps: "as-needed",
    commaDangle: "always-multiline",
    blockSpacing: true,
    braceStyle: "1tbs",
    arrowParens: true,
    severity: ESLINT_ERROR,
  }),
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...vitestGlobals.environments.env.globals,
      },
      ecmaVersion: "latest",
      sourceType: "module",
      parser: vueParser,
      parserOptions: {
        parser,
        sourceType: "module",
      },
    },

    extends: [
      eslint.configs.recommended,
      importPlugin.flatConfigs.recommended,
      importPlugin.flatConfigs.typescript,
      ...configs.recommended,
      ...eslintPluginVue.configs["flat/recommended"],
    ],

    settings: {
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: "tsconfig.app.json",
        },
        node: true,
      },
      "import/extensions": [ESLINT_ERROR, "ignorePackages", {
        js: "never",
        mjs: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
        mts: "never",
        // Cannot omit `.vue` extensions.
        // This should be enforced all across the Vue.js ecosystem.
        vue: "always",
      }],
    },

    rules,

    plugins: {
      stylistic,
      vueTemplateParens,
    },
  },
  {
    files: ["dev/**", "scripts/**", "eslint.config.js", "vitest.config.ts", "scripts/exportMessages.ts"],

    rules: {
      "no-restricted-imports": ESLINT_OFF,
    },
  },
  {
    // Ignore line length & attribute per line for vue files with SVGs
    files: ["**/svg/*.vue", "*Svg.vue"],

    rules: {
      "vue/max-len": ESLINT_OFF,
      "vue/max-attributes-per-line": ESLINT_OFF,
    },
  },
]);
