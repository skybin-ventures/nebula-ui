/** @vitest-environment happy-dom */

import { afterEach, describe, expect, it } from "vitest"
import { cleanup, render, screen } from "@testing-library/react"
import { FileUpload } from "./FileUpload"

afterEach(cleanup)

describe("FileUpload", () => {
  it("exposes a dropzone and empty copy", () => {
    render(<FileUpload emptyText="Nothing attached" />)
    expect(screen.getByRole("button", { name: "Drop files here or click to browse" })).toBeTruthy()
    expect(screen.getByText("Nothing attached")).toBeTruthy()
  })

  it("marks the dropzone busy while loading", () => {
    render(<FileUpload loading aria-label="Upload files" />)
    expect(screen.getByRole("button", { name: "Upload files" }).getAttribute("aria-busy")).toBe("true")
  })
})
