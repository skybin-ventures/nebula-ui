'use client';

import { useId, useContext, useLayoutEffect, useState } from "react";
import type { ReactNode } from "react";
import { useController, useFormContext as useRHFFormContext, type FieldValues, type FieldPath } from "react-hook-form";
import type { FormControl } from "./formControl"
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { FormConfigContext, type FormConfig, type FieldValidationRules } from "../Form/context";
import { FieldLayout } from "./FieldLayout";
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
import {
  Select as ShadcnSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../primitives/select";

const selectSizeVariants = cva(
  "",
  {
    variants: {
      size: {
        sm: "h-8 text-xs",
        md: "h-10 text-sm",
        lg: "h-12 text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface SelectProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends VariantProps<typeof selectSizeVariants> {
  /** Field name - required for form integration */
  name: TName;
  /** Label text for the select */
  label?: string;
  /** Helper text displayed below the select */
  helperText?: string;
  /** Tooltip copy for the label help icon (shown after the label). */
  help?: string;
  /** Optional icon override for the label help control; defaults to lucide Info. */
  helpIcon?: ReactNode;
  /** Whether to show the error message */
  showError?: boolean;
  /** Custom error message (overrides form error) */
  error?: string;
  /** Whether the select should take full width */
  fullWidth?: boolean;
  /** Options for the select */
  options?: SelectOption[];
  /** Placeholder text */
  placeholder?: string;
  /**
   * Render the select as a searchable command palette (like `Combobox` /
   * `MultiSelect`) instead of the Radix dropdown. Ignored when `children`
   * are supplied — custom children always use the Radix dropdown.
   */
  searchable?: boolean;
  /** Search box placeholder (searchable mode only) */
  searchPlaceholder?: string;
  /** Empty-state copy when no option matches the search (searchable mode only) */
  emptyText?: string;
  /** Allow clear selection */
  allowClear?: boolean;
  /** External control (for use outside Form) */
  control?: FormControl<TFieldValues>;
  /** Children (alternative to options prop) */
  children?: ReactNode;
  /** Disabled state */
  disabled?: boolean;
  /** Additional class name */
  className?: string;
  /** ID for the select */
  id?: string;
  /** Variant style */
  variant?: "default" | "error" | "success";
  
  // Validation props
  /** Field is required */
  required?: boolean | string;
  /** Custom validation function */
  validate?: (value: unknown) => boolean | string | Promise<boolean | string>;
}

/**
 * Select component with form integration
 * 
 * This is a wrapper around the shadcn/ui Select primitive that adds:
 * - Form integration with react-hook-form
 * - Automatic validation registration
 * - Label, helper text, and error message support
 * 
 * @example
 * ```tsx
 * // Inside a Form component
 * <Select 
 *   name="country" 
 *   label="Country" 
 *   required
 *   options={[
 *     { label: "USA", value: "us" },
 *     { label: "Canada", value: "ca" },
 *   ]} 
 * />
 * ```
 */
export function Select<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  label,
  helperText,
    help,
    helpIcon,
  showError = true,
  error: customError,
  size,
  variant,
  fullWidth = true,
  className,
  disabled,
  options = [],
  placeholder,
  searchable = false,
  searchPlaceholder,
  emptyText,
  allowClear,
  id: providedId,
  control: externalControl,
  children,
  // Validation props
  required,
  validate,
}: SelectProps<TFieldValues, TName>) {
  const generatedId = useId();
  const inputId = providedId ?? generatedId;
  const [open, setOpen] = useState(false);
  
  // Try to get form context
  const formConfigContext = useContext(FormConfigContext);
  const formConfig: FormConfig = formConfigContext ?? {};
  
  // Get form context from react-hook-form
  const rhfContext = useRHFFormContext<TFieldValues>();
  const control = externalControl ?? rhfContext?.control;

  // Register validation rules with the form
  useLayoutEffect(() => {
    if (formConfigContext?.registerFieldValidation) {
      const rules: FieldValidationRules = {};
      
      if (required !== undefined) rules.required = required;
      if (validate !== undefined) rules.validate = validate;

      formConfigContext.registerFieldValidation({
        name: name as string,
        type: "string",
        rules,
      });

      return () => {
        formConfigContext.unregisterFieldValidation(name as string);
      };
    }
  }, [formConfigContext, name, required, validate]);

  // Use controller for form integration
  const { field, fieldState } = useController<TFieldValues, TName>({
    name,
    control,
  });

  const fieldError = fieldState.error?.message;
  const errorMessage = customError ?? fieldError;
  const hasError = !!errorMessage;
  
  // Merge sizes - prop takes precedence over form config
  const effectiveSize = size ?? formConfig.size ?? "md";
  const effectiveDisabled = disabled ?? formConfig.disabled;
  
  // Determine variant based on error state
  const effectiveVariant = hasError ? "error" : variant;

  const ariaDescribedBy = hasError
    ? `${inputId}-error`
    : helperText
      ? `${inputId}-helper`
      : undefined;

  // Searchable mode: a Popover + command palette (cmdk) that filters options
  // as you type. Only used with the `options` prop; custom `children` and the
  // default `searchable={false}` keep the accessible Radix dropdown.
  if (searchable && !children) {
    const selectedOption = options.find(
      (option) => option.value.toString() === field.value?.toString()
    );
    return (
      <FieldLayout
        inputId={inputId}
        label={label}
        required={!!required}
        helperText={helperText}
        help={help}
        helpIcon={helpIcon}
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
              aria-describedby={ariaDescribedBy}
              className={cn(
                "h-auto min-h-10 w-full justify-between font-normal",
                selectSizeVariants({ size: effectiveSize }),
                effectiveVariant === "error" && "border-destructive focus:ring-destructive",
                effectiveVariant === "success" && "border-success focus:ring-success",
                !field.value && "text-muted-foreground",
                className
              )}
            >
              <span className="truncate">{selectedOption?.label ?? placeholder ?? "Select option"}</span>
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[320px] p-0" align="start">
            <Command>
              <CommandInput placeholder={searchPlaceholder} />
              <CommandList>
                <CommandEmpty>{emptyText ?? "No option found."}</CommandEmpty>
                <CommandGroup>
                  {allowClear && field.value && (
                    <CommandItem
                      value=""
                      onSelect={() => {
                        field.onChange(undefined);
                        setOpen(false);
                      }}
                    >
                      <X className="mr-2 h-4 w-4" />
                      Clear selection
                    </CommandItem>
                  )}
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

  return (
    <FieldLayout
      inputId={inputId}
      label={label}
      required={!!required}
      helperText={helperText}
      help={help}
      helpIcon={helpIcon}
      errorMessage={showError ? errorMessage : undefined}
      showError={showError}
      fullWidth={fullWidth}
      formConfig={formConfig}
    >
      <ShadcnSelect
        value={field.value?.toString() ?? ""}
        onValueChange={(value) => {
          field.onChange(value === "" ? undefined : value);
        }}
        disabled={effectiveDisabled}
      >
        <SelectTrigger
          id={inputId}
          aria-invalid={hasError}
          aria-describedby={
            hasError
              ? `${inputId}-error`
              : helperText
                ? `${inputId}-helper`
                : undefined
          }
          className={cn(
            selectSizeVariants({ size: effectiveSize }),
            effectiveVariant === "error" && "border-destructive focus:ring-destructive",
            effectiveVariant === "success" && "border-success focus:ring-success",
            className
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {allowClear && field.value && (
            <SelectItem value="">
              <span className="text-muted-foreground">Clear selection</span>
            </SelectItem>
          )}
          {children ?? options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value.toString()}
              disabled={option.disabled}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </ShadcnSelect>
    </FieldLayout>
  );
}

Select.displayName = "Select";
