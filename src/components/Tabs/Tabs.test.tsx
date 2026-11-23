/** @vitest-environment happy-dom */

import { describe, expect, it } from "vitest"
import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./Tabs"

describe("Tabs", () => {
  it("shows the default tab and switches on click", () => {
    render(
      <Tabs defaultValue="a">
        <TabsList>
          <TabsTrigger value="a">Tab A</TabsTrigger>
          <TabsTrigger value="b">Tab B</TabsTrigger>
        </TabsList>
        <TabsContent value="a">Content A</TabsContent>
        <TabsContent value="b">Content B</TabsContent>
      </Tabs>
    )
    expect(screen.getByText("Content A")).toBeTruthy()
    // Radix TabsTrigger activates on mousedown (part of a real click sequence), not click.
    fireEvent.mouseDown(screen.getByRole("tab", { name: "Tab B" }))
    expect(screen.getByText("Content B")).toBeTruthy()
    cleanup()
  })
})
