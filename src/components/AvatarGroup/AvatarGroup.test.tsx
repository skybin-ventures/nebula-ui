/** @vitest-environment happy-dom */

import { afterEach, describe, expect, it } from "vitest"
import { cleanup, render, screen } from "@testing-library/react"
import { AvatarGroup } from "./AvatarGroup"

afterEach(cleanup)

describe("AvatarGroup", () => {
  it("shows overflow count when items exceed max", () => {
    render(
      <AvatarGroup
        max={2}
        items={[
          { fallback: "A", name: "Ada" },
          { fallback: "B", name: "Ben" },
          { fallback: "C", name: "Cara" },
        ]}
      />
    )

    expect(screen.getByText("+1")).toBeTruthy()
    expect(screen.getByRole("group", { name: "Avatar group" })).toBeTruthy()
  })
})
