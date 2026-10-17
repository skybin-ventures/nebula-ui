/** @vitest-environment happy-dom */

import { afterEach, describe, expect, it } from "vitest"
import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import { useForm, FormProvider } from "react-hook-form"
import { FormConsent } from "./FormConsent"

afterEach(cleanup)

function Harness() {
  const methods = useForm({ defaultValues: { consent: false } })
  return (
    <FormProvider {...methods}>
      <FormConsent name="consent">
        I agree to the <a href="#terms">terms</a>
      </FormConsent>
      <output data-testid="value">{String(methods.watch("consent"))}</output>
    </FormProvider>
  )
}

describe("FormConsent", () => {
  it("toggles consent checkbox", () => {
    render(<Harness />)
    fireEvent.click(screen.getByRole("checkbox"))
    expect(screen.getByTestId("value").textContent).toBe("true")
    expect(screen.getByRole("link", { name: "terms" })).toBeTruthy()
  })
})
