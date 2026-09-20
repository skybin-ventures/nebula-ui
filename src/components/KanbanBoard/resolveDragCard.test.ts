import { describe, expect, it } from "vitest"
import { resolveKanbanDragCard } from "./resolveDragCard"

describe("resolveKanbanDragCard", () => {
  const cards = {
    "card-1": { id: "card-1", title: "Write overlay" },
    "card-2": { id: "card-2", title: "Move column" },
  }

  it("reads the dragged card from the current cards map instead of stale state", () => {
    expect(resolveKanbanDragCard("card-2", cards)).toEqual(cards["card-2"])
  })

  it("returns null when the active id is a column or unknown card", () => {
    expect(resolveKanbanDragCard("todo", cards)).toBeNull()
  })
})
