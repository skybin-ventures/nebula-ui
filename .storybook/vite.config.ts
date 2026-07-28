import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src"),
    },
  },
  optimizeDeps: {
    // Avoid full discovery (can hang on Windows paths with spaces).
    // Still prebundle React CJS so Storybook ESM can load it.
    noDiscovery: true,
    include: [
      "react",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "react-dom",
      "react-dom/client",
      "react-hook-form",
      "@hookform/resolvers/zod",
      "zod",
      "cmdk",
      "date-fns",
      "lucide-react",
      "class-variance-authority",
      "clsx",
      "tailwind-merge",
      "@radix-ui/react-popover",
      "@radix-ui/react-dialog",
      "@radix-ui/react-slot",
      "@radix-ui/react-label",
    ],
  },
});
