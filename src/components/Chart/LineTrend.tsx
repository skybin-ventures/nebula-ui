"use client"

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { ChartCard } from "./ChartCard"
import { getChartColors } from "./chartTheme"

export interface LineTrendPoint {
  label: string
  value: number
}

export interface LineTrendProps {
  title: string
  description?: string
  data: LineTrendPoint[]
  loading?: boolean
  className?: string
  summary?: string
}

export function LineTrend({
  title,
  description,
  data,
  loading,
  className,
  summary,
}: LineTrendProps) {
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
      <figure className="h-56 w-full" aria-label={summary ?? `${title} line chart`}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid stroke={colors.border} strokeDasharray="3 3" />
            <XAxis dataKey="label" stroke={colors.muted} fontSize={12} />
            <YAxis stroke={colors.muted} fontSize={12} />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke={colors.primary} strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </figure>
    </ChartCard>
  )
}

LineTrend.displayName = "LineTrend"
