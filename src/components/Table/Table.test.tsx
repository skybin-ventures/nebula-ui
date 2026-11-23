/** @vitest-environment happy-dom */

import { describe, expect, it } from "vitest"
import { cleanup, render, screen } from "@testing-library/react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./Table"

describe("Table", () => {
  it("renders an accessible table", () => {
    render(
      <Table>
        <TableCaption>Inventory</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Qty</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Widget</TableCell>
            <TableCell>3</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )
    expect(screen.getByRole("table")).toBeTruthy()
    expect(screen.getByText("Widget")).toBeTruthy()
    cleanup()
  })
})
