"use client"

import { Search, X } from "lucide-react"
import { cn } from "../../utils/cn"
import { useControllableState } from "../../hooks/useControllableState"
import { useDebounce } from "../../hooks/useDebounce"
import { useEffect, useRef } from "react"

export interface SearchInputProps {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  onSearchChange?: (value: string) => void
  debounceMs?: number
  placeholder?: string
  disabled?: boolean
  className?: string
  id?: string
  "aria-label"?: string
}

export function SearchInput({
  value,
  defaultValue = "",
  onChange,
  onSearchChange,
  debounceMs = 300,
  placeholder = "Search…",
  disabled = false,
  className,
  id,
  "aria-label": ariaLabel = "Search",
}: SearchInputProps) {
  const [query, setQuery] = useControllableState(value, defaultValue, onChange)
  const debounced = useDebounce(query, debounceMs)
  const onSearchChangeRef = useRef(onSearchChange)
  const skipInitial = useRef(true)

  useEffect(() => {
    onSearchChangeRef.current = onSearchChange
  })

  useEffect(() => {
    if (skipInitial.current) {
      skipInitial.current = false
      return
    }
    onSearchChangeRef.current?.(debounced)
  }, [debounced])

  return (
    <div
      className={cn(
        "relative flex h-10 w-full items-center rounded-md border border-input bg-card",
        "focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
        disabled && "bg-muted opacity-100",
        className
      )}
    >
      <Search className="ml-3 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
      <input
        id={id}
        type="search"
        value={query}
        disabled={disabled}
        placeholder={placeholder}
        aria-label={ariaLabel}
        className="h-full w-full bg-transparent px-2 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"
        onChange={(event) => setQuery(event.target.value)}
      />
      {query ? (
        <button
          type="button"
          aria-label="Clear search"
          disabled={disabled}
          className="mr-2 rounded-sm p-1 hover:bg-accent disabled:opacity-50"
          onClick={() => setQuery("")}
        >
          <X className="h-3.5 w-3.5" />
        </button>
      ) : null}
    </div>
  )
}

SearchInput.displayName = "SearchInput"
