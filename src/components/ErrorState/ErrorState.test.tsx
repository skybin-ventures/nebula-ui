/** @vitest-environment happy-dom */

import { describe, expect, it, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import { ErrorState } from "./ErrorState"

describe("ErrorState", () => {
  it("renders an alert and retries", () => {
    const onRetry = vi.fn()
    render(<ErrorState title="Failed" onRetry={onRetry} />)

    expect(screen.getByRole("alert").textContent).toContain("Failed")
    screen.getByRole("button", { name: "Try again" }).click()
    expect(onRetry).toHaveBeenCalledTimes(1)
  })
})
