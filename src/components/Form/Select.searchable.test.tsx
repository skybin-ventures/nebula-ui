/** @vitest-environment happy-dom */

import { afterEach, describe, expect, it } from "vitest"
import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import { FormProvider, useForm } from "react-hook-form"
import { Select } from "./Select"

afterEach(cleanup)

const options = [
  { label: "Engineering", value: "eng" },
  { label: "Sales", value: "sales" },
  { label: "Support", value: "support" },
]

function Harness() {
  const methods = useForm({ defaultValues: { department: "" } })
  return (
    <FormProvider {...methods}>
      <Select
        name="department"
        label="Department"
        options={options}
        searchable
        searchPlaceholder="Filter teams..."
      />
      <output data-testid="value">{String(methods.watch("department"))}</output>
    </FormProvider>
  )
}

describe("Select (searchable)", () => {
  it("renders a combobox trigger that opens a searchable palette", () => {
    render(<Harness />)
    const trigger = screen.getByRole("combobox")
    expect((trigger as HTMLButtonElement).tagName).toBe("BUTTON")
    fireEvent.click(trigger)
    // cmdk search input + options are now in the DOM
    expect(screen.getByPlaceholderText("Filter teams...")).toBeTruthy()
    expect(screen.getByRole("option", { name: /engineering/i })).toBeTruthy()
  })

  it("writes the chosen option to the form on select", () => {
    render(<Harness />)
    fireEvent.click(screen.getByRole("combobox"))
    fireEvent.click(screen.getByRole("option", { name: /sales/i }))
    expect(screen.getByTestId("value").textContent).toBe("sales")
  })
})
