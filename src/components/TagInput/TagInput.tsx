"use client"

import { useState, type KeyboardEvent } from "react"
import { X } from "lucide-react"
import { cn } from "../../utils/cn"
import { Badge } from "../../primitives/badge"
import { useControllableState } from "../../hooks/useControllableState"

export interface TagInputProps {
  value?: string[]
  defaultValue?: string[]
  onChange?: (value: string[]) => void
  onBlur?: () => void
  placeholder?: string
  disabled?: boolean
  loading?: boolean
  className?: string
  id?: string
  "aria-label"?: string
  "aria-invalid"?: boolean
  "aria-describedby"?: string
}

export function TagInput({
  value,
  defaultValue = [],
  onChange,
  onBlur,
  placeholder = "Add a tag and press Enter",
  disabled = false,
  loading = false,
  className,
  id,
  ...aria
}: TagInputProps) {
  const [tags, setTags] = useControllableState(value, defaultValue, onChange)
  const [draft, setDraft] = useState("")
  const isDisabled = disabled || loading

  const addTag = (raw: string) => {
    const next = raw.trim()
    if (!next || tags.includes(next) || isDisabled) return
    setTags([...tags, next])
    setDraft("")
  }

  const removeTag = (tag: string) => {
    if (isDisabled) return
    setTags(tags.filter((item) => item !== tag))
  }

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault()
      addTag(draft)
      return
    }
    if (event.key === "Backspace" && draft.length === 0 && tags.length > 0) {
      event.preventDefault()
      removeTag(tags[tags.length - 1]!)
    }
  }

  return (
    <div
      className={cn(
        "flex min-h-10 w-full flex-wrap items-center gap-1 rounded-md border border-input bg-card px-2 py-1.5",
        "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
        isDisabled && "cursor-not-allowed bg-muted opacity-100",
        aria["aria-invalid"] && "border-destructive",
        className
      )}
    >
      {tags.map((tag) => (
        <Badge key={tag} variant="secondary" className="gap-1">
          {tag}
          <button
            type="button"
            aria-label={`Remove ${tag}`}
            disabled={isDisabled}
            className="rounded-sm hover:bg-accent"
            onClick={(event) => {
              event.preventDefault()
              event.stopPropagation()
              removeTag(tag)
            }}
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}
      <input
        id={id}
        type="text"
        value={draft}
        disabled={isDisabled}
        placeholder={tags.length === 0 ? (loading ? "Loading…" : placeholder) : undefined}
        aria-label={aria["aria-label"] ?? "Tag input"}
        aria-invalid={aria["aria-invalid"]}
        aria-describedby={aria["aria-describedby"]}
        aria-busy={loading || undefined}
        className="min-w-[8rem] flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={onKeyDown}
        onBlur={() => {
          addTag(draft)
          onBlur?.()
        }}
      />
    </div>
  )
}

TagInput.displayName = "TagInput"
