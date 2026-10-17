/** @vitest-environment happy-dom */

import { afterEach, describe, expect, it, vi } from "vitest"
import { cleanup, render, screen } from "@testing-library/react"
import { ErrorBoundary } from "./ErrorBoundary"

afterEach(cleanup)

function Boom(): never {
  throw new Error("boom")
}

describe("ErrorBoundary", () => {
  it("renders default fallback UI", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {})
    render(
      <ErrorBoundary>
        <Boom />
      </ErrorBoundary>
    )
    expect(screen.getByRole("alert").textContent).toContain("Something went wrong")
    expect(screen.getByText("boom")).toBeTruthy()
    spy.mockRestore()
  })
})
