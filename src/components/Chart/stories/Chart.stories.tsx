import type { Meta, StoryObj } from "@storybook/react-vite"
import { ChartCard } from "../ChartCard"
import { LineTrend } from "../LineTrend"
import { BarCompare } from "../BarCompare"
import { DonutShare } from "../DonutShare"
import { Sparkline } from "../Sparkline"
import { AreaRange } from "../AreaRange"

const points = [
  { label: "Mon", value: 12 },
  { label: "Tue", value: 18 },
  { label: "Wed", value: 9 },
  { label: "Thu", value: 22 },
  { label: "Fri", value: 16 },
]

const meta = {
  title: "Components/Chart",
  component: ChartCard,
} satisfies Meta<typeof ChartCard>

export default meta
type Story = StoryObj<typeof meta>

export const ShellEmpty: Story = {
  args: {
    title: "Revenue",
    description: "Last 7 days",
    empty: true,
  },
}

export const Line: Story = {
  render: () => <LineTrend title="Signups" data={points} summary="Daily signups this week" />,
}

export const Bar: Story = {
  render: () => <BarCompare title="By channel" data={points} />,
}

export const Donut: Story = {
  render: () => (
    <DonutShare
      title="Share"
      data={[
        { label: "Organic", value: 40 },
        { label: "Paid", value: 35 },
        { label: "Referral", value: 25 },
      ]}
    />
  ),
}

export const Spark: Story = {
  render: () => <Sparkline data={points.map((p) => ({ value: p.value }))} />,
}

export const Area: Story = {
  render: () => <AreaRange title="Active users" data={points} />,
}
