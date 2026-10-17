/** @vitest-environment happy-dom */

import { afterEach, describe, expect, it } from "vitest"
import { cleanup, render, screen } from "@testing-library/react"
import { StatCard } from "./StatCard"

afterEach(cleanup)

describe("StatCard", () => {
  it("renders title, value, and trend delta", () => {
    render(<StatCard title="Revenue" value="$12k" trend="up" delta="+8%" />)
    expect(screen.getByText("Revenue")).toBeTruthy()
    expect(screen.getByText("$12k")).toBeTruthy()
    expect(screen.getByText("+8%")).toBeTruthy()
  })
})
