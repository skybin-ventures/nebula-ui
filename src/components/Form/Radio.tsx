'use client';

import { forwardRef, useId, useContext, createContext, useLayoutEffect } from "react";
import type { ReactNode, ComponentPropsWithoutRef } from "react";
import { useController, useFormContext as useRHFFormContext, type FieldValues, type FieldPath, type Control } from "react-hook-form";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { FormConfigContext, type FormConfig, type FieldValidationRules } from "../Form/context";
import { FieldLayout } from "./FieldLayout";
import { RadioGroup as ShadcnRadioGroup, RadioGroupItem as ShadcnRadioGroupItem } from "../../primitives/radio-group";
import { Label } from "../../primitives/label";
import type * as RadioGroupPrimitive from "@radix-ui/react-radio-group";

const radioSizeVariants = cva(
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

const labelVariants = cva(
  "text-sm font-medium cursor-pointer select-none",
  {
    variants: {
      disabled: {
        true: "cursor-not-allowed opacity-50",
        false: "",
      },
    },
    defaultVariants: {
      disabled: false,
    },
  }
);

// Radio Group Context
interface RadioGroupContextValue {
  name: string;
  value: string | number | undefined;
  onChange: (value: string | number) => void;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

export interface RadioOption {
  label: ReactNode;
  value: string | number;
  disabled?: boolean;
}

export interface RadioGroupProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends VariantProps<typeof radioSizeVariants> {
  /** Field name - required for form integration */
  name: TName;
  /** Label text for the radio group */
  label?: string;
  /** Helper text displayed below the radio group */
  helperText?: string;
  /** Whether to show the error message */
  showError?: boolean;
  /** Custom error message (overrides form error) */
  error?: string;
  /** Options for the radio group */
  options?: RadioOption[];
  /** Layout direction */
  direction?: "horizontal" | "vertical";
  /** External control (for use outside Form) */
  control?: Control<TFieldValues, any, any>;
  /** Children (alternative to options prop) */
  children?: ReactNode;
  /** Disabled state */
  disabled?: boolean;
  /** Additional class name */
  className?: string;
  /** Variant style */
  variant?: "default" | "error";
  
  // Validation props
  /** Field is required */
  required?: boolean | string;
  /** Custom validation function */
  validate?: (value: unknown) => boolean | string | Promise<boolean | string>;
}

/**
 * RadioGroup component with form integration
 * 
 * This is a wrapper around the shadcn/ui RadioGroup primitive that adds:
 * - Form integration with react-hook-form
 * - Automatic validation registration
 * - Label, helper text, and error message support
 * 
 * @example
 * ```tsx
 * // Inside a Form component
 * <RadioGroup 
 *   name="gender" 
 *   label="Gender"
 *   required
 *   options={[
 *     { label: "Male", value: "male" },
 *     { label: "Female", value: "female" },
 *     { label: "Other", value: "other" },
 *   ]} 
 * />
 * ```
 */
export function RadioGroup<
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
  options = [],
  direction = "vertical",
  control: externalControl,
  children,
  disabled,
  className,
  // Validation props
  required,
  validate,
}: RadioGroupProps<TFieldValues, TName>) {
  const generatedId = useId();
  
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
  const effectiveVariant = hasError ? "error" : variant;

  const contextValue: RadioGroupContextValue = {
    name: name as string,
    value: field.value,
    onChange: field.onChange,
    disabled: effectiveDisabled,
    size: effectiveSize,
  };

  return (
    <FieldLayout
      inputId={generatedId}
      label={label}
      required={!!required}
      helperText={helperText}
      errorMessage={showError ? errorMessage : undefined}
      showError={showError}
      formConfig={formConfig}
    >
      <RadioGroupContext.Provider value={contextValue}>
        <ShadcnRadioGroup
          id={generatedId}
          value={field.value?.toString()}
          onValueChange={(value) => field.onChange(value)}
          disabled={effectiveDisabled}
          aria-labelledby={label ? `${generatedId}-label` : undefined}
          aria-invalid={hasError || undefined}
          aria-describedby={
            hasError
              ? `${generatedId}-error`
              : helperText
                ? `${generatedId}-helper`
                : undefined
          }
          className={cn(
            className,
            direction === "horizontal" && "flex flex-row gap-4",
            direction === "vertical" && "flex flex-col gap-2"
          )}
        >
          {children ?? options.map((option) => (
            <RadioItem
              key={option.value}
              value={option.value}
              disabled={option.disabled}
              size={effectiveSize}
              variant={effectiveVariant}
            >
              {option.label}
            </RadioItem>
          ))}
        </ShadcnRadioGroup>
      </RadioGroupContext.Provider>
    </FieldLayout>
  );
}

RadioGroup.displayName = "RadioGroup";

export interface RadioItemProps extends Omit<ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>, "value">,
    VariantProps<typeof radioSizeVariants> {
  /** Value for this radio option */
  value: string | number;
  /** Label for this radio option */
  children?: ReactNode;
  /** Variant style */
  variant?: "default" | "error";
}

/**
 * RadioItem component - must be used within RadioGroup
 * 
 * This is a wrapper around the shadcn/ui RadioGroupItem primitive
 */
function RadioItemInner(
  {
    value,
    children,
    size,
    variant,
    className,
    disabled,
    id: providedId,
    ...props
  }: RadioItemProps,
  ref: React.ForwardedRef<React.ElementRef<typeof RadioGroupPrimitive.Item>>
) {
  const generatedId = useId();
  const inputId = providedId ?? generatedId;
  
  const groupContext = useContext(RadioGroupContext);
  
  const effectiveSize = size ?? groupContext?.size ?? "md";
  const effectiveDisabled = disabled ?? groupContext?.disabled;

  return (
    <div className="flex items-center gap-2">
      <ShadcnRadioGroupItem
        {...props}
        ref={ref}
        id={inputId}
        value={value.toString()}
        disabled={effectiveDisabled}
        className={cn(
          radioSizeVariants({ size: effectiveSize }),
          variant === "error" && "border-destructive",
          className
        )}
      />
      
      {children && (
        <Label
          htmlFor={inputId}
          className={labelVariants({ disabled: effectiveDisabled })}
        >
          {children}
        </Label>
      )}
    </div>
  );
}

export const RadioItem = forwardRef(RadioItemInner);
RadioItem.displayName = "RadioItem";
