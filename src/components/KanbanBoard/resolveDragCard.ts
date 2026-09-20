import type { UniqueIdentifier } from "@dnd-kit/core"

export function resolveKanbanDragCard<T>(
  activeId: UniqueIdentifier,
  cards: Record<UniqueIdentifier, T>
): T | null {
  return cards[activeId] ?? null
}
