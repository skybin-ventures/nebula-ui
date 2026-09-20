/** @vitest-environment happy-dom */

import { describe, expect, it, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import { EmptyState } from "./EmptyState"

describe("EmptyState", () => {
  it("exposes a status region and action button", () => {
    const onAction = vi.fn()
    render(<EmptyState title="No invoices" actionLabel="Create invoice" onAction={onAction} />)

    expect(screen.getByRole("status").textContent).toContain("No invoices")
    screen.getByRole("button", { name: "Create invoice" }).click()
    expect(onAction).toHaveBeenCalledTimes(1)
  })

  it("disables the action while loading", () => {
    render(<EmptyState actionLabel="Create" loading />)
    expect((screen.getByRole("button", { name: "Create" }) as HTMLButtonElement).disabled).toBe(true)
  })
})
