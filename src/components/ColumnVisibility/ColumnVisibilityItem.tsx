"use client"

import { GripVertical } from "lucide-react"
import { Checkbox } from "../Checkbox/Checkbox"
import { cn } from "../../utils/cn"
import type { ColumnDefinition } from "./types"

export interface ColumnVisibilityItemProps<TKey extends string> {
  column: ColumnDefinition<TKey>
  checked: boolean
  disabled?: boolean
  onCheckedChange: (key: TKey) => void
  onDragStart: (key: TKey) => void
  onDragOver: (key: TKey) => void
  onDragEnd: () => void
  isDragging?: boolean
  isDropTarget?: boolean
}

export function ColumnVisibilityItem<TKey extends string>({
  column,
  checked,
  disabled,
  onCheckedChange,
  onDragStart,
  onDragOver,
  onDragEnd,
  isDragging,
  isDropTarget,
}: ColumnVisibilityItemProps<TKey>) {
  return (
    <div
      draggable
      onDragStart={(event) => {
        event.dataTransfer.effectAllowed = "move"
        event.dataTransfer.setData("text/plain", column.key)
        onDragStart(column.key)
      }}
      onDragOver={(event) => {
        event.preventDefault()
        event.dataTransfer.dropEffect = "move"
        onDragOver(column.key)
      }}
      onDrop={(event) => {
        event.preventDefault()
        onDragEnd()
      }}
      onDragEnd={onDragEnd}
      className={cn(
        "flex w-full cursor-grab items-center gap-2 px-2 py-1.5 text-left text-xs active:cursor-grabbing",
        isDragging && "opacity-50",
        isDropTarget && "bg-muted/60",
        disabled && "opacity-60",
      )}
    >
      <GripVertical className="h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden />
      <label
        className={cn(
          "flex min-w-0 flex-1 cursor-pointer items-center gap-2",
          disabled && "cursor-not-allowed",
        )}
      >
        <Checkbox
          checked={checked}
          disabled={disabled}
          onCheckedChange={() => {
            if (!disabled) onCheckedChange(column.key)
          }}
          className="h-3.5 w-3.5"
        />
        <span className="truncate font-medium">{column.label}</span>
      </label>
    </div>
  )
}

ColumnVisibilityItem.displayName = "ColumnVisibilityItem"
