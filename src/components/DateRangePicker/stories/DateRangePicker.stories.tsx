import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { Form } from "../../Form"
import { Button } from "../../Button"
import { DateRangePicker, FormDateRangePicker, type DateRangeValue } from "../index"

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

export const InForm: Story = {
  render: () => (
    <Form
      defaultValues={{ trip: { from: undefined, to: undefined } }}
      onSubmit={(data) => console.log(data)}
      config={{ colon: false }}
    >
      <FormDateRangePicker name="trip" label="Trip dates" required />
      <Button type="submit" className="mt-4">
        Save
      </Button>
    </Form>
  ),
}
