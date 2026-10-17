import { describe, expect, it } from "vitest"
import {
  buildParentMap,
  findNodeById,
  flattenVisibleNodes,
  getFocusableVisibleNodes,
  isBranchNode,
  type TreeNode,
} from "./treeUtils"

const fixture: TreeNode[] = [
  {
    id: "root",
    label: "Root",
    children: [
      {
        id: "a",
        label: "A",
        children: [
          { id: "a1", label: "A1" },
          { id: "a2", label: "A2", disabled: true },
        ],
      },
      { id: "b", label: "B" },
    ],
  },
]

describe("isBranchNode", () => {
  it("treats nodes with children as branches", () => {
    expect(isBranchNode(fixture[0]!)).toBe(true)
    expect(isBranchNode({ id: "x", label: "X" })).toBe(false)
  })

  it("respects isLeaf overrides", () => {
    expect(isBranchNode({ id: "x", label: "X", isLeaf: true, children: [{ id: "y", label: "Y" }] })).toBe(false)
    expect(isBranchNode({ id: "x", label: "X", isLeaf: false })).toBe(true)
  })
})

describe("buildParentMap", () => {
  it("maps each node to its parent id", () => {
    const map = buildParentMap(fixture)
    expect(map.get("root")).toBeNull()
    expect(map.get("a")).toBe("root")
    expect(map.get("a1")).toBe("a")
    expect(map.get("b")).toBe("root")
  })
})

describe("findNodeById", () => {
  it("finds nested nodes", () => {
    expect(findNodeById(fixture, "a1")?.label).toBe("A1")
    expect(findNodeById(fixture, "missing")).toBeUndefined()
  })
})

describe("flattenVisibleNodes", () => {
  it("returns only roots when nothing is expanded", () => {
    const flat = flattenVisibleNodes(fixture, [])
    expect(flat.map((item) => item.node.id)).toEqual(["root"])
    expect(flat[0]?.level).toBe(1)
  })

  it("includes children of expanded ancestors in depth-first order", () => {
    const flat = flattenVisibleNodes(fixture, ["root", "a"])
    expect(flat.map((item) => [item.node.id, item.level])).toEqual([
      ["root", 1],
      ["a", 2],
      ["a1", 3],
      ["a2", 3],
      ["b", 2],
    ])
  })

  it("does not include children when a branch is collapsed", () => {
    const flat = flattenVisibleNodes(fixture, ["root"])
    expect(flat.map((item) => item.node.id)).toEqual(["root", "a", "b"])
  })
})

describe("getFocusableVisibleNodes", () => {
  it("skips disabled nodes and returns empty when the tree is disabled", () => {
    const flat = flattenVisibleNodes(fixture, ["root", "a"])
    expect(getFocusableVisibleNodes(flat).map((item) => item.node.id)).toEqual([
      "root",
      "a",
      "a1",
      "b",
    ])
    expect(getFocusableVisibleNodes(flat, true)).toEqual([])
  })
})
