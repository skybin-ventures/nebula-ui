import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { MultiSelect } from "../MultiSelect"

const options = [
  { label: "Design", value: "design" },
  { label: "Engineering", value: "eng" },
  { label: "Sales", value: "sales" },
]

const meta = {
  title: "Components/MultiSelect",
  component: MultiSelect,
  args: { options },
} satisfies Meta<typeof MultiSelect>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Controlled: Story = {
  render: function Render() {
    const [value, setValue] = useState(["eng"])
    return <MultiSelect options={options} value={value} onChange={setValue} />
  },
}
export const Disabled: Story = { args: { disabled: true, defaultValue: ["design"] } }
export const Loading: Story = { args: { loading: true } }
export const Empty: Story = { args: { options: [] } }
export const Error: Story = { args: { "aria-invalid": true } }
