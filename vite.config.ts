/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import checker from "vite-plugin-checker";
import tsconfigPaths from 'vite-tsconfig-paths';
import eslint from 'vite-plugin-eslint2';
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";
import { fileURLToPath } from "url";
import path from 'node:path';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
import dts from 'vite-plugin-dts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isStorybook = process.argv.some((arg) => arg.includes("storybook"));

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    tsconfigPaths(),
    !isStorybook && checker({ typescript: true }),
    !isStorybook && eslint({
      emitError: false,
      emitWarning: false,
    }),
    !isStorybook && dts({
      include: ['src'],
      outDirs: 'dist',
      tsconfigPath: './tsconfig.app.json',
      insertTypesEntry: true,
      bundleTypes: false,
    }),
  ].filter(Boolean),
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, "src/index.ts"),
        // Ensure Form barrel is emitted so `./components/Form` package export works
        "components/Form/index": resolve(__dirname, "src/components/Form/index.ts"),
      },
      formats: ["es", "cjs"]
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "zod",
        "react-hook-form", 
        "@hookform/resolvers", 
        "@hookform/resolvers/zod",
        "@radix-ui/react-checkbox",
        "@radix-ui/react-dialog",
        "@radix-ui/react-label",
        "@radix-ui/react-popover",
        "@radix-ui/react-radio-group",
        "@radix-ui/react-scroll-area",
        "@radix-ui/react-select",
        "@radix-ui/react-switch",
        "@radix-ui/react-dropdown-menu",
        "@radix-ui/react-separator",
        "@radix-ui/react-slot",
        "@radix-ui/react-avatar",
        "@radix-ui/react-tabs",
        "@radix-ui/react-toast",
        "@radix-ui/react-toggle",
        "@radix-ui/react-tooltip",
        "@radix-ui/react-accordion",
        "@radix-ui/react-alert-dialog",
        "@radix-ui/react-progress",
        "@radix-ui/react-slider",
        "input-otp",
        "cmdk",
        "date-fns",
        "react-day-picker",
        "sonner",
        "lucide-react",
        "class-variance-authority",
        "tailwind-merge",
        "clsx",
        "tailwindcss"
      ],
      output: [
        {
          format: "es",
          dir: "dist",
          entryFileNames: "[name].js",
          chunkFileNames: "[name]-[hash].js",
          preserveModules: true,
          preserveModulesRoot: "src",
          exports: "named",
          banner() {
            return "'use client';";
          },
        },
        {
          format: "cjs",
          dir: "dist/cjs",
          entryFileNames: "[name].cjs",
          chunkFileNames: "[name]-[hash].cjs",
          preserveModules: true,
          preserveModulesRoot: "src",
          exports: "named",
          banner() {
            return "'use client';";
          },
        }
      ],
    },
    sourcemap: true,
    minify: false, // Disable minification for better tree shaking in consuming apps
    cssCodeSplit: false,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src")
    }
  },
  test: {
    projects: [
      {
        test: {
          name: "unit",
          include: ["src/**/*.test.ts"],
          environment: "node",
        },
      },
      {
        extends: true,
        plugins: [
          storybookTest({
            configDir: path.join(__dirname, ".storybook"),
          }),
        ],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [{ browser: "chromium" }],
          },
          setupFiles: [".storybook/vitest.setup.ts"],
        },
      },
    ],
  },
} as any);
