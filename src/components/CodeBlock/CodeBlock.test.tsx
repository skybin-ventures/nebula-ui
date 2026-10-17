/** @vitest-environment happy-dom */

import { afterEach, describe, expect, it, vi } from "vitest"
import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import { CodeBlock } from "./CodeBlock"

afterEach(cleanup)

describe("CodeBlock", () => {
  it("renders language label and copy button", () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    })

    render(<CodeBlock code="const x = 1" language="ts" />)
    expect(screen.getByText("ts")).toBeTruthy()
    fireEvent.click(screen.getByRole("button", { name: "Copy code" }))
    expect(writeText).toHaveBeenCalledWith("const x = 1")
  })
})
