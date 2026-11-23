/** @vitest-environment happy-dom */

import { describe, expect, it } from "vitest"
import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import { Switch } from "./Switch"

describe("Switch", () => {
  it("renders a role=switch control that toggles on click", () => {
    render(<Switch />)
    const control = screen.getByRole("switch")
    expect(control.getAttribute("aria-checked")).toBe("false")
    fireEvent.click(control)
    expect(control.getAttribute("aria-checked")).toBe("true")
    cleanup()
  })
})
