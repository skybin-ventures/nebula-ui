import type { Meta, StoryObj } from "@storybook/react-vite"
import { JsonView } from "../JsonView"

const meta = {
  title: "Components/JsonView",
  component: JsonView,
} satisfies Meta<typeof JsonView>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    data: {
      id: 1,
      active: true,
      tags: ["a", "b"],
      nested: { count: 2 },
    },
  },
}
