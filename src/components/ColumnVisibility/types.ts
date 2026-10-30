export interface ColumnDefinition<TKey extends string = string> {
  key: TKey
  label: string
  /** Shown by default; optional columns start hidden until the user enables them. */
  important?: boolean
}

export interface ColumnVisibilityState<TKey extends string = string> {
  /** Full column order (visible and hidden). */
  columnOrder: TKey[]
  /** Visible columns in display order. */
  visibleColumns: TKey[]
  hiddenColumnCount: number
  isOpen: boolean
  open: () => void
  close: () => void
  toggle: (key: TKey) => void
  reorder: (fromIndex: number, toIndex: number) => void
  reset: () => void
  isVisible: (key: TKey) => boolean
}

export interface UseColumnVisibilityOptions {
  storageKey?: string
  /**
   * Prefixed before `storageKey` in localStorage.
   * @default "nebula-ui:table-columns:"
   */
  storagePrefix?: string
}

export type ColumnVisibilityStored<TKey extends string = string> = {
  order: TKey[]
  visible: TKey[]
}
