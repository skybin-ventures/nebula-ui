import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { Form } from "../../Form"
import { Button } from "../../Button"
import { ColorPicker } from "../ColorPicker"
import { FormColorPicker } from "../FormColorPicker"

const meta = {
  title: "Components/ColorPicker",
  component: ColorPicker,
  args: { defaultValue: "#3b82f6" },
} satisfies Meta<typeof ColorPicker>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Controlled: Story = {
  render: function Render() {
    const [value, setValue] = useState("#22c55e")
    return <ColorPicker value={value} onChange={setValue} />
  },
}
export const InForm: Story = {
  render: () => (
    <Form
      defaultValues={{ brand: "#0f172a" }}
      onSubmit={(data) => console.log(data)}
      config={{ colon: false }}
    >
      <FormColorPicker name="brand" label="Brand color" required />
      <Button type="submit" className="mt-4">
        Save
      </Button>
    </Form>
  ),
}
