import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // Cloudflare Pages: serve from repository root as the site root.
  // Explicit root base '/' keeps asset URLs correct on soumyajit.is-a.dev.
  base: "/",
  build: {
    // Cloudflare Pages build output directory (matches Pages dashboard setting).
    outDir: "dist",
  },
  plugins: [react(), tailwindcss()],
});