'use client';

import { useId, useContext, useEffect } from "react";
import type { ReactNode } from "react";
import { useController, useFormContext as useRHFFormContext, type FieldValues, type FieldPath, type Control } from "react-hook-form";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { FormConfigContext, type FormConfig, type FieldValidationRules } from "../Form/context";
import { FieldLayout } from "./FieldLayout";
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
  /** Allow clear selection */
  allowClear?: boolean;
  /** External control (for use outside Form) */
  control?: Control<TFieldValues>;
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
  showError = true,
  error: customError,
  size,
  variant,
  fullWidth = true,
  className,
  disabled,
  options = [],
  placeholder,
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
  
  // Try to get form context
  const formConfigContext = useContext(FormConfigContext);
  const formConfig: FormConfig = formConfigContext ?? {};
  
  // Get form context from react-hook-form
  const rhfContext = useRHFFormContext<TFieldValues>();
  const control = externalControl ?? rhfContext?.control;

  // Register validation rules with the form
  useEffect(() => {
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
      <ShadcnSelect
        value={field.value?.toString() ?? ""}
        onValueChange={(value) => {
          if (value === "" && allowClear) {
            field.onChange("");
          } else {
            field.onChange(value);
          }
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
            effectiveVariant === "success" && "border-green-500 focus:ring-green-500",
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
