import type { Meta, StoryObj } from "@storybook/react-vite"
import { Form } from "../Form"
import { FormInputOTP } from "../FormInputOTP"
import { Button } from "../../Button"

const meta = {
  title: "Form/FormInputOTP",
  component: FormInputOTP,
} satisfies Meta<typeof FormInputOTP>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Form
      defaultValues={{ code: "" }}
      onSubmit={(data) => console.log(data)}
      config={{ colon: false }}
    >
      <FormInputOTP name="code" label="Verification code" required length={6} />
      <Button type="submit" className="mt-4">
        Verify
      </Button>
    </Form>
  ),
}
