'use client';

import { Check, ChevronsUpDown, SquareCheck, Square, X } from "lucide-react";
import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import { cn } from "../../utils/cn";
import { Badge } from "../../primitives/badge";
import { Button } from "../../primitives/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../primitives/command";
import { Popover, PopoverContent, PopoverTrigger } from "../../primitives/popover";
import { useControllableState } from "../../hooks/useControllableState";
import type { SelectOption } from "../Form/Select";

/**
 * How the selected values are displayed in the trigger, and how the dropdown
 * options are rendered:
 * - `tags` (default): removable badge chips; options show a check when selected
 * - `comma`: plain comma-separated labels; options show a check when selected
 * - `checkbox`: trigger shows a "N selected" count; options render as checkbox rows
 * - `list`: trigger shows a collapsible list of checkbox rows; options are checkbox rows
 */
export type MultiSelectSelectionVariant = "tags" | "comma" | "checkbox" | "list";

export interface MultiSelectProps {
  options: SelectOption[];
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  /** Display + dropdown style for the selection. */
  selectionVariant?: MultiSelectSelectionVariant;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  id?: string;
  "aria-label"?: string;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
}

export function MultiSelect({
  options,
  value,
  defaultValue = [],
  onChange,
  placeholder = "Select options",
  searchPlaceholder = "Search...",
  emptyText = "No option found.",
  selectionVariant = "tags",
  disabled = false,
  loading = false,
  className,
  id,
  ...aria
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const [listExpanded, setListExpanded] = useState(false);
  const [selected, setSelected] = useControllableState(value, defaultValue, onChange);
  const isDisabled = disabled || loading;

  const selectedOptions = useMemo(
    () => options.filter((option) => selected.includes(String(option.value))),
    [options, selected]
  );

  const toggle = (optionValue: string) => {
    setSelected((current) =>
      current.includes(optionValue)
        ? current.filter((item) => item !== optionValue)
        : [...current, optionValue]
    );
  };

  const safeToggle = (optionValue: string) => {
    if (!isDisabled) toggle(optionValue);
  };

  // `checkbox` / `list` variants render checkbox-style rows in the dropdown;
  // `tags` / `comma` keep the classic check-icon rows.
  const checkboxRows = selectionVariant === "checkbox" || selectionVariant === "list";

  let triggerContent: ReactNode;
  if (loading) {
    triggerContent = "Loading…";
  } else if (selectedOptions.length === 0) {
    triggerContent = <span className="text-muted-foreground">{placeholder}</span>;
  } else if (selectionVariant === "comma") {
    triggerContent = (
      <span className="flex-1 truncate text-left">
        {selectedOptions.map((option) => option.label).join(", ")}
      </span>
    );
  } else if (selectionVariant === "checkbox") {
    triggerContent = (
      <span className="flex-1 text-left">
        {selectedOptions.length} selected
      </span>
    );
  } else if (selectionVariant === "list") {
    const hiddenCount = selectedOptions.length - 2;
    const visible = listExpanded ? selectedOptions : selectedOptions.slice(0, 2);
    triggerContent = (
      <span className="flex flex-1 flex-wrap items-center gap-1 text-left">
        {visible.map((option) => (
          <span
            key={String(option.value)}
            className="inline-flex items-center gap-1 rounded-md border border-input bg-muted/40 py-0.5 pl-1.5 pr-1 text-xs"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              safeToggle(String(option.value));
            }}
          >
            <SquareCheck className="h-3 w-3 text-primary" />
            {option.label}
            <X
              className="h-3 w-3 opacity-60"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                safeToggle(String(option.value));
              }}
            />
          </span>
        ))}
        {!listExpanded && hiddenCount > 0 && (
          <span
            className="inline-flex items-center rounded-md border border-input bg-muted/40 px-1.5 py-0.5 text-xs"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              setListExpanded(true);
            }}
          >
            +{hiddenCount}
          </span>
        )}
        {listExpanded && selectedOptions.length > 2 && (
          <span
            className="inline-flex items-center rounded-md px-1 py-0.5 text-xs text-muted-foreground"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              setListExpanded(false);
            }}
          >
            Collapse
          </span>
        )}
      </span>
    );
  } else {
    // `tags` — default
    triggerContent = (
      <span className="flex flex-1 flex-wrap gap-1 text-left">
        {selectedOptions.map((option) => (
          <Badge
            key={String(option.value)}
            variant="secondary"
            className="gap-1"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              safeToggle(String(option.value));
            }}
          >
            {option.label}
            <X className="h-3 w-3" />
          </Badge>
        ))}
      </span>
    );
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={id}
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-multiselectable
          aria-label={aria["aria-label"] ?? "Multi select"}
          aria-invalid={aria["aria-invalid"]}
          aria-describedby={aria["aria-describedby"]}
          aria-busy={loading || undefined}
          disabled={isDisabled}
          className={cn("h-auto min-h-10 w-full justify-between font-normal", className)}
        >
          {triggerContent}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[320px] p-0" align="start">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const optionValue = String(option.value);
                const isSelected = selected.includes(optionValue);
                return (
                  <CommandItem
                    key={optionValue}
                    value={option.label}
                    disabled={option.disabled}
                    onSelect={() => toggle(optionValue)}
                  >
                    {checkboxRows ? (
                      isSelected ? (
                        <SquareCheck className="mr-2 h-4 w-4 text-primary" />
                      ) : (
                        <Square className="mr-2 h-4 w-4 text-muted-foreground" />
                      )
                    ) : (
                      <Check className={cn("mr-2 h-4 w-4", isSelected ? "opacity-100" : "opacity-0")} />
                    )}
                    {option.label}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

MultiSelect.displayName = "MultiSelect";
