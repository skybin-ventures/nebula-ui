import type { Meta, StoryObj } from "@storybook/react-vite"
import { ErrorState } from "../ErrorState"

const meta = {
  title: "Components/ErrorState",
  component: ErrorState,
} satisfies Meta<typeof ErrorState>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Controlled: Story = { args: { onRetry: () => undefined } }
export const Disabled: Story = { args: { onRetry: () => undefined, disabled: true } }
export const Loading: Story = { args: { onRetry: () => undefined, loading: true } }
export const Empty: Story = { args: { description: "" } }
export const Error: Story = { args: { title: "Request failed", description: "HTTP 500" } }
