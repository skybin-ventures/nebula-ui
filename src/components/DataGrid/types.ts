import type { LegacyColumnDef } from "@tanstack/react-table/legacy"
import type { RowData, SortingState } from "@tanstack/react-table"

/**
 * Public column definition type for DataGrid.
 * Backed by TanStack Table's compatibility column def; apps should import
 * `ColumnDef` from `@skybin-tech/nebula-ui` rather than `@tanstack/react-table/legacy`.
 */
export type ColumnDef<TData extends RowData, TValue = unknown> = LegacyColumnDef<TData, TValue>

export interface DataGridQuery {
  pageIndex: number
  pageSize: number
  sorting: SortingState
}

export interface DataGridPage<TData extends RowData> {
  rows: TData[]
  rowCount: number
}

export type DataGridLoader<TData extends RowData> = (
  query: DataGridQuery
) => Promise<DataGridPage<TData>>

export interface DataGridProps<TData extends RowData> {
  columns: ColumnDef<TData, unknown>[]
  /** In-memory rows for client-side paging and sorting. */
  data?: TData[]
  /** AJAX page loader for server-side pagination. */
  loadPage?: DataGridLoader<TData>
  className?: string
  enableSorting?: boolean
  enableColumnVisibility?: boolean
  /** Defaults to false — opt in for multi-select tables. */
  enableRowSelection?: boolean
  enablePagination?: boolean
  /** Stable row id for selection across pages (server mode). */
  getRowId?: (originalRow: TData, index: number) => string
  onSelectionChange?: (rows: TData[]) => void
  pageSize?: number
  pageIndex?: number
  defaultPageIndex?: number
  onPageIndexChange?: (pageIndex: number) => void
  sorting?: SortingState
  defaultSorting?: SortingState
  onSortingChange?: (sorting: SortingState) => void
  loading?: boolean
  emptyMessage?: string
  errorMessage?: string
  onError?: (error: unknown) => void
}
