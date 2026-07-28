import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Button,
} from "../../../index";

const meta = {
  title: "Overlay/Sheet",
  parameters: { layout: "centered" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Open sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Sheet title</SheetTitle>
          <SheetDescription>Sheet side panel content.</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  ),
};
