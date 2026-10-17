"use client"

import type { ReactNode } from "react"
import { cn } from "../../utils/cn"
import { Avatar, AvatarFallback, AvatarImage } from "../Avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../Tooltip"

export interface AvatarGroupItem {
  src?: string
  alt?: string
  fallback: string
  name?: string
}

export interface AvatarGroupProps {
  items: AvatarGroupItem[]
  max?: number
  size?: "sm" | "md" | "lg"
  className?: string
}

const sizeClass = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
}

export function AvatarGroup({ items, max = 4, size = "md", className }: AvatarGroupProps) {
  const visible = items.slice(0, max)
  const overflow = Math.max(0, items.length - max)

  return (
    <TooltipProvider>
      <div className={cn("flex items-center -space-x-2", className)} role="group" aria-label="Avatar group">
        {visible.map((item, index) => {
          const avatar: ReactNode = (
            <Avatar className={cn(sizeClass[size], "ring-2 ring-background")}>
              {item.src ? <AvatarImage src={item.src} alt={item.alt ?? item.name ?? item.fallback} /> : null}
              <AvatarFallback>{item.fallback}</AvatarFallback>
            </Avatar>
          )

          if (!item.name) {
            return <div key={`${item.fallback}-${index}`}>{avatar}</div>
          }

          return (
            <Tooltip key={`${item.fallback}-${index}`}>
              <TooltipTrigger asChild>
                <button type="button" className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                  {avatar}
                </button>
              </TooltipTrigger>
              <TooltipContent>{item.name}</TooltipContent>
            </Tooltip>
          )
        })}
        {overflow > 0 ? (
          <Avatar className={cn(sizeClass[size], "ring-2 ring-background")}>
            <AvatarFallback>+{overflow}</AvatarFallback>
          </Avatar>
        ) : null}
      </div>
    </TooltipProvider>
  )
}

AvatarGroup.displayName = "AvatarGroup"
