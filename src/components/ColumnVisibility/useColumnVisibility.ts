"use client"

import { useEffect, useMemo, useState } from "react"
import {
  DEFAULT_COLUMN_VISIBILITY_STORAGE_PREFIX,
  loadColumnPreferences,
  saveColumnPreferences,
} from "./storage"
import type {
  ColumnDefinition,
  ColumnVisibilityState,
  UseColumnVisibilityOptions,
} from "./types"

function resolveDefaultVisible<TKey extends string>(columns: ColumnDefinition<TKey>[]): TKey[] {
  const important = columns.filter((column) => column.important).map((column) => column.key)
  return important.length > 0 ? important : columns.map((column) => column.key)
}

function moveItem<T>(items: T[], fromIndex: number, toIndex: number): T[] {
  if (
    fromIndex === toIndex ||
    fromIndex < 0 ||
    toIndex < 0 ||
    fromIndex >= items.length ||
    toIndex >= items.length
  ) {
    return items
  }

  const next = [...items]
  const [moved] = next.splice(fromIndex, 1)
  next.splice(toIndex, 0, moved)
  return next
}

export function useColumnVisibility<TKey extends string>(
  columns: ColumnDefinition<TKey>[],
  options?: UseColumnVisibilityOptions,
): ColumnVisibilityState<TKey> {
  const allKeys = useMemo(() => columns.map((column) => column.key), [columns])
  const defaultVisible = useMemo(() => resolveDefaultVisible(columns), [columns])
  const storageKey = options?.storageKey
  const storagePrefix = options?.storagePrefix ?? DEFAULT_COLUMN_VISIBILITY_STORAGE_PREFIX

  const [columnOrder, setColumnOrder] = useState<TKey[]>(allKeys)
  const [visibleColumns, setVisibleColumns] = useState<TKey[]>(defaultVisible)
  const [hydrated, setHydrated] = useState(!storageKey)
  const [isOpen, setIsOpen] = useState(false)

  const allKeysSignature = allKeys.join("|")
  const defaultVisibleSignature = defaultVisible.join("|")

  useEffect(() => {
    if (!storageKey) {
      setColumnOrder(allKeys)
      setVisibleColumns(defaultVisible)
      setHydrated(true)
      return
    }

    const loaded = loadColumnPreferences(storageKey, allKeys, defaultVisible, storagePrefix)
    setColumnOrder(loaded.order)
    setVisibleColumns(loaded.visible)
    setHydrated(true)
    // Signatures avoid resetting on array identity churn while still reacting to key/default changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentional signature deps
  }, [allKeysSignature, defaultVisibleSignature, storageKey, storagePrefix])

  useEffect(() => {
    if (!storageKey || !hydrated) return
    saveColumnPreferences(
      storageKey,
      {
        order: columnOrder,
        visible: visibleColumns,
      },
      storagePrefix,
    )
  }, [columnOrder, hydrated, storageKey, storagePrefix, visibleColumns])

  const toggle = (key: TKey) => {
    setVisibleColumns((current) => {
      if (current.includes(key)) {
        return current.length === 1 ? current : current.filter((column) => column !== key)
      }

      const next = new Set([...current, key])
      return columnOrder.filter((columnKey) => next.has(columnKey))
    })
  }

  const reorder = (fromIndex: number, toIndex: number) => {
    setColumnOrder((current) => {
      const nextOrder = moveItem(current, fromIndex, toIndex)
      setVisibleColumns((visible) => nextOrder.filter((key) => visible.includes(key)))
      return nextOrder
    })
  }

  return {
    columnOrder,
    visibleColumns: columnOrder.filter((key) => visibleColumns.includes(key)),
    hiddenColumnCount: Math.max(allKeys.length - visibleColumns.length, 0),
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    toggle,
    reorder,
    reset: () => {
      setColumnOrder(allKeys)
      setVisibleColumns(defaultVisible)
    },
    isVisible: (key) => visibleColumns.includes(key),
  }
}
