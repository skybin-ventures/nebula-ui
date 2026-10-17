/** @vitest-environment happy-dom */

import { afterEach, describe, expect, it } from "vitest"
import { cleanup, render, screen } from "@testing-library/react"
import { ProgressBar } from "./ProgressBar"

afterEach(cleanup)

describe("ProgressBar", () => {
  it("shows label and percentage", () => {
    render(<ProgressBar label="Upload" value={40} showValue />)
    expect(screen.getByText("Upload")).toBeTruthy()
    expect(screen.getByText("40%")).toBeTruthy()
  })
})
