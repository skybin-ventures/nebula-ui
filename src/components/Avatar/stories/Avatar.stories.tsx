import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar, AvatarFallback, AvatarImage } from "../../../index";

const meta = {
  title: "Display/Avatar",
  parameters: { layout: "centered" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex w-fit items-center gap-4">
      <Avatar>
        <AvatarImage src="https://avatars.githubusercontent.com/u/9919?s=96" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>AF</AvatarFallback>
      </Avatar>
    </div>
  ),
};
