import * as React from "react"
import {
  useLegacyTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  type LegacyColumnDef,
} from "@tanstack/react-table/legacy"
import {
  flexRender,
  type ColumnVisibilityState,
  type PaginationState,
  type RowData,
  type RowSelectionState,
  type SortingState,
} from "@tanstack/react-table"
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
import {
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  ChevronLeft,
  ChevronRight,
  CheckSquare,
  Square,
  Settings2,
} from "lucide-react"

export interface DataTableProps<TData extends RowData> {
  columns: LegacyColumnDef<TData, unknown>[]
  data: TData[]
  className?: string
  enableSorting?: boolean
  enableColumnVisibility?: boolean
  enableRowSelection?: boolean
  onSelectionChange?: (rows: TData[]) => void
  pageSize?: number
}

function getColumnId<TData extends RowData>(column: LegacyColumnDef<TData, unknown>, index: number): string {
  if ("id" in column && typeof column.id === "string" && column.id.length > 0) {
    return column.id
  }

  if ("accessorKey" in column && typeof column.accessorKey === "string") {
    return column.accessorKey
  }

  return `column-${index}`
}

// eslint-disable-next-line react-refresh/only-export-components
export function useDataTable<TData extends RowData>(props: DataTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})
  const [columnVisibility, setColumnVisibility] = React.useState<ColumnVisibilityState>({})

  const allColumnIds = React.useMemo(
    () => props.columns.map((col, index) => getColumnId(col, index)),
    [props.columns]
  )

  const pagination: PaginationState | undefined = props.pageSize
    ? { pageIndex: 0, pageSize: props.pageSize }
    : undefined

  const table = useLegacyTable<TData>({
    data: props.data,
    columns: props.columns,
    getCoreRowModel: getCoreRowModel<TData>(),
    getSortedRowModel: props.enableSorting !== false ? getSortedRowModel<TData>() : undefined,
    getFilteredRowModel: getFilteredRowModel<TData>(),
    getPaginationRowModel: props.pageSize ? getPaginationRowModel<TData>() : undefined,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    enableSorting: props.enableSorting !== false,
    state: {
      sorting,
      rowSelection,
      columnVisibility,
    },
    initialState: pagination ? { pagination } : undefined,
  })

  const selectedRows = table.getFilteredSelectedRowModel().rows.map((r) => r.original)
  const onSelectionChange = props.onSelectionChange

  React.useEffect(() => {
    onSelectionChange?.(selectedRows)
  }, [selectedRows, onSelectionChange])

  return { table, selectedRows, allColumnIds }
}

function SortIndicator({ isSorted }: { isSorted: string | boolean | undefined }) {
  if (isSorted === "asc") return <ChevronUp className="h-4 w-4" />
  if (isSorted === "desc") return <ChevronDown className="h-4 w-4" />
  return <ChevronsUpDown className="h-4 w-4 opacity-50" />
}

export function DataTable<TData extends RowData>({
  columns,
  data,
  className,
  enableSorting = true,
  enableColumnVisibility = true,
  enableRowSelection = true,
  onSelectionChange,
  pageSize = 10,
}: DataTableProps<TData>) {
  const { table, selectedRows, allColumnIds } = useDataTable<TData>({
    columns,
    data,
    enableSorting,
    enableColumnVisibility,
    enableRowSelection,
    onSelectionChange,
    pageSize,
  })

  if (data.length === 0) {
    return (
      <div className={cn("flex items-center justify-center py-12 text-muted-foreground", className)}>
        No data available
      </div>
    )
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div>
          {enableRowSelection && selectedRows.length > 0 && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckSquare className="h-4 w-4" />
              <span>{selectedRows.length} of {data.length} rows selected</span>
            </div>
          )}
        </div>
        {enableColumnVisibility && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="ml-auto">
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
                  onCheckedChange={(checked) =>
                    table.getColumn(colId)?.toggleVisibility(!!checked)
                  }
                >
                  {colId}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {enableRowSelection && (
                  <TableHead className="w-10">
                    <button
                      className="flex items-center justify-center"
                      onClick={() => table.toggleAllRowsSelected()}
                    >
                      {table.getIsAllRowsSelected() ? (
                        <CheckSquare className="h-4 w-4" />
                      ) : (
                        <Square className="h-4 w-4 opacity-50" />
                      )}
                    </button>
                  </TableHead>
                )}
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} style={{ display: header.column.getIsVisible() ? undefined : "none" }}>
                    {header.isPlaceholder ? null : (
                      <div
                        className={cn(
                          "flex items-center gap-1",
                          header.column.getCanSort() && "cursor-pointer select-none"
                        )}
                        onClick={header.column.getCanSort() ? () => header.column.toggleSorting() : undefined}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {enableSorting && header.column.getCanSort() && (
                          <SortIndicator isSorted={header.column.getIsSorted()} />
                        )}
                      </div>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length + (enableRowSelection ? 1 : 0)} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() ? "selected" : undefined}
                  className={row.getIsSelected() ? "bg-accent/50" : undefined}
                >
                  {enableRowSelection && (
                    <TableCell>
                      <button
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
                  )}
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

      {pageSize && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Page {table.getState().pagination?.pageIndex + 1} of {table.getPageCount?.() ?? 1}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              disabled={!table.getCanPreviousPage?.()}
              onClick={() => table.previousPage?.()}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              disabled={!table.getCanNextPage?.()}
              onClick={() => table.nextPage?.()}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
