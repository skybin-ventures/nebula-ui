/** @vitest-environment happy-dom */

import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import { MultiSelect } from "./MultiSelect"

const options = [
  { label: "Alpha", value: "a" },
  { label: "Beta", value: "b" },
]

describe("MultiSelect", () => {
  it("shows selected values and stays disabled", () => {
    render(<MultiSelect options={options} value={["a"]} onChange={() => undefined} disabled />)
    expect((screen.getByRole("combobox") as HTMLButtonElement).disabled).toBe(true)
    expect(screen.getByText("Alpha")).toBeTruthy()
  })
})
