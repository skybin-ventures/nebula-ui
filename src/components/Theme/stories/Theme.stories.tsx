import type { Meta, StoryObj } from "@storybook/react-vite";
import { NebulaTheme, useTheme, Button } from "../../../index";

function ThemePicker() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  return (
    <div className="space-y-2">
      <Button variant="outline" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        Switch to {theme === "dark" ? "light" : "dark"} mode
      </Button>
      <p className="text-xs text-muted-foreground">
        Theme: {theme} (resolved: {resolvedTheme})
      </p>
    </div>
  );
}

const meta = {
  title: "Components/Theme",
  parameters: { layout: "centered" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <NebulaTheme>
      <div className="space-y-3">
        <ThemePicker />
        <div className="rounded-md border p-4 text-sm">
          Content wrapped by <code>{"<NebulaTheme>"}</code> — toggling updates
          the <code>dark</code> class on <code>document.documentElement</code>.
        </div>
      </div>
    </NebulaTheme>
  ),
};

export const NoStorage: Story = {
  render: () => (
    <NebulaTheme storageKey={false}>
      <div className="space-y-3">
        <ThemePicker />
        <p className="text-xs text-muted-foreground">
          Preferences are not persisted to localStorage.
        </p>
      </div>
    </NebulaTheme>
  ),
};

export const DefaultDark: Story = {
  render: () => (
    <NebulaTheme defaultTheme="dark">
      <div className="space-y-3">
        <ThemePicker />
        <p className="text-xs text-muted-foreground">Starts in dark mode.</p>
      </div>
    </NebulaTheme>
  ),
};
