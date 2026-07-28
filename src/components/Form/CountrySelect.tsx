'use client';

import { useContext, useEffect, useId } from "react";
import { useController, useFormContext as useRHFFormContext, type Control, type FieldPath, type FieldValues } from "react-hook-form";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { FormConfigContext, type FieldValidationRules, type FormConfig } from "./context";
import { FieldLayout } from "./FieldLayout";
import { CountryPicker } from "./CountryPicker";

const countrySelectVariants = cva("", {
  variants: {
    size: {
      sm: "h-8 text-xs",
      md: "h-10 text-sm",
      lg: "h-12 text-base",
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
});

export interface CountrySelectProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends VariantProps<typeof countrySelectVariants> {
  name: TName;
  label?: string;
  helperText?: string;
  showError?: boolean;
  error?: string;
  fullWidth?: boolean;
  placeholder?: string;
  allowClear?: boolean;
  disabled?: boolean;
  className?: string;
  id?: string;
  control?: Control<TFieldValues>;
  include?: string[];
  exclude?: string[];
  priorityCountries?: string[];
  /** Field is required (`true` or custom error message string) */
  required?: boolean | string;
  validate?: (value: unknown) => boolean | string | Promise<boolean | string>;
}

export function CountrySelect<
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
  placeholder = "Select a country",
  allowClear,
  disabled,
  className,
  id: providedId,
  control: externalControl,
  include,
  exclude,
  priorityCountries,
  required,
  validate,
}: CountrySelectProps<TFieldValues, TName>) {
  const generatedId = useId();
  const inputId = providedId ?? generatedId;
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
      <div className="flex gap-2">
        <CountryPicker
          id={inputId}
          value={field.value ?? ""}
          onValueChange={(value) => field.onChange(value)}
          placeholder={placeholder}
          disabled={effectiveDisabled}
          include={include}
          exclude={exclude}
          priorityCountries={priorityCountries}
          required={!!required}
          aria-invalid={hasError}
          aria-describedby={
            hasError
              ? `${inputId}-error`
              : helperText
                ? `${inputId}-helper`
                : undefined
          }
          className={cn(
            countrySelectVariants({ size: effectiveSize, variant: effectiveVariant }),
            className
          )}
        />
        {allowClear && field.value && (
          <button
            type="button"
            className="text-sm text-muted-foreground hover:text-foreground"
            onClick={() => field.onChange("")}
            disabled={effectiveDisabled}
          >
            Clear
          </button>
        )}
      </div>
    </FieldLayout>
  );
}

CountrySelect.displayName = "CountrySelect";
