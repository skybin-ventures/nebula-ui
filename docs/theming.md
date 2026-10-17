# Theming

Nebula UI ships CSS variables for light and dark modes in `@skybin-tech/nebula-ui/styles.css`.

## Provider

Wrap your app (or Storybook) with `NebulaTheme` and call `useTheme()` to read or change the mode:

```tsx
import { NebulaTheme, useTheme, Toaster } from "@skybin-tech/nebula-ui";
import "@skybin-tech/nebula-ui/styles.css";

function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  return (
    <button type="button" onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>
      {theme}
    </button>
  );
}

export function App() {
  return (
    <NebulaTheme defaultTheme="system">
      <ThemeToggle />
      <Toaster />
      {/* … */}
    </NebulaTheme>
  );
}
```

`NebulaTheme` toggles the `.dark` class on `document.documentElement` and sets `color-scheme` so native controls match.

## Tokens

Edit `src/styles/index.css` (or override CSS variables in your app) to change palette values. Semantic tokens include `--background`, `--foreground`, `--primary`, `--destructive`, `--success`, `--warning`, and matching `--color-*` Tailwind theme entries (`bg-success`, `border-warning`, etc.).

A token codegen script is planned; until then, hand-edit the HSL triples in `:root` and `.dark`.
