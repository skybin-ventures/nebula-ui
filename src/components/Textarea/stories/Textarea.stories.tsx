import type { Meta, StoryObj } from "@storybook/react-vite";
import { Textarea, Label } from "../../../index";

const meta = {
  title: "Inputs/Textarea",
  parameters: { layout: "centered" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-96 space-y-2">
      <Label htmlFor="bio">Bio</Label>
      <Textarea id="bio" rows={4} placeholder="Tell us about yourself…" />
      <Textarea disabled placeholder="Disabled" />
    </div>
  ),
};
