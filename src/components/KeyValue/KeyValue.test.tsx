/** @vitest-environment happy-dom */

import { afterEach, describe, expect, it } from "vitest"
import { cleanup, render, screen } from "@testing-library/react"
import { KeyValue } from "./KeyValue"

afterEach(cleanup)

describe("KeyValue", () => {
  it("renders label/value pairs", () => {
    render(<KeyValue items={[{ label: "Email", value: "a@b.com" }]} />)
    expect(screen.getByText("Email")).toBeTruthy()
    expect(screen.getByText("a@b.com")).toBeTruthy()
  })
})
