'use client';

import { useContext, useEffect, useId, useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useController, useFormContext as useRHFFormContext, type Control, type FieldPath, type FieldValues } from "react-hook-form";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { Button } from "../../primitives/button";
import { Calendar } from "../../primitives/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../../primitives/popover";
import { FormConfigContext, type FieldValidationRules, type FormConfig } from "./context";
import { FieldLayout } from "./FieldLayout";

const datePickerVariants = cva("w-full justify-start text-left font-normal", {
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

export interface DatePickerProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends VariantProps<typeof datePickerVariants> {
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
}

export function DatePicker<
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
}: DatePickerProps<TFieldValues, TName>) {
  const generatedId = useId();
  const inputId = providedId ?? generatedId;
  const [open, setOpen] = useState(false);
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
        type: "date",
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

  const selectedDate = field.value ? new Date(field.value) : undefined;
  const fieldError = fieldState.error?.message;
  const errorMessage = customError ?? fieldError;
  const hasError = !!errorMessage;
  const effectiveSize = size ?? formConfig.size ?? "md";
  const effectiveDisabled = disabled ?? formConfig.disabled;
  const effectiveVariant = hasError ? "error" : variant;

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
      <Popover open={open} onOpenChange={setOpen}>
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
              datePickerVariants({ size: effectiveSize, variant: effectiveVariant }),
              !selectedDate && "text-muted-foreground",
              className
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selectedDate ? format(selectedDate, "PPP") : placeholder}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => {
              field.onChange(date ?? "");
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </FieldLayout>
  );
}

DatePicker.displayName = "DatePicker";
