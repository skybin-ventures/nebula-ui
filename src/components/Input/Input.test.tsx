/** @vitest-environment happy-dom */

import { describe, expect, it } from "vitest"
import { cleanup, render, screen } from "@testing-library/react"
import { Input } from "./Input"

describe("Input", () => {
  it("renders a text input", () => {
    render(<Input placeholder="Type something" />)
    expect(screen.getByPlaceholderText("Type something")).toBeTruthy()
    cleanup()
  })

  it("adds a password reveal toggle for password fields by default", () => {
    render(<Input type="password" />)
    expect(screen.getByRole("button")).toBeTruthy()
    cleanup()
  })

  it("can opt out of the password reveal toggle", () => {
    render(<Input type="password" passwordToggle={false} />)
    expect(screen.queryByRole("button")).toBeNull()
    cleanup()
  })
})
