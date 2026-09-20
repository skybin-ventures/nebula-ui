/** @vitest-environment happy-dom */

import { describe, expect, it, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import { FilterPanel } from "./FilterPanel"

describe("FilterPanel", () => {
  it("applies current filter values", () => {
    const onApply = vi.fn()
    render(
      <FilterPanel
        fields={[{ id: "q", label: "Search", type: "text" }]}
        defaultValue={{ q: "Ada" }}
        onApply={onApply}
      />
    )

    screen.getByRole("button", { name: "Apply" }).click()
    expect(onApply).toHaveBeenCalledWith({ q: "Ada" })
  })

  it("shows an empty state when there are no fields", () => {
    render(<FilterPanel fields={[]} emptyText="No filters" />)
    expect(screen.getByText("No filters")).toBeTruthy()
  })
})
