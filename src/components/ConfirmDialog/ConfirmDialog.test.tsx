/** @vitest-environment happy-dom */

import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import { ConfirmDialog, useConfirm } from "./ConfirmDialog"

describe("ConfirmDialog", () => {
  it("renders accessible title and actions", () => {
    render(<ConfirmDialog open title="Delete record?" confirmLabel="Delete" />)
    expect(screen.getByText("Delete record?")).toBeTruthy()
    expect(screen.getByRole("button", { name: "Delete" })).toBeTruthy()
    expect(screen.getByRole("button", { name: "Cancel" })).toBeTruthy()
  })

  it("throws when useConfirm is used without a provider", () => {
    function Broken() {
      useConfirm()
      return null
    }

    expect(() => render(<Broken />)).toThrow(/ConfirmProvider/)
  })
})
