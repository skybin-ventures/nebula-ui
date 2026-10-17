/** @vitest-environment happy-dom */

import { afterEach, describe, expect, it } from "vitest"
import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import { NotificationBell, NotificationProvider, useNotification } from "./index"

afterEach(cleanup)

function AddButton() {
  const { addNotification } = useNotification()
  return (
    <button type="button" onClick={() => addNotification({ title: "Hello" })}>
      Add
    </button>
  )
}

describe("Notification", () => {
  it("tracks unread count on the bell", () => {
    render(
      <NotificationProvider>
        <AddButton />
        <NotificationBell />
      </NotificationProvider>
    )
    fireEvent.click(screen.getByRole("button", { name: "Add" }))
    expect(screen.getByRole("button", { name: /1 unread/ })).toBeTruthy()
  })
})
