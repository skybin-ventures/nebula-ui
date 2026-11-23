import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Button,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "../../../index";

const meta = {
  title: "Inputs/Select",
  parameters: { layout: "centered" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = React.useState("");
    return (
      <div className="w-56">
        <Select value={value} onValueChange={setValue}>
          <SelectTrigger>
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="cherry">Cherry</SelectItem>
          </SelectContent>
        </Select>
      </div>
    );
  },
};

export const Grouped: Story = {
  render: () => {
    const [value, setValue] = React.useState("");
    return (
      <div className="w-56">
        <Select value={value} onValueChange={setValue}>
          <SelectTrigger>
            <SelectValue placeholder="Select a member" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Admins</SelectLabel>
              <SelectItem value="ada">Ada</SelectItem>
              <SelectItem value="linus">Linus</SelectItem>
            </SelectGroup>
            <SelectSeparator />
            <SelectGroup>
              <SelectLabel>Contributors</SelectLabel>
              <SelectItem value="grace">Grace</SelectItem>
              <SelectItem value="margaret">Margaret</SelectItem>
              <SelectItem value="dennis" disabled>
                Dennis (retired)
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="w-56">
      <Select disabled>
        <SelectTrigger>
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
      </Select>
    </div>
  ),
};

export const Inline: Story = {
  render: () => {
    const [value, setValue] = React.useState("us");
    return (
      <div className="flex items-center gap-2">
        <Select value={value} onValueChange={setValue}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="us">United States</SelectItem>
            <SelectItem value="ca">Canada</SelectItem>
            <SelectItem value="uk">United Kingdom</SelectItem>
            <SelectItem value="de">Germany</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="ghost">Reset</Button>
      </div>
    );
  },
};
