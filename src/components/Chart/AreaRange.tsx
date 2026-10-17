"use client"

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { ChartCard } from "./ChartCard"
import { getChartColors } from "./chartTheme"

export interface AreaRangePoint {
  label: string
  value: number
}

export interface AreaRangeProps {
  title: string
  description?: string
  data: AreaRangePoint[]
  loading?: boolean
  className?: string
  summary?: string
}

export function AreaRange({
  title,
  description,
  data,
  loading,
  className,
  summary,
}: AreaRangeProps) {
  const colors = getChartColors()
  const empty = !loading && data.length === 0

  return (
    <ChartCard
      title={title}
      description={description}
      loading={loading}
      empty={empty}
      className={className}
      aria-label={summary ?? title}
    >
      <figure className="h-56 w-full" aria-label={summary ?? `${title} area chart`}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <CartesianGrid stroke={colors.border} strokeDasharray="3 3" />
            <XAxis dataKey="label" stroke={colors.muted} fontSize={12} />
            <YAxis stroke={colors.muted} fontSize={12} />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="value"
              stroke={colors.primary}
              fill={colors.primary}
              fillOpacity={0.2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </figure>
    </ChartCard>
  )
}

AreaRange.displayName = "AreaRange"
