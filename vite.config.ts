import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    tanstackStart({
      serverFns: {
        disableCsrfMiddlewareWarning: true,
      },
    }),
    viteReact(),
    tailwindcss(),
    tsconfigPaths(),
  ],

  server: {
    port: 0,
    strictPort: false,
  },

  preview: {
    port: 0,
    strictPort: false,
    allowedHosts: true,
  },

  ssr: {
    target: "node",
    external: ["@prisma/client"],
  },

  optimizeDeps: {
    exclude: ["@prisma/client"],
  },
});