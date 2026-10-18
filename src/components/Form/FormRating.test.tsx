/** @vitest-environment happy-dom */

import { afterEach, describe, expect, it } from "vitest"
import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import { useForm, FormProvider } from "react-hook-form"
import { FormRating } from "./FormRating"

afterEach(cleanup)

function Harness() {
  const methods = useForm({ defaultValues: { stars: 0 } })
  return (
    <FormProvider {...methods}>
      <FormRating name="stars" label="Score" max={5} />
      <output data-testid="value">{String(methods.watch("stars"))}</output>
    </FormProvider>
  )
}

describe("FormRating", () => {
  it("sets rating when a star is clicked", () => {
    render(<Harness />)
    fireEvent.click(screen.getByRole("radio", { name: "3 stars" }))
    expect(screen.getByTestId("value").textContent).toBe("3")
  })
})
