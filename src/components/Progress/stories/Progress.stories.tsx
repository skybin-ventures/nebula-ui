import type { Meta, StoryObj } from "@storybook/react-vite";
import { Progress } from "../../Progress";

const meta = {
  title: "Feedback/Progress",
  component: Progress,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Progress value={45} className="w-[300px]" />,
};
