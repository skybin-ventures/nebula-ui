/** @vitest-environment happy-dom */

import { afterEach, describe, expect, it, vi } from "vitest"
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react"
import { Form } from "../Form/Form"
import { Button } from "../Button"
import { FormColorPicker } from "./FormColorPicker"

afterEach(cleanup)

describe("FormColorPicker", () => {
  it("writes a picked swatch into form state", async () => {
    const onSubmit = vi.fn()

    render(
      <Form onSubmit={onSubmit} defaultValues={{ brand: "" }} config={{ colon: false }}>
        <FormColorPicker name="brand" label="Brand color" swatches={["#3b82f6"]} />
        <Button type="submit">Save</Button>
      </Form>
    )

    fireEvent.click(screen.getByRole("button", { name: "Select #3b82f6" }))
    fireEvent.click(screen.getByRole("button", { name: "Save" }))

    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1))
    expect(onSubmit.mock.calls[0]![0]).toMatchObject({ brand: "#3b82f6" })
  })

  it("blocks submit when a required color is unset", async () => {
    const onSubmit = vi.fn()

    render(
      <Form onSubmit={onSubmit} defaultValues={{ brand: "" }} config={{ colon: false }}>
        <FormColorPicker name="brand" label="Brand color" required />
        <Button type="submit">Save</Button>
      </Form>
    )

    fireEvent.click(screen.getByRole("button", { name: "Save" }))

    await waitFor(() => expect(onSubmit).not.toHaveBeenCalled())
    // An empty color fails the always-on hex pattern before the required min.
    expect(screen.getByRole("alert").textContent).toBe("Enter a valid hex color (#rrggbb)")
  })
})
