import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "../../../index";

const meta = {
  title: "Overlay/Command",
  parameters: { layout: "centered" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Command className="w-96 rounded-md border">
      <CommandInput placeholder="Type a command…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            Calendar <CommandShortcut>⌘C</CommandShortcut>
          </CommandItem>
          <CommandItem>
            Search <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>Profile</CommandItem>
          <CommandItem>Billing</CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
};
