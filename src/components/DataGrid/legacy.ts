import type { RowData } from "@tanstack/react-table"
import { DataGrid } from "./DataGrid"
import { useDataGrid } from "./useDataGrid"
import type { DataGridProps } from "./types"

/** @deprecated Use `DataGrid` instead. */
export const DataTable = DataGrid

/** @deprecated Use `useDataGrid` instead. */
export const useDataTable = useDataGrid

/** @deprecated Use `DataGridProps` instead. */
export type DataTableProps<TData extends RowData> = DataGridProps<TData>
