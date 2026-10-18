/** @vitest-environment happy-dom */

import { afterEach, describe, expect, it, vi } from "vitest"
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react"
import { Form } from "./Form"
import { FormInputOTP } from "./FormInputOTP"
import { Button } from "../Button"

afterEach(cleanup)

describe("FormInputOTP", () => {
  it("renders labeled slots and calls onComplete when filled", async () => {
    const onComplete = vi.fn()

    render(
      <Form defaultValues={{ code: "" }} config={{ colon: false }}>
        <FormInputOTP name="code" label="Verification code" length={4} onComplete={onComplete} />
      </Form>
    )

    expect(screen.getByText("Verification code")).toBeTruthy()
    const input = screen.getByRole("textbox")
    fireEvent.change(input, { target: { value: "1234" } })

    await waitFor(() => expect(onComplete).toHaveBeenCalledWith("1234"))
  })

  it("blocks submit when required OTP is empty", async () => {
    const onSubmit = vi.fn()

    render(
      <Form onSubmit={onSubmit} defaultValues={{ code: "" }} config={{ colon: false }}>
        <FormInputOTP name="code" label="Code" length={6} required />
        <Button type="submit">Submit</Button>
      </Form>
    )

    fireEvent.click(screen.getByRole("button", { name: "Submit" }))
    await waitFor(() => expect(onSubmit).not.toHaveBeenCalled())
  })

  it("allows submit when optional OTP is empty", async () => {
    const onSubmit = vi.fn()

    render(
      <Form onSubmit={onSubmit} defaultValues={{ code: "" }} config={{ colon: false }}>
        <FormInputOTP name="code" label="Code" length={6} />
        <Button type="submit">Submit</Button>
      </Form>
    )

    fireEvent.click(screen.getByRole("button", { name: "Submit" }))
    await waitFor(() => expect(onSubmit).toHaveBeenCalled())
  })
})
