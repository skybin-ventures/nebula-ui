"use client"

import { Line, LineChart, ResponsiveContainer } from "recharts"
import { cn } from "../../utils/cn"
import { getChartColors } from "./chartTheme"

export interface SparklinePoint {
  value: number
}

export interface SparklineProps {
  data: SparklinePoint[]
  className?: string
  "aria-label"?: string
}

export function Sparkline({ data, className, "aria-label": ariaLabel = "Sparkline" }: SparklineProps) {
  const colors = getChartColors()

  return (
    <div className={cn("h-10 w-28", className)} role="img" aria-label={ariaLabel}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Line type="monotone" dataKey="value" stroke={colors.primary} strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

Sparkline.displayName = "Sparkline"
