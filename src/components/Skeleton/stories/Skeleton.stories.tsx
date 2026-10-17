import type { Meta, StoryObj } from "@storybook/react-vite"
import { Skeleton } from "../Skeleton"
import { SkeletonText } from "../SkeletonText"
import { SkeletonTitle } from "../SkeletonTitle"
import { SkeletonAvatar } from "../SkeletonAvatar"

const meta = {
  title: "Components/Skeleton",
  component: Skeleton,
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Presets: Story = {
  render: () => (
    <div className="flex max-w-md flex-col gap-4">
      <div className="flex items-center gap-3">
        <SkeletonAvatar />
        <div className="flex-1 space-y-2">
          <SkeletonTitle className="w-1/2" />
          <SkeletonText lines={2} />
        </div>
      </div>
    </div>
  ),
}
