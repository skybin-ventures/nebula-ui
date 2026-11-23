import type { Meta, StoryObj } from "@storybook/react-vite";
import { Bold, Italic, Underline } from "lucide-react";
import { Toggle } from "../../../index";

const meta = {
  title: "Inputs/Toggle",
  parameters: { layout: "centered" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex w-fit items-center gap-2">
      <Toggle aria-label="Bold">
        <Bold className="size-4" />
      </Toggle>
      <Toggle aria-label="Italic" variant="outline">
        <Italic className="size-4" />
      </Toggle>
      <Toggle aria-label="Underline" size="sm">
        <Underline className="size-4" />
      </Toggle>
    </div>
  ),
};
