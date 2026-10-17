/** @vitest-environment happy-dom */

import { afterEach, describe, expect, it } from "vitest"
import { cleanup, render, screen } from "@testing-library/react"
import { ModalForm } from "./ModalForm"

afterEach(cleanup)

describe("ModalForm", () => {
  it("shows title and error while open", () => {
    render(
      <ModalForm open title="Edit profile" error="Something went wrong" onOpenChange={() => {}}>
        <p>Fields</p>
      </ModalForm>
    )
    expect(screen.getByText("Edit profile")).toBeTruthy()
    expect(screen.getByRole("alert").textContent).toContain("Something went wrong")
  })
})
