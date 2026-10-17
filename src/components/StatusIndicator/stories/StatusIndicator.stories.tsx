import type { Meta, StoryObj } from "@storybook/react-vite"
import { StatusIndicator } from "../StatusIndicator"

const meta = {
  title: "Components/StatusIndicator",
  component: StatusIndicator,
} satisfies Meta<typeof StatusIndicator>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { label: "Operational", status: "success" },
}

export const Pulsing: Story = {
  args: { label: "Live", status: "danger", pulse: true },
}
