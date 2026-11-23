import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CreditCard,
  LayoutDashboard,
  Search,
  Settings,
  Users,
} from "lucide-react";
import { Sidebar, type SidebarGroup } from "../../../index";

const groups: SidebarGroup[] = [
  {
    label: "Overview",
    items: [
      { href: "/", label: "Dashboard", icon: LayoutDashboard },
      { href: "/search", label: "Search", icon: Search, badge: 12 },
    ],
  },
  {
    label: "Workspace",
    items: [
      {
        label: "Billing",
        icon: CreditCard,
        children: [
          { href: "/billing", label: "Plans & invoices" },
          { href: "/billing/cards", label: "Payment methods" },
        ],
      },
      {
        href: "/team",
        label: "Team",
        icon: Users,
        badge: 8,
      },
      { label: "Archived", icon: Settings, disabled: true },
    ],
  },
];

const meta = {
  title: "Navigation/Sidebar",
  parameters: { layout: "fullscreen" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex h-[520px]">
      <Sidebar groups={groups} activePath="/" />
      <div className="flex-1 p-4 text-sm text-muted-foreground">
        Active path: / — badges, collapsible children and a disabled item are
        shown in the groups on the left.
      </div>
    </div>
  ),
};

export const Collapsed: Story = {
  render: () => {
    const [collapsed, setCollapsed] = React.useState(true);
    return (
      <div className="flex h-[520px]">
        <Sidebar
          groups={groups}
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed((current) => !current)}
          activePath="/team"
        />
        <div className="flex-1 p-4 text-sm text-muted-foreground">
          Icons only — click the toggle at the top to expand.
        </div>
      </div>
    );
  },
};

export const Mobile: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);
    return (
      <div className="flex h-[520px] w-full">
        <Sidebar variant="mobile" groups={groups} mobileOpen={open} onMobileOpenChange={setOpen} />
        <div className="flex-1 p-4 text-sm text-muted-foreground">
          Open the sheet with the menu button (visible below the md breakpoint).
        </div>
      </div>
    );
  },
};
