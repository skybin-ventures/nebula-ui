import type { Meta, StoryObj } from "@storybook/react-vite"
import { Form } from "../Form"
import { FormConsent } from "../FormConsent"
import { Button } from "../../Button"

const meta = {
  title: "Form/FormConsent",
  component: FormConsent,
} satisfies Meta<typeof FormConsent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Form defaultValues={{ consent: false }} onSubmit={(data) => console.log(data)} config={{ colon: false }}>
      <FormConsent name="consent" required>
        I agree to the{" "}
        <a className="underline" href="#terms">
          terms of service
        </a>{" "}
        and privacy policy.
      </FormConsent>
      <Button type="submit" className="mt-4">
        Continue
      </Button>
    </Form>
  ),
}
