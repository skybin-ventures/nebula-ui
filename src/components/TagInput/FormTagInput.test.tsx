/** @vitest-environment happy-dom */

import { afterEach, describe, expect, it, vi } from "vitest"
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react"
import { Form } from "../Form/Form"
import { Button } from "../Button"
import { FormTagInput } from "./FormTagInput"

afterEach(cleanup)

describe("FormTagInput", () => {
  it("writes added tags into form state", async () => {
    const onSubmit = vi.fn()

    render(
      <Form onSubmit={onSubmit} defaultValues={{ skills: [] as string[] }} config={{ colon: false }}>
        <FormTagInput name="skills" label="Skills" />
        <Button type="submit">Save</Button>
      </Form>
    )

    const input = screen.getByRole("textbox", { name: "Tag input" })
    fireEvent.change(input, { target: { value: "typescript" } })
    fireEvent.keyDown(input, { key: "Enter" })

    expect(screen.getByText("typescript")).toBeTruthy()

    fireEvent.click(screen.getByRole("button", { name: "Save" }))
    await waitFor(() => expect(onSubmit).toHaveBeenCalledTimes(1))
    expect(onSubmit.mock.calls[0]![0]).toMatchObject({ skills: ["typescript"] })
  })

  it("blocks submit when a required field has no tags", async () => {
    const onSubmit = vi.fn()

    render(
      <Form onSubmit={onSubmit} defaultValues={{ skills: [] as string[] }} config={{ colon: false }}>
        <FormTagInput name="skills" label="Skills" required />
        <Button type="submit">Save</Button>
      </Form>
    )

    fireEvent.click(screen.getByRole("button", { name: "Save" }))
    await waitFor(() => expect(onSubmit).not.toHaveBeenCalled())
    expect(screen.getByRole("alert").textContent).toBe("This field is required")
  })
})
