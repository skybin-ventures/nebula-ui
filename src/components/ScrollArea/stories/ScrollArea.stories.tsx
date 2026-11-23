import type { Meta, StoryObj } from "@storybook/react-vite";
import { ScrollArea } from "../../../index";

const meta = {
  title: "Layout/ScrollArea",
  parameters: { layout: "centered" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ScrollArea className="h-40 w-72 rounded-md border p-4">
      <div className="space-y-2 text-sm">
        {Array.from({ length: 25 }, (_, i) => (
          <p key={i}>Line {i + 1}</p>
        ))}
      </div>
    </ScrollArea>
  ),
};
