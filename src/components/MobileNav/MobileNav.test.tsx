/** @vitest-environment happy-dom */

import { afterEach, describe, expect, it } from "vitest"
import { cleanup, render, screen } from "@testing-library/react"
import { BottomNav } from "./MobileNav"

afterEach(cleanup)

describe("BottomNav", () => {
  it("marks the active tab", () => {
    render(
      <BottomNav
        items={[
          { key: "home", label: "Home", active: true },
          { key: "search", label: "Search" },
        ]}
      />
    )
    expect(screen.getByRole("navigation", { name: "Bottom navigation" })).toBeTruthy()
    expect(screen.getByRole("button", { name: "Home" }).getAttribute("aria-current")).toBe("page")
  })
})
