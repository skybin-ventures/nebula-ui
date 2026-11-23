/** @vitest-environment happy-dom */

import { afterEach, describe, expect, it } from "vitest"
import { cleanup, render, screen } from "@testing-library/react"
import { MultiSelect } from "./MultiSelect"

// No `globals` in this repo's vitest config, so RTL's auto-cleanup isn't
// registered — tear down the document between tests to avoid cross-test leaks.
afterEach(cleanup)

const options = [
  { label: "Alpha", value: "a" },
  { label: "Beta", value: "b" },
]

const manyOptions = [
  { label: "Alpha", value: "a" },
  { label: "Beta", value: "b" },
  { label: "Gamma", value: "g" },
]

describe("MultiSelect", () => {
  it("shows selected values and stays disabled", () => {
    render(<MultiSelect options={options} value={["a"]} onChange={() => undefined} disabled />)
    expect((screen.getByRole("combobox") as HTMLButtonElement).disabled).toBe(true)
    expect(screen.getByText("Alpha")).toBeTruthy()
  })

  describe("selection variants", () => {
    it("renders comma-separated labels in comma variant", () => {
      render(
        <MultiSelect
          options={manyOptions}
          value={["a", "b"]}
          onChange={() => undefined}
          selectionVariant="comma"
        />
      )
      expect(screen.getByText("Alpha, Beta")).toBeTruthy()
    })

    it("renders a selection count in checkbox variant", () => {
      render(
        <MultiSelect
          options={manyOptions}
          value={["a", "b"]}
          onChange={() => undefined}
          selectionVariant="checkbox"
        />
      )
      expect(screen.getByText("2 selected")).toBeTruthy()
    })

    it("collapses the list variant to the first two items with an overflow chip", () => {
      render(
        <MultiSelect
          options={manyOptions}
          value={["a", "b", "g"]}
          onChange={() => undefined}
          selectionVariant="list"
        />
      )
      expect(screen.getByText("Alpha")).toBeTruthy()
      expect(screen.getByText("+1")).toBeTruthy()
      expect(screen.queryByText("Gamma")).toBeNull()
    })
  })
})
