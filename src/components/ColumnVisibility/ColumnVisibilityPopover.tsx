"use client"

import { useMemo, useState } from "react"
import { Columns3 } from "lucide-react"
import { Button } from "../Button"
import { Popover, PopoverContent, PopoverTrigger } from "../Popover"
import { ColumnVisibilityItem } from "./ColumnVisibilityItem"
import type { ColumnDefinition, ColumnVisibilityState } from "./types"

export interface ColumnVisibilityPopoverProps<TKey extends string> {
  columns: ColumnDefinition<TKey>[]
  state: ColumnVisibilityState<TKey>
  /** Trigger button label. @default "Columns" */
  label?: string
  className?: string
  align?: "start" | "center" | "end"
}

export function ColumnVisibilityPopover<TKey extends string>({
  columns,
  state,
  label = "Columns",
  className,
  align = "end",
}: ColumnVisibilityPopoverProps<TKey>) {
  const [draggingKey, setDraggingKey] = useState<TKey | null>(null)
  const [dropTargetKey, setDropTargetKey] = useState<TKey | null>(null)

  const orderedColumns = useMemo(() => {
    const byKey = new Map(columns.map((column) => [column.key, column]))
    return state.columnOrder
      .map((key) => byKey.get(key))
      .filter((column): column is ColumnDefinition<TKey> => Boolean(column))
  }, [columns, state.columnOrder])

  const finishDrag = () => {
    if (draggingKey && dropTargetKey && draggingKey !== dropTargetKey) {
      const fromIndex = state.columnOrder.indexOf(draggingKey)
      const toIndex = state.columnOrder.indexOf(dropTargetKey)
      if (fromIndex >= 0 && toIndex >= 0) {
        state.reorder(fromIndex, toIndex)
      }
    }
    setDraggingKey(null)
    setDropTargetKey(null)
  }

  return (
    <Popover
      open={state.isOpen}
      onOpenChange={(open) => {
        if (open) state.open()
        else state.close()
      }}
    >
      <PopoverTrigger asChild>
        <Button type="button" variant="outline" size="sm" className={className ?? "h-9"}>
          <Columns3 className="mr-1.5 h-3.5 w-3.5" />
          {label}
          {state.hiddenColumnCount > 0 ? (
            <span className="ml-1.5 rounded-full bg-muted px-1.5 py-0 text-[10px] font-medium text-muted-foreground">
              {state.hiddenColumnCount} hidden
            </span>
          ) : null}
        </Button>
      </PopoverTrigger>
      <PopoverContent align={align} className="w-64 p-0">
        <div className="border-b px-3 py-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-foreground">Columns</p>
          <p className="pt-0.5 text-[10px] text-muted-foreground">Drag to reorder · check to show</p>
        </div>
        <div className="max-h-72 overflow-y-auto py-1.5">
          {orderedColumns.map((column) => (
            <ColumnVisibilityItem<TKey>
              key={column.key}
              column={column}
              checked={state.isVisible(column.key)}
              disabled={state.visibleColumns.length === 1 && state.isVisible(column.key)}
              onCheckedChange={state.toggle}
              onDragStart={setDraggingKey}
              onDragOver={setDropTargetKey}
              onDragEnd={finishDrag}
              isDragging={draggingKey === column.key}
              isDropTarget={dropTargetKey === column.key && draggingKey !== column.key}
            />
          ))}
        </div>
        <div className="flex items-center justify-between gap-2 border-t px-2 py-1.5">
          <Button type="button" variant="ghost" size="sm" className="h-7 text-xs" onClick={state.reset}>
            Reset
          </Button>
          <Button type="button" variant="outline" size="sm" className="h-7 text-xs" onClick={state.close}>
            Close
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

ColumnVisibilityPopover.displayName = "ColumnVisibilityPopover"

/** Alias matching ThreadX-style naming. */
export const ColumnsMenu = ColumnVisibilityPopover
