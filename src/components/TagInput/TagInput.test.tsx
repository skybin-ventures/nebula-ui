/** @vitest-environment happy-dom */

import { afterEach, describe, expect, it, vi } from "vitest"
import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import { TagInput } from "./TagInput"

afterEach(cleanup)

describe("TagInput", () => {
  it("adds a tag on Enter and removes it", () => {
    const onChange = vi.fn()
    render(<TagInput defaultValue={[]} onChange={onChange} />)

    const input = screen.getByRole("textbox", { name: "Tag input" })
    fireEvent.change(input, { target: { value: "alpha" } })
    fireEvent.keyDown(input, { key: "Enter" })

    expect(onChange).toHaveBeenCalledWith(["alpha"])
    fireEvent.click(screen.getByRole("button", { name: "Remove alpha" }))
    expect(onChange).toHaveBeenCalledWith([])
  })
})
