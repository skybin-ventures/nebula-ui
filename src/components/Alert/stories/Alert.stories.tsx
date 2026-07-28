import type { Meta, StoryObj } from "@storybook/react-vite";
import { Alert, AlertDescription, AlertTitle } from "../../Alert";

const meta = {
  title: "Feedback/Alert",
  component: Alert,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Alert className="w-[400px]">
      <AlertTitle>Heads up</AlertTitle>
      <AlertDescription>This is an alert message.</AlertDescription>
    </Alert>
  ),
};
