"use client"

import type { ReactNode } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../utils/cn"

const statusDotVariants = cva("inline-block h-2.5 w-2.5 shrink-0 rounded-full", {
  variants: {
    status: {
      success: "bg-emerald-500",
      warning: "bg-amber-500",
      danger: "bg-destructive",
      info: "bg-sky-500",
      neutral: "bg-muted-foreground",
    },
  },
  defaultVariants: {
    status: "neutral",
  },
})

export interface StatusIndicatorProps extends VariantProps<typeof statusDotVariants> {
  label: ReactNode
  pulse?: boolean
  className?: string
}

export function StatusIndicator({
  label,
  status = "neutral",
  pulse = false,
  className,
}: StatusIndicatorProps) {
  return (
    <span className={cn("inline-flex items-center gap-2 text-sm", className)}>
      <span className="relative flex h-2.5 w-2.5">
        {pulse ? (
          <span
            className={cn(
              "absolute inline-flex h-full w-full animate-ping rounded-full opacity-60",
              statusDotVariants({ status })
            )}
          />
        ) : null}
        <span className={cn("relative", statusDotVariants({ status }))} />
      </span>
      <span>{label}</span>
    </span>
  )
}

StatusIndicator.displayName = "StatusIndicator"
