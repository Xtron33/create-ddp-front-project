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

export const TanstackRouterMainFile = `const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}`
