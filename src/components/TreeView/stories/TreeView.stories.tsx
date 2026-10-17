import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { File, Folder } from "lucide-react"
import { TreeView, type TreeNode } from "../TreeView"

const fileSystem: TreeNode[] = [
  {
    id: "src",
    label: "src",
    children: [
      {
        id: "components",
        label: "components",
        children: [
          { id: "button-tsx", label: "Button.tsx" },
          { id: "input-tsx", label: "Input.tsx" },
        ],
      },
      { id: "index-ts", label: "index.ts" },
    ],
  },
  {
    id: "package",
    label: "package.json",
  },
]

const orgChart: TreeNode[] = [
  {
    id: "ceo",
    label: "Alex Rivera — CEO",
    children: [
      {
        id: "eng",
        label: "Engineering",
        children: [
          { id: "fe", label: "Frontend" },
          { id: "be", label: "Backend" },
        ],
      },
      {
        id: "ops",
        label: "Operations",
        children: [{ id: "support", label: "Support" }],
      },
    ],
  },
]

const withIcons: TreeNode[] = [
  {
    id: "docs",
    label: "docs",
    icon: <Folder className="h-4 w-4 text-muted-foreground" />,
    children: [
      {
        id: "readme",
        label: "README.md",
        icon: <File className="h-4 w-4 text-muted-foreground" />,
      },
      {
        id: "guide",
        label: "guide.md",
        icon: <File className="h-4 w-4 text-muted-foreground" />,
      },
    ],
  },
]

const disabledNodes: TreeNode[] = [
  {
    id: "root",
    label: "Projects",
    children: [
      { id: "active", label: "Active" },
      { id: "archived", label: "Archived", disabled: true },
      {
        id: "shared",
        label: "Shared",
        children: [
          { id: "team", label: "Team folder" },
          { id: "locked", label: "Locked", disabled: true },
        ],
      },
    ],
  },
]

const deepNesting: TreeNode[] = [
  {
    id: "l1",
    label: "Level 1",
    children: [
      {
        id: "l2",
        label: "Level 2",
        children: [
          {
            id: "l3",
            label: "Level 3",
            children: [
              {
                id: "l4",
                label: "Level 4",
                children: [{ id: "l5", label: "Level 5 leaf" }],
              },
            ],
          },
        ],
      },
    ],
  },
]

const meta = {
  title: "Components/TreeView",
  component: TreeView,
  args: {
    nodes: fileSystem,
    defaultExpandedIds: ["src", "components"],
    "aria-label": "File tree",
  },
} satisfies Meta<typeof TreeView>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Controlled: Story = {
  render: function Render() {
    const [expandedIds, setExpandedIds] = useState(["src"])
    const [selectedIds, setSelectedIds] = useState<string[]>(["index-ts"])
    return (
      <TreeView
        nodes={fileSystem}
        aria-label="Controlled file tree"
        expandedIds={expandedIds}
        onExpandedIdsChange={setExpandedIds}
        selectedIds={selectedIds}
        onSelectedIdsChange={setSelectedIds}
      />
    )
  },
}

export const MultipleSelection: Story = {
  args: {
    selectionMode: "multiple",
    defaultExpandedIds: ["src", "components"],
    defaultSelectedIds: ["button-tsx"],
  },
}

export const SelectionNone: Story = {
  args: {
    nodes: orgChart,
    selectionMode: "none",
    defaultExpandedIds: ["ceo", "eng"],
    "aria-label": "Organization",
  },
}

export const DisabledNodes: Story = {
  args: {
    nodes: disabledNodes,
    defaultExpandedIds: ["root", "shared"],
    "aria-label": "Projects",
  },
}

export const WithIcons: Story = {
  args: {
    nodes: withIcons,
    defaultExpandedIds: ["docs"],
    "aria-label": "Docs",
  },
}

export const DeepNesting: Story = {
  args: {
    nodes: deepNesting,
    defaultExpandedIds: ["l1", "l2", "l3", "l4"],
    "aria-label": "Deep tree",
  },
}
