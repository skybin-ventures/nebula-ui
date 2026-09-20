'use client';

import { useContext, useEffect, useId } from "react";
import { useController, useFormContext as useRHFFormContext, type Control, type FieldPath, type FieldValues } from "react-hook-form";
import { FormConfigContext, type FieldValidationRules, type FormConfig } from "../Form/context";
import { FieldLayout } from "../Form/FieldLayout";
import { MultiSelect } from "./MultiSelect";
import type { SelectOption } from "../Form/Select";

export interface FormMultiSelectProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  name: TName;
  options: SelectOption[];
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

export function FormMultiSelect<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  options,
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
}: FormMultiSelectProps<TFieldValues, TName>) {
  const generatedId = useId();
  const inputId = providedId ?? generatedId;
  const formConfigContext = useContext(FormConfigContext);
  const formConfig: FormConfig = formConfigContext ?? {};
  const rhfContext = useRHFFormContext<TFieldValues>();
  const control = externalControl ?? rhfContext?.control;

  useEffect(() => {
    if (!formConfigContext?.registerFieldValidation) {
      return;
    }

    const rules: FieldValidationRules = {};
    if (required !== undefined) rules.required = required;
    if (validate !== undefined) rules.validate = validate;

    formConfigContext.registerFieldValidation({
      name: name as string,
      type: "array",
      rules,
    });

    return () => {
      formConfigContext.unregisterFieldValidation?.(name as string);
    };
  }, [formConfigContext, name, required, validate]);

  const { field, fieldState } = useController<TFieldValues, TName>({
    name,
    control,
  });

  const errorMessage = customError ?? fieldState.error?.message;
  const selected = Array.isArray(field.value) ? field.value.map(String) : [];

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
      <MultiSelect
        id={inputId}
        options={options}
        value={selected}
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

FormMultiSelect.displayName = "FormMultiSelect";
