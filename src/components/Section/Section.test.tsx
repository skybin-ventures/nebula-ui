/** @vitest-environment happy-dom */

import { afterEach, describe, expect, it } from "vitest"
import { cleanup, render, screen } from "@testing-library/react"
import { Section } from "./Section"

afterEach(cleanup)

describe("Section", () => {
  it("renders title, description, and actions", () => {
    render(
      <Section title="Billing" description="Manage invoices" actions={<button type="button">Add</button>}>
        <p>Body</p>
      </Section>
    )
    expect(screen.getByText("Billing")).toBeTruthy()
    expect(screen.getByText("Manage invoices")).toBeTruthy()
    expect(screen.getByRole("button", { name: "Add" })).toBeTruthy()
  })
})
