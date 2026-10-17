import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { SearchInput } from "../SearchInput"

const meta = {
  title: "Components/SearchInput",
  component: SearchInput,
} satisfies Meta<typeof SearchInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Debounced: Story = {
  render: function Render() {
    const [immediate, setImmediate] = useState("")
    const [debounced, setDebounced] = useState("")
    return (
      <div className="space-y-2">
        <SearchInput
          value={immediate}
          onChange={setImmediate}
          onSearchChange={setDebounced}
          debounceMs={400}
        />
        <p className="text-sm text-muted-foreground">Immediate: {immediate || "—"}</p>
        <p className="text-sm text-muted-foreground">Debounced: {debounced || "—"}</p>
      </div>
    )
  },
}
export const Disabled: Story = { args: { disabled: true, defaultValue: "locked" } }
