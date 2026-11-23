import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../index";

const meta = {
  title: "Overlay/Popover",
  parameters: { layout: "centered" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <p className="text-sm">Popover content with padding and a shadow.</p>
      </PopoverContent>
    </Popover>
  ),
};

export const Aligned: Story = {
  render: () => (
    <div className="flex w-full gap-3">
      {(
        [
          ["Start", "start"],
          ["Center", "center"],
          ["End", "end"],
        ] as const
      ).map(([label, align]) => (
        <Popover key={align}>
          <PopoverTrigger asChild>
            <Button variant="outline">{label}</Button>
          </PopoverTrigger>
          <PopoverContent align={align} className="w-56">
            <p className="text-sm font-medium">Aligned to {align}</p>
          </PopoverContent>
        </Popover>
      ))}
    </div>
  ),
};
