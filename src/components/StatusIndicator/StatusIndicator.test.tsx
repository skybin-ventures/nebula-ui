/** @vitest-environment happy-dom */

import { afterEach, describe, expect, it } from "vitest"
import { cleanup, render, screen } from "@testing-library/react"
import { StatusIndicator } from "./StatusIndicator"

afterEach(cleanup)

describe("StatusIndicator", () => {
  it("renders label", () => {
    render(<StatusIndicator label="Online" status="success" pulse />)
    expect(screen.getByText("Online")).toBeTruthy()
  })
})
