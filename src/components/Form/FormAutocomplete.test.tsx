/** @vitest-environment happy-dom */

import { afterEach, describe, expect, it } from "vitest"
import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import { useForm, FormProvider } from "react-hook-form"
import { FormAutocomplete } from "./FormAutocomplete"

afterEach(cleanup)

const suggestions = [
  { value: "ny", label: "New York" },
  { value: "sf", label: "San Francisco" },
]

function Harness() {
  const methods = useForm({ defaultValues: { city: "" } })
  return (
    <FormProvider {...methods}>
      <FormAutocomplete name="city" label="City" suggestions={suggestions} />
      <output data-testid="value">{methods.watch("city")}</output>
    </FormProvider>
  )
}

describe("FormAutocomplete", () => {
  it("selects a suggestion", async () => {
    render(<Harness />)
    fireEvent.click(screen.getByRole("combobox"))
    fireEvent.click(await screen.findByText("San Francisco"))
    expect(screen.getByTestId("value").textContent).toBe("sf")
  })
})
