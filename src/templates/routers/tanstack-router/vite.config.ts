import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths"
import svgr from "vite-plugin-svgr"
import { tanstackRouter } from '@tanstack/router-plugin/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
      tanstackRouter({
        target: 'react',
        autoCodeSplitting: true,
        routesDirectory: "./src/pages",
      }),
      react(), tsconfigPaths(), svgr({
          svgrOptions: {
              svgo: true,
          },
          include: "**/*.svg?react",
      }),],
})
