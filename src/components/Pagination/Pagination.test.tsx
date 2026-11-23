/** @vitest-environment happy-dom */

import { describe, expect, it } from "vitest"
import { cleanup, render, screen } from "@testing-library/react"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./Pagination"

describe("Pagination", () => {
  it("renders an accessible navigation list", () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink>1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
    expect(screen.getByRole("navigation", { name: /pagination/i })).toBeTruthy()
    expect(screen.getByText("1")).toBeTruthy()
    cleanup()
  })
})
