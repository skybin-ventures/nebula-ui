"use client"

import { useEffect, useMemo, useState, useSyncExternalStore } from "react"
import {
  DEFAULT_COLUMN_VISIBILITY_STORAGE_PREFIX,
  loadColumnPreferences,
  saveColumnPreferences,
} from "./storage"
import type {
  ColumnDefinition,
  ColumnVisibilityState,
  ColumnVisibilityStored,
  UseColumnVisibilityOptions,
} from "./types"

const subscribeNoop = () => () => {}

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

function resolvePreferences<TKey extends string>(
  storageKey: string | undefined,
  allKeys: TKey[],
  defaultVisible: TKey[],
  storagePrefix: string,
  allowStorage: boolean,
): ColumnVisibilityStored<TKey> {
  if (!storageKey || !allowStorage) {
    return {
      order: [...allKeys],
      visible: [...defaultVisible],
    }
  }

  return loadColumnPreferences(storageKey, allKeys, defaultVisible, storagePrefix)
}

export function useColumnVisibility<TKey extends string>(
  columns: ColumnDefinition<TKey>[],
  options?: UseColumnVisibilityOptions,
): ColumnVisibilityState<TKey> {
  const allKeys = useMemo(() => columns.map((column) => column.key), [columns])
  const defaultVisible = useMemo(() => resolveDefaultVisible(columns), [columns])
  const storageKey = options?.storageKey
  const storagePrefix = options?.storagePrefix ?? DEFAULT_COLUMN_VISIBILITY_STORAGE_PREFIX

  // false on SSR / first server snapshot; true in the browser so we can read localStorage.
  const allowStorage = useSyncExternalStore(subscribeNoop, () => true, () => false)

  const configKey = [
    storageKey ?? "",
    storagePrefix,
    allKeys.join("|"),
    defaultVisible.join("|"),
    allowStorage ? "1" : "0",
  ].join("::")

  const [preferences, setPreferences] = useState(() =>
    resolvePreferences(storageKey, allKeys, defaultVisible, storagePrefix, allowStorage),
  )
  const [seenConfigKey, setSeenConfigKey] = useState(configKey)
  const [isOpen, setIsOpen] = useState(false)

  // Reset when columns / storage config change (or when the client becomes storage-capable).
  if (seenConfigKey !== configKey) {
    setSeenConfigKey(configKey)
    setPreferences(resolvePreferences(storageKey, allKeys, defaultVisible, storagePrefix, allowStorage))
  }

  useEffect(() => {
    if (!storageKey) return
    saveColumnPreferences(
      storageKey,
      {
        order: preferences.order,
        visible: preferences.visible,
      },
      storagePrefix,
    )
  }, [preferences, storageKey, storagePrefix])

  const toggle = (key: TKey) => {
    setPreferences((current) => {
      const visible = current.visible.includes(key)
        ? current.visible.length === 1
          ? current.visible
          : current.visible.filter((column) => column !== key)
        : current.order.filter((columnKey) => columnKey === key || current.visible.includes(columnKey))

      return { order: current.order, visible }
    })
  }

  const reorder = (fromIndex: number, toIndex: number) => {
    setPreferences((current) => {
      const order = moveItem(current.order, fromIndex, toIndex)
      return {
        order,
        visible: order.filter((key) => current.visible.includes(key)),
      }
    })
  }

  const columnOrder = preferences.order
  const visibleColumns = preferences.order.filter((key) => preferences.visible.includes(key))

  return {
    columnOrder,
    visibleColumns,
    hiddenColumnCount: Math.max(allKeys.length - preferences.visible.length, 0),
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    toggle,
    reorder,
    reset: () => {
      setPreferences({
        order: [...allKeys],
        visible: [...defaultVisible],
      })
    },
    isVisible: (key) => preferences.visible.includes(key),
  }
}
