/** @vitest-environment happy-dom */

import { afterEach, describe, expect, it } from "vitest"
import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import { JsonView } from "./JsonView"

afterEach(cleanup)

describe("JsonView", () => {
  it("toggles nested objects", () => {
    render(<JsonView data={{ user: { name: "Ada" } }} defaultExpanded />)
    expect(screen.getByText(/"name"/)).toBeTruthy()
    const userToggle = screen.getAllByRole("button", { expanded: true }).find((btn) =>
      btn.textContent?.includes("user")
    )
    expect(userToggle).toBeTruthy()
    fireEvent.click(userToggle!)
    expect(screen.queryByText(/"name"/)).toBeNull()
  })
})
