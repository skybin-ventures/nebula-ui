"use client"

import { useContext, useEffect, useId } from "react"
import {
  useController,
  useFormContext as useRHFFormContext,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form"
import { FormConfigContext, type FieldValidationRules, type FormConfig } from "../Form/context"
import { FieldLayout } from "../Form/FieldLayout"
import { ColorPicker, HEX_PATTERN } from "./ColorPicker"

export interface FormColorPickerProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName
  label?: string
  helperText?: string
  showError?: boolean
  error?: string
  fullWidth?: boolean
  swatches?: string[]
  disabled?: boolean
  className?: string
  id?: string
  control?: Control<TFieldValues>
  required?: boolean | string
  validate?: (value: unknown) => boolean | string | Promise<boolean | string>
}

export function FormColorPicker<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  label,
  helperText,
  showError = true,
  error: customError,
  fullWidth = true,
  swatches,
  disabled,
  className,
  id: providedId,
  control: externalControl,
  required,
  validate,
}: FormColorPickerProps<TFieldValues, TName>) {
  const generatedId = useId()
  const inputId = providedId ?? generatedId
  const formConfigContext = useContext(FormConfigContext)
  const formConfig: FormConfig = formConfigContext ?? {}
  const rhfContext = useRHFFormContext<TFieldValues>()
  const control = externalControl ?? rhfContext?.control

  useEffect(() => {
    if (!formConfigContext?.registerFieldValidation) return
    const rules: FieldValidationRules = {
      pattern: { value: HEX_PATTERN, message: "Enter a valid hex color (#rrggbb)" },
    }
    if (required !== undefined) rules.required = required
    if (validate !== undefined) rules.validate = validate
    formConfigContext.registerFieldValidation({
      name: name as string,
      type: "string",
      rules,
    })
    return () => formConfigContext.unregisterFieldValidation?.(name as string)
  }, [formConfigContext, name, required, validate])

  const { field, fieldState } = useController<TFieldValues, TName>({ name, control })
  const errorMessage = customError ?? fieldState.error?.message
  const effectiveDisabled = disabled ?? formConfig.disabled

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
      <ColorPicker
        id={inputId}
        value={typeof field.value === "string" ? field.value : "#000000"}
        onChange={field.onChange}
        swatches={swatches}
        disabled={effectiveDisabled}
        className={className}
        aria-invalid={!!errorMessage}
        aria-describedby={
          errorMessage ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
        }
      />
    </FieldLayout>
  )
}

FormColorPicker.displayName = "FormColorPicker"
