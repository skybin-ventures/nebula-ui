/** @vitest-environment happy-dom */

import { afterEach, describe, expect, it, vi } from "vitest"
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react"
import { useFormContext } from "react-hook-form"
import { Form } from "./Form"
import { Select } from "./Select"
import { Checkbox as FormCheckbox } from "./Checkbox"
import { RadioGroup } from "./Radio"
import { Button } from "../Button"

afterEach(cleanup)

function RoleProbe({ onSample }: { onSample: (role: unknown) => void }) {
  const { getValues } = useFormContext()
  return (
    <button type="button" onClick={() => onSample(getValues("role"))}>
      Probe
    </button>
  )
}

describe("Form Phase 0", () => {
  it("writes undefined when an optional Select is cleared", async () => {
    const onSample = vi.fn()

    render(
      <Form defaultValues={{ role: "admin" }} config={{ colon: false }}>
        <Select
          name="role"
          label="Role"
          allowClear
          options={[
            { label: "Admin", value: "admin" },
            { label: "User", value: "user" },
          ]}
        />
        <RoleProbe onSample={onSample} />
      </Form>
    )

    fireEvent.click(screen.getByRole("combobox"))
    fireEvent.click(screen.getByRole("option", { name: "Clear selection" }))
    fireEvent.click(screen.getByRole("button", { name: "Probe" }))

    await waitFor(() => expect(onSample).toHaveBeenCalledWith(undefined))
  })

  it("ignores re-entrant submits while an async onSubmit is in flight", async () => {
    let release!: () => void
    const gate = new Promise<void>((resolve) => {
      release = resolve
    })
    const onSubmit = vi.fn(async () => {
      await gate
    })

    render(
      <Form onSubmit={onSubmit} defaultValues={{}} config={{ colon: false }}>
        <Button type="submit">Save</Button>
      </Form>
    )

    const form = document.querySelector("form")
    expect(form).toBeTruthy()

    fireEvent.submit(form!)
    fireEvent.submit(form!)
    fireEvent.submit(form!)

    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1))
    expect(form!.getAttribute("aria-busy")).toBe("true")

    release()
    await waitFor(() => expect(form!.getAttribute("aria-busy")).toBeNull())
  })

  it("shows the custom required message for an untouched required checkbox", async () => {
    render(
      <Form onSubmit={() => undefined} defaultValues={{}} config={{ colon: false }}>
        <FormCheckbox name="terms" label="Accept terms" required="You must accept the terms" />
        <Button type="submit">Save</Button>
      </Form>
    )

    fireEvent.click(screen.getByRole("button", { name: "Save" }))

    await waitFor(() => {
      expect(screen.getByRole("alert").textContent).toBe("You must accept the terms")
    })
  })

  it("associates the radio group with its label via aria-labelledby", () => {
    render(
      <Form defaultValues={{ plan: "a" }} config={{ colon: false }}>
        <RadioGroup
          name="plan"
          label="Plan"
          options={[
            { label: "A", value: "a" },
            { label: "B", value: "b" },
          ]}
        />
      </Form>
    )

    const label = screen.getByText("Plan")
    const group = screen.getByRole("radiogroup")
    expect(label.id).toBeTruthy()
    expect(group.getAttribute("aria-labelledby")).toBe(label.id)
  })
})
