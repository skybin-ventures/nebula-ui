import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { Repeater, type RepeaterItem } from "../Repeater"

interface Item extends RepeaterItem { title: string }

const meta = {
  title: "Components/FormRepeater",
  component: Repeater,
} satisfies Meta<typeof Repeater>

export default meta
type Story = StoryObj<typeof meta>

const renderItem = (item: RepeaterItem) => <p>{(item as Item).title ?? item.id}</p>
const createItem = () => ({ id: crypto.randomUUID(), title: "New item" })

export const Default: Story = {
  args: { createItem, renderItem },
}
export const Controlled: Story = {
  render: function Render() {
    const [value, setValue] = useState<Item[]>([{ id: "1", title: "First" }])
    return <Repeater value={value} onChange={setValue} createItem={createItem} renderItem={renderItem} />
  },
}
export const Disabled: Story = {
  args: { disabled: true, defaultValue: [{ id: "1", title: "Locked" }], createItem, renderItem },
}
export const Loading: Story = { args: { loading: true, createItem, renderItem } }
export const Empty: Story = { args: { defaultValue: [], createItem, renderItem } }
export const Error: Story = { args: { createItem, renderItem, emptyText: "Could not load items" } }
