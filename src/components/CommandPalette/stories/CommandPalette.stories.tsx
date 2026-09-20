import type { Meta, StoryObj } from "@storybook/react-vite"
import { CommandPalette } from "../CommandPalette"

const items = [
  { id: "new", label: "New file", group: "File", shortcut: "⌘N" },
  { id: "open", label: "Open file", group: "File" },
  { id: "theme", label: "Toggle theme", group: "View" },
]

const meta = {
  title: "Components/CommandPalette",
  component: CommandPalette,
  args: { items, open: true, enableShortcut: false },
} satisfies Meta<typeof CommandPalette>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Controlled: Story = { args: { open: true } }
export const Disabled: Story = { args: { disabled: true } }
export const Loading: Story = { args: { loading: true } }
export const Empty: Story = { args: { items: [] } }
export const Error: Story = { args: { emptyText: "Search failed" } }
