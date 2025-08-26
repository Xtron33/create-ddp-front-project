import {Technology} from "./utils/enum.js";

export const generateEslintConfig = (technology: Technology, isNeedQuery: boolean)=> {
    if(technology === Technology.React){
        return `import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended"
import eslintPluginImport from "eslint-plugin-import"
import eslintPluginUnusedImports from "eslint-plugin-unused-imports"

import js from "@eslint/js"
import globals from "globals"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import tseslint from "typescript-eslint"
import { globalIgnores } from "eslint/config"
import reactPlugin from "eslint-plugin-react"
${isNeedQuery ? 'import pluginQuery from \'@tanstack/eslint-plugin-query\'' : ''}

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
      eslintPluginImport.flatConfigs.recommended,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      react: reactPlugin,
      "unused-imports": eslintPluginUnusedImports,
    },
    rules: {
      "no-multiple-empty-lines": [
        "error",
        {
          max: 1,
        },
      ],
      "react/jsx-curly-brace-presence": ["error"],
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal"],
          pathGroups: [
            {
              pattern: "react*",
              group: "external",
              position: "before",
            },
          ],
          pathGroupsExcludedImportTypes: ["react*"],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "no-console": ["error"],
      "unused-imports/no-unused-imports": "error",
      "import/no-unresolved": ['error', { ignore: ['\\\\.gen$'] }],
    },
    settings: {
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json",
        },
      },
    },
  },
  eslintPluginPrettierRecommended,
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat['jsx-runtime'],
  ${isNeedQuery ? '...pluginQuery.configs[\'flat/recommended\']' : ''}
])`
    }

    if(technology === Technology.Next){
        return `import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import eslintPluginImport from "eslint-plugin-import";
import eslintPluginUnusedImports from "eslint-plugin-unused-imports";

import js from "@eslint/js";
import globals from "globals";
import { globalIgnores } from "eslint/config";
${isNeedQuery ? 'import pluginQuery from "@tanstack/eslint-plugin-query"' : ''}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommended: true,
});

export default [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  globalIgnores(["dist"]),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        sourceType: "module",
      },
    },
    plugins: {
      "unused-imports": eslintPluginUnusedImports,
      "import": eslintPluginImport,
    },
    rules: {
      "no-multiple-empty-lines": [
        "error",
        {
          max: 1,
        },
      ],
      "react/jsx-curly-brace-presence": ["error"],
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal"],
          pathGroups: [
            {
              pattern: "react*",
              group: "external",
              position: "before",
            },
          ],
          pathGroupsExcludedImportTypes: ["react*"],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
      "no-console": ["error"],
      "unused-imports/no-unused-imports": "error",
      "import/no-unresolved": ["error", { ignore: ["\\\\.gen$"] }],
      "import/no-unused-modules": "error",
      "import/no-deprecated": "warn",
      "import/no-duplicates": "error",
    },
    settings: {
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json",
        },
      },
    },
  },
  eslintPluginPrettierRecommended,
${isNeedQuery ? "...pluginQuery.configs['flat/recommended']" : ""}]`
    }

    return ''
}
