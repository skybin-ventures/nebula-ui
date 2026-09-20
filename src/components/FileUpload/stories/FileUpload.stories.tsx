import type { Meta, StoryObj } from "@storybook/react-vite"
import { FileUpload } from "../FileUpload"

const meta = {
  title: "Components/FileUpload",
  component: FileUpload,
} satisfies Meta<typeof FileUpload>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Controlled: Story = { args: { value: [] } }
export const Disabled: Story = { args: { disabled: true } }
export const Loading: Story = { args: { loading: true } }
export const Empty: Story = { args: { emptyText: "Drop a file to get started" } }
export const Error: Story = { args: { error: "That file is too large" } }
