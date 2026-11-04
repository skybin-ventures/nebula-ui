/** @vitest-environment happy-dom */

import { afterEach, describe, expect, it, vi } from "vitest"
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react"
import { Form } from "../Form/Form"
import { Button } from "../Button"
import { FormDateRangePicker } from "./FormDateRangePicker"
import type { DateRangeValue } from "./DateRangePicker"

afterEach(cleanup)

type Values = { range: DateRangeValue }

describe("FormDateRangePicker", () => {
  it("submits a stored range", async () => {
    const onSubmit = vi.fn()
    const range = { from: new Date(2026, 8, 1), to: new Date(2026, 8, 5) }

    render(
      <Form onSubmit={onSubmit} defaultValues={{ range } as Values["range"]} config={{ colon: false }}>
        <FormDateRangePicker name="range" label="Trip dates" />
        <Button type="submit">Save</Button>
      </Form>
    )

    fireEvent.click(screen.getByRole("button", { name: "Save" }))

    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1))
    expect(onSubmit.mock.calls[0]![0] as Values).toMatchObject({
      range: { from: expect.any(Date), to: expect.any(Date) },
    })
  })

  it("blocks submit when a required range is empty", async () => {
    const onSubmit = vi.fn()

    render(
      <Form onSubmit={onSubmit} defaultValues={{ range: {} as Values["range"] }} config={{ colon: false }}>
        <FormDateRangePicker name="range" label="Trip dates" required="Pick a date range" />
        <Button type="submit">Save</Button>
      </Form>
    )

    fireEvent.click(screen.getByRole("button", { name: "Save" }))

    await waitFor(() => {
      expect(screen.getByRole("alert").textContent).toBe("Pick a date range")
    })
    expect(onSubmit).not.toHaveBeenCalled()
  })
})
