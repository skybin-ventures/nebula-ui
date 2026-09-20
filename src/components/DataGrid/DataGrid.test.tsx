/** @vitest-environment happy-dom */

import { afterEach, describe, expect, it, vi } from "vitest"
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react"
import { type LegacyColumnDef } from "@tanstack/react-table/legacy"
import { DataGrid } from "./DataGrid"

afterEach(cleanup)

type Row = { id: string; name: string }

const columns: LegacyColumnDef<Row, unknown>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "name", header: "Name" },
]

describe("DataGrid", () => {
  it("paginates client-side data", () => {
    const data = Array.from({ length: 12 }, (_, index) => ({
      id: String(index + 1),
      name: `Row ${index + 1}`,
    }))

    render(<DataGrid columns={columns} data={data} pageSize={5} enableRowSelection={false} />)

    expect(screen.getByText("Row 1")).toBeTruthy()
    expect(screen.queryByText("Row 6")).toBeNull()

    fireEvent.click(screen.getByRole("button", { name: "Next page" }))
    expect(screen.getByText("Row 6")).toBeTruthy()
    expect(screen.getByText(/Showing 6-10 of 12/)).toBeTruthy()
  })

  it("loads pages through AJAX", async () => {
    const loadPage = vi.fn(async ({ pageIndex, pageSize }: { pageIndex: number; pageSize: number }) => ({
      rows: Array.from({ length: pageSize }, (_, index) => ({
        id: String(pageIndex * pageSize + index + 1),
        name: `Server row ${pageIndex * pageSize + index + 1}`,
      })),
      rowCount: 12,
    }))

    render(
      <DataGrid
        columns={columns}
        loadPage={loadPage}
        pageSize={5}
        enableRowSelection={false}
      />
    )

    await waitFor(() => {
      expect(screen.getByText("Server row 1")).toBeTruthy()
    })

    expect(loadPage).toHaveBeenCalledWith({
      pageIndex: 0,
      pageSize: 5,
      sorting: [],
    })

    fireEvent.click(screen.getByRole("button", { name: "Next page" }))

    await waitFor(() => {
      expect(screen.getByText("Server row 6")).toBeTruthy()
    })

    expect(loadPage).toHaveBeenLastCalledWith({
      pageIndex: 1,
      pageSize: 5,
      sorting: [],
    })
  })

  it("shows an error state when AJAX loading fails", async () => {
    const loadPage = vi.fn(async () => {
      throw new Error("network")
    })

    render(
      <DataGrid
        columns={columns}
        loadPage={loadPage}
        pageSize={5}
        enableRowSelection={false}
      />
    )

    await waitFor(() => {
      expect(screen.getByText("Could not load grid data")).toBeTruthy()
    })
  })
})
