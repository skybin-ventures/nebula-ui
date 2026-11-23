/** @vitest-environment happy-dom */

import { afterEach, describe, expect, it } from "vitest"
import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import { FormProvider, useForm } from "react-hook-form"
import { Combobox } from "./Combobox"

afterEach(cleanup)

const options = [
  { label: "Alpha", value: "a" },
  { label: "Beta", value: "b" },
]

function Harness({ selectionVariant }: { selectionVariant?: "tags" | "checkbox" | "comma" | "list" }) {
  const methods = useForm({ defaultValues: { role: "" } })
  return (
    <FormProvider {...methods}>
      <Combobox
        name="role"
        label="Role"
        options={options}
        placeholder="Pick one"
        selectionVariant={selectionVariant}
      />
    </FormProvider>
  )
}

describe("Combobox selectionVariant", () => {
  it("opens the searchable palette and lists options regardless of variant", () => {
    render(<Harness selectionVariant="checkbox" />)
    fireEvent.click(screen.getByRole("combobox"))
    expect(screen.getByRole("option", { name: /alpha/i })).toBeTruthy()
    expect(screen.getByRole("option", { name: /beta/i })).toBeTruthy()
  })
})
