import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { ErrorBoundary } from "../ErrorBoundary"
import { Button } from "../../Button"

const meta = {
  title: "Components/ErrorBoundary",
  component: ErrorBoundary,
} satisfies Meta<typeof ErrorBoundary>

export default meta
type Story = StoryObj<typeof meta>

function Explosive({ armed }: { armed: boolean }) {
  if (armed) throw new Error("Demo failure")
  return <p className="text-sm">All good.</p>
}

export const Default: Story = {
  render: function Render() {
    const [armed, setArmed] = useState(false)
    const [key, setKey] = useState(0)
    return (
      <div className="space-y-3">
        <Button size="sm" onClick={() => setArmed(true)}>
          Trigger error
        </Button>
        <ErrorBoundary key={key} onError={() => setArmed(false)}>
          <Explosive armed={armed} />
        </ErrorBoundary>
        <Button size="sm" variant="outline" onClick={() => setKey((k) => k + 1)}>
          Remount
        </Button>
      </div>
    )
  },
}
