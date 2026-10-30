"use client"

import { Columns3 } from "lucide-react"
import { Badge } from "../Badge"
import { Button } from "../Button"
import type { ColumnVisibilityState } from "./types"

export interface ColumnVisibilityButtonProps<TKey extends string> {
  state: ColumnVisibilityState<TKey>
  label?: string
  className?: string
}

/** Standalone trigger for custom popover/sheet shells. Prefer `ColumnVisibilityPopover`. */
export function ColumnVisibilityButton<TKey extends string>({
  state,
  label = "Columns",
  className,
}: ColumnVisibilityButtonProps<TKey>) {
  return (
    <Button type="button" variant="outline" size="sm" className={className} onClick={state.open}>
      <Columns3 className="mr-2 h-4 w-4" />
      {label}
      {state.hiddenColumnCount > 0 ? (
        <Badge variant="secondary" className="ml-2 px-1.5 py-0 text-xs">
          {state.hiddenColumnCount} hidden
        </Badge>
      ) : null}
    </Button>
  )
}

ColumnVisibilityButton.displayName = "ColumnVisibilityButton"
