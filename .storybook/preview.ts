import type { Preview } from "@storybook/react-vite";
import "../src/styles/index.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // Fail Storybook Vitest / CI when axe finds violations
      test: "error",
      config: {
        rules: [
          // Form secondary text uses muted opacity; keep as warn until tokens are audited
          { id: "color-contrast", enabled: true },
        ],
      },
    },
  },
};

export default preview;
