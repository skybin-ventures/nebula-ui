'use client';

import { useContext, useEffect, useId, useMemo, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { useController, useFormContext as useRHFFormContext, type Control, type FieldPath, type FieldValues } from "react-hook-form";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";
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
import { FormConfigContext, type FieldValidationRules, type FormConfig } from "./context";
import { FieldLayout } from "./FieldLayout";
import type { SelectOption } from "./Select";

const comboboxVariants = cva("w-full justify-between font-normal", {
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

export interface ComboboxProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends VariantProps<typeof comboboxVariants> {
  name: TName;
  label?: string;
  helperText?: string;
  showError?: boolean;
  error?: string;
  fullWidth?: boolean;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  options?: SelectOption[];
  disabled?: boolean;
  className?: string;
  id?: string;
  control?: Control<TFieldValues>;
  required?: boolean | string;
  validate?: (value: unknown) => boolean | string | Promise<boolean | string>;
}

export function Combobox<
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
  placeholder = "Select option",
  searchPlaceholder = "Search...",
  emptyText = "No option found.",
  options = [],
  disabled,
  className,
  id: providedId,
  control: externalControl,
  required,
  validate,
}: ComboboxProps<TFieldValues, TName>) {
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
        type: "string",
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

  const selectedOption = useMemo(
    () => options.find((option) => option.value.toString() === field.value?.toString()),
    [field.value, options]
  );

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
            role="combobox"
            aria-expanded={open}
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
              comboboxVariants({ size: effectiveSize, variant: effectiveVariant }),
              !field.value && "text-muted-foreground",
              className
            )}
          >
            {selectedOption?.label ?? placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[320px] p-0" align="start">
          <Command>
            <CommandInput placeholder={searchPlaceholder} />
            <CommandList>
              <CommandEmpty>{emptyText}</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.label}
                    disabled={option.disabled}
                    onSelect={() => {
                      field.onChange(option.value.toString());
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        field.value?.toString() === option.value.toString()
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </FieldLayout>
  );
}

Combobox.displayName = "Combobox";
