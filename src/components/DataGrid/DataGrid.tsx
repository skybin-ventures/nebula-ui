import { flexRender, type RowData } from "@tanstack/react-table"
import { cn } from "@/utils"
import { Button } from "@/primitives/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/primitives/dropdown-menu"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/primitives/table"
import { Skeleton } from "@/components/Skeleton"
import { ErrorState } from "@/components/ErrorState"
import {
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  ChevronLeft,
  ChevronRight,
  CheckSquare,
  Square,
  Settings2,
  Loader2,
} from "lucide-react"
import type { DataGridProps } from "./types"
import { useDataGrid } from "./useDataGrid"
import type { LegacyColumnDef } from "@tanstack/react-table/legacy"

function getColumnId<TData extends RowData>(column: LegacyColumnDef<TData, unknown>, index: number): string {
  if ("id" in column && typeof column.id === "string" && column.id.length > 0) {
    return column.id
  }

  if ("accessorKey" in column && typeof column.accessorKey === "string") {
    return column.accessorKey
  }

  return `column-${index}`
}

function SortIndicator({ isSorted }: { isSorted: string | boolean | undefined }) {
  if (isSorted === "asc") return <ChevronUp className="h-4 w-4" />
  if (isSorted === "desc") return <ChevronDown className="h-4 w-4" />
  return <ChevronsUpDown className="h-4 w-4 opacity-50" />
}

function DataGridPagination({
  pageIndex,
  pageCount,
  rowCount,
  pageSize,
  loading,
  onPrevious,
  onNext,
}: {
  pageIndex: number
  pageCount: number
  rowCount: number
  pageSize: number
  loading: boolean
  onPrevious: () => void
  onNext: () => void
}) {
  const start = rowCount === 0 ? 0 : pageIndex * pageSize + 1
  const end = Math.min(rowCount, (pageIndex + 1) * pageSize)

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="text-sm text-muted-foreground">
        {rowCount === 0 ? "No rows" : `Showing ${start}-${end} of ${rowCount}`}
        <span className="mx-2">·</span>
        Page {pageIndex + 1} of {pageCount}
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          aria-label="Previous page"
          disabled={loading || pageIndex <= 0}
          onClick={onPrevious}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          aria-label="Next page"
          disabled={loading || pageIndex + 1 >= pageCount}
          onClick={onNext}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

export function DataGrid<TData extends RowData>({
  columns,
  data,
  loadPage,
  className,
  enableSorting = true,
  enableColumnVisibility = true,
  enableRowSelection = true,
  enablePagination = true,
  onSelectionChange,
  pageSize = 10,
  pageIndex,
  defaultPageIndex,
  onPageIndexChange,
  sorting,
  defaultSorting,
  onSortingChange,
  loading,
  emptyMessage = "No data available",
  errorMessage,
  onError,
}: DataGridProps<TData>) {
  const {
    table,
    selectedRows,
    allColumnIds,
    loading: isLoading,
    error,
    reload,
    isServerMode,
    rowCount,
    pageCount,
  } = useDataGrid<TData>({
    columns,
    data,
    loadPage,
    enableSorting,
    enableColumnVisibility,
    enableRowSelection,
    enablePagination,
    onSelectionChange,
    pageSize,
    pageIndex,
    defaultPageIndex,
    onPageIndexChange,
    sorting,
    defaultSorting,
    onSortingChange,
    loading,
    emptyMessage,
    errorMessage,
    onError,
  })

  if (error) {
    return (
      <ErrorState
        className={className}
        title="Could not load grid data"
        description={error}
        onRetry={reload}
        loading={isLoading}
      />
    )
  }

  const rows = table.getRowModel().rows
  const showClientEmpty = !isServerMode && !isLoading && (data?.length ?? 0) === 0

  if (showClientEmpty) {
    return (
      <div className={cn("flex items-center justify-center py-12 text-muted-foreground", className)}>
        {emptyMessage}
      </div>
    )
  }

  const currentPageIndex = table.getState().pagination?.pageIndex ?? 0

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              <span>Loading data…</span>
            </>
          ) : null}
          {!isLoading && enableRowSelection && selectedRows.length > 0 ? (
            <>
              <CheckSquare className="h-4 w-4" />
              <span>{selectedRows.length} of {rowCount} rows selected</span>
            </>
          ) : null}
        </div>
        {enableColumnVisibility ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="ml-auto" disabled={isLoading}>
                <Settings2 className="mr-2 h-4 w-4" />
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[180px]">
              <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {allColumnIds.map((colId) => (
                <DropdownMenuCheckboxItem
                  key={colId}
                  checked={table.getColumn(colId)?.getIsVisible() ?? true}
                  onCheckedChange={(checked) => table.getColumn(colId)?.toggleVisibility(!!checked)}
                >
                  {colId}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : null}
      </div>

      <div className="rounded-md border" aria-busy={isLoading}>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {enableRowSelection ? (
                  <TableHead className="w-10">
                    <button
                      type="button"
                      className="flex items-center justify-center"
                      disabled={isLoading}
                      onClick={() => table.toggleAllRowsSelected()}
                    >
                      {table.getIsAllRowsSelected() ? (
                        <CheckSquare className="h-4 w-4" />
                      ) : (
                        <Square className="h-4 w-4 opacity-50" />
                      )}
                    </button>
                  </TableHead>
                ) : null}
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} style={{ display: header.column.getIsVisible() ? undefined : "none" }}>
                    {header.isPlaceholder ? null : (
                      <div
                        className={cn(
                          "flex items-center gap-1",
                          header.column.getCanSort() && !isLoading && "cursor-pointer select-none"
                        )}
                        onClick={
                          enableSorting && !isLoading && header.column.getCanSort()
                            ? () => header.column.toggleSorting()
                            : undefined
                        }
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {enableSorting && header.column.getCanSort() ? (
                          <SortIndicator isSorted={header.column.getIsSorted()} />
                        ) : null}
                      </div>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: Math.min(pageSize, 5) }).map((_, index) => (
                <TableRow key={`loading-${index}`}>
                  {enableRowSelection ? (
                    <TableCell>
                      <Skeleton className="h-4 w-4" />
                    </TableCell>
                  ) : null}
                  {columns.map((column, columnIndex) => (
                    <TableCell key={getColumnId(column, columnIndex)}>
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length + (enableRowSelection ? 1 : 0)} className="h-24 text-center">
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() ? "selected" : undefined}
                  className={row.getIsSelected() ? "bg-accent/50" : undefined}
                >
                  {enableRowSelection ? (
                    <TableCell>
                      <button
                        type="button"
                        className="flex items-center justify-center"
                        onClick={() => row.toggleSelected()}
                      >
                        {row.getIsSelected() ? (
                          <CheckSquare className="h-4 w-4" />
                        ) : (
                          <Square className="h-4 w-4 opacity-50" />
                        )}
                      </button>
                    </TableCell>
                  ) : null}
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {enablePagination ? (
        <DataGridPagination
          pageIndex={currentPageIndex}
          pageCount={pageCount}
          rowCount={rowCount}
          pageSize={pageSize}
          loading={isLoading}
          onPrevious={() => table.previousPage?.()}
          onNext={() => table.nextPage?.()}
        />
      ) : null}
    </div>
  )
}
