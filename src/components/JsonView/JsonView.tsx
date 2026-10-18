"use client"

import { useState, type ReactNode } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import { cn } from "../../utils/cn"

export interface JsonViewProps {
  data: unknown
  className?: string
  defaultExpanded?: boolean
  rootLabel?: string
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}

function Node({
  label,
  value,
  depth,
  defaultExpanded,
  ancestors,
}: {
  label?: string
  value: unknown
  depth: number
  defaultExpanded: boolean
  ancestors: object[]
}) {
  const expandable = Array.isArray(value) || isPlainObject(value)
  const [open, setOpen] = useState(defaultExpanded && depth < 2)

  if (!expandable) {
    return (
      <div className="font-mono text-sm leading-6">
        {label !== undefined ? (
          <span className="text-sky-700 dark:text-sky-300">"{label}"</span>
        ) : null}
        {label !== undefined ? <span className="text-muted-foreground">: </span> : null}
        <Literal value={value} />
      </div>
    )
  }

  if (ancestors.includes(value)) {
    return (
      <div className="font-mono text-sm leading-6 text-muted-foreground">
        {label !== undefined ? (
          <>
            <span className="text-sky-700 dark:text-sky-300">"{label}"</span>
            <span>: </span>
          </>
        ) : null}
        [Circular]
      </div>
    )
  }

  const nextAncestors = [...ancestors, value]
  const entries = Array.isArray(value)
    ? value.map((item, index) => [String(index), item] as const)
    : Object.entries(value)
  const brackets = Array.isArray(value) ? (["[", "]"] as const) : (["{", "}"] as const)

  return (
    <div className="font-mono text-sm">
      <button
        type="button"
        className="inline-flex items-center gap-1 rounded-sm hover:bg-accent"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        {open ? (
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
        ) : (
          <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
        )}
        {label !== undefined ? (
          <span className="text-sky-700 dark:text-sky-300">"{label}"</span>
        ) : null}
        {label !== undefined ? <span className="text-muted-foreground">: </span> : null}
        <span className="text-muted-foreground">
          {brackets[0]}
          {!open ? ` ${entries.length} ${Array.isArray(value) ? "items" : "keys"} ${brackets[1]}` : null}
        </span>
      </button>
      {open ? (
        <div className="ml-4 border-l border-border pl-3">
          {entries.map(([key, child]) => (
            <Node
              key={key}
              label={Array.isArray(value) ? undefined : key}
              value={child}
              depth={depth + 1}
              defaultExpanded={defaultExpanded}
              ancestors={nextAncestors}
            />
          ))}
          <div className="text-muted-foreground">{brackets[1]}</div>
        </div>
      ) : null}
    </div>
  )
}

function Literal({ value }: { value: unknown }): ReactNode {
  if (value === null) return <span className="text-violet-600">null</span>
  if (typeof value === "string")
    return <span className="text-emerald-700 dark:text-emerald-400">"{value}"</span>
  if (typeof value === "number") return <span className="text-amber-700">{value}</span>
  if (typeof value === "boolean") return <span className="text-violet-600">{String(value)}</span>
  return <span className="text-muted-foreground">{String(value)}</span>
}

export function JsonView({
  data,
  className,
  defaultExpanded = true,
  rootLabel,
}: JsonViewProps) {
  return (
    <div className={cn("rounded-md border bg-card p-3", className)}>
      <Node
        label={rootLabel}
        value={data}
        depth={0}
        defaultExpanded={defaultExpanded}
        ancestors={[]}
      />
    </div>
  )
}

JsonView.displayName = "JsonView"
