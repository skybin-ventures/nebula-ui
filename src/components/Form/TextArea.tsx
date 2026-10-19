'use client';

import { forwardRef, useId, useContext, useLayoutEffect } from "react";
import type { TextareaHTMLAttributes } from "react";
import { useController, useFormContext as useRHFFormContext, type FieldValues, type FieldPath, type Control } from "react-hook-form";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { FormConfigContext, type FormConfig, type FieldValidationRules } from "../Form/context";
import { FieldLayout } from "./FieldLayout";
import { Textarea } from "../../primitives/textarea";

const textAreaSizeVariants = cva(
  "",
  {
    variants: {
      size: {
        sm: "text-xs px-2 py-1.5 min-h-[60px]",
        md: "text-sm px-3 py-2 min-h-[80px]",
        lg: "text-base px-4 py-3 min-h-[100px]",
      },
      variant: {
        default: "border-input focus-visible:ring-ring",
        error: "border-destructive focus-visible:ring-destructive",
        success: "border-success focus-visible:ring-success",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
    },
  }
);

/**
 * Validation rule with optional custom message
 */
type ValidationRule<T> = T | { value: T; message: string };

export interface TextAreaProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "name" | "required" | "minLength" | "maxLength">,
    VariantProps<typeof textAreaSizeVariants> {
  /** Field name - required for form integration */
  name: TName;
  /** Label text for the textarea */
  label?: string;
  /** Helper text displayed below the textarea */
  helperText?: string;
  /** Whether to show the error message */
  showError?: boolean;
  /** Custom error message (overrides form error) */
  error?: string;
  /** Whether the textarea should take full width */
  fullWidth?: boolean;
  /** Show character count */
  showCount?: boolean;
  /** Maximum character count (for display) */
  maxCount?: number;
  /** External control (for use outside Form) */
  control?: Control<TFieldValues, any, any>;
  
  // Validation props
  /** Field is required */
  required?: boolean | string;
  /** Minimum length */
  minLength?: ValidationRule<number>;
  /** Maximum length */
  maxLength?: ValidationRule<number>;
  /** Custom validation function */
  validate?: (value: unknown) => boolean | string | Promise<boolean | string>;
}

/**
 * TextArea component with form integration
 * 
 * This is a wrapper around the shadcn/ui Textarea primitive that adds:
 * - Form integration with react-hook-form
 * - Automatic validation registration
 * - Label, helper text, and error message support
 * - Character count display
 * 
 * @example
 * ```tsx
 * // Inside a Form component
 * <TextArea name="description" label="Description" required minLength={10} />
 * <TextArea name="bio" label="Bio" showCount maxCount={500} maxLength={500} />
 * ```
 */
function TextAreaInner<
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
    fullWidth = true,
    className,
    disabled,
    showCount,
    maxCount,
    id: providedId,
    control: externalControl,
    // Validation props
    required,
    minLength,
    maxLength,
    validate,
    ...props
  }: TextAreaProps<TFieldValues, TName>,
  ref: React.ForwardedRef<HTMLTextAreaElement>
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
      if (minLength !== undefined) rules.minLength = minLength;
      if (maxLength !== undefined) rules.maxLength = maxLength;
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
  }, [formConfigContext, name, required, minLength, maxLength, validate]);

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

  const currentLength = typeof field.value === "string" ? field.value.length : 0;
  
  // Get maxLength value for HTML attribute
  const maxLengthValue = maxCount ?? (typeof maxLength === "number" ? maxLength : (maxLength as { value: number })?.value);

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
      <div className="relative">
        <Textarea
          {...props}
          {...field}
          ref={(node) => {
            if (typeof ref === "function") {
              ref(node);
            } else if (ref) {
              ref.current = node;
            }
            field.ref(node);
          }}
          id={inputId}
          disabled={effectiveDisabled}
          maxLength={maxLengthValue}
          aria-invalid={hasError}
          aria-describedby={
            hasError
              ? `${inputId}-error`
              : helperText
              ? `${inputId}-helper`
              : undefined
          }
          className={cn(
            textAreaSizeVariants({ size: effectiveSize, variant: effectiveVariant }),
            showCount && "pb-6",
            className
          )}
        />

        {showCount && (
          <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
            {currentLength}{maxCount ? `/${maxCount}` : ""}
          </div>
        )}
      </div>
    </FieldLayout>
  );
}

// Use forwardRef with generic support
export const TextArea = forwardRef(TextAreaInner) as <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: TextAreaProps<TFieldValues, TName> & { ref?: React.ForwardedRef<HTMLTextAreaElement> }
) => React.ReactElement;

(TextArea as React.FC).displayName = "TextArea";
