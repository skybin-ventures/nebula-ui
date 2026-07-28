import type { Meta, StoryObj } from "@storybook/react-vite";
import { Slider } from "../../Slider";

const meta = {
  title: "Form/Slider",
  component: Slider,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Slider defaultValue={[50]} max={100} step={1} className="w-[300px]" />
  ),
};
