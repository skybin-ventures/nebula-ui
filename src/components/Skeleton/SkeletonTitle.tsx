import { cn } from "../../utils/cn"
import { Skeleton } from "./Skeleton"

export interface SkeletonTitleProps {
  className?: string
}

export function SkeletonTitle({ className }: SkeletonTitleProps) {
  return <Skeleton className={cn("h-7 w-1/3", className)} aria-hidden="true" />
}

SkeletonTitle.displayName = "SkeletonTitle"
