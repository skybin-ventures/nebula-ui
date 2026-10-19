"use client"

import { useContext, useLayoutEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import {
  useController,
  useFormContext as useRHFFormContext,
  type FieldPath,
  type FieldValues,
} from "react-hook-form"
import type { FormControl } from "./formControl"
import { cn } from "../../utils/cn"
import { Button } from "../../primitives/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../primitives/command"
import { Popover, PopoverContent, PopoverTrigger } from "../../primitives/popover"
import { FormConfigContext, type FieldValidationRules, type FormConfig } from "./context"
import { FieldLayout } from "./FieldLayout"

export interface AutocompleteSuggestion {
  value: string
  label: string
  disabled?: boolean
}

export interface FormAutocompleteProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName
  label?: string
  helperText?: string
  showError?: boolean
  error?: string
  fullWidth?: boolean
  disabled?: boolean
  className?: string
  id?: string
  control?: FormControl<TFieldValues>
  required?: boolean | string
  validate?: (value: unknown) => boolean | string | Promise<boolean | string>
  /** External suggestions (filtered by the consumer or shown as-is). */
  suggestions: AutocompleteSuggestion[]
  placeholder?: string
  searchPlaceholder?: string
  emptyText?: string
  onQueryChange?: (query: string) => void
}

export function FormAutocomplete<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  label,
  helperText,
  showError = true,
  error: customError,
  fullWidth = true,
  disabled,
  className,
  id: providedId,
  control: externalControl,
  required,
  validate,
  suggestions,
  placeholder = "Select…",
  searchPlaceholder = "Search…",
  emptyText = "No results.",
  onQueryChange,
}: FormAutocompleteProps<TFieldValues, TName>) {
  const generatedId = useId()
  const inputId = providedId ?? generatedId
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [highlight, setHighlight] = useState(0)
  const [highlightResetKey, setHighlightResetKey] = useState(`${open}:${query}`)
  const listRef = useRef<HTMLDivElement>(null)
  const nextHighlightResetKey = `${open}:${query}`
  if (nextHighlightResetKey !== highlightResetKey) {
    setHighlightResetKey(nextHighlightResetKey)
    setHighlight(0)
  }
  const formConfigContext = useContext(FormConfigContext)
  const formConfig: FormConfig = formConfigContext ?? {}
  const rhfContext = useRHFFormContext<TFieldValues>()
  const control = externalControl ?? rhfContext?.control

  useLayoutEffect(() => {
    if (!formConfigContext?.registerFieldValidation) return
    const rules: FieldValidationRules = {}
    if (required !== undefined) rules.required = required
    if (validate !== undefined) rules.validate = validate
    formConfigContext.registerFieldValidation({
      name: name as string,
      type: "string",
      rules,
    })
    return () => formConfigContext.unregisterFieldValidation?.(name as string)
  }, [formConfigContext, name, required, validate])

  const { field, fieldState } = useController<TFieldValues, TName>({ name, control })
  const errorMessage = customError ?? fieldState.error?.message
  const effectiveDisabled = disabled ?? formConfig.disabled

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return suggestions
    return suggestions.filter(
      (item) =>
        item.label.toLowerCase().includes(q) || item.value.toLowerCase().includes(q)
    )
  }, [suggestions, query])

  const selected = suggestions.find((item) => item.value === field.value)

  const pick = (value: string) => {
    field.onChange(value)
    setOpen(false)
    setQuery("")
    field.onBlur()
  }

  const onTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (effectiveDisabled) return
    if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      setOpen(true)
    }
  }

  const onListKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault()
      setHighlight((h) => Math.min(filtered.length - 1, h + 1))
    } else if (event.key === "ArrowUp") {
      event.preventDefault()
      setHighlight((h) => Math.max(0, h - 1))
    } else if (event.key === "Enter") {
      event.preventDefault()
      const item = filtered[highlight]
      if (item && !item.disabled) pick(item.value)
    } else if (event.key === "Escape") {
      event.preventDefault()
      setOpen(false)
    }
  }

  return (
    <FieldLayout
      inputId={inputId}
      label={label}
      required={!!required}
      helperText={helperText}
      errorMessage={showError ? errorMessage : undefined}
      showError={showError}
      fullWidth={fullWidth}
      formConfig={formConfig}
    >
      <Popover
        open={open}
        onOpenChange={(next) => {
          setOpen(next)
          if (!next) field.onBlur()
        }}
      >
        <PopoverTrigger asChild>
          <Button
            id={inputId}
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-invalid={!!errorMessage}
            aria-describedby={
              errorMessage ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
            }
            disabled={effectiveDisabled}
            onKeyDown={onTriggerKeyDown}
            onBlur={field.onBlur}
            className={cn(
              "w-full justify-between font-normal",
              !selected && "text-muted-foreground",
              className
            )}
          >
            {selected?.label ?? placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
          <Command shouldFilter={false}>
            <CommandInput
              placeholder={searchPlaceholder}
              value={query}
              onValueChange={(next) => {
                setQuery(next)
                onQueryChange?.(next)
              }}
            />
            <CommandList ref={listRef} onKeyDown={onListKeyDown}>
              <CommandEmpty>{emptyText}</CommandEmpty>
              <CommandGroup>
                {filtered.map((item, index) => (
                  <CommandItem
                    key={item.value}
                    value={item.value}
                    disabled={item.disabled}
                    data-highlighted={index === highlight || undefined}
                    className={cn(index === highlight && "bg-accent")}
                    onSelect={() => {
                      if (!item.disabled) pick(item.value)
                    }}
                    onMouseEnter={() => setHighlight(index)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        field.value === item.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {item.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </FieldLayout>
  )
}

FormAutocomplete.displayName = "FormAutocomplete"
