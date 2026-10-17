"use client"

import type { ReactNode } from "react"
import { cn } from "../../utils/cn"
import { Separator } from "../Separator"

export interface DividerProps {
  children?: ReactNode
  className?: string
  orientation?: "horizontal" | "vertical"
}

export function Divider({ children, className, orientation = "horizontal" }: DividerProps) {
  if (!children || orientation === "vertical") {
    return <Separator orientation={orientation} className={className} />
  }

  return (
    <div
      role="separator"
      className={cn("flex items-center gap-3 text-sm text-muted-foreground", className)}
    >
      <Separator className="flex-1" />
      <span className="shrink-0">{children}</span>
      <Separator className="flex-1" />
    </div>
  )
}

Divider.displayName = "Divider"
