'use client';

import { useContext, useEffect, useId } from "react";
import { useController, useFormContext as useRHFFormContext, type Control, type FieldPath, type FieldValues } from "react-hook-form";
import { FormConfigContext, type FieldValidationRules, type FormConfig } from "../Form/context";
import { FieldLayout } from "../Form/FieldLayout";
import { DateRangePicker, type DateRangeValue } from "./DateRangePicker";

export interface FormDateRangePickerProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  name: TName;
  label?: string;
  helperText?: string;
  showError?: boolean;
  error?: string;
  fullWidth?: boolean;
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  id?: string;
  control?: Control<TFieldValues>;
  required?: boolean | string;
  validate?: (value: unknown) => boolean | string | Promise<boolean | string>;
}

export function FormDateRangePicker<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  label,
  helperText,
  showError = true,
  error: customError,
  fullWidth = true,
  placeholder,
  disabled,
  loading,
  className,
  id: providedId,
  control: externalControl,
  required,
  validate,
}: FormDateRangePickerProps<TFieldValues, TName>) {
  const generatedId = useId();
  const inputId = providedId ?? generatedId;
  const formConfigContext = useContext(FormConfigContext);
  const formConfig: FormConfig = formConfigContext ?? {};
  const rhfContext = useRHFFormContext<TFieldValues>();
  const control = externalControl ?? rhfContext?.control;

  const registerFieldValidation = formConfigContext?.registerFieldValidation;
  const unregisterFieldValidation = formConfigContext?.unregisterFieldValidation;

  useEffect(() => {
    if (!registerFieldValidation) {
      return;
    }

    const rules: FieldValidationRules = {};
    if (required !== undefined) rules.required = required;
    if (validate !== undefined) rules.validate = validate;

    registerFieldValidation({
      name: name as string,
      type: "array",
      rules,
    });

    return () => {
      unregisterFieldValidation?.(name as string);
    };
  }, [registerFieldValidation, unregisterFieldValidation, name, required, validate]);

  const { field, fieldState } = useController<TFieldValues, TName>({
    name,
    control,
  });

  const fieldError = fieldState.error?.message;
  const errorMessage = customError ?? fieldError;
  const range = (field.value ?? {}) as DateRangeValue;

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
      <DateRangePicker
        id={inputId}
        value={range}
        onChange={field.onChange}
        placeholder={placeholder}
        disabled={disabled ?? formConfig.disabled}
        loading={loading}
        className={className}
        aria-invalid={!!errorMessage}
        aria-describedby={errorMessage ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
      />
    </FieldLayout>
  );
}

FormDateRangePicker.displayName = "FormDateRangePicker";
