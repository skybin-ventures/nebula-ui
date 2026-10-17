"use client"

import type { ReactNode } from "react"
import { ArrowDown, ArrowRight, ArrowUp } from "lucide-react"
import { cn } from "../../utils/cn"
import { Card, CardContent, CardHeader, CardTitle } from "../Card"

export type StatTrend = "up" | "down" | "flat"

export interface StatCardProps {
  title: string
  value: ReactNode
  trend?: StatTrend
  delta?: string
  icon?: ReactNode
  className?: string
  description?: string
}

/** Alias for StatCard */
export type MetricProps = StatCardProps

export function StatCard({
  title,
  value,
  trend,
  delta,
  icon,
  className,
  description,
}: StatCardProps) {
  const TrendIcon = trend === "up" ? ArrowUp : trend === "down" ? ArrowDown : ArrowRight

  return (
    <Card className={cn(className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {icon ? <div className="text-muted-foreground">{icon}</div> : null}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-semibold tracking-tight">{value}</div>
        {(trend || delta || description) && (
          <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
            {trend ? (
              <span
                className={cn(
                  "inline-flex items-center gap-0.5",
                  trend === "up" && "text-emerald-600",
                  trend === "down" && "text-destructive"
                )}
              >
                <TrendIcon className="h-3.5 w-3.5" aria-hidden="true" />
                {delta}
              </span>
            ) : delta ? (
              <span>{delta}</span>
            ) : null}
            {description ? <span>{description}</span> : null}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

StatCard.displayName = "StatCard"

/** Metric is an alias of StatCard */
export const Metric = StatCard
Metric.displayName = "Metric"
