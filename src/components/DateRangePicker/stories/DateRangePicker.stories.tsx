import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { DateRangePicker, type DateRangeValue } from "../DateRangePicker"

const meta = {
  title: "Components/DateRangePicker",
  component: DateRangePicker,
} satisfies Meta<typeof DateRangePicker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Controlled: Story = {
  render: function Render() {
    const [value, setValue] = useState<DateRangeValue>({ from: new Date(2026, 8, 1), to: new Date(2026, 8, 10) })
    return <DateRangePicker value={value} onChange={setValue} />
  },
}

export const Disabled: Story = { args: { disabled: true } }
export const Loading: Story = { args: { loading: true } }
export const Empty: Story = { args: { value: {} } }
export const Error: Story = { args: { "aria-invalid": true } }
