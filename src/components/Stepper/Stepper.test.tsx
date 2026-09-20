/** @vitest-environment happy-dom */

import { afterEach, describe, expect, it } from "vitest"
import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import { Stepper } from "./Stepper"

afterEach(cleanup)

describe("Stepper", () => {
  it("disables back on the first step", () => {
    render(
      <Stepper
        steps={[
          { id: "one", label: "One", content: <p>First</p> },
          { id: "two", label: "Two", content: <p>Second</p> },
        ]}
      />
    )

    expect(screen.getByRole("button", { name: "Back" }).hasAttribute("disabled")).toBe(true)
    expect(screen.getByText("First")).toBeTruthy()
  })

  it("moves to the next step and exposes progress", () => {
    render(
      <Stepper
        steps={[
          { id: "one", label: "One", content: <p>First</p> },
          { id: "two", label: "Two", content: <p>Second</p> },
        ]}
      />
    )

    expect(screen.getByRole("list", { name: "Progress" })).toBeTruthy()
    expect(screen.getByText("First")).toBeTruthy()
    fireEvent.click(screen.getByRole("button", { name: "Next" }))
    expect(screen.getByText("Second")).toBeTruthy()
    expect(screen.getByRole("button", { name: "Finish" })).toBeTruthy()
  })
})
