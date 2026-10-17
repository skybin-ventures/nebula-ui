/** @vitest-environment happy-dom */

import { afterEach, describe, expect, it, vi } from "vitest"
import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import { ColorPicker } from "./ColorPicker"

afterEach(cleanup)

describe("ColorPicker", () => {
  it("updates hex from a swatch", () => {
    const onChange = vi.fn()
    render(<ColorPicker defaultValue="#000000" onChange={onChange} swatches={["#ef4444"]} />)
    fireEvent.click(screen.getByRole("button", { name: "Select #ef4444" }))
    expect(onChange).toHaveBeenCalledWith("#ef4444")
  })
})
