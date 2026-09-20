'use client';

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "../../utils/cn";
import { Button } from "../../primitives/button";
import { Calendar } from "../../primitives/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../../primitives/popover";
import { useControllableState } from "../../hooks/useControllableState";

export interface DateRangeValue {
  from?: Date;
  to?: Date;
}

export interface DateRangePickerProps {
  value?: DateRangeValue;
  defaultValue?: DateRangeValue;
  onChange?: (value: DateRangeValue) => void;
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  id?: string;
  "aria-label"?: string;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
}

function formatRange(range: DateRangeValue): string | undefined {
  if (!range.from) {
    return undefined;
  }

  if (!range.to) {
    return format(range.from, "PPP");
  }

  return `${format(range.from, "LLL dd, y")} – ${format(range.to, "LLL dd, y")}`;
}

export function DateRangePicker({
  value,
  defaultValue = {},
  onChange,
  placeholder = "Pick a date range",
  disabled = false,
  loading = false,
  className,
  id,
  ...aria
}: DateRangePickerProps) {
  const [range, setRange] = useControllableState(value, defaultValue, onChange);
  const label = formatRange(range);
  const isDisabled = disabled || loading;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id={id}
          type="button"
          variant="outline"
          disabled={isDisabled}
          aria-label={aria["aria-label"] ?? "Date range"}
          aria-invalid={aria["aria-invalid"]}
          aria-describedby={aria["aria-describedby"]}
          aria-busy={loading || undefined}
          className={cn(
            "w-full justify-start text-left font-normal",
            !label && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {loading ? "Loading…" : label ?? placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          selected={{ from: range.from, to: range.to }}
          onSelect={(next) => setRange({ from: next?.from, to: next?.to })}
          numberOfMonths={2}
          disabled={isDisabled}
        />
      </PopoverContent>
    </Popover>
  );
}

DateRangePicker.displayName = "DateRangePicker";
