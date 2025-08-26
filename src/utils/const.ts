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
    "vite-tsconfig-paths",
    "vite-plugin-svgr"
]

export const nextDependencies = [
    "next",
    ...reactDependencies
]
export const nextDevDependencies = [
    "typescript",
    "@types/node",
    "@types/react",
    "@types/react-dom",
    "eslint",
    "eslint-config-next",
    "postcss",
    "postcss-flexbugs-fixes",
    "postcss-nesting",
    "postcss-preset-env"
]

export const lintersDevDependencies = [
    "@typescript-eslint/eslint-plugin",
    "@typescript-eslint/parser",
    "eslint-config-prettier",
    "eslint-plugin-import",
    "eslint-plugin-react",
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
]

export const nextLintersDevDependencies = [
    "eslint-plugin-import",
    "eslint-plugin-unused-imports",
    "eslint-config-prettier",
    "eslint-plugin-prettier",
    "prettier",
    "stylelint",
    "stylelint-config-standard",
    "stylelint-prettier",
    "eslint-import-resolver-typescript",
    "husky",
    "commitizen",
    "cz-custom",
    "@commitlint/cli",
    "@commitlint/config-conventional",
    "lint-staged",
    "@eslint/eslintrc"
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

export const TanstackQueryNextBeforeFunc = `function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                // With SSR, we usually want to set some default staleTime
                // above 0 to avoid refetching immediately on the client
                staleTime: 60 * 1000,
            },
        },
    })
}

let browserQueryClient: QueryClient | undefined = undefined

function getQueryClient() {
    if (isServer) {
        // Server: always make a new query client
        return makeQueryClient()
    } else {
        // Browser: make a new query client if we don't already have one
        // This is very important, so we don't re-make a new client if React
        // suspends during the initial render. This may not be needed if we
        // have a suspense boundary BELOW the creation of the query client
        if (!browserQueryClient) browserQueryClient = makeQueryClient()
        return browserQueryClient
    }
}
`
