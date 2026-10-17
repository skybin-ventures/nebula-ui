import type { Meta, StoryObj } from "@storybook/react-vite"
import { Form } from "../Form"
import { FormCurrencyInput } from "../FormCurrencyInput"
import { Button } from "../../Button"

const meta = {
  title: "Form/FormCurrencyInput",
  component: FormCurrencyInput,
} satisfies Meta<typeof FormCurrencyInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Form defaultValues={{ amount: 19.99 }} onSubmit={(data) => console.log(data)} config={{ colon: false }}>
      <FormCurrencyInput name="amount" label="Amount" currency="USD" />
      <Button type="submit" className="mt-4">
        Save
      </Button>
    </Form>
  ),
}
