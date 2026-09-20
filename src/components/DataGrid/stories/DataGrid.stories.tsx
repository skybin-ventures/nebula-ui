import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import type { LegacyColumnDef } from "@tanstack/react-table/legacy"
import { DataGrid } from "../DataGrid"

type Person = {
  id: string
  name: string
  role: string
}

const columns: LegacyColumnDef<Person, unknown>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "role", header: "Role" },
]

const clientRows: Person[] = Array.from({ length: 23 }, (_, index) => ({
  id: String(index + 1),
  name: `Person ${index + 1}`,
  role: index % 2 === 0 ? "Admin" : "Member",
}))

const meta = {
  title: "Components/DataGrid",
  component: DataGrid,
  args: {
    columns,
    pageSize: 5,
    enableRowSelection: true,
  },
} satisfies Meta<typeof DataGrid>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    data: clientRows,
  },
}

export const Controlled: Story = {
  render: (args) => {
    const [pageIndex, setPageIndex] = React.useState(0)
    return (
      <DataGrid
        {...args}
        data={clientRows}
        pageIndex={pageIndex}
        onPageIndexChange={setPageIndex}
      />
    )
  },
}

export const Disabled: Story = {
  args: {
    data: clientRows,
    enableRowSelection: false,
    enableSorting: false,
    enableColumnVisibility: false,
  },
}

export const Loading: Story = {
  args: {
    data: clientRows,
    loading: true,
  },
}

export const Empty: Story = {
  args: {
    data: [],
    emptyMessage: "No people found.",
  },
}

export const Error: Story = {
  render: (args) => (
    <DataGrid
      {...args}
      loadPage={async () => {
        throw new Error("Failed to fetch")
      }}
    />
  ),
}

export const AjaxPagination: Story = {
  render: (args) => (
    <DataGrid
      {...args}
      loadPage={async ({ pageIndex, pageSize }) => {
        await new Promise((resolve) => setTimeout(resolve, 600))
        const start = pageIndex * pageSize
        const rows = Array.from({ length: pageSize }, (_, index) => {
          const id = start + index + 1
          if (id > 47) {
            return null
          }
          return {
            id: String(id),
            name: `Remote person ${id}`,
            role: id % 2 === 0 ? "Admin" : "Member",
          }
        }).filter((row): row is Person => row !== null)

        return {
          rows,
          rowCount: 47,
        }
      }}
    />
  ),
}
