import type { LegacyColumnDef } from "@tanstack/react-table/legacy"
import type { RowData, SortingState } from "@tanstack/react-table"

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
  columns: LegacyColumnDef<TData, unknown>[]
  /** In-memory rows for client-side paging and sorting. */
  data?: TData[]
  /** AJAX page loader for server-side pagination. */
  loadPage?: DataGridLoader<TData>
  className?: string
  enableSorting?: boolean
  enableColumnVisibility?: boolean
  enableRowSelection?: boolean
  enablePagination?: boolean
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
