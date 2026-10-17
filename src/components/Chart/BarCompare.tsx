"use client"

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { ChartCard } from "./ChartCard"
import { getChartColors } from "./chartTheme"

export interface BarComparePoint {
  label: string
  value: number
}

export interface BarCompareProps {
  title: string
  description?: string
  data: BarComparePoint[]
  loading?: boolean
  className?: string
  summary?: string
}

export function BarCompare({
  title,
  description,
  data,
  loading,
  className,
  summary,
}: BarCompareProps) {
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
      <figure className="h-56 w-full" aria-label={summary ?? `${title} bar chart`}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid stroke={colors.border} strokeDasharray="3 3" />
            <XAxis dataKey="label" stroke={colors.muted} fontSize={12} />
            <YAxis stroke={colors.muted} fontSize={12} />
            <Tooltip />
            <Bar dataKey="value" fill={colors.primary} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </figure>
    </ChartCard>
  )
}

BarCompare.displayName = "BarCompare"
