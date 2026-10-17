/** @vitest-environment happy-dom */

import { describe, expect, it } from "vitest"
import { renderHook, act } from "@testing-library/react"
import { useRadixToast } from "./useToast"

/**
 * Radix toast helpers remain in-repo for internal primitives but are not
 * part of the public 2.0 API. Sonner `toast` is the public surface.
 */
describe("useRadixToast (internal)", () => {
  it("keeps a stable subscription across state updates", () => {
    const { result, rerender } = renderHook(() => useRadixToast())

    act(() => {
      result.current.toast({ title: "Saved" })
    })

    rerender()

    expect(result.current.toasts).toHaveLength(1)
    expect(result.current.toasts[0]?.title).toBe("Saved")
  })
})
