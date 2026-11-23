/** @vitest-environment happy-dom */

import { describe, expect, it } from "vitest"
import { cleanup, render, screen } from "@testing-library/react"
import { Calendar } from "./Calendar"

describe("Calendar", () => {
  it("renders month navigation", () => {
    render(<Calendar />)
    expect(screen.getByRole("button", { name: /previous month/i })).toBeTruthy()
    expect(screen.getByRole("button", { name: /next month/i })).toBeTruthy()
    cleanup()
  })
})
