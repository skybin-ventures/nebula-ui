'use client';

import { Check, ChevronsUpDown, X } from "lucide-react";
import { useMemo, useState } from "react";
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

export interface MultiSelectProps {
  options: SelectOption[];
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
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
  disabled = false,
  loading = false,
  className,
  id,
  ...aria
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);
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
          <span className="flex flex-1 flex-wrap gap-1 text-left">
            {loading ? (
              "Loading…"
            ) : selectedOptions.length > 0 ? (
              selectedOptions.map((option) => (
                <Badge
                  key={String(option.value)}
                  variant="secondary"
                  className="gap-1"
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    if (!isDisabled) toggle(String(option.value));
                  }}
                >
                  {option.label}
                  <X className="h-3 w-3" />
                </Badge>
              ))
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </span>
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
                    <Check className={cn("mr-2 h-4 w-4", isSelected ? "opacity-100" : "opacity-0")} />
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
