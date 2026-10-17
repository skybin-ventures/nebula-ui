"use client"

import type { ComponentProps, ReactNode } from "react"
import { cn } from "../../utils/cn"

export interface SkipLinkProps {
  href?: string
  children?: ReactNode
  className?: string
  ref?: ComponentProps<"a">["ref"]
}

export function SkipLink({
  href = "#main-content",
  children = "Skip to content",
  className,
  ref,
}: SkipLinkProps) {
  return (
    <a
      ref={ref}
      href={href}
      className={cn(
        "sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50",
        "focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-medium",
        "focus:shadow-md focus:outline-none focus:ring-2 focus:ring-ring",
        className
      )}
    >
      {children}
    </a>
  )
}

SkipLink.displayName = "SkipLink"
