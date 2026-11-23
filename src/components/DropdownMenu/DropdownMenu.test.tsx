/** @vitest-environment happy-dom */

import { describe, expect, it } from "vitest"
import { cleanup, render } from "@testing-library/react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
} from "./DropdownMenu"

describe("DropdownMenu", () => {
  it("renders its contents when open", () => {
    const { getByText, getByRole } = render(
      <DropdownMenu open>
        <DropdownMenuPortal>
          <DropdownMenuContent>
            <DropdownMenuLabel>Account</DropdownMenuLabel>
            <DropdownMenuItem>Profile</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>
    )
    expect(getByText("Account")).toBeTruthy()
    expect(getByRole("menuitem", { name: "Profile" })).toBeTruthy()
    cleanup()
  })
})
