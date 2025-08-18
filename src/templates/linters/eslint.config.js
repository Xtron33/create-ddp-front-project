import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended"
import eslintPluginImport from "eslint-plugin-import"
import eslintPluginUnusedImports from "eslint-plugin-unused-imports"

import js from "@eslint/js"
import globals from "globals"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import tseslint from "typescript-eslint"
import { globalIgnores } from "eslint/config"
import reactPlugin from "eslint-plugin-react"

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
  ...pluginQueryConfig
])
