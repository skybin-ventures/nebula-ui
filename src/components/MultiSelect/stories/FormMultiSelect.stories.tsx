import type { Meta, StoryObj } from "@storybook/react-vite"
import { Form } from "../../Form"
import { FormMultiSelect } from "../FormMultiSelect"

const options = [
  { label: "Design", value: "design" },
  { label: "Engineering", value: "eng" },
  { label: "Sales", value: "sales" },
]

const meta = {
  title: "Components/FormMultiSelect",
  component: FormMultiSelect,
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <Form defaultValues={{ tags: [] }} onSubmit={() => undefined}>
        <div style={{ width: 350 }}>
          <Story />
        </div>
      </Form>
    ),
  ],
} satisfies Meta<typeof FormMultiSelect>

export default meta
type Story = StoryObj<typeof meta>

const baseArgs = {
  name: "tags",
  label: "Tags",
  options,
} as const

export const Default: Story = { args: { ...baseArgs } }
export const Comma: Story = { args: { ...baseArgs, selectionVariant: "comma" } }
export const Checkbox: Story = { args: { ...baseArgs, selectionVariant: "checkbox" } }
export const List: Story = { args: { ...baseArgs, selectionVariant: "list" } }
