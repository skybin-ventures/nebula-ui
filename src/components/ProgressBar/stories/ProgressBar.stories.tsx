import type { Meta, StoryObj } from "@storybook/react-vite"
import { ProgressBar } from "../ProgressBar"

const meta = {
  title: "Components/ProgressBar",
  component: ProgressBar,
} satisfies Meta<typeof ProgressBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { label: "Syncing", value: 65, showValue: true },
}
