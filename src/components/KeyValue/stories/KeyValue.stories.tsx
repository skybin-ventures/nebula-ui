import type { Meta, StoryObj } from "@storybook/react-vite"
import { KeyValue } from "../KeyValue"

const meta = {
  title: "Components/KeyValue",
  component: KeyValue,
} satisfies Meta<typeof KeyValue>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    items: [
      { label: "Status", value: "Active" },
      { label: "Owner", value: "Ada Lovelace" },
      { label: "Created", value: "2026-01-12" },
    ],
  },
}
