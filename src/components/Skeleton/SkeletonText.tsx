import { cn } from "../../utils/cn"
import { Skeleton } from "./Skeleton"

export interface SkeletonTextProps {
  lines?: number
  className?: string
}

export function SkeletonText({ lines = 3, className }: SkeletonTextProps) {
  return (
    <div className={cn("space-y-2", className)} aria-hidden="true">
      {Array.from({ length: lines }, (_, i) => (
        <Skeleton
          key={i}
          className={cn("h-4 w-full", i === lines - 1 && lines > 1 && "w-3/4")}
        />
      ))}
    </div>
  )
}

SkeletonText.displayName = "SkeletonText"
