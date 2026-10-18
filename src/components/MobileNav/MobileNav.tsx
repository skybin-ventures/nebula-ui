"use client"

import { useState, type ReactNode } from "react"
import { Menu } from "lucide-react"
import { cn } from "../../utils/cn"
import { Button } from "../../primitives/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../Sheet"

export interface MobileNavItem {
  key: string
  label: ReactNode
  icon?: ReactNode
  active?: boolean
  href?: string
  onClick?: () => void
}

export interface BottomNavProps {
  items: MobileNavItem[]
  className?: string
}

/** Bottom tab bar for mobile layouts */
export function BottomNav({ items, className }: BottomNavProps) {
  return (
    <nav
      aria-label="Bottom navigation"
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 flex items-stretch justify-around border-t bg-background pb-[env(safe-area-inset-bottom)]",
        className
      )}
    >
      {items.map((item) => {
        const classNameItem = cn(
          "flex min-h-14 flex-1 flex-col items-center justify-center gap-0.5 px-2 text-xs",
          item.active ? "text-primary" : "text-muted-foreground"
        )
        const content = (
          <>
            {item.icon}
            <span>{item.label}</span>
          </>
        )
        if (item.href) {
          return (
            <a
              key={item.key}
              href={item.href}
              className={classNameItem}
              aria-current={item.active ? "page" : undefined}
            >
              {content}
            </a>
          )
        }
        return (
          <button
            key={item.key}
            type="button"
            className={classNameItem}
            aria-current={item.active ? "page" : undefined}
            onClick={item.onClick}
          >
            {content}
          </button>
        )
      })}
    </nav>
  )
}

BottomNav.displayName = "BottomNav"

export interface MobileNavProps {
  title?: ReactNode
  items: MobileNavItem[]
  triggerLabel?: string
  className?: string
  children?: ReactNode
}

/** Mobile navigation drawer built on Sheet */
export function MobileNav({
  title = "Menu",
  items,
  triggerLabel = "Open menu",
  className,
  children,
}: MobileNavProps) {
  const [open, setOpen] = useState(false)

  const close = () => setOpen(false)

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button type="button" variant="outline" size="icon" aria-label={triggerLabel}>
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72">
          <SheetHeader>
            <SheetTitle>{title}</SheetTitle>
          </SheetHeader>
          <nav className="mt-4 flex flex-col gap-1" aria-label="Mobile">
            {items.map((item) => {
              const classNameItem = cn(
                "flex items-center gap-2 rounded-md px-3 py-2 text-sm",
                item.active ? "bg-accent" : "hover:bg-accent/60"
              )
              if (item.href) {
                return (
                  <a
                    key={item.key}
                    href={item.href}
                    className={classNameItem}
                    onClick={close}
                  >
                    {item.icon}
                    {item.label}
                  </a>
                )
              }
              return (
                <button
                  key={item.key}
                  type="button"
                  className={cn(classNameItem, "text-left")}
                  onClick={() => {
                    item.onClick?.()
                    close()
                  }}
                >
                  {item.icon}
                  {item.label}
                </button>
              )
            })}
          </nav>
          {children}
        </SheetContent>
      </Sheet>
    </div>
  )
}

MobileNav.displayName = "MobileNav"
