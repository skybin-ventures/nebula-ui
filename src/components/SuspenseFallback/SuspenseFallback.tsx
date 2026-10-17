"use client"

import type { ReactNode } from "react"
import { cn } from "../../utils/cn"
import { Skeleton, SkeletonAvatar, SkeletonText, SkeletonTitle } from "../Skeleton"

export interface SuspenseFallbackProps {
  className?: string
  children?: ReactNode
}

export function SuspenseFallback({ className, children }: SuspenseFallbackProps) {
  if (children) {
    return (
      <div role="status" aria-busy="true" aria-label="Loading" className={className}>
        {children}
      </div>
    )
  }

  return (
    <div
      role="status"
      aria-busy="true"
      aria-label="Loading"
      className={cn("flex gap-3 p-4", className)}
    >
      <SkeletonAvatar />
      <div className="flex-1 space-y-2">
        <SkeletonTitle className="w-1/3" />
        <SkeletonText lines={2} />
        <Skeleton className="h-8 w-24" />
      </div>
    </div>
  )
}

SuspenseFallback.displayName = "SuspenseFallback"
