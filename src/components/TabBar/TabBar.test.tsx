/** @vitest-environment happy-dom */

import { afterEach, describe, expect, it, vi } from "vitest"
import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import { TabBar } from "./TabBar"

afterEach(cleanup)

describe("TabBar", () => {
  it("changes selected filter tab", () => {
    const onChange = vi.fn()
    render(
      <TabBar
        defaultValue="all"
        onChange={onChange}
        items={[
          { value: "all", label: "All" },
          { value: "open", label: "Open" },
        ]}
      />
    )
    fireEvent.click(screen.getByRole("tab", { name: "Open" }))
    expect(onChange).toHaveBeenCalledWith("open")
  })
})
