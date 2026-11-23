import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "../../../index";

const meta = {
  title: "Inputs/Input",
  parameters: { layout: "centered" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-72 space-y-2">
      <Input placeholder="Type something…" />
      <Input type="password" placeholder="Password (with reveal toggle)" />
      <Input disabled placeholder="Disabled" />
    </div>
  ),
};
