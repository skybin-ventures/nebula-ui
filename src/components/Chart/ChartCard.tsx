"use client"

import type { ReactNode } from "react"
import { cn } from "../../utils/cn"

export interface ChartCardProps {
  title: string
  description?: string
  legend?: ReactNode
  loading?: boolean
  empty?: boolean
  emptyMessage?: string
  className?: string
  children?: ReactNode
  "aria-label"?: string
}

export function ChartCard({
  title,
  description,
  legend,
  loading = false,
  empty = false,
  emptyMessage = "No chart data",
  className,
  children,
  "aria-label": ariaLabel,
}: ChartCardProps) {
  return (
    <section
      className={cn("space-y-3 rounded-lg border bg-card p-4 text-card-foreground", className)}
      aria-label={ariaLabel ?? title}
      aria-busy={loading || undefined}
    >
      <header className="space-y-1">
        <h3 className="text-sm font-semibold">{title}</h3>
        {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
      </header>
      {legend ? <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">{legend}</div> : null}
      {loading ? (
        <div className="flex h-48 items-center justify-center text-sm text-muted-foreground" role="status">
          Loading chart…
        </div>
      ) : empty ? (
        <div className="flex h-48 items-center justify-center text-sm text-muted-foreground" role="status">
          {emptyMessage}
        </div>
      ) : (
        children
      )}
    </section>
  )
}

ChartCard.displayName = "ChartCard"
