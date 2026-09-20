import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { Button } from "../../Button"
import { ConfirmDialog, ConfirmProvider, useConfirm } from "../ConfirmDialog"

const meta = {
  title: "Components/ConfirmDialog",
  component: ConfirmDialog,
} satisfies Meta<typeof ConfirmDialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { open: true, title: "Delete file?" },
}
export const Controlled: Story = {
  render: function Render() {
    const [open, setOpen] = useState(true)
    return <ConfirmDialog open={open} onOpenChange={setOpen} />
  },
}
export const Disabled: Story = { args: { open: true, disabled: true } }
export const Loading: Story = { args: { open: true, loading: true } }
export const Empty: Story = { args: { open: true, description: "" } }
export const Error: Story = { args: { open: true, variant: "destructive", title: "Delete workspace?" } }

function ConfirmButton() {
  const confirm = useConfirm()
  return (
    <Button
      type="button"
      onClick={async () => {
        await confirm({ title: "Continue?" })
      }}
    >
      Ask
    </Button>
  )
}

export const WithHook: Story = {
  render: () => (
    <ConfirmProvider>
      <ConfirmButton />
    </ConfirmProvider>
  ),
}
