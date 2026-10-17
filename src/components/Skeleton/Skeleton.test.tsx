/** @vitest-environment happy-dom */

import { afterEach, describe, expect, it } from "vitest"
import { cleanup, render } from "@testing-library/react"
import { SkeletonText } from "./SkeletonText"
import { SkeletonTitle } from "./SkeletonTitle"
import { SkeletonAvatar } from "./SkeletonAvatar"

afterEach(cleanup)

describe("Skeleton presets", () => {
  it("renders text lines, title, and avatar", () => {
    const { container } = render(
      <>
        <SkeletonText lines={2} />
        <SkeletonTitle />
        <SkeletonAvatar />
      </>
    )
    expect(container.querySelectorAll('[class*="animate-pulse"]').length).toBeGreaterThan(0)
  })
})
