import * as React from "react"
import { cn } from "@/utils"
import { Button } from "@/components/Button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/primitives/sheet"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/primitives/collapsible"
import { ScrollArea } from "@/primitives/scroll-area"
import { ChevronRight, LayoutDashboard, PanelLeftClose, PanelLeftOpen, Menu } from "lucide-react"

// ─── Types ───────────────────────────────────────────────────────────────────

export interface SidebarItem {
  href?: string
  label: string
  icon?: React.ComponentType<{ className?: string }>
  roles?: string[]
  children?: SidebarItem[]
  badge?: string | number
  disabled?: boolean
}

export interface SidebarGroup {
  label: string
  items: SidebarItem[]
}

export interface SidebarProps {
  groups: SidebarGroup[]
  collapsed?: boolean
  onToggleCollapse?: () => void
  activePath?: string
  className?: string
  variant?: "desktop" | "mobile"
  mobileOpen?: boolean
  onMobileOpenChange?: (open: boolean) => void
}

// ─── Desktop Sidebar ─────────────────────────────────────────────────────────

function DesktopSidebar({
  groups,
  collapsed = false,
  onToggleCollapse,
  activePath,
  className,
}: Omit<SidebarProps, "variant" | "mobileOpen" | "onMobileOpenChange">) {
  return (
    <aside
      className={cn(
        "flex h-full flex-col border-r bg-background transition-all duration-200",
        collapsed ? "w-14" : "w-64",
        className
      )}
    >
      {/* Toggle button */}
      <div className="flex items-center justify-between border-b px-2 py-2">
        {!collapsed && (
          <span className="px-2 text-sm font-semibold">Navigation</span>
        )}
        {onToggleCollapse && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleCollapse}
            className="h-7 w-7"
          >
            {collapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
          </Button>
        )}
      </div>

      {/* Nav items */}
      <ScrollArea className="flex-1">
        <nav className="space-y-1 p-2">
          {groups.map((group, groupIdx) => (
            <div key={groupIdx} className="space-y-0.5">
              {!collapsed && group.label && (
                <p className="px-2 py-1.5 text-xs font-medium text-muted-foreground">{group.label}</p>
              )}
              {group.items.map((item, itemIdx) => (
                <SidebarItemLink
                  key={itemIdx}
                  item={item}
                  collapsed={collapsed}
                  activePath={activePath}
                />
              ))}
            </div>
          ))}
        </nav>
      </ScrollArea>
    </aside>
  )
}

// ─── Sidebar item ────────────────────────────────────────────────────────────

function SidebarItemLink({
  item,
  collapsed,
  activePath,
}: {
  item: SidebarItem
  collapsed: boolean
  activePath?: string
}) {
  const isActive = item.href ? activePath === item.href : false
  const hasChildren = item.children && item.children.length > 0
  const [childOpen, setChildOpen] = React.useState(false)

  const Icon = item.icon || LayoutDashboard

  if (hasChildren && !collapsed) {
    return (
      <Collapsible open={childOpen} onOpenChange={setChildOpen}>
        <CollapsibleTrigger asChild>
          <button
            className={cn(
              "flex w-full items-center gap-3 rounded-md px-2 py-1.5 text-sm transition-colors",
              "hover:bg-accent hover:text-accent-foreground",
              isActive && "bg-accent text-accent-foreground font-medium",
              item.disabled && "pointer-events-none opacity-50"
            )}
          >
            <Icon className="h-4 w-4 shrink-0" />
            <span className="flex-1 text-left truncate">{item.label}</span>
            <ChevronRight className="h-3 w-3 shrink-0 transition-transform data-[state=open]:rotate-90" />
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent className="ml-4 space-y-0.5 pl-2 border-l">
          {item.children!.map((child, idx) => (
            <SidebarItemLink
              key={idx}
              item={child}
              collapsed={collapsed}
              activePath={activePath}
            />
          ))}
        </CollapsibleContent>
      </Collapsible>
    )
  }

  if (item.href) {
    return (
      <a
        href={item.href}
        className={cn(
          "flex items-center gap-3 rounded-md px-2 py-1.5 text-sm transition-colors",
          "hover:bg-accent hover:text-accent-foreground",
          isActive && "bg-accent text-accent-foreground font-medium",
          item.disabled && "pointer-events-none opacity-50",
          collapsed && "justify-center"
        )}
        title={collapsed ? item.label : undefined}
      >
        <Icon className="h-4 w-4 shrink-0" />
        {!collapsed && <span className="truncate">{item.label}</span>}
        {!collapsed && item.badge !== undefined && (
          <BadgeInline count={item.badge} />
        )}
      </a>
    )
  }

  return (
    <button
      className={cn(
        "flex w-full items-center gap-3 rounded-md px-2 py-1.5 text-sm transition-colors",
        "hover:bg-accent hover:text-accent-foreground",
        item.disabled && "pointer-events-none opacity-50",
        collapsed && "justify-center"
      )}
      title={collapsed ? item.label : undefined}
    >
      <Icon className="h-4 w-4 shrink-0" />
      {!collapsed && <span className="truncate">{item.label}</span>}
      {!collapsed && item.badge !== undefined && <BadgeInline count={item.badge} />}
    </button>
  )
}

function BadgeInline({ count }: { count: string | number }) {
  if (typeof count === "number" && count === 0) return null
  return (
    <span className="ml-auto rounded-full bg-primary px-1.5 py-0.5 text-xs font-medium text-primary-foreground">
      {count}
    </span>
  )
}

// ─── Mobile Sidebar ──────────────────────────────────────────────────────────

function MobileSidebar({
  groups,
  mobileOpen,
  onMobileOpenChange,
  activePath,
}: Pick<SidebarProps, "groups" | "mobileOpen" | "onMobileOpenChange" | "activePath">) {
  return (
    <Sheet open={mobileOpen} onOpenChange={onMobileOpenChange}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open sidebar</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-72">
        <SheetHeader className="border-b px-4 py-3">
          <SheetTitle className="text-sm font-semibold">Navigation</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-3.5rem)]">
          <nav className="space-y-1 p-3">
            {groups.map((group, groupIdx) => (
              <div key={groupIdx} className="space-y-0.5">
                {group.label && (
                  <p className="px-2 py-1.5 text-xs font-medium text-muted-foreground">{group.label}</p>
                )}
                {group.items.map((item, itemIdx) => (
                  <SidebarItemLink key={itemIdx} item={item} collapsed={false} activePath={activePath} />
                ))}
              </div>
            ))}
          </nav>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}

// ─── Main Component ──────────────────────────────────────────────────────────

export function Sidebar({
  groups,
  collapsed = false,
  onToggleCollapse,
  activePath,
  className,
  variant = "desktop",
  mobileOpen,
  onMobileOpenChange,
}: SidebarProps) {
  if (variant === "mobile") {
    return (
      <MobileSidebar
        groups={groups}
        mobileOpen={mobileOpen}
        onMobileOpenChange={onMobileOpenChange}
        activePath={activePath}
      />
    )
  }

  return (
    <DesktopSidebar
      groups={groups}
      collapsed={collapsed}
      onToggleCollapse={onToggleCollapse}
      activePath={activePath}
      className={className}
    />
  )
}
