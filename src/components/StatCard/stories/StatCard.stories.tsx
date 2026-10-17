import type { Meta, StoryObj } from "@storybook/react-vite"
import { DollarSign } from "lucide-react"
import { StatCard } from "../StatCard"

const meta = {
  title: "Components/StatCard",
  component: StatCard,
} satisfies Meta<typeof StatCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: "Monthly revenue",
    value: "$48,200",
    trend: "up",
    delta: "+12.4%",
    description: "vs last month",
    icon: <DollarSign className="h-4 w-4" />,
  },
}

export const Down: Story = {
  args: {
    title: "Churn",
    value: "2.1%",
    trend: "down",
    delta: "-0.3%",
  },
}
