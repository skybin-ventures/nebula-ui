import type { Meta, StoryObj } from "@storybook/react-vite"
import { EmptyState } from "../EmptyState"

const meta = {
  title: "Components/EmptyState",
  component: EmptyState,
} satisfies Meta<typeof EmptyState>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Controlled: Story = { args: { actionLabel: "Create item", onAction: () => undefined } }
export const Disabled: Story = { args: { actionLabel: "Create item", disabled: true } }
export const Loading: Story = { args: { actionLabel: "Create item", loading: true } }
export const Empty: Story = { args: { title: "No results", description: "Try a different search." } }
export const Error: Story = { args: { title: "Could not load data", description: "Refresh and try again." } }
