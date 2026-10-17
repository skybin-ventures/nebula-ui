/** @vitest-environment happy-dom */

import { afterEach, describe, expect, it } from "vitest"
import { cleanup, render, screen } from "@testing-library/react"
import { TopNavigation } from "./TopNavigation"

afterEach(cleanup)

describe("TopNavigation", () => {
  it("renders brand and links", () => {
    render(
      <TopNavigation
        brand="Nebula"
        links={[
          { label: "Home", href: "/", active: true },
          { label: "Docs", href: "/docs" },
        ]}
      />
    )
    expect(screen.getByText("Nebula")).toBeTruthy()
    expect(screen.getByRole("navigation", { name: "Primary" })).toBeTruthy()
    expect(screen.getByRole("link", { name: "Home" }).getAttribute("aria-current")).toBe("page")
  })
})
