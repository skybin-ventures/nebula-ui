/** @vitest-environment happy-dom */

import { afterEach, describe, expect, it, vi } from "vitest"
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react"
import { useState } from "react"
import { TreeView, type TreeNode } from "./TreeView"

afterEach(cleanup)

const nodes: TreeNode[] = [
  {
    id: "root",
    label: "Root",
    children: [
      {
        id: "folder",
        label: "Folder",
        children: [
          { id: "file-a", label: "File A" },
          { id: "file-b", label: "File B", disabled: true },
        ],
      },
      { id: "leaf", label: "Leaf" },
    ],
  },
]

describe("TreeView", () => {
  it("exposes tree and treeitem roles", () => {
    render(
      <TreeView
        nodes={nodes}
        defaultExpandedIds={["root"]}
        aria-label="Demo tree"
      />
    )

    expect(screen.getByRole("tree", { name: "Demo tree" })).toBeTruthy()
    expect(screen.getAllByRole("treeitem").length).toBeGreaterThan(0)
  })

  it("hides nested labels until ancestors are expanded", () => {
    render(<TreeView nodes={nodes} aria-label="Demo tree" />)

    expect(screen.getByText("Root")).toBeTruthy()
    expect(screen.queryByText("Folder")).toBeNull()
    expect(screen.queryByText("File A")).toBeNull()
  })

  it("shows children when defaultExpandedIds includes ancestors", () => {
    render(
      <TreeView
        nodes={nodes}
        defaultExpandedIds={["root", "folder"]}
        aria-label="Demo tree"
      />
    )

    expect(screen.getByText("Folder")).toBeTruthy()
    expect(screen.getByText("File A")).toBeTruthy()
  })

  it("toggles expansion from the chevron and reports changes", () => {
    const onExpandedIdsChange = vi.fn()
    render(
      <TreeView
        nodes={nodes}
        defaultExpandedIds={["root"]}
        onExpandedIdsChange={onExpandedIdsChange}
        aria-label="Demo tree"
      />
    )

    const folder = screen.getByRole("treeitem", { name: /Folder/ })
    const chevron = within(folder).getByRole("button", { hidden: true })
    fireEvent.click(chevron)

    expect(onExpandedIdsChange).toHaveBeenCalled()
    const next = onExpandedIdsChange.mock.calls.at(-1)?.[0] as string[]
    expect(next).toContain("folder")
  })

  it("replaces selection in single mode", () => {
    const onSelectedIdsChange = vi.fn()
    render(
      <TreeView
        nodes={nodes}
        defaultExpandedIds={["root"]}
        defaultSelectedIds={["leaf"]}
        onSelectedIdsChange={onSelectedIdsChange}
        aria-label="Demo tree"
      />
    )

    fireEvent.click(screen.getByRole("treeitem", { name: /Folder/ }))
    expect(onSelectedIdsChange).toHaveBeenCalledWith(["folder"])
  })

  it("toggles selection in multiple mode", () => {
    const onSelectedIdsChange = vi.fn()
    render(
      <TreeView
        nodes={nodes}
        selectionMode="multiple"
        defaultExpandedIds={["root"]}
        defaultSelectedIds={["leaf"]}
        onSelectedIdsChange={onSelectedIdsChange}
        aria-label="Demo tree"
      />
    )

    fireEvent.click(screen.getByRole("treeitem", { name: /Folder/ }))
    expect(onSelectedIdsChange).toHaveBeenCalledWith(["leaf", "folder"])
  })

  it("does not select when selectionMode is none", () => {
    const onSelectedIdsChange = vi.fn()
    render(
      <TreeView
        nodes={nodes}
        selectionMode="none"
        defaultExpandedIds={["root"]}
        onSelectedIdsChange={onSelectedIdsChange}
        aria-label="Demo tree"
      />
    )

    fireEvent.click(screen.getByRole("treeitem", { name: /Leaf/ }))
    expect(onSelectedIdsChange).not.toHaveBeenCalled()
  })

  it("blocks interaction for disabled nodes and a disabled tree", () => {
    const onSelectedIdsChange = vi.fn()
    const { rerender } = render(
      <TreeView
        nodes={nodes}
        defaultExpandedIds={["root", "folder"]}
        onSelectedIdsChange={onSelectedIdsChange}
        aria-label="Demo tree"
      />
    )

    fireEvent.click(screen.getByRole("treeitem", { name: /File B/ }))
    expect(onSelectedIdsChange).not.toHaveBeenCalled()

    rerender(
      <TreeView
        nodes={nodes}
        disabled
        defaultExpandedIds={["root"]}
        onSelectedIdsChange={onSelectedIdsChange}
        aria-label="Demo tree"
      />
    )

    fireEvent.click(screen.getByRole("treeitem", { name: /Leaf/ }))
    expect(onSelectedIdsChange).not.toHaveBeenCalled()
  })

  it("moves focus with ArrowDown and expands with ArrowRight", () => {
    render(
      <TreeView
        nodes={nodes}
        defaultExpandedIds={["root"]}
        aria-label="Demo tree"
      />
    )

    const root = screen.getByRole("treeitem", { name: /Root/ })
    root.focus()
    fireEvent.keyDown(screen.getByRole("tree"), { key: "ArrowDown" })

    const folder = screen.getByRole("treeitem", { name: /Folder/ })
    expect(document.activeElement).toBe(folder)

    fireEvent.keyDown(screen.getByRole("tree"), { key: "ArrowRight" })
    expect(screen.getByText("File A")).toBeTruthy()
  })

  it("keeps controlled expansion under parent ownership", () => {
    function Harness() {
      const [expandedIds] = useState(["root"])
      return (
        <TreeView
          nodes={nodes}
          expandedIds={expandedIds}
          onExpandedIdsChange={() => undefined}
          aria-label="Demo tree"
        />
      )
    }

    render(<Harness />)
    expect(screen.getByText("Folder")).toBeTruthy()
    expect(screen.queryByText("File A")).toBeNull()

    const folder = screen.getByRole("treeitem", { name: /Folder/ })
    fireEvent.click(within(folder).getByRole("button", { hidden: true }))
    expect(screen.queryByText("File A")).toBeNull()
  })
})
