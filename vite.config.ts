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
  preview: {
    allowedHosts: true,
  },
  ssr: {
    external: ["@prisma/client"],
  },
  optimizeDeps: {
    exclude: ["@prisma/client"],
  },
});
