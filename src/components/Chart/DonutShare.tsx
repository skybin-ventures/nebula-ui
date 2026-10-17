"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { ChartCard } from "./ChartCard"
import { getChartColors } from "./chartTheme"

export interface DonutShareSlice {
  label: string
  value: number
}

export interface DonutShareProps {
  title: string
  description?: string
  data: DonutShareSlice[]
  loading?: boolean
  className?: string
  summary?: string
}

const FALLBACK_PALETTE = ["#0f172a", "#334155", "#64748b", "#94a3b8", "#cbd5e1"]

export function DonutShare({
  title,
  description,
  data,
  loading,
  className,
  summary,
}: DonutShareProps) {
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
      legend={
        <ul className="flex flex-wrap gap-3">
          {data.map((slice, index) => (
            <li key={slice.label} className="flex items-center gap-1.5">
              <span
                className="inline-block h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: FALLBACK_PALETTE[index % FALLBACK_PALETTE.length] }}
              />
              {slice.label}
            </li>
          ))}
        </ul>
      }
    >
      <figure className="h-56 w-full" aria-label={summary ?? `${title} donut chart`}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="label"
              innerRadius="55%"
              outerRadius="80%"
              stroke={colors.border}
            >
              {data.map((slice, index) => (
                <Cell key={slice.label} fill={FALLBACK_PALETTE[index % FALLBACK_PALETTE.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </figure>
    </ChartCard>
  )
}

DonutShare.displayName = "DonutShare"
