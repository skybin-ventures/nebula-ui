import type { Meta, StoryObj } from "@storybook/react-vite"
import { Home, Search, User } from "lucide-react"
import { BottomNav, MobileNav } from "../MobileNav"

const meta = {
  title: "Components/MobileNav",
  component: MobileNav,
} satisfies Meta<typeof MobileNav>

export default meta
type Story = StoryObj<typeof meta>

const items = [
  { key: "home", label: "Home", icon: <Home className="h-4 w-4" />, active: true },
  { key: "search", label: "Search", icon: <Search className="h-4 w-4" /> },
  { key: "profile", label: "Profile", icon: <User className="h-4 w-4" /> },
]

export const Drawer: Story = {
  args: { title: "Nebula", items },
}

export const Bottom: Story = {
  render: () => (
    <div className="relative h-40">
      <BottomNav items={items} className="absolute" />
    </div>
  ),
}
