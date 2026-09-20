/** @vitest-environment happy-dom */

import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import { DateRangePicker } from "./DateRangePicker"

describe("DateRangePicker", () => {
  it("shows placeholder when empty and disables while loading", () => {
    render(<DateRangePicker loading />)
    expect((screen.getByRole("button", { name: "Date range" }) as HTMLButtonElement).disabled).toBe(true)
    expect(screen.getByText("Loading…")).toBeTruthy()
  })
})
