import type { Meta, StoryObj } from "@storybook/react-vite";
import { Calendar } from "../../../index";

const meta = {
  title: "Pickers/Calendar",
  parameters: { layout: "centered" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-fit">
      <Calendar />
    </div>
  ),
};
