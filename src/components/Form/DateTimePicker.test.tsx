/** @vitest-environment happy-dom */

import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import { FormProvider, useForm } from "react-hook-form"
import { format } from "date-fns"
import { DateTimePicker } from "./DateTimePicker"

function Harness({ value }: { value: Date | "" }) {
  const form = useForm({
    defaultValues: { when: value },
    values: { when: value },
  })

  return (
    <FormProvider {...form}>
      <DateTimePicker name="when" />
    </FormProvider>
  )
}

describe("DateTimePicker display sync", () => {
  it("shows date-only formatting until the field value includes a time", () => {
    const dateOnly = new Date(2026, 8, 20, 0, 0, 0, 0)
    const withTime = new Date(2026, 8, 20, 14, 30, 0, 0)
    const { rerender } = render(<Harness value={dateOnly} />)

    expect(screen.getByRole("button", { name: format(dateOnly, "MMM d, yyyy") })).toBeTruthy()

    rerender(<Harness value={withTime} />)

    expect(screen.getByRole("button", { name: format(withTime, "MMM d, yyyy p") })).toBeTruthy()
  })
})
