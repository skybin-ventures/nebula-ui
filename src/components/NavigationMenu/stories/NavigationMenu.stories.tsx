import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../NavigationMenu"

const meta = {
  title: "Components/NavigationMenu",
  component: NavigationMenu,
} satisfies Meta<typeof NavigationMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[280px] gap-2 p-4">
              <li>
                <NavigationMenuLink href="#forms">Forms</NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="#grids">Data grids</NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#docs" className="px-4 py-2 text-sm font-medium">
            Docs
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
}
