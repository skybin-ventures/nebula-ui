/** @vitest-environment happy-dom */

import { describe, expect, it, vi } from "vitest"
import { act, renderHook } from "@testing-library/react"
import { useControllableState } from "./useControllableState"

describe("useControllableState", () => {
  it("updates uncontrolled state and notifies once per set", () => {
    const onChange = vi.fn()
    const { result } = renderHook(() =>
      useControllableState<string[]>(undefined, [], onChange)
    )

    act(() => {
      result.current[1](["a"])
    })

    expect(result.current[0]).toEqual(["a"])
    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(["a"])
  })

  it("does not call onChange inside a state updater (functional updates resolve outside)", () => {
    const onChange = vi.fn()
    const { result } = renderHook(() =>
      useControllableState(undefined, 0, onChange)
    )

    act(() => {
      result.current[1]((previous) => previous + 1)
      result.current[1]((previous) => previous + 1)
    })

    expect(result.current[0]).toBe(2)
    expect(onChange).toHaveBeenCalledTimes(2)
    expect(onChange).toHaveBeenNthCalledWith(1, 1)
    expect(onChange).toHaveBeenNthCalledWith(2, 2)
  })

  it("forwards controlled updates only through onChange", () => {
    const onChange = vi.fn()
    const { result, rerender } = renderHook(
      ({ value }: { value: string }) =>
        useControllableState(value, "default", onChange),
      { initialProps: { value: "a" } }
    )

    act(() => {
      result.current[1]("b")
    })

    expect(onChange).toHaveBeenCalledWith("b")
    expect(result.current[0]).toBe("a")

    rerender({ value: "b" })
    expect(result.current[0]).toBe("b")
  })
})
