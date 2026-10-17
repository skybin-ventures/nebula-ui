/** @vitest-environment happy-dom */

import { afterEach, describe, expect, it } from "vitest"
import { cleanup, render, screen } from "@testing-library/react"
import { SkipLink } from "./SkipLink"

afterEach(cleanup)

describe("SkipLink", () => {
  it("points at main content by default", () => {
    render(<SkipLink />)
    expect(screen.getByRole("link", { name: "Skip to content" }).getAttribute("href")).toBe(
      "#main-content"
    )
  })
})
