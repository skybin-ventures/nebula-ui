import type { Meta, StoryObj } from "@storybook/react-vite"
import { Form } from "../Form"
import { FormRating } from "../FormRating"
import { Button } from "../../Button"

const meta = {
  title: "Form/FormRating",
  component: FormRating,
} satisfies Meta<typeof FormRating>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Form defaultValues={{ score: 3 }} onSubmit={(data) => console.log(data)} config={{ colon: false }}>
      <FormRating name="score" label="Satisfaction" max={5} />
      <Button type="submit" className="mt-4">
        Save
      </Button>
    </Form>
  ),
}
