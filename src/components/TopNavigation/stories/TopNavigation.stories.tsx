import type { Meta, StoryObj } from "@storybook/react-vite"
import { TopNavigation } from "../TopNavigation"
import { Button } from "../../Button"

const meta = {
  title: "Components/TopNavigation",
  component: TopNavigation,
} satisfies Meta<typeof TopNavigation>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    brand: "Nebula",
    links: [
      { label: "Overview", href: "#", active: true },
      { label: "Projects", href: "#" },
      { label: "Settings", href: "#" },
    ],
    actions: <Button size="sm">Sign in</Button>,
  },
}
