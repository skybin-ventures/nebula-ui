import * as React from "react"
import {
  useLegacyTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  type LegacyColumnDef,
} from "@tanstack/react-table/legacy"
import type {
  ColumnVisibilityState,
  PaginationState,
  RowData,
  RowSelectionState,
  SortingState,
} from "@tanstack/react-table"
import { useControllableState } from "@/hooks/useControllableState"
import type { DataGridProps } from "./types"
import { useDataGridServerPage } from "./useDataGridServerPage"

function getColumnId<TData extends RowData>(column: LegacyColumnDef<TData, unknown>, index: number): string {
  if ("id" in column && typeof column.id === "string" && column.id.length > 0) {
    return column.id
  }

  if ("accessorKey" in column && typeof column.accessorKey === "string") {
    return column.accessorKey
  }

  return `column-${index}`
}

function resolvePaginationState(
  updater: PaginationState | ((previous: PaginationState) => PaginationState),
  previous: PaginationState
): PaginationState {
  return typeof updater === "function" ? updater(previous) : updater
}

export interface UseDataGridResult<TData extends RowData> {
  table: ReturnType<typeof useLegacyTable<TData>>
  selectedRows: TData[]
  allColumnIds: string[]
  loading: boolean
  error: string | null
  reload: () => void
  isServerMode: boolean
  rowCount: number
  pageCount: number
}

export function useDataGrid<TData extends RowData>(props: DataGridProps<TData>): UseDataGridResult<TData> {
  const {
    columns,
    data = [],
    loadPage,
    enableSorting = true,
    enablePagination = true,
    pageSize = 10,
    loading: loadingProp,
    errorMessage = "Failed to load data.",
    onError,
    onSelectionChange,
  } = props

  const isServerMode = Boolean(loadPage)
  const [sorting, setSortingState] = useControllableState(
    props.sorting,
    props.defaultSorting ?? [],
    props.onSortingChange
  )
  const [pageIndex, setPageIndexState] = useControllableState(
    props.pageIndex,
    props.defaultPageIndex ?? 0,
    props.onPageIndexChange
  )
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})
  const [columnVisibility, setColumnVisibility] = React.useState<ColumnVisibilityState>({})
  const [isFetching, setIsFetching] = React.useState(isServerMode)
  const [reloadToken, setReloadToken] = React.useState(0)

  const markFetching = React.useCallback(() => {
    if (isServerMode) {
      setIsFetching(true)
    }
  }, [isServerMode])

  const setSorting = React.useCallback(
    (updater: SortingState | ((previous: SortingState) => SortingState)) => {
      markFetching()
      setSortingState(updater)
    },
    [markFetching, setSortingState]
  )

  const setPageIndex = React.useCallback(
    (next: number | ((previous: number) => number)) => {
      markFetching()
      setPageIndexState(typeof next === "function" ? next(pageIndex) : next)
    },
    [markFetching, pageIndex, setPageIndexState]
  )

  const onSettled = React.useCallback(() => {
    setIsFetching(false)
  }, [])

  const {
    serverRows,
    rowCount: serverRowCount,
    error,
  } = useDataGridServerPage({
    loadPage,
    pageIndex,
    pageSize,
    sorting,
    reloadToken,
    errorMessage,
    onError,
    onSettled,
  })

  const allColumnIds = React.useMemo(
    () => columns.map((col, index) => getColumnId(col, index)),
    [columns]
  )

  const tableData = isServerMode ? serverRows : data
  const pageCount = isServerMode ? Math.max(1, Math.ceil(serverRowCount / pageSize)) : undefined
  const pagination: PaginationState = { pageIndex, pageSize }

  const table = useLegacyTable<TData>({
    data: tableData,
    columns,
    pageCount,
    manualPagination: isServerMode,
    manualSorting: isServerMode && enableSorting,
    getCoreRowModel: getCoreRowModel<TData>(),
    getSortedRowModel: !isServerMode && enableSorting ? getSortedRowModel<TData>() : undefined,
    getFilteredRowModel: !isServerMode ? getFilteredRowModel<TData>() : undefined,
    getPaginationRowModel:
      !isServerMode && enablePagination ? getPaginationRowModel<TData>() : undefined,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: (updater) => {
      const next = resolvePaginationState(updater, pagination)
      setPageIndex(next.pageIndex)
    },
    enableSorting,
    state: {
      sorting,
      rowSelection,
      columnVisibility,
      pagination,
    },
  })

  const selectedRows = table.getFilteredSelectedRowModel().rows.map((row) => row.original)

  React.useEffect(() => {
    onSelectionChange?.(selectedRows)
  }, [selectedRows, onSelectionChange])

  const reload = React.useCallback(() => {
    markFetching()
    setReloadToken((token) => token + 1)
  }, [markFetching])

  const loading = Boolean(loadingProp ?? (isServerMode && isFetching))
  const resolvedPageCount = isServerMode ? pageCount ?? 1 : table.getPageCount?.() ?? 1

  return {
    table,
    selectedRows,
    allColumnIds,
    loading,
    error,
    reload,
    isServerMode,
    rowCount: isServerMode ? serverRowCount : data.length,
    pageCount: resolvedPageCount,
  }
}
