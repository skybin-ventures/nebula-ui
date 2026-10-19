'use client';

import { useId, useContext, useLayoutEffect } from "react";
import type { ReactNode, ComponentPropsWithoutRef, ElementRef } from "react";
import { useController, useFormContext as useRHFFormContext, type FieldValues, type FieldPath } from "react-hook-form";
import type { FormControl } from "./formControl"
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { FormConfigContext, type FormConfig, type FieldValidationRules } from "../Form/context";
import { FieldLayout } from "./FieldLayout";
import { labelVariants } from "./variants";
import { Checkbox as ShadcnCheckbox } from "../../primitives/checkbox";
import { Label } from "../../primitives/label";
import type * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { forwardFormRef } from "./forwardFormRef";


const checkboxSizeVariants = cva(
  "",
  {
    variants: {
      size: {
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export interface CheckboxProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>, "name" | "checked" | "onCheckedChange" | "required">,
    VariantProps<typeof checkboxSizeVariants> {
  /** Field name - required for form integration */
  name: TName;
  /** Label text for the checkbox */
  label?: ReactNode;
  /** Helper text displayed below the checkbox */
  helperText?: string;
  /** Whether to show the error message */
  showError?: boolean;
  /** Custom error message (overrides form error) */
  error?: string;
  /** External control (for use outside Form) */
  control?: FormControl<TFieldValues>;
  /** Variant style */
  variant?: "default" | "error";
  
  // Validation props
  /** Field is required (must be checked) */
  required?: boolean | string;
  /** Custom validation function */
  validate?: (value: unknown) => boolean | string | Promise<boolean | string>;
}

/**
 * Checkbox component with form integration
 * 
 * This is a wrapper around the shadcn/ui Checkbox primitive that adds:
 * - Form integration with react-hook-form
 * - Automatic validation registration
 * - Label, helper text, and error message support
 * 
 * @example
 * ```tsx
 * // Inside a Form component
 * <Checkbox name="terms" label="I agree to the terms and conditions" required />
 * <Checkbox name="newsletter" label="Subscribe to newsletter" />
 * ```
 */
function CheckboxInner<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  {
    name,
    label,
    helperText,
    showError = true,
    error: customError,
    size,
    variant,
    className,
    disabled,
    id: providedId,
    control: externalControl,
    // Validation props
    required,
    validate,
    ...props
  }: CheckboxProps<TFieldValues, TName>,
  ref: React.ForwardedRef<React.ElementRef<typeof CheckboxPrimitive.Root>>
) {
  const generatedId = useId();
  const inputId = providedId ?? generatedId;
  
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
        type: "boolean",
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
      // Keep the control label inline beside the checkbox (not above).
      required={!!required}
      helperText={helperText}
      errorMessage={showError ? errorMessage : undefined}
      showError={showError}
      formConfig={formConfig}
    >
      <div className="flex items-center gap-2">
        <ShadcnCheckbox
          {...props}
          ref={ref}
          id={inputId}
          checked={field.value ?? false}
          onCheckedChange={(checked) => field.onChange(checked === true)}
          onBlur={field.onBlur}
          disabled={effectiveDisabled}
          aria-invalid={hasError}
          aria-labelledby={label ? `${inputId}-label` : undefined}
          aria-describedby={
            hasError
              ? `${inputId}-error`
              : helperText
              ? `${inputId}-helper`
              : undefined
          }
          className={cn(
            checkboxSizeVariants({ size: effectiveSize }),
            effectiveVariant === "error" && "border-destructive",
            className
          )}
        />
        {label ? (
          typeof label === "string" ? (
            <Label
              id={`${inputId}-label`}
              htmlFor={inputId}
              className={cn(
                labelVariants({
                  required: !!required,
                  layout: "inline",
                }),
                effectiveDisabled && "opacity-70"
              )}
            >
              {label}
              {formConfig.colon && ":"}
            </Label>
          ) : (
            label
          )
        ) : null}
      </div>
    </FieldLayout>
  );
}

export const Checkbox = forwardFormRef<
  CheckboxProps,
  ElementRef<typeof CheckboxPrimitive.Root>
>(CheckboxInner);

(Checkbox as React.FC).displayName = "Checkbox";
