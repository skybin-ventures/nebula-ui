/** @vitest-environment happy-dom */

import { afterEach, describe, expect, it } from "vitest"
import { cleanup, render, screen } from "@testing-library/react"
import { LoadingSpinner } from "./LoadingSpinner"

afterEach(cleanup)

describe("LoadingSpinner", () => {
  it("exposes a status region", () => {
    render(<LoadingSpinner label="Please wait" />)
    expect(screen.getByRole("status", { name: "Please wait" })).toBeTruthy()
  })
})
