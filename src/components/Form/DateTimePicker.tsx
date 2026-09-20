'use client';

import { useContext, useEffect, useId, useState } from "react";
import { format, startOfDay } from "date-fns";
import { CalendarIcon, Clock } from "lucide-react";
import { useController, useFormContext as useRHFFormContext, type Control, type FieldPath, type FieldValues } from "react-hook-form";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { Button } from "../../primitives/button";
import { Calendar } from "../../primitives/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../../primitives/popover";
import { Separator } from "../../primitives/separator";
import { FormConfigContext, type FieldValidationRules, type FormConfig } from "./context";
import { FieldLayout } from "./FieldLayout";
import { TimePicker } from "./TimePicker";
import { deriveTimeSet, toValidDate, withPreservedTime } from "./dateTime";

const dateTimePickerVariants = cva("w-full justify-start text-left font-normal", {
  variants: {
    size: {
      sm: "h-8 text-xs",
      md: "h-10 text-sm",
      lg: "h-12 text-base",
    },
    variant: {
      default: "border-input",
      error: "border-destructive",
      success: "border-green-500",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "default",
  },
});

export interface DateTimePickerProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends VariantProps<typeof dateTimePickerVariants> {
  name: TName;
  label?: string;
  helperText?: string;
  showError?: boolean;
  error?: string;
  fullWidth?: boolean;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
  control?: Control<TFieldValues>;
  required?: boolean | string;
  validate?: (value: unknown) => boolean | string | Promise<boolean | string>;
  minuteStep?: number;
}

function isSelectEventTarget(target: EventTarget | null): boolean {
  return target instanceof Element && Boolean(target.closest("[data-radix-select-content]"));
}

export function DateTimePicker<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  label,
  helperText,
  showError = true,
  error: customError,
  size,
  variant,
  fullWidth = true,
  placeholder = "Pick a date",
  disabled,
  className,
  id: providedId,
  control: externalControl,
  required,
  validate,
  minuteStep = 5,
}: DateTimePickerProps<TFieldValues, TName>) {
  const generatedId = useId();
  const inputId = providedId ?? generatedId;
  const [open, setOpen] = useState(false);
  const [timeOpen, setTimeOpen] = useState(false);
  const formConfigContext = useContext(FormConfigContext);
  const formConfig: FormConfig = formConfigContext ?? {};
  const rhfContext = useRHFFormContext<TFieldValues>();
  const control = externalControl ?? rhfContext?.control;

  const registerFieldValidation = formConfigContext?.registerFieldValidation;
  const unregisterFieldValidation = formConfigContext?.unregisterFieldValidation;

  useEffect(() => {
    if (registerFieldValidation) {
      const rules: FieldValidationRules = {};
      if (required !== undefined) rules.required = required;
      if (validate !== undefined) rules.validate = validate;

      registerFieldValidation({
        name: name as string,
        type: "datetime",
        rules,
      });

      return () => {
        unregisterFieldValidation?.(name as string);
      };
    }
  }, [
    registerFieldValidation,
    unregisterFieldValidation,
    name,
    required,
    validate,
  ]);

  const { field, fieldState } = useController<TFieldValues, TName>({
    name,
    control,
  });

  const selectedDate = toValidDate(field.value);
  const timeSet = deriveTimeSet(field.value);

  const fieldError = fieldState.error?.message;
  const errorMessage = customError ?? fieldError;
  const hasError = !!errorMessage;
  const effectiveSize = size ?? formConfig.size ?? "md";
  const effectiveDisabled = disabled ?? formConfig.disabled;
  const effectiveVariant = hasError ? "error" : variant;
  const displayHasTime = timeSet && !!selectedDate;

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (nextOpen && timeSet) {
      setTimeOpen(true);
      return;
    }

    if (!nextOpen) {
      setTimeOpen(false);
    }
  };

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
      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <Button
            id={inputId}
            type="button"
            variant="outline"
            disabled={effectiveDisabled}
            aria-invalid={hasError}
            aria-describedby={
              hasError
                ? `${inputId}-error`
                : helperText
                  ? `${inputId}-helper`
                  : undefined
            }
            className={cn(
              dateTimePickerVariants({ size: effectiveSize, variant: effectiveVariant }),
              !selectedDate && "text-muted-foreground",
              className
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selectedDate
              ? format(selectedDate, displayHasTime ? "PPP p" : "PPP")
              : placeholder}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0"
          align="start"
          onPointerDownOutside={(event) => {
            if (isSelectEventTarget(event.target)) {
              event.preventDefault();
            }
          }}
          onFocusOutside={(event) => {
            if (isSelectEventTarget(event.target)) {
              event.preventDefault();
            }
          }}
        >
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => {
              if (!date) {
                field.onChange("");
                return;
              }

              if (selectedDate && timeSet) {
                field.onChange(withPreservedTime(date, selectedDate));
                setOpen(false);
                return;
              }

              field.onChange(startOfDay(date));
            }}
          />
          <Separator />
          <div className="p-3">
            <Button
              type="button"
              variant="ghost"
              disabled={effectiveDisabled}
              className="h-8 w-full justify-start px-2 font-normal"
              onClick={() => setTimeOpen((current) => !current)}
            >
              <Clock className="mr-2 h-4 w-4" />
              {displayHasTime && selectedDate ? format(selectedDate, "p") : "Add time"}
            </Button>
            {timeOpen ? (
              <TimePicker
                className="mt-2"
                value={selectedDate}
                minuteStep={minuteStep}
                disabled={effectiveDisabled}
                onChange={(date) => {
                  field.onChange(date);
                }}
                onClear={() => {
                  if (selectedDate) {
                    field.onChange(startOfDay(selectedDate));
                  }
                }}
              />
            ) : null}
          </div>
        </PopoverContent>
      </Popover>
    </FieldLayout>
  );
}

DateTimePicker.displayName = "DateTimePicker";
