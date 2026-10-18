"use client"

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react"
import { ChevronRight } from "lucide-react"
import { cn } from "../../utils/cn"
import { Checkbox } from "../Checkbox"
import { useControllableState } from "../../hooks/useControllableState"
import {
  findNodeById,
  flattenVisibleNodes,
  getFocusableVisibleNodes,
  type FlatTreeNode,
  type TreeNode,
  type TreeNodeId,
} from "./treeUtils"

export type { TreeNode, TreeNodeId }

export type TreeSelectionMode = "none" | "single" | "multiple"

export interface TreeViewProps {
  nodes: TreeNode[]
  className?: string
  disabled?: boolean
  selectionMode?: TreeSelectionMode
  selectedIds?: TreeNodeId[]
  defaultSelectedIds?: TreeNodeId[]
  onSelectedIdsChange?: (ids: TreeNodeId[]) => void
  expandedIds?: TreeNodeId[]
  defaultExpandedIds?: TreeNodeId[]
  onExpandedIdsChange?: (ids: TreeNodeId[]) => void
  onNodeActivate?: (node: TreeNode) => void
  showCheckboxes?: boolean
  indentPx?: number
  "aria-label"?: string
  "aria-labelledby"?: string
  renderLabel?: (node: TreeNode) => ReactNode
}

