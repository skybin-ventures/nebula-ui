/** @vitest-environment happy-dom */

import { describe, expect, it } from "vitest"
import { fireEvent, render, screen } from "@testing-library/react"
import { Repeater } from "./Repeater"

describe("Repeater", () => {
  it("adds and removes items", () => {
    render(
      <Repeater
        defaultValue={[]}
        createItem={() => ({ id: "item-1" })}
        renderItem={(item) => <span>{item.id}</span>}
      />
    )

    expect(screen.getByText("No items yet")).toBeTruthy()
    fireEvent.click(screen.getByRole("button", { name: "Add item" }))
    expect(screen.getByText("item-1")).toBeTruthy()
    fireEvent.click(screen.getByRole("button", { name: "Remove item" }))
    expect(screen.getByText("No items yet")).toBeTruthy()
  })
})
