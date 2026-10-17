import type { Meta, StoryObj } from "@storybook/react-vite"
import { CodeBlock } from "../CodeBlock"

const meta = {
  title: "Components/CodeBlock",
  component: CodeBlock,
} satisfies Meta<typeof CodeBlock>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    language: "tsx",
    code: `export function hello() {\n  return "world"\n}`,
  },
}
