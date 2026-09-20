'use client';

import { useMemo } from "react";
import { cn } from "../../utils/cn";
import { Button } from "../Button";
import { Input } from "../../primitives/input";
import { Label } from "../../primitives/label";
import { DateRangePicker, type DateRangeValue } from "../DateRangePicker";
import { MultiSelect } from "../MultiSelect";
import { useControllableState } from "../../hooks/useControllableState";
import type { SelectOption } from "../Form/Select";

export type FilterValue = string | string[] | DateRangeValue | undefined;

export interface FilterField {
  id: string;
  label: string;
  type: "text" | "select" | "multiselect" | "daterange";
  options?: SelectOption[];
  placeholder?: string;
}

export interface FilterPanelProps {
  fields: FilterField[];
  value?: Record<string, FilterValue>;
  defaultValue?: Record<string, FilterValue>;
  onChange?: (value: Record<string, FilterValue>) => void;
  onApply?: (value: Record<string, FilterValue>) => void;
  onReset?: () => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  emptyText?: string;
  title?: string;
}

export function FilterPanel({
  fields,
  value,
  defaultValue = {},
  onChange,
  onApply,
  onReset,
  disabled = false,
  loading = false,
  className,
  emptyText = "No filters available",
  title = "Filters",
}: FilterPanelProps) {
  const [filters, setFilters] = useControllableState(value, defaultValue, onChange);
  const isDisabled = disabled || loading;

  const update = (id: string, next: FilterValue) => {
    setFilters((current) => ({ ...current, [id]: next }));
  };

  const hasFields = fields.length > 0;
  const appliedCount = useMemo(
    () => Object.values(filters).filter((entry) => {
      if (Array.isArray(entry)) return entry.length > 0;
      if (entry && typeof entry === "object") return Boolean(entry.from || entry.to);
      return Boolean(entry);
    }).length,
    [filters]
  );

  return (
    <section className={cn("space-y-4 rounded-lg border p-4", className)} aria-busy={loading || undefined}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">{title}</h3>
        <span className="text-xs text-muted-foreground">{appliedCount} active</span>
      </div>

      {!hasFields ? (
        <p className="text-sm text-muted-foreground">{emptyText}</p>
      ) : (
        <div className="space-y-4">
          {fields.map((field) => (
            <div key={field.id} className="space-y-2">
              <Label htmlFor={field.id}>{field.label}</Label>
              {field.type === "text" ? (
                <Input
                  id={field.id}
                  value={typeof filters[field.id] === "string" ? filters[field.id] as string : ""}
                  placeholder={field.placeholder}
                  disabled={isDisabled}
                  onChange={(event) => update(field.id, event.target.value)}
                />
              ) : null}
              {field.type === "select" ? (
                <select
                  id={field.id}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                  value={typeof filters[field.id] === "string" ? filters[field.id] as string : ""}
                  disabled={isDisabled}
                  onChange={(event) => update(field.id, event.target.value)}
                >
                  <option value="">{field.placeholder ?? "Select"}</option>
                  {(field.options ?? []).map((option) => (
                    <option key={String(option.value)} value={String(option.value)} disabled={option.disabled}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : null}
              {field.type === "multiselect" ? (
                <MultiSelect
                  id={field.id}
                  options={field.options ?? []}
                  value={Array.isArray(filters[field.id]) ? filters[field.id] as string[] : []}
                  onChange={(next) => update(field.id, next)}
                  disabled={isDisabled}
                  placeholder={field.placeholder}
                />
              ) : null}
              {field.type === "daterange" ? (
                <DateRangePicker
                  id={field.id}
                  value={(filters[field.id] as DateRangeValue | undefined) ?? {}}
                  onChange={(next) => update(field.id, next)}
                  disabled={isDisabled}
                  placeholder={field.placeholder}
                />
              ) : null}
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          disabled={isDisabled}
          onClick={() => {
            setFilters({});
            onReset?.();
          }}
        >
          Reset
        </Button>
        <Button type="button" loading={loading} disabled={isDisabled} onClick={() => onApply?.(filters)}>
          Apply
        </Button>
      </div>
    </section>
  );
}

FilterPanel.displayName = "FilterPanel";
