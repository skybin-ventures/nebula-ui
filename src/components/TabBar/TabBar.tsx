"use client"

import type { ReactNode } from "react"
import { cn } from "../../utils/cn"
import { useControllableState } from "../../hooks/useControllableState"

export interface TabBarItem {
  value: string
  label: ReactNode
  disabled?: boolean
}

export interface TabBarProps {
  items: TabBarItem[]
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  className?: string
  "aria-label"?: string
}

/** Segmented filter tabs (not content Tabs). */
export function TabBar({
  items,
  value,
  defaultValue,
  onChange,
  className,
  "aria-label": ariaLabel = "Filter tabs",
}: TabBarProps) {
  const [selected, setSelected] = useControllableState(
    value,
    defaultValue ?? items[0]?.value ?? "",
    onChange
  )

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={cn(
        "inline-flex items-center gap-1 rounded-lg border bg-muted/40 p-1",
        className
      )}
    >
      {items.map((item) => {
        const active = item.value === selected
        return (
          <button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={active}
            disabled={item.disabled}
            className={cn(
              "rounded-md px-3 py-1.5 text-sm transition-colors",
              active
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
              item.disabled && "cursor-not-allowed opacity-50"
            )}
            onClick={() => setSelected(item.value)}
          >
            {item.label}
          </button>
        )
      })}
    </div>
  )
}

TabBar.displayName = "TabBar"
