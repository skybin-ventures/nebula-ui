/** @vitest-environment happy-dom */

import { afterEach, describe, expect, it, vi } from "vitest"
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react"
import { SearchInput } from "./SearchInput"

afterEach(cleanup)

describe("SearchInput", () => {
  it("clears the query and debounces search callbacks", async () => {
    const onSearchChange = vi.fn()
    render(<SearchInput defaultValue="hello" onSearchChange={onSearchChange} debounceMs={50} />)

    fireEvent.change(screen.getByRole("searchbox"), { target: { value: "world" } })
    await waitFor(() => expect(onSearchChange).toHaveBeenCalledWith("world"))

    fireEvent.click(screen.getByRole("button", { name: "Clear search" }))
    expect((screen.getByRole("searchbox") as HTMLInputElement).value).toBe("")
  })
})
