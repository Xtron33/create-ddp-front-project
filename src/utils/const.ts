export const reactDependencies = ["react", "react-dom"]
export const reactDevDependencies = [
    "@eslint/js",
    "@types/react",
    "@types/react-dom",
    "@vitejs/plugin-react",
    "eslint",
    "eslint-plugin-react-hooks",
    "eslint-plugin-react-refresh",
    "globals",
    "vite",
    "typescript",
    "typescript-eslint",
    "vite-tsconfig-paths"
]

export const lintersDevDependencies = [
    "@typescript-eslint/eslint-plugin",
    "@typescript-eslint/parser",
    "eslint",
    "eslint-config-prettier",
    "eslint-plugin-import",
    "eslint-plugin-react",
    "eslint-plugin-react-hooks",
    "eslint-plugin-react-refresh",
    "eslint-plugin-unused-imports",
    "prettier",
    "stylelint",
    "stylelint-config-standard",
    "stylelint-prettier",
    "eslint-import-resolver-typescript",
    "eslint-plugin-prettier",
    "husky",
    "commitizen",
    "cz-custom",
    "@commitlint/cli",
    "@commitlint/config-conventional",
    "lint-staged",
    "vite-plugin-svgr"
]

export const defaultDepencencies = [
    "axios",
    "uuid",
    "@mantine/form"
]


export const TanstackRouterMainFile = `const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}`
