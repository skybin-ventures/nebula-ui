import * as React from "react"
import type { RowData, SortingState } from "@tanstack/react-table"
import type { DataGridLoader } from "./types"

interface UseDataGridServerPageOptions<TData extends RowData> {
  loadPage?: DataGridLoader<TData>
  pageIndex: number
  pageSize: number
  sorting: SortingState
  reloadToken: number
  errorMessage: string
  onError?: (error: unknown) => void
  onSettled?: () => void
}

export function useDataGridServerPage<TData extends RowData>({
  loadPage,
  pageIndex,
  pageSize,
  sorting,
  reloadToken,
  errorMessage,
  onError,
  onSettled,
}: UseDataGridServerPageOptions<TData>) {
  const [serverRows, setServerRows] = React.useState<TData[]>([])
  const [rowCount, setRowCount] = React.useState(0)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (!loadPage) {
      return
    }

    let cancelled = false

    void loadPage({ pageIndex, pageSize, sorting })
      .then((page) => {
        if (cancelled) {
          return
        }
        setServerRows(page.rows)
        setRowCount(page.rowCount)
        setError(null)
      })
      .catch((loadError: unknown) => {
        if (cancelled) {
          return
        }
        setError(errorMessage)
        onError?.(loadError)
      })
      .finally(() => {
        if (!cancelled) {
          onSettled?.()
        }
      })

    return () => {
      cancelled = true
    }
  }, [loadPage, pageIndex, pageSize, sorting, reloadToken, errorMessage, onError, onSettled])

  return {
    serverRows,
    rowCount,
    error,
  }
}
