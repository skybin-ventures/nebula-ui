import type { Meta, StoryObj } from "@storybook/react-vite"
import { Form } from "../Form"
import { FormPassword } from "../FormPassword"
import { Button } from "../../Button"

const meta = {
  title: "Form/FormPassword",
  component: FormPassword,
} satisfies Meta<typeof FormPassword>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Form defaultValues={{ password: "" }} onSubmit={(data) => console.log(data)} config={{ colon: false }}>
      <FormPassword name="password" label="Password" required minLength={8} />
      <Button type="submit" className="mt-4">
        Create account
      </Button>
    </Form>
  ),
}
