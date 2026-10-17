import type { Meta, StoryObj } from "@storybook/react-vite"
import { TabBar } from "../TabBar"

const meta = {
  title: "Components/TabBar",
  component: TabBar,
} satisfies Meta<typeof TabBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    defaultValue: "all",
    items: [
      { value: "all", label: "All" },
      { value: "active", label: "Active" },
      { value: "archived", label: "Archived" },
    ],
  },
}
