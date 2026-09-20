import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { FilterPanel, type FilterValue } from "../FilterPanel"

const fields = [
  { id: "q", label: "Search", type: "text" as const, placeholder: "Name" },
  { id: "role", label: "Role", type: "select" as const, options: [{ label: "Admin", value: "admin" }, { label: "User", value: "user" }] },
  { id: "tags", label: "Tags", type: "multiselect" as const, options: [{ label: "A", value: "a" }, { label: "B", value: "b" }] },
]

const meta = {
  title: "Components/FilterPanel",
  component: FilterPanel,
  args: { fields },
} satisfies Meta<typeof FilterPanel>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Controlled: Story = {
  render: function Render() {
    const [value, setValue] = useState<Record<string, FilterValue>>({ q: "Ada" })
    return <FilterPanel fields={fields} value={value} onChange={setValue} />
  },
}
export const Disabled: Story = { args: { disabled: true } }
export const Loading: Story = { args: { loading: true } }
export const Empty: Story = { args: { fields: [] } }
export const Error: Story = { args: { emptyText: "Filters failed to load", fields: [] } }
