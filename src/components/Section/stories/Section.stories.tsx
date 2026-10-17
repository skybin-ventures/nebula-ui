import type { Meta, StoryObj } from "@storybook/react-vite"
import { Section } from "../Section"
import { Button } from "../../Button"

const meta = {
  title: "Components/Section",
  component: Section,
} satisfies Meta<typeof Section>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: "Team members",
    description: "Invite and manage people with access to this workspace.",
    actions: <Button size="sm">Invite</Button>,
    children: <p className="text-sm text-muted-foreground">Member list goes here.</p>,
  },
}
