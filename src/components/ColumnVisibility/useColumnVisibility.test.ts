/** @vitest-environment happy-dom */

import { describe, expect, it, beforeEach } from "vitest"
import { act, renderHook, waitFor } from "@testing-library/react"
import { useColumnVisibility } from "./useColumnVisibility"
import { DEFAULT_COLUMN_VISIBILITY_STORAGE_PREFIX } from "./storage"
import type { ColumnDefinition } from "./types"

const columns: ColumnDefinition<"name" | "email" | "role" | "status">[] = [
  { key: "name", label: "Name", important: true },
  { key: "email", label: "Email", important: true },
  { key: "role", label: "Role" },
  { key: "status", label: "Status" },
]

describe("useColumnVisibility", () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it("defaults to important columns only", () => {
    const { result } = renderHook(() => useColumnVisibility(columns))
    expect(result.current.visibleColumns).toEqual(["name", "email"])
    expect(result.current.hiddenColumnCount).toBe(2)
  })

  it("never hides the last visible column", () => {
    const { result } = renderHook(() => useColumnVisibility(columns))

    act(() => {
      result.current.toggle("email")
    })
    expect(result.current.visibleColumns).toEqual(["name"])

    act(() => {
      result.current.toggle("name")
    })
    expect(result.current.visibleColumns).toEqual(["name"])
  })

  it("reorders the full column list and keeps visible order in sync", () => {
    const { result } = renderHook(() => useColumnVisibility(columns))

    act(() => {
      result.current.toggle("role")
      result.current.reorder(0, 2)
    })

    expect(result.current.columnOrder).toEqual(["email", "role", "name", "status"])
    expect(result.current.visibleColumns).toEqual(["email", "role", "name"])
  })

  it("persists order + visible and migrates legacy visible-only arrays", async () => {
    const key = "employees"
    localStorage.setItem(
      `${DEFAULT_COLUMN_VISIBILITY_STORAGE_PREFIX}${key}`,
      JSON.stringify(["name", "role"]),
    )

    const { result } = renderHook(() =>
      useColumnVisibility(columns, { storageKey: key }),
    )

    await waitFor(() => {
      expect(result.current.visibleColumns).toEqual(["name", "role"])
    })
    expect(result.current.columnOrder).toEqual(["name", "email", "role", "status"])

    act(() => {
      result.current.reorder(1, 0)
    })

    await waitFor(() => {
      const stored = JSON.parse(
        localStorage.getItem(`${DEFAULT_COLUMN_VISIBILITY_STORAGE_PREFIX}${key}`)!,
      ) as { order: string[]; visible: string[] }
      expect(stored.order).toEqual(["email", "name", "role", "status"])
      expect(stored.visible).toEqual(["name", "role"])
    })
  })

  it("respects a custom storage prefix", async () => {
    const key = "branches"
    const prefix = "caelohr:table-columns:"
    localStorage.setItem(
      `${prefix}${key}`,
      JSON.stringify({ order: ["status", "name", "email", "role"], visible: ["status", "name"] }),
    )

    const { result } = renderHook(() =>
      useColumnVisibility(columns, { storageKey: key, storagePrefix: prefix }),
    )

    await waitFor(() => {
      expect(result.current.columnOrder).toEqual(["status", "name", "email", "role"])
      expect(result.current.visibleColumns).toEqual(["status", "name"])
    })
  })
})
