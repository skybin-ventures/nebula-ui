'use client';

import { setHours, setMinutes, startOfDay } from "date-fns";
import { cn } from "../../utils/cn";
import { Button } from "../../primitives/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../primitives/select";

export type DayPeriod = "AM" | "PM";

export interface TimePickerProps {
  value?: Date;
  onChange: (date: Date) => void;
  onClear?: () => void;
  minuteStep?: number;
  disabled?: boolean;
  className?: string;
}

function getHour12(date: Date): number {
  const hour = date.getHours() % 12;
  return hour === 0 ? 12 : hour;
}

function getPeriod(date: Date): DayPeriod {
  return date.getHours() >= 12 ? "PM" : "AM";
}

function toHours24(hour12: number, period: DayPeriod): number {
  const hour = hour12 % 12;
  return period === "PM" ? hour + 12 : hour;
}

function applyTime(
  base: Date | undefined,
  hour12: number,
  minute: number,
  period: DayPeriod
): Date {
  const next = base ? new Date(base) : startOfDay(new Date());
  return setMinutes(setHours(next, toHours24(hour12, period)), minute);
}

function minuteOptions(minuteStep: number, currentMinute?: number): number[] {
  const steps: number[] = [];
  for (let minute = 0; minute < 60; minute += minuteStep) {
    steps.push(minute);
  }

  if (currentMinute !== undefined && !steps.includes(currentMinute)) {
    return [...steps, currentMinute].sort((a, b) => a - b);
  }

  return steps;
}

export function TimePicker({
  value,
  onChange,
  onClear,
  minuteStep = 5,
  disabled,
  className,
}: TimePickerProps) {
  const hour = value ? getHour12(value) : undefined;
  const minute = value ? value.getMinutes() : undefined;
  const period = value ? getPeriod(value) : undefined;
  const minutes = minuteOptions(minuteStep, minute);

  const commit = (nextHour: number, nextMinute: number, nextPeriod: DayPeriod) => {
    onChange(applyTime(value, nextHour, nextMinute, nextPeriod));
  };

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-center gap-2">
        <Select
          value={hour !== undefined ? String(hour) : undefined}
          onValueChange={(next) => {
            commit(Number(next), minute ?? 0, period ?? "AM");
          }}
          disabled={disabled}
        >
          <SelectTrigger aria-label="Hour" className="h-8 w-[4.5rem] text-xs">
            <SelectValue placeholder="HH" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: 12 }, (_, index) => index + 1).map((option) => (
              <SelectItem key={option} value={String(option)}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <span className="text-muted-foreground text-sm">:</span>

        <Select
          value={minute !== undefined ? String(minute) : undefined}
          onValueChange={(next) => {
            commit(hour ?? 12, Number(next), period ?? "AM");
          }}
          disabled={disabled}
        >
          <SelectTrigger aria-label="Minute" className="h-8 w-[4.5rem] text-xs">
            <SelectValue placeholder="MM" />
          </SelectTrigger>
          <SelectContent>
            {minutes.map((option) => (
              <SelectItem key={option} value={String(option)}>
                {String(option).padStart(2, "0")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={period}
          onValueChange={(next) => {
            commit(hour ?? 12, minute ?? 0, next as DayPeriod);
          }}
          disabled={disabled}
        >
          <SelectTrigger aria-label="AM or PM" className="h-8 w-[4.75rem] text-xs">
            <SelectValue placeholder="AM" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="AM">AM</SelectItem>
            <SelectItem value="PM">PM</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {onClear && value ? (
        <Button
          type="button"
          variant="link"
          size="sm"
          disabled={disabled}
          className="h-auto self-start px-0"
          onClick={onClear}
        >
          Clear time
        </Button>
      ) : null}
    </div>
  );
}

TimePicker.displayName = "TimePicker";
