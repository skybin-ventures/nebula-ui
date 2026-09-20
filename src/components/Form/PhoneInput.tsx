'use client';

import { useContext, useEffect, useId, useMemo, useState } from "react";
import { useController, useFormContext as useRHFFormContext, type Control, type FieldPath, type FieldValues } from "react-hook-form";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";
import {
  formatE164,
  getCountryDialCode,
  parseE164,
} from "../../data/countries";
import { TextBoxPrimitive } from "../../primitives/textbox";
import { FormConfigContext, type FieldValidationRules, type FormConfig } from "./context";
import { FieldLayout } from "./FieldLayout";
import { CountryPicker } from "./CountryPicker";

const phoneInputVariants = cva("", {
  variants: {
    size: {
      sm: "h-8 text-xs",
      md: "h-10 text-sm",
      lg: "h-12 text-base",
    },
    variant: {
      default: "border-input focus-within:ring-ring",
      error: "border-destructive focus-within:ring-destructive",
      success: "border-green-500 focus-within:ring-green-500",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "default",
  },
});

type ValidationRule<T> = T | { value: T; message: string };

export interface PhoneInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends VariantProps<typeof phoneInputVariants> {
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
  defaultCountry?: string;
  priorityCountries?: string[];
  /** Field is required (`true` or custom error message string) */
  required?: boolean | string;
  /** Minimum national number length */
  minLength?: ValidationRule<number>;
  /** Maximum national number length */
  maxLength?: ValidationRule<number>;
  validate?: (value: unknown) => boolean | string | Promise<boolean | string>;
}

function getValidationRuleValue<T>(
  rule: ValidationRule<T> | undefined,
  defaultMessage: string
): { value: T; message: string } | null {
  if (rule === undefined) {
    return null;
  }

  if (typeof rule === "object" && rule !== null && "value" in rule) {
    return rule as { value: T; message: string };
  }

  return { value: rule as T, message: defaultMessage };
}

function buildPhoneValidate(
  required: boolean | string | undefined,
  minLength: ValidationRule<number> | undefined,
  maxLength: ValidationRule<number> | undefined,
  validate: PhoneInputProps["validate"]
) {
  const requiredMessage =
    typeof required === "string" ? required : "This field is required";

  return async (value: unknown) => {
    const parsed = parseE164(String(value ?? ""));
    const nationalNumber = parsed?.nationalNumber ?? "";

    if (required !== undefined && !nationalNumber) {
      return requiredMessage;
    }

    const minLengthRule = getValidationRuleValue(
      minLength,
      `Minimum ${typeof minLength === "number" ? minLength : minLength?.value} digits required`
    );
    if (minLengthRule && nationalNumber.length < minLengthRule.value) {
      return minLengthRule.message;
    }

    const maxLengthRule = getValidationRuleValue(
      maxLength,
      `Maximum ${typeof maxLength === "number" ? maxLength : maxLength?.value} digits allowed`
    );
    if (maxLengthRule && nationalNumber.length > maxLengthRule.value) {
      return maxLengthRule.message;
    }

    if (validate) {
      return validate(value);
    }

    return true;
  };
}

export function PhoneInput<
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
  placeholder = "Mobile number",
  disabled,
  className,
  id: providedId,
  control: externalControl,
  defaultCountry = "IN",
  priorityCountries,
  required,
  minLength,
  maxLength,
  validate,
}: PhoneInputProps<TFieldValues, TName>) {
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

      if (
        required !== undefined ||
        minLength !== undefined ||
        maxLength !== undefined ||
        validate !== undefined
      ) {
        rules.validate = buildPhoneValidate(required, minLength, maxLength, validate);
      }

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
    minLength,
    maxLength,
    validate,
  ]);

  const { field, fieldState } = useController<TFieldValues, TName>({
    name,
    control,
  });

  const parsedValue = useMemo(() => parseE164(field.value ?? ""), [field.value]);
  const [draftCountry, setDraftCountry] = useState<string | null>(null);
  const countryCode = parsedValue?.countryCode ?? draftCountry ?? defaultCountry;
  const nationalNumber = parsedValue?.nationalNumber ?? "";

  const fieldError = fieldState.error?.message;
  const errorMessage = customError ?? fieldError;
  const hasError = !!errorMessage;
  const effectiveSize = size ?? formConfig.size ?? "md";
  const effectiveDisabled = disabled ?? formConfig.disabled;
  const effectiveVariant = hasError ? "error" : variant;
  const dialCode = getCountryDialCode(countryCode);

  const updateValue = (nextCountryCode: string, nextNationalNumber: string) => {
    setDraftCountry(nextCountryCode);
    field.onChange(formatE164(nextCountryCode, nextNationalNumber));
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
      <div
        className={cn(
          "flex items-stretch overflow-hidden rounded-md border bg-background focus-within:ring-2 focus-within:ring-offset-2",
          phoneInputVariants({ size: effectiveSize, variant: effectiveVariant }),
          className
        )}
      >
        <CountryPicker
          compact
          value={countryCode}
          onValueChange={(value) => updateValue(value, nationalNumber)}
          disabled={effectiveDisabled}
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
        />

        <div className="flex items-center border-l px-3 text-sm text-muted-foreground">
          {dialCode}
        </div>

        <TextBoxPrimitive
          id={inputId}
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          value={nationalNumber}
          onChange={(event) => {
            const digits = event.target.value.replace(/\D/g, "");
            updateValue(countryCode, digits);
          }}
          placeholder={placeholder}
          disabled={effectiveDisabled}
          aria-required={!!required}
          aria-invalid={hasError}
          aria-describedby={
            hasError
              ? `${inputId}-error`
              : helperText
                ? `${inputId}-helper`
                : undefined
          }
          className={cn(
            "h-full min-w-0 flex-1 border-0 bg-transparent px-3 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
          )}
        />
      </div>
    </FieldLayout>
  );
}

PhoneInput.displayName = "PhoneInput";
