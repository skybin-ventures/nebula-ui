/** @vitest-environment happy-dom */

import { describe, expect, it } from "vitest"
import { cleanup, render, screen } from "@testing-library/react"
import { Label } from "./Label"

describe("Label", () => {
  it("renders its text and is associated with a control", () => {
    render(
      <Label htmlFor="name">Name</Label>
    )
    const label = screen.getByText("Name")
    expect(label).toBeTruthy()
    expect(label.getAttribute("for")).toBe("name")
    cleanup()
  })
})
