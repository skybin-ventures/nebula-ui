/** @vitest-environment happy-dom */

import { afterEach, describe, expect, it } from "vitest"
import { cleanup, render, screen } from "@testing-library/react"
import { Form } from "./Form"
import { FormSlider } from "./FormSlider"

afterEach(cleanup)

describe("FormSlider", () => {
  it("renders a labeled slider with the current value", () => {
    render(
      <Form defaultValues={{ volume: 40 }} config={{ colon: false }}>
        <FormSlider name="volume" label="Volume" min={0} max={100} />
      </Form>
    )

    expect(screen.getByText("Volume")).toBeTruthy()
    expect(screen.getByRole("slider")).toBeTruthy()
  })
})
