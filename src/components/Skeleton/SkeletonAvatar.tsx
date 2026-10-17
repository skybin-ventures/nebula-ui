import { cn } from "../../utils/cn"
import { Skeleton } from "./Skeleton"

export interface SkeletonAvatarProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

const sizeClass = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-14 w-14",
} as const

export function SkeletonAvatar({ size = "md", className }: SkeletonAvatarProps) {
  return (
    <Skeleton className={cn("rounded-full", sizeClass[size], className)} aria-hidden="true" />
  )
}

SkeletonAvatar.displayName = "SkeletonAvatar"
