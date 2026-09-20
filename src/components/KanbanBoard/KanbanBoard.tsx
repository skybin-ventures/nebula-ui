import * as React from "react"
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core"
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable"
import { cn } from "@/utils"
import { Badge } from "@/primitives/badge"
import { GripVertical } from "lucide-react"
import { resolveKanbanDragCard } from "./resolveDragCard"

// ─── Data types ─────────────────────────────────────────────────────────────

export interface KanbanCard {
  id: UniqueIdentifier
  title: string
  description?: string
  assignee?: string
  priority?: "low" | "medium" | "high" | "urgent"
  labels?: string[]
  dueDate?: string
}

export interface KanbanColumn {
  id: UniqueIdentifier
  title: string
  cardIds: UniqueIdentifier[]
}

export interface KanbanBoardProps {
  columns: KanbanColumn[]
  cards: Record<UniqueIdentifier, KanbanCard>
  onCardMove: (fromColumnId: UniqueIdentifier, toColumnId: UniqueIdentifier, newIndex: number) => void
  renderCard?: (card: KanbanCard, isDragging: boolean) => React.ReactNode
  renderColumnHeader?: (column: KanbanColumn) => React.ReactNode
  className?: string
}

// ─── Draggable card ─────────────────────────────────────────────────────────

function SortableCard({
  card,
  isDragging,
  renderCard,
}: {
  card: KanbanCard
  isDragging: boolean
  renderCard?: (card: KanbanCard, isDragging: boolean) => React.ReactNode
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isSorting,
  } = useSortable({ id: card.id })

  const style: React.CSSProperties = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    transition,
    opacity: isDragging || isSorting ? 0.5 : 1,
    zIndex: isDragging ? 100 : undefined,
  }

  if (renderCard) {
    return (
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        {renderCard(card, isDragging)}
      </div>
    )
  }

  const priorityColors: Record<string, string> = {
    low: "bg-sky-100 text-sky-800",
    medium: "bg-amber-100 text-amber-800",
    high: "bg-orange-100 text-orange-800",
    urgent: "bg-red-100 text-red-800",
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="rounded-md border bg-background p-3 cursor-grab active:cursor-grabbing"
    >
      <div className="flex items-start gap-2">
        <GripVertical className="h-4 w-4 mt-0.5 shrink-0 opacity-40" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium leading-tight">{card.title}</p>
          {card.description && (
            <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{card.description}</p>
          )}
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            {card.priority && (
              <span className={cn("rounded-full px-2 py-0.5 text-xs font-medium", priorityColors[card.priority] || "bg-muted")}>
                {card.priority}
              </span>
            )}
            {card.labels?.map((label) => (
              <Badge key={label} variant="secondary" className="text-xs">{label}</Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Droppable column ────────────────────────────────────────────────────────

function SortableColumn({
  column,
  cardMap,
  activeId,
  renderCard,
  renderColumnHeader,
}: {
  column: KanbanColumn
  cardMap: Record<UniqueIdentifier, KanbanCard>
  activeId: UniqueIdentifier | null
  renderCard?: (card: KanbanCard, isDragging: boolean) => React.ReactNode
  renderColumnHeader?: (column: KanbanColumn) => React.ReactNode
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isOver,
  } = useSortable({
    id: column.id,
    data: { type: "column" },
  })

  const columnCards = column.cardIds
    .map((id) => cardMap[id])
    .filter(Boolean)

  const style: React.CSSProperties = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    transition: "transform 150ms ease",
    width: "320px",
    minWidth: "280px",
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={cn(
        "flex max-h-full flex-col rounded-lg border bg-muted/50",
        isOver && "ring-2 ring-primary"
      )}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between border-b px-3 py-2"
        {...listeners}
      >
        {renderColumnHeader ? (
          renderColumnHeader(column)
        ) : (
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold">{column.title}</h3>
            <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
              {columnCards.length}
            </span>
          </div>
        )}
      </div>

      {/* Cards */}
      <SortableContext
        items={column.cardIds}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex flex-1 flex-col gap-2 overflow-y-auto p-2">
          {columnCards.map((card) => (
            <SortableCard
              key={card!.id}
              card={card!}
              isDragging={activeId === card!.id}
              renderCard={renderCard}
            />
          ))}
          {columnCards.length === 0 && !isOver && (
            <div className="flex flex-1 items-center justify-center py-8 text-xs text-muted-foreground">
              Drop cards here
            </div>
          )}
        </div>
      </SortableContext>
    </div>
  )
}

// ─── Main Component ──────────────────────────────────────────────────────────

export function KanbanBoard({
  columns,
  cards,
  onCardMove,
  renderCard,
  renderColumnHeader,
  className,
}: KanbanBoardProps) {
  const [activeId, setActiveId] = React.useState<UniqueIdentifier | null>(null)
  const [activeCard, setActiveCard] = React.useState<KanbanCard | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const columnIdToCards = React.useMemo(() => {
    const map: Record<UniqueIdentifier, UniqueIdentifier[]> = {}
    for (const col of columns) {
      map[col.id] = col.cardIds
    }
    return map
  }, [columns])

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    setActiveId(active.id)
    setActiveCard(resolveKanbanDragCard(active.id, cards))
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveId(null)
    setActiveCard(null)

    if (!over || active.id === over.id) return

    const activeCardMap: Record<UniqueIdentifier, UniqueIdentifier> = {}
    for (const col of columns) {
      for (const cid of col.cardIds) {
        activeCardMap[cid] = col.id
      }
    }

    const fromColumnId = activeCardMap[active.id]
    let toColumnId: UniqueIdentifier | undefined

    if (columnIdToCards[over.id]) {
      toColumnId = over.id
    } else {
      const overColumn = columns.find((c) => c.cardIds.includes(over.id))
      toColumnId = overColumn?.id
    }

    if (!fromColumnId || !toColumnId) return

    const toCards = columnIdToCards[toColumnId] ?? []
    let newIndex = toCards.indexOf(over.id)
    if (newIndex === -1) newIndex = toCards.length

    onCardMove(fromColumnId, toColumnId, newIndex)
  }

  return (
    <div className={cn("flex gap-4 overflow-x-auto pb-4", className)}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {columns.map((column) => (
          <SortableColumn
            key={column.id}
            column={column}
            cardMap={cards}
            activeId={activeId}
            renderCard={renderCard}
            renderColumnHeader={renderColumnHeader}
          />
        ))}
        <DragOverlay dropAnimation={{ duration: 200 }}>
          {activeCard && (
            <div className="rotate-2 rounded-md border bg-background p-3 shadow-lg">
              {renderCard ? renderCard(activeCard, true) : (
                <p className="text-sm font-medium">{activeCard.title}</p>
              )}
            </div>
          )}
        </DragOverlay>
      </DndContext>
    </div>
  )
}
