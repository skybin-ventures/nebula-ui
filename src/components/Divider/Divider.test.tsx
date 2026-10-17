/** @vitest-environment happy-dom */

import { afterEach, describe, expect, it } from "vitest"
import { cleanup, render, screen } from "@testing-library/react"
import { Divider } from "./Divider"

afterEach(cleanup)

describe("Divider", () => {
  it("renders middle content", () => {
    render(<Divider>or</Divider>)
    expect(screen.getByText("or")).toBeTruthy()
    expect(screen.getByRole("separator")).toBeTruthy()
  })
})
