/** @vitest-environment happy-dom */

import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import { CommandPalette } from "./CommandPalette"

describe("CommandPalette", () => {
  it("lists commands when open", () => {
    render(
      <CommandPalette
        open
        enableShortcut={false}
        items={[{ id: "new", label: "New file", group: "File" }]}
      />
    )

    expect(screen.getByPlaceholderText("Search commands...")).toBeTruthy()
    expect(screen.getByText("New file")).toBeTruthy()
  })
})
