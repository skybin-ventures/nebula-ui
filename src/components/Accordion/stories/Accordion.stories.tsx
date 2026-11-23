import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../../../index";

const meta = {
  title: "Layout/Accordion",
  parameters: { layout: "centered" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-80">
      <AccordionItem value="a1">
        <AccordionTrigger>What is Nebula UI?</AccordionTrigger>
        <AccordionContent>
          A React component library built on shadcn/ui patterns.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="a2">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>Yes, built on Radix primitives.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
