'use client';

import { forwardRef, useId, useContext, useEffect } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import { useController, useFormContext as useRHFFormContext, type FieldValues, type FieldPath, type Control } from "react-hook-form";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { FormConfigContext, type FormConfig, type FieldValidationRules } from "../Form/context";
import { FieldLayout } from "./FieldLayout";
import { TextBoxPrimitive } from "../../primitives/textbox";
import { X } from "lucide-react";

const textBoxVariants = cva(
  "",
  {
    variants: {
      size: {
        sm: "h-8 text-xs px-2",
        md: "h-10 text-sm px-3",
        lg: "h-12 text-base px-4",
      },
      variant: {
        default: "border-input focus-visible:ring-ring",
        error: "border-destructive focus-visible:ring-destructive",
        success: "border-green-500 focus-visible:ring-green-500",
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

export interface TextBoxProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "name" | "prefix" | "pattern" | "required" | "minLength" | "maxLength">,
    VariantProps<typeof textBoxVariants> {
  /** Field name - required for form integration */
  name: TName;
  /** Label text for the input */
  label?: string;
  /** Helper text displayed below the input */
  helperText?: string;
  /** Whether to show the error message */
  showError?: boolean;
  /** Custom error message (overrides form error) */
  error?: string;
  /** Whether the input should take full width */
  fullWidth?: boolean;
  /** Prefix element */
  prefix?: ReactNode;
  /** Suffix element */
  suffix?: ReactNode;
  /** Allow clear button */
  allowClear?: boolean;
  /** Callback when clear is clicked */
  onClear?: () => void;
  /** External control (for use outside Form) */
  control?: Control<TFieldValues>;
  
  // Validation props
  /** Field is required */
  required?: boolean | string;
  /** Minimum length for strings */
  minLength?: ValidationRule<number>;
  /** Maximum length for strings */
  maxLength?: ValidationRule<number>;
  /** Minimum value for numbers */
  minValue?: ValidationRule<number>;
  /** Maximum value for numbers */
  maxValue?: ValidationRule<number>;
  /** Regex pattern for validation */
  pattern?: ValidationRule<RegExp>;
  /** Email validation */
  email?: boolean | string;
  /** URL validation */
  url?: boolean | string;
  /** Custom validation function */
  validate?: (value: unknown) => boolean | string | Promise<boolean | string>;
}

/**
 * TextBox component with form integration and automatic validation registration
 * 
 * This is a wrapper around the shadcn/ui Input primitive that adds:
 * - Form integration with react-hook-form
 * - Automatic validation registration
 * - Label, helper text, and error message support
 * - Prefix/suffix elements
 * - Clear button functionality
 * 
 * @example
 * ```tsx
 * // Inside a Form component - validation is automatically registered
 * <Form onSubmit={handleSubmit} defaultValues={{ username: "", email: "" }}>
 *   <TextBox name="username" label="Username" required minLength={3} maxLength={50} />
 *   <TextBox name="email" label="Email" type="email" required email />
 *   <TextBox name="website" label="Website" url />
 *   <Button type="submit">Submit</Button>
 * </Form>
 * ```
 */
function TextBoxInner<
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
    prefix,
    suffix,
    allowClear,
    onClear,
    id: providedId,
    control: externalControl,
    // Validation props
    required,
    minLength,
    maxLength,
    minValue,
    maxValue,
    pattern,
    email,
    url,
    validate,
    ...props
  }: TextBoxProps<TFieldValues, TName>,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  const generatedId = useId();
  const inputId = providedId ?? generatedId;
  
  // Try to get form context
  const formConfigContext = useContext(FormConfigContext);
  const formConfig: FormConfig = formConfigContext ?? {};

  // Get form context from react-hook-form
  const rhfContext = useRHFFormContext<TFieldValues>();
  const control = externalControl ?? rhfContext?.control;

  // Destructure stable function references so the effect doesn't depend on the
  // context object identity (which changes every render due to inline construction).
  const registerFieldValidation = formConfigContext?.registerFieldValidation;
  const unregisterFieldValidation = formConfigContext?.unregisterFieldValidation;

  // Register validation rules with the form
  useEffect(() => {
    if (registerFieldValidation) {
      const rules: FieldValidationRules = {};

      if (required !== undefined) rules.required = required;
      if (minLength !== undefined) rules.minLength = minLength;
      if (maxLength !== undefined) rules.maxLength = maxLength;
      if (minValue !== undefined) rules.min = minValue;
      if (maxValue !== undefined) rules.max = maxValue;
      if (pattern !== undefined) rules.pattern = pattern;
      if (email !== undefined) rules.email = email;
      if (url !== undefined) rules.url = url;
      if (validate !== undefined) rules.validate = validate;

      // Determine field type and auto-infer rules from input type
      const inputType = props.type ?? "text";
      let fieldType: "string" | "number" | "date" = "string";

      if (inputType === "number") {
        fieldType = "number";
      } else if (inputType === "date") {
        fieldType = "date";
      } else if (inputType === "email" && rules.email === undefined) {
        rules.email = true;
      } else if (inputType === "url" && rules.url === undefined) {
        rules.url = true;
      } else if (inputType === "tel" && rules.pattern === undefined) {
        rules.pattern = { value: /^\+?[\d\s\-().]{7,}$/, message: "Invalid phone number" };
      }

      registerFieldValidation({
        name: name as string,
        type: fieldType,
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
    minLength,
    maxLength,
    minValue,
    maxValue,
    pattern,
    email,
    url,
    validate,
    props.type,
  ]);

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

  const handleClear = () => {
    field.onChange("");
    onClear?.();
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
      <div className="relative">
        {prefix && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {prefix}
          </div>
        )}

        <TextBoxPrimitive
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
          aria-invalid={hasError}
          aria-describedby={
            hasError
              ? `${inputId}-error`
              : helperText
                ? `${inputId}-helper`
                : undefined
          }
          className={cn(
            textBoxVariants({ size: effectiveSize, variant: effectiveVariant }),
            prefix && "pl-10",
            (suffix || allowClear) && "pr-10",
            className
          )}
        />

        {(suffix || (allowClear && field.value)) && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
            {allowClear && field.value && (
              <button
                type="button"
                onClick={handleClear}
                className="text-muted-foreground hover:text-foreground transition-colors"
                tabIndex={-1}
                aria-label="Clear"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            {suffix && (
              <span className="text-muted-foreground">{suffix}</span>
            )}
          </div>
        )}
      </div>
    </FieldLayout>
  );
}

// Use forwardRef with generic support
export const TextBox = forwardRef(TextBoxInner) as <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: TextBoxProps<TFieldValues, TName> & { ref?: React.ForwardedRef<HTMLInputElement> }
) => React.ReactElement;

(TextBox as React.FC).displayName = "TextBox";
