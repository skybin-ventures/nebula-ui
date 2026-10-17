import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { Form } from "../../Form"
import { Button } from "../../Button"
import { TagInput } from "../TagInput"
import { FormTagInput } from "../FormTagInput"

const meta = {
  title: "Components/TagInput",
  component: TagInput,
  args: { defaultValue: ["design", "react"] },
} satisfies Meta<typeof TagInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Controlled: Story = {
  render: function Render() {
    const [value, setValue] = useState(["alpha"])
    return <TagInput value={value} onChange={setValue} />
  },
}
export const Disabled: Story = { args: { disabled: true } }
export const InForm: Story = {
  render: () => (
    <Form
      defaultValues={{ skills: ["typescript"] }}
      onSubmit={(data) => console.log(data)}
      config={{ colon: false }}
    >
      <FormTagInput name="skills" label="Skills" required />
      <Button type="submit" className="mt-4">
        Save
      </Button>
    </Form>
  ),
}
