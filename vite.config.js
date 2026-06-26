import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  // Served from the custom domain root (scalewithmonday.com). BrowserRouter plus
  // public/404.html handle SPA deep links, and a post-build step writes per route
  // index.html files for SEO, so assets resolve from absolute root paths.
  base: "/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        // Stable, content named vendor chunks: keeps framer-motion out of the
        // app chunk (so app edits do not bust its cache) and improves caching.
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (
            id.includes("framer-motion") ||
            id.includes("motion-dom") ||
            id.includes("motion-utils")
          )
            return "motion";
          if (id.includes("lenis")) return "lenis";
          if (
            id.includes("/react/") ||
            id.includes("/react-dom/") ||
            id.includes("/react-router") ||
            id.includes("/scheduler/")
          )
            return "react";
        },
      },
    },
  },
});
