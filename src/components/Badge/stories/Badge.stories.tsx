import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "../../Badge";

const meta = {
  title: "Display/Badge",
  component: Badge,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: "Badge" },
};

export const Success: Story = {
  args: { children: "Success", variant: "success" },
};
