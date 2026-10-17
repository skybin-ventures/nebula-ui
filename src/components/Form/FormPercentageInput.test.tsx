/** @vitest-environment happy-dom */

import { afterEach, describe, expect, it } from "vitest"
import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import { useForm, FormProvider } from "react-hook-form"
import { FormPercentageInput } from "./FormPercentageInput"

afterEach(cleanup)

function Harness() {
  const methods = useForm({ defaultValues: { rate: undefined as number | undefined } })
  return (
    <FormProvider {...methods}>
      <FormPercentageInput name="rate" label="Rate" />
      <output data-testid="value">{String(methods.watch("rate") ?? "")}</output>
    </FormProvider>
  )
}

describe("FormPercentageInput", () => {
  it("registers numeric percentage values", () => {
    render(<Harness />)
    fireEvent.change(screen.getByLabelText("Rate"), { target: { value: "25" } })
    expect(screen.getByTestId("value").textContent).toBe("25")
  })
})
