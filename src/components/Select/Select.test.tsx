/** @vitest-environment happy-dom */

import { describe, expect, it } from "vitest"
import { cleanup, render, screen } from "@testing-library/react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./Select"

describe("Select", () => {
  it("renders a trigger with placeholder value and its items when open", () => {
    const { getByRole } = render(
      <Select open>
        <SelectTrigger>
          <SelectValue placeholder="Pick one" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">Alpha</SelectItem>
          <SelectItem value="b">Beta</SelectItem>
        </SelectContent>
      </Select>
    )
    expect(screen.getByText("Pick one")).toBeTruthy()
    expect(getByRole("option", { name: "Alpha" })).toBeTruthy()
    cleanup()
  })
})
