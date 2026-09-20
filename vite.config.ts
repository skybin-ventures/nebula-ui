import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react-swc";
import checker from "vite-plugin-checker";
import tsconfigPaths from "vite-tsconfig-paths";
import eslint from "vite-plugin-eslint2";
import tailwindcss from "@tailwindcss/vite";
import { existsSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";
import dts from "vite-plugin-dts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isStorybook = process.argv.some((arg) => arg.includes("storybook"));
const srcDir = path.resolve(__dirname, "src");

function collectLibEntries(): Record<string, string> {
  const entries: Record<string, string> = {
    index: path.resolve(srcDir, "index.ts"),
    "hooks/useDebounce": path.resolve(srcDir, "hooks/useDebounce.ts"),
    "hooks/useToggle": path.resolve(srcDir, "hooks/useToggle.ts"),
    "hooks/useToast": path.resolve(srcDir, "hooks/useToast.ts"),
    "hooks/useControllableState": path.resolve(srcDir, "hooks/useControllableState.ts"),
    "utils/cn": path.resolve(srcDir, "utils/cn.ts"),
    styles: path.resolve(srcDir, "styles-entry.ts"),
  };

  const componentsDir = path.resolve(srcDir, "components");
  for (const name of readdirSync(componentsDir)) {
    const indexFile = path.resolve(componentsDir, name, "index.ts");
    if (existsSync(indexFile)) {
      entries[`components/${name}/index`] = indexFile;
    }
  }

  return entries;
}

const externalPackages = [
  "react",
  "react-dom",
  "zod",
  "react-hook-form",
  "@hookform/resolvers",
  "tailwindcss",
  "lucide-react",
  "class-variance-authority",
  "tailwind-merge",
  "clsx",
  "cmdk",
  "date-fns",
  "react-day-picker",
  "sonner",
  "input-otp",
  "@tanstack/react-table",
  "@dnd-kit/core",
  "@dnd-kit/sortable",
  "@dnd-kit/utilities",
  "@radix-ui/react-accordion",
  "@radix-ui/react-alert-dialog",
  "@radix-ui/react-avatar",
  "@radix-ui/react-checkbox",
  "@radix-ui/react-collapsible",
  "@radix-ui/react-dialog",
  "@radix-ui/react-dropdown-menu",
  "@radix-ui/react-label",
  "@radix-ui/react-popover",
  "@radix-ui/react-progress",
  "@radix-ui/react-radio-group",
  "@radix-ui/react-scroll-area",
  "@radix-ui/react-select",
  "@radix-ui/react-separator",
  "@radix-ui/react-slider",
  "@radix-ui/react-slot",
  "@radix-ui/react-switch",
  "@radix-ui/react-tabs",
  "@radix-ui/react-toast",
  "@radix-ui/react-toggle",
  "@radix-ui/react-tooltip",
];

function isExternal(id: string): boolean {
  return externalPackages.some((pkg) => id === pkg || id.startsWith(`${pkg}/`));
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    tsconfigPaths(),
    ...(isStorybook
      ? []
      : [
          checker({ typescript: true }),
          eslint({
            emitError: false,
            emitWarning: false,
          }),
          dts({
            include: ["src"],
            exclude: ["src/**/*.test.ts", "src/**/*.test.tsx", "src/**/*.stories.tsx"],
            outDirs: "dist",
            tsconfigPath: "./tsconfig.app.json",
            insertTypesEntry: true,
            bundleTypes: false,
          }),
        ]),
  ],
  build: {
    lib: {
      entry: collectLibEntries(),
      formats: ["es", "cjs"],
      cssFileName: "styles",
    },
    rollupOptions: {
      external: isExternal,
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
        },
      ],
    },
    sourcemap: true,
    minify: false,
    cssCodeSplit: false,
  },
  resolve: {
    alias: {
      "@": srcDir,
    },
  },
  test: {
    projects: [
      {
        test: {
          name: "unit",
          include: ["src/**/*.test.ts", "src/**/*.test.tsx", "tests/**/*.test.ts"],
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
});
