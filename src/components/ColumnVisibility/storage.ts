import type { ColumnVisibilityStored } from "./types"

export const DEFAULT_COLUMN_VISIBILITY_STORAGE_PREFIX = "nebula-ui:table-columns:"

function isKeyArray<TKey extends string>(value: unknown, allKeys: TKey[]): value is TKey[] {
  return Array.isArray(value) && value.every((key) => typeof key === "string" && allKeys.includes(key as TKey))
}

function mergeOrder<TKey extends string>(preferred: TKey[], allKeys: TKey[]): TKey[] {
  const seen = new Set<TKey>()
  const order: TKey[] = []

  for (const key of preferred) {
    if (allKeys.includes(key) && !seen.has(key)) {
      order.push(key)
      seen.add(key)
    }
  }

  for (const key of allKeys) {
    if (!seen.has(key)) {
      order.push(key)
      seen.add(key)
    }
  }

  return order
}

export function resolveStorageKey(storageKey: string, storagePrefix = DEFAULT_COLUMN_VISIBILITY_STORAGE_PREFIX): string {
  return `${storagePrefix}${storageKey}`
}

export function loadColumnPreferences<TKey extends string>(
  storageKey: string,
  allKeys: TKey[],
  defaultVisible: TKey[],
  storagePrefix = DEFAULT_COLUMN_VISIBILITY_STORAGE_PREFIX,
): ColumnVisibilityStored<TKey> {
  const fallback: ColumnVisibilityStored<TKey> = {
    order: [...allKeys],
    visible: defaultVisible,
  }

  if (typeof window === "undefined") {
    return fallback
  }

  try {
    const raw = localStorage.getItem(resolveStorageKey(storageKey, storagePrefix))
    if (!raw) {
      return fallback
    }

    const parsed = JSON.parse(raw) as unknown

    // Legacy format: TKey[] of visible columns only
    if (Array.isArray(parsed)) {
      const visible = parsed.filter((key): key is TKey => allKeys.includes(key as TKey))
      return {
        order: [...allKeys],
        visible: visible.length > 0 ? visible : defaultVisible,
      }
    }

    if (!parsed || typeof parsed !== "object") {
      return fallback
    }

    const record = parsed as { order?: unknown; visible?: unknown }
    const order = isKeyArray(record.order, allKeys)
      ? mergeOrder(record.order, allKeys)
      : [...allKeys]
    const visibleRaw = isKeyArray(record.visible, allKeys) ? record.visible : defaultVisible
    const visible = order.filter((key) => visibleRaw.includes(key))

    return {
      order,
      visible: visible.length > 0 ? visible : defaultVisible,
    }
  } catch {
    return fallback
  }
}

export function saveColumnPreferences<TKey extends string>(
  storageKey: string,
  preferences: ColumnVisibilityStored<TKey>,
  storagePrefix = DEFAULT_COLUMN_VISIBILITY_STORAGE_PREFIX,
): void {
  if (typeof window === "undefined") {
    return
  }

  localStorage.setItem(resolveStorageKey(storageKey, storagePrefix), JSON.stringify(preferences))
}
