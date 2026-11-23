import type { Meta, StoryObj } from "@storybook/react-vite";
import { Separator } from "../../../index";

const meta = {
  title: "Layout/Separator",
  parameters: { layout: "centered" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
    <div className="w-72 space-y-3">
      <p className="text-sm">Above</p>
      <Separator />
      <p className="text-sm">Below</p>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-16 items-center gap-3">
      <span className="text-sm">Left</span>
      <Separator orientation="vertical" className="h-8" />
      <span className="text-sm">Right</span>
    </div>
  ),
};
