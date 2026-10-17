/** @vitest-environment happy-dom */

import { afterEach, describe, expect, it } from "vitest"
import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import { useForm, FormProvider } from "react-hook-form"
import { FormPassword } from "./FormPassword"

afterEach(cleanup)

function Harness() {
  const methods = useForm({ defaultValues: { password: "" } })
  return (
    <FormProvider {...methods}>
      <FormPassword name="password" label="Password" />
    </FormProvider>
  )
}

describe("FormPassword", () => {
  it("shows strength feedback while typing", () => {
    render(<Harness />)
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "Abcdef1!" },
    })
    expect(screen.getByText(/Good|Strong|Excellent|Fair/)).toBeTruthy()
    expect(screen.getByRole("button", { name: /Show password|Hide password/ })).toBeTruthy()
  })
})
