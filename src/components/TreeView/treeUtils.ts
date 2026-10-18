import type { ReactNode } from "react"

export type TreeNodeId = string

export interface TreeNode {
  id: TreeNodeId
  label: string
  children?: TreeNode[]
  disabled?: boolean
  icon?: ReactNode
  /** Optional leaf hint; missing/empty children are treated as leaves unless isLeaf is false */
  isLeaf?: boolean
}

export interface FlatTreeNode {
  node: TreeNode
  level: number
  parentId: TreeNodeId | null
  isBranch: boolean
}

export function isBranchNode(node: TreeNode): boolean {
  if (node.isLeaf === true) return false
  if (node.isLeaf === false) return true
  return Boolean(node.children && node.children.length > 0)
}

export function buildParentMap(nodes: TreeNode[]): Map<TreeNodeId, TreeNodeId | null> {
  const map = new Map<TreeNodeId, TreeNodeId | null>()
  const seen = new Set<TreeNodeId>()

  const walk = (list: TreeNode[], parentId: TreeNodeId | null) => {
    for (const node of list) {
      if (seen.has(node.id)) continue
      seen.add(node.id)
      map.set(node.id, parentId)
      if (node.children?.length) {
        walk(node.children, node.id)
      }
    }
  }

  walk(nodes, null)
  return map
}

export function findNodeById(nodes: TreeNode[], id: TreeNodeId): TreeNode | undefined {
  const seen = new Set<TreeNodeId>()

  const walk = (list: TreeNode[]): TreeNode | undefined => {
    for (const node of list) {
      if (seen.has(node.id)) continue
      seen.add(node.id)
      if (node.id === id) return node
      if (node.children?.length) {
        const found = walk(node.children)
        if (found) return found
      }
    }
    return undefined
  }

  return walk(nodes)
}

/** Depth-first list of nodes that are currently visible given expanded branch ids. */
export function flattenVisibleNodes(
  nodes: TreeNode[],
  expandedIds: ReadonlySet<TreeNodeId> | ReadonlyArray<TreeNodeId>,
  parentId: TreeNodeId | null = null,
  level = 1,
  seen: Set<TreeNodeId> = new Set()
): FlatTreeNode[] {
  const expanded =
    expandedIds instanceof Set ? expandedIds : new Set(expandedIds)
  const result: FlatTreeNode[] = []

  for (const node of nodes) {
    if (seen.has(node.id)) continue
    seen.add(node.id)

    const isBranch = isBranchNode(node)
    result.push({ node, level, parentId, isBranch })

    if (isBranch && expanded.has(node.id) && node.children?.length) {
      result.push(
        ...flattenVisibleNodes(node.children, expanded, node.id, level + 1, seen)
      )
    }
  }

  return result
}

/** Focusable visible nodes: skips disabled nodes. */
export function getFocusableVisibleNodes(
  flat: FlatTreeNode[],
  treeDisabled = false
): FlatTreeNode[] {
  if (treeDisabled) return []
  return flat.filter((item) => !item.node.disabled)
}
