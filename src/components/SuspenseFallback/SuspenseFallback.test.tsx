/** @vitest-environment happy-dom */

import { afterEach, describe, expect, it } from "vitest"
import { cleanup, render, screen } from "@testing-library/react"
import { SuspenseFallback } from "./SuspenseFallback"

afterEach(cleanup)

describe("SuspenseFallback", () => {
  it("exposes a loading status region", () => {
    render(<SuspenseFallback />)
    expect(screen.getByRole("status", { name: "Loading" })).toBeTruthy()
  })
})
