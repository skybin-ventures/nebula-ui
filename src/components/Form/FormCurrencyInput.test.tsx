/** @vitest-environment happy-dom */

import { afterEach, describe, expect, it } from "vitest"
import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import { useForm, FormProvider } from "react-hook-form"
import { FormCurrencyInput } from "./FormCurrencyInput"

afterEach(cleanup)

function Harness() {
  const methods = useForm({ defaultValues: { amount: undefined as number | undefined } })
  return (
    <FormProvider {...methods}>
      <FormCurrencyInput name="amount" label="Amount" currency="USD" />
      <output data-testid="value">{String(methods.watch("amount") ?? "")}</output>
    </FormProvider>
  )
}

describe("FormCurrencyInput", () => {
  it("registers numeric values", () => {
    render(<Harness />)
    const input = screen.getByLabelText("Amount")
    fireEvent.change(input, { target: { value: "12.5" } })
    expect(screen.getByTestId("value").textContent).toBe("12.5")
  })
})
