'use client';

import { useContext, useEffect, useId } from "react";
import { useController, useFormContext as useRHFFormContext, type Control, type FieldPath, type FieldValues } from "react-hook-form";
import { FormConfigContext, type FieldValidationRules, type FormConfig } from "../Form/context";
import { FieldLayout } from "../Form/FieldLayout";
import { FileUpload } from "./FileUpload";

export interface FormFileUploadProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  name: TName;
  label?: string;
  helperText?: string;
  showError?: boolean;
  error?: string;
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
  maxSize?: number;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  id?: string;
  control?: Control<TFieldValues>;
  required?: boolean | string;
  validate?: (value: unknown) => boolean | string | Promise<boolean | string>;
}

export function FormFileUpload<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(props: FormFileUploadProps<TFieldValues, TName>) {
  const generatedId = useId();
  const inputId = props.id ?? generatedId;
  const formConfigContext = useContext(FormConfigContext);
  const formConfig: FormConfig = formConfigContext ?? {};
  const rhfContext = useRHFFormContext<TFieldValues>();
  const control = props.control ?? rhfContext?.control;

  useEffect(() => {
    if (!formConfigContext?.registerFieldValidation) {
      return;
    }

    const rules: FieldValidationRules = {};
    if (props.required !== undefined) rules.required = props.required;
    if (props.validate !== undefined) rules.validate = props.validate;

    formConfigContext.registerFieldValidation({
      name: props.name as string,
      type: "array",
      rules,
    });

    return () => {
      formConfigContext.unregisterFieldValidation?.(props.name as string);
    };
  }, [formConfigContext, props.name, props.required, props.validate]);

  const { field, fieldState } = useController<TFieldValues, TName>({
    name: props.name,
    control,
  });

  const errorMessage = props.error ?? fieldState.error?.message;
  const files = Array.isArray(field.value) ? field.value as File[] : [];

  return (
    <FieldLayout
      inputId={inputId}
      label={props.label}
      required={!!props.required}
      helperText={props.helperText}
      errorMessage={props.showError === false ? undefined : errorMessage}
      showError={props.showError !== false}
      fullWidth
      formConfig={formConfig}
    >
      <FileUpload
        id={inputId}
        value={files}
        onChange={field.onChange}
        accept={props.accept}
        multiple={props.multiple}
        maxFiles={props.maxFiles}
        maxSize={props.maxSize}
        disabled={props.disabled ?? formConfig.disabled}
        loading={props.loading}
        className={props.className}
        error={props.showError === false ? undefined : errorMessage}
      />
    </FieldLayout>
  );
}

FormFileUpload.displayName = "FormFileUpload";
