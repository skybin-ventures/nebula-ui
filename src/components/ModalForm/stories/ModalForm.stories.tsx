import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { ModalForm } from "../ModalForm"
import { TextBox } from "../../Form/TextBox"
import { Button } from "../../Button"

const meta = {
  title: "Components/ModalForm",
  component: ModalForm,
} satisfies Meta<typeof ModalForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: function Render() {
    const [open, setOpen] = useState(true)
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open</Button>
        <ModalForm
          open={open}
          onOpenChange={setOpen}
          title="Create project"
          description="Give your project a name."
          onSubmit={(data) => console.log(data)}
          defaultValues={{ name: "" }}
        >
          <TextBox name="name" label="Name" required />
        </ModalForm>
      </>
    )
  },
}
