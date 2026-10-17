import type { Meta, StoryObj } from "@storybook/react-vite"
import { SkipLink } from "../SkipLink"

const meta = {
  title: "Components/SkipLink",
  component: SkipLink,
} satisfies Meta<typeof SkipLink>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <div>
      <SkipLink />
      <p className="text-sm text-muted-foreground">Tab to reveal the skip link.</p>
      <main id="main-content" tabIndex={-1}>
        Main content
      </main>
    </div>
  ),
}
