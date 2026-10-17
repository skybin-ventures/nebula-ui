"use client"

import { cn } from "../../utils/cn"
import { Progress } from "../Progress"

export interface ProgressBarProps {
  value?: number
  max?: number
  label?: string
  showValue?: boolean
  className?: string
}

export function ProgressBar({
  value = 0,
  max = 100,
  label,
  showValue = false,
  className,
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(max, value))
  const percent = max === 0 ? 0 : Math.round((clamped / max) * 100)

  return (
    <div className={cn("space-y-1.5", className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between text-sm">
          {label ? <span>{label}</span> : <span />}
          {showValue ? <span className="text-muted-foreground">{percent}%</span> : null}
        </div>
      )}
      <Progress value={percent} aria-label={label ?? "Progress"} />
    </div>
  )
}

ProgressBar.displayName = "ProgressBar"
