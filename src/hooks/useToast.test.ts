/** @vitest-environment happy-dom */

import { describe, expect, it } from "vitest"
import { renderHook, act } from "@testing-library/react"
import { useToast } from "./useToast"

describe("useToast", () => {
  it("keeps a stable subscription across state updates", () => {
    const { result, rerender } = renderHook(() => useToast())

    act(() => {
      result.current.toast({ title: "Saved" })
    })

    rerender()

    expect(result.current.toasts).toHaveLength(1)
    expect(result.current.toasts[0]?.title).toBe("Saved")
  })
})
