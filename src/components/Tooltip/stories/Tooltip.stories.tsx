import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  Button,
} from "../../../index";

const meta = {
  title: "Overlay/Tooltip",
  parameters: { layout: "centered" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover me</Button>
        </TooltipTrigger>
        <TooltipContent>Tip: more context appears here</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};
