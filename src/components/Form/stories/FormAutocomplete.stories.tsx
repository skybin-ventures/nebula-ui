import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { Form } from "../Form"
import { FormAutocomplete, type AutocompleteSuggestion } from "../FormAutocomplete"
import { Button } from "../../Button"

const ALL: AutocompleteSuggestion[] = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
  { value: "angular", label: "Angular" },
]

const meta = {
  title: "Form/FormAutocomplete",
  component: FormAutocomplete,
} satisfies Meta<typeof FormAutocomplete>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: function Render() {
    const [suggestions, setSuggestions] = useState(ALL)
    return (
      <Form defaultValues={{ framework: "" }} onSubmit={(data) => console.log(data)} config={{ colon: false }}>
        <FormAutocomplete
          name="framework"
          label="Framework"
          suggestions={suggestions}
          onQueryChange={(q) => {
            const lower = q.toLowerCase()
            setSuggestions(ALL.filter((s) => s.label.toLowerCase().includes(lower)))
          }}
        />
        <Button type="submit" className="mt-4">
          Save
        </Button>
      </Form>
    )
  },
}
