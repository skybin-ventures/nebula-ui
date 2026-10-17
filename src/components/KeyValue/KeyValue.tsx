"use client"

import type { ReactNode } from "react"
import { cn } from "../../utils/cn"

export interface KeyValueItem {
  label: ReactNode
  value: ReactNode
  key?: string
}

export interface KeyValueProps {
  items: KeyValueItem[]
  className?: string
  columns?: 1 | 2
}

export function KeyValue({ items, className, columns = 1 }: KeyValueProps) {
  return (
    <dl
      className={cn(
        "grid gap-x-6 gap-y-3 text-sm",
        columns === 2 ? "sm:grid-cols-2" : "grid-cols-1",
        className
      )}
    >
      {items.map((item, index) => (
        <div key={item.key ?? index} className="grid gap-1 sm:grid-cols-[8rem_1fr] sm:gap-3">
          <dt className="text-muted-foreground">{item.label}</dt>
          <dd className="font-medium text-foreground">{item.value}</dd>
        </div>
      ))}
    </dl>
  )
}

KeyValue.displayName = "KeyValue"
