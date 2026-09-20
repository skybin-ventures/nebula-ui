import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { Stepper } from "../Stepper"

const steps = [
  { id: "one", label: "Account", content: <p>Account details</p> },
  { id: "two", label: "Plan", content: <p>Choose a plan</p> },
  { id: "three", label: "Confirm", content: <p>Review and finish</p> },
]

const meta = {
  title: "Components/Stepper",
  component: Stepper,
  args: { steps },
} satisfies Meta<typeof Stepper>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Controlled: Story = {
  render: function Render() {
    const [current, setCurrent] = useState(1)
    return <Stepper steps={steps} current={current} onCurrentChange={setCurrent} />
  },
}
export const Disabled: Story = { args: { disabled: true } }
export const Loading: Story = { args: { loading: true } }
export const Empty: Story = { args: { steps: [] } }
export const Error: Story = { args: { steps: [{ id: "err", label: "Error", content: <p>Fix the highlighted fields</p> }] } }
