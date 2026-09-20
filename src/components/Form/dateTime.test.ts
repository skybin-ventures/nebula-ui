import { describe, expect, it } from "vitest"
import { deriveTimeSet, hasTimePart, toValidDate } from "./dateTime"

describe("DateTimePicker value synchronization", () => {
  it("treats an empty or invalid value as unset time", () => {
    expect(deriveTimeSet("")).toBe(false)
    expect(deriveTimeSet(undefined)).toBe(false)
    expect(toValidDate("not-a-date")).toBeUndefined()
  })

  it("derives timeSet from a date-only midnight value", () => {
    const dateOnly = new Date(2026, 8, 20, 0, 0, 0, 0)
    expect(hasTimePart(dateOnly)).toBe(false)
    expect(deriveTimeSet(dateOnly)).toBe(false)
  })

  it("derives timeSet from a value that includes a time part", () => {
    const withTime = new Date(2026, 8, 20, 14, 30, 0, 0)
    expect(hasTimePart(withTime)).toBe(true)
    expect(deriveTimeSet(withTime)).toBe(true)
  })

  it("updates timeSet when the field value changes from datetime to date-only", () => {
    const withTime = new Date(2026, 8, 20, 9, 15, 0, 0)
    const dateOnly = new Date(2026, 8, 20, 0, 0, 0, 0)

    expect(deriveTimeSet(withTime)).toBe(true)
    expect(deriveTimeSet(dateOnly)).toBe(false)
  })
})
