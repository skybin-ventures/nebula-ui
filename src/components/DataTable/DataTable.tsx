import * as React from "react"
import {
  useLegacyTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  type LegacyColumnDef,
} from "@tanstack/react-table/legacy"
import { flexRender } from "@tanstack/react-table"
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

export interface DataTableProps<TData extends Record<string, any>> {
  columns: LegacyColumnDef<TData, unknown>[]
  data: TData[]
  className?: string
  enableSorting?: boolean
  enableColumnVisibility?: boolean
  enableRowSelection?: boolean
  onSelectionChange?: (rows: TData[]) => void
  pageSize?: number
}

export function useDataTable<TData extends Record<string, any>>(props: DataTableProps<TData>) {
  const [sorting, setSorting] = React.useState<Record<string, "asc" | "desc" | false>>({})
  const [rowSelection, setRowSelection] = React.useState<Record<string, true>>({})
  const [columnVisibility, setColumnVisibility] = React.useState<Record<string, boolean>>({})

  const allColumnIds = React.useMemo(
    () => props.columns.map((col) => col.id as string),
    [props.columns]
  )

  const table = useLegacyTable<TData>({
    data: props.data,
    columns: props.columns as any,
    getCoreRowModel: getCoreRowModel<TData>(),
    getSortedRowModel: props.enableSorting !== false ? getSortedRowModel<TData>() : undefined,
    getFilteredRowModel: getFilteredRowModel<TData>(),
    getPaginationRowModel: props.pageSize ? getPaginationRowModel<TData>() : undefined,
    onSortingChange: setSorting as any,
    onRowSelectionChange: setRowSelection as any,
    onColumnVisibilityChange: setColumnVisibility as any,
    enableSorting: props.enableSorting !== false,
    state: {
      sorting: sorting as any,
      rowSelection,
      columnVisibility,
    },
    initialState: props.pageSize
      ? ({ pagination: { pageSize: props.pageSize } } as any)
      : undefined,
  })

  const selectedRows = table.getFilteredSelectedRowModel().rows.map((r) => r.original)

  React.useEffect(() => {
    props.onSelectionChange?.(selectedRows)
  }, [selectedRows, props.onSelectionChange])

  return { table, selectedRows, allColumnIds }
}

function SortIndicator({ isSorted }: { isSorted: string | boolean | undefined }) {
  if (isSorted === "asc") return <ChevronUp className="h-4 w-4" />
  if (isSorted === "desc") return <ChevronDown className="h-4 w-4" />
  return <ChevronsUpDown className="h-4 w-4 opacity-50" />
}

export function DataTable<TData extends Record<string, any>>({
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