export function TreeView({
  nodes,
  className,
  disabled = false,
  selectionMode = "single",
  selectedIds,
  defaultSelectedIds = [],
  onSelectedIdsChange,
  expandedIds,
  defaultExpandedIds = [],
  onExpandedIdsChange,
  onNodeActivate,
  showCheckboxes,
  indentPx = 16,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  renderLabel,
}: TreeViewProps) {
  const [expanded, setExpanded] = useControllableState(
    expandedIds,
    defaultExpandedIds,
    onExpandedIdsChange
  )
  const [selected, setSelected] = useControllableState(
    selectedIds,
    defaultSelectedIds,
    onSelectedIdsChange
  )

  const expandedSet = useMemo(() => new Set(expanded), [expanded])
  const selectedSet = useMemo(() => new Set(selected), [selected])

  const visible = useMemo(
    () => flattenVisibleNodes(nodes, expandedSet),
    [nodes, expandedSet]
  )
  const focusable = useMemo(
    () => getFocusableVisibleNodes(visible, disabled),
    [visible, disabled]
  )

  const [focusedId, setFocusedId] = useState<TreeNodeId | null>(null)
  const itemRefs = useRef(new Map<TreeNodeId, HTMLDivElement>())
  const shouldMoveDomFocus = useRef(false)

  useEffect(() => {
    if (focusedId && focusable.some((item) => item.node.id === focusedId)) return
    setFocusedId(focusable[0]?.node.id ?? null)
  }, [focusable, focusedId])

  useEffect(() => {
    if (!focusedId || !shouldMoveDomFocus.current) return
    shouldMoveDomFocus.current = false
    itemRefs.current.get(focusedId)?.focus()
  }, [focusedId])

  const focusNode = useCallback((id: TreeNodeId) => {
    shouldMoveDomFocus.current = true
    setFocusedId(id)
  }, [])

  const checkboxesVisible =
    showCheckboxes ?? selectionMode === "multiple"

  const toggleExpanded = useCallback(
    (id: TreeNodeId) => {
      if (disabled) return
      setExpanded((current) =>
        current.includes(id)
          ? current.filter((item) => item !== id)
          : [...current, id]
      )
    },
    [disabled, setExpanded]
  )

  const selectNode = useCallback(
    (id: TreeNodeId) => {
      if (disabled || selectionMode === "none") return
      const node = findNodeById(nodes, id)
      if (!node || node.disabled) return

      if (selectionMode === "single") {
        setSelected([id])
        return
      }

      setSelected((current) =>
        current.includes(id)
          ? current.filter((item) => item !== id)
          : [...current, id]
      )
    },
    [disabled, nodes, selectionMode, setSelected]
  )

  const activateNode = useCallback(
    (id: TreeNodeId) => {
      if (disabled) return
      const node = findNodeById(nodes, id)
      if (!node || node.disabled) return
      onNodeActivate?.(node)
    },
    [disabled, nodes, onNodeActivate]
  )

  const moveFocus = useCallback(
    (nextIndex: number) => {
      if (focusable.length === 0) return
      const clamped = Math.max(0, Math.min(focusable.length - 1, nextIndex))
      focusNode(focusable[clamped]!.node.id)
    },
    [focusable, focusNode]
  )

  const focusIndex = focusedId
    ? focusable.findIndex((item) => item.node.id === focusedId)
    : -1

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (disabled || focusable.length === 0 || focusedId == null) return

    const current = focusable[focusIndex]
    if (!current) return

    switch (event.key) {
      case "ArrowDown": {
        event.preventDefault()
        moveFocus(focusIndex + 1)
        break
      }
      case "ArrowUp": {
        event.preventDefault()
        moveFocus(focusIndex - 1)
        break
      }
      case "Home": {
        event.preventDefault()
        moveFocus(0)
        break
      }
      case "End": {
        event.preventDefault()
        moveFocus(focusable.length - 1)
        break
      }
      case "ArrowRight": {
        event.preventDefault()
        if (current.isBranch && !expandedSet.has(current.node.id)) {
          toggleExpanded(current.node.id)
          break
        }
        if (current.isBranch && expandedSet.has(current.node.id)) {
          const firstChild = focusable.find(
            (item, index) =>
              index > focusIndex && item.parentId === current.node.id
          )
          if (firstChild) focusNode(firstChild.node.id)
        }
        break
      }
      case "ArrowLeft": {
        event.preventDefault()
        if (current.isBranch && expandedSet.has(current.node.id)) {
          toggleExpanded(current.node.id)
          break
        }
        if (current.parentId) {
          // Only move focus to a focusable parent — disabled ancestors are
          // skipped so focus does not jump to the first tree node.
          const parent = focusable.find((item) => item.node.id === current.parentId)
          if (parent) focusNode(parent.node.id)
        }
        break
      }
      case "Enter": {
        event.preventDefault()
        if (selectionMode === "none" && current.isBranch) {
          toggleExpanded(current.node.id)
        }
        activateNode(current.node.id)
        break
      }
      case " ": {
        event.preventDefault()
        if (selectionMode === "none") {
          if (current.isBranch) toggleExpanded(current.node.id)
          break
        }
        selectNode(current.node.id)
        break
      }
      default:
        break
    }
  }

  const renderItems = (items: FlatTreeNode[], startIndex = 0): ReactNode[] => {
    const elements: ReactNode[] = []
    let index = startIndex

    while (index < items.length) {
      const item = items[index]!
      const { node, level, isBranch } = item
      const isExpanded = expandedSet.has(node.id)
      const isSelected = selectedSet.has(node.id)
      const isFocused = focusedId === node.id
      const nodeDisabled = disabled || Boolean(node.disabled)
      const selectionEnabled = selectionMode !== "none"

      elements.push(
        <div
          key={node.id}
          ref={(element) => {
            if (element) itemRefs.current.set(node.id, element)
            else itemRefs.current.delete(node.id)
          }}
          role="treeitem"
          aria-level={level}
          aria-expanded={isBranch ? isExpanded : undefined}
          aria-selected={selectionEnabled ? isSelected : undefined}
          aria-disabled={nodeDisabled || undefined}
          tabIndex={isFocused && !nodeDisabled ? 0 : -1}
          data-disabled={nodeDisabled || undefined}
          data-selected={isSelected || undefined}
          className={cn(
            "flex w-full items-center gap-1 rounded-md px-2 py-1.5 text-sm outline-none transition-colors",
            "hover:bg-accent hover:text-accent-foreground",
            "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            isSelected && selectionEnabled && "bg-accent font-medium text-accent-foreground",
            nodeDisabled && "pointer-events-none opacity-50"
          )}
          style={{ paddingLeft: (level - 1) * indentPx + 8 }}
          onClick={() => {
            if (nodeDisabled) return
            focusNode(node.id)
            if (selectionEnabled) selectNode(node.id)
          }}
          onDoubleClick={() => {
            if (nodeDisabled) return
            activateNode(node.id)
          }}
        >
          {isBranch ? (
            <button
              type="button"
              tabIndex={-1}
              aria-hidden
              disabled={nodeDisabled}
              className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-sm hover:bg-accent"
              onClick={(event) => {
                event.stopPropagation()
                if (nodeDisabled) return
                focusNode(node.id)
                toggleExpanded(node.id)
              }}
            >
              <ChevronRight
                className={cn(
                  "h-3.5 w-3.5 shrink-0 transition-transform",
                  isExpanded && "rotate-90"
                )}
              />
            </button>
          ) : (
            <span className="inline-flex h-5 w-5 shrink-0" aria-hidden />
          )}

          {checkboxesVisible && selectionMode === "multiple" ? (
            <Checkbox
              checked={isSelected}
              disabled={nodeDisabled}
              tabIndex={-1}
              aria-hidden
              className="mr-1"
              onCheckedChange={() => {
                if (nodeDisabled) return
                focusNode(node.id)
                selectNode(node.id)
              }}
              onClick={(event) => event.stopPropagation()}
            />
          ) : null}

          {node.icon ? (
            <span className="mr-1 inline-flex shrink-0 items-center" aria-hidden>
              {node.icon}
            </span>
          ) : null}

          <span className="truncate">{renderLabel ? renderLabel(node) : node.label}</span>
        </div>
      )

      index += 1

      if (isBranch && isExpanded) {
        const childStart = index
        let childEnd = index
        while (childEnd < items.length && items[childEnd]!.level > level) {
          childEnd += 1
        }
        if (childEnd > childStart) {
          elements.push(
            <div key={`${node.id}-group`} role="group">
              {renderItems(items.slice(childStart, childEnd), 0)}
            </div>
          )
          index = childEnd
        }
      }
    }

    return elements
  }

  return (
    <div
      role="tree"
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-disabled={disabled || undefined}
      aria-multiselectable={selectionMode === "multiple" || undefined}
      className={cn("space-y-0.5 outline-none", className)}
      onKeyDown={onKeyDown}
    >
      {renderItems(visible)}
    </div>
  )
}

TreeView.displayName = "TreeView"
