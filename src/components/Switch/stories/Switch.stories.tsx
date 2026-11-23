import type { Meta, StoryObj } from "@storybook/react-vite";
import { Switch, Label } from "../../../index";

const meta = {
  title: "Inputs/Switch",
  parameters: { layout: "centered" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex w-fit items-center gap-3">
      <Switch />
      <Label>Toggle</Label>
      <Switch defaultChecked />
      <Label>Checked</Label>
      <Switch disabled />
      <Label>Disabled</Label>
    </div>
  ),
};
