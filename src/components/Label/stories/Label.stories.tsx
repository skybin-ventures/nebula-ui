import type { Meta, StoryObj } from "@storybook/react-vite";
import { Label, Input } from "../../../index";

const meta = {
  title: "Inputs/Label",
  parameters: { layout: "centered" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-72 space-y-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" placeholder="you@example.com" />
    </div>
  ),
};
