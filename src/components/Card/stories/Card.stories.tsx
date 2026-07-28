import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../Card";

const meta = {
  title: "Display/Card",
  component: Card,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card title</CardTitle>
        <CardDescription>Card description</CardDescription>
      </CardHeader>
      <CardContent>Card content goes here.</CardContent>
    </Card>
  ),
};
