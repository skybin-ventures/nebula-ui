import type { Meta, StoryObj } from "@storybook/react-vite"
import { AvatarGroup } from "../AvatarGroup"

const items = [
  { fallback: "AR", name: "Alex Rivera" },
  { fallback: "BK", name: "Blake Kim" },
  { fallback: "CL", name: "Casey Lee" },
  { fallback: "DJ", name: "Dana Jones" },
  { fallback: "EV", name: "Ellis Voss" },
]

const meta = {
  title: "Components/AvatarGroup",
  component: AvatarGroup,
  args: { items, max: 3 },
} satisfies Meta<typeof AvatarGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Overflow: Story = { args: { max: 2 } }
export const Large: Story = { args: { size: "lg", max: 4 } }
