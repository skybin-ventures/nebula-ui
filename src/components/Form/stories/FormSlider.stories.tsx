import type { Meta, StoryObj } from "@storybook/react-vite"
import { Form } from "../Form"
import { FormSlider } from "../FormSlider"
import { Button } from "../../Button"

const meta = {
  title: "Form/FormSlider",
  component: FormSlider,
} satisfies Meta<typeof FormSlider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Form
      defaultValues={{ volume: 40 }}
      onSubmit={(data) => console.log(data)}
      config={{ colon: false }}
    >
      <FormSlider name="volume" label="Volume" min={0} max={100} />
      <Button type="submit" className="mt-4">
        Save
      </Button>
    </Form>
  ),
}
