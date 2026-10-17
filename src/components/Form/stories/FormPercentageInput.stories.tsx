import type { Meta, StoryObj } from "@storybook/react-vite"
import { Form } from "../Form"
import { FormPercentageInput } from "../FormPercentageInput"
import { Button } from "../../Button"

const meta = {
  title: "Form/FormPercentageInput",
  component: FormPercentageInput,
} satisfies Meta<typeof FormPercentageInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Form defaultValues={{ rate: 12 }} onSubmit={(data) => console.log(data)} config={{ colon: false }}>
      <FormPercentageInput name="rate" label="Tax rate" />
      <Button type="submit" className="mt-4">
        Save
      </Button>
    </Form>
  ),
}
