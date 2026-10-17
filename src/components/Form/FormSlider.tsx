"use client"

import { useContext, useLayoutEffect, useId } from "react"
import {
  useController,
  useFormContext as useRHFFormContext,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form"
import { FormConfigContext, type FieldValidationRules, type FormConfig } from "./context"
import { FieldLayout } from "./FieldLayout"
import { Slider } from "../Slider"

export interface FormSliderProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName
  label?: string
  helperText?: string
  showError?: boolean
  error?: string
  fullWidth?: boolean
  min?: number
  max?: number
  step?: number
  disabled?: boolean
  className?: string
  id?: string
  control?: Control<TFieldValues>
  required?: boolean | string
  validate?: (value: unknown) => boolean | string | Promise<boolean | string>
}

export function FormSlider<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  label,
  helperText,
  showError = true,
  error: customError,
  fullWidth = true,
  min = 0,
  max = 100,
  step = 1,
  disabled,
  className,
  id: providedId,
  control: externalControl,
  required,
  validate,
}: FormSliderProps<TFieldValues, TName>) {
  const generatedId = useId()
  const inputId = providedId ?? generatedId
  const formConfigContext = useContext(FormConfigContext)
  const formConfig: FormConfig = formConfigContext ?? {}
  const rhfContext = useRHFFormContext<TFieldValues>()
  const control = externalControl ?? rhfContext?.control

  useLayoutEffect(() => {
    if (!formConfigContext?.registerFieldValidation) return
    const rules: FieldValidationRules = { min, max }
    if (required !== undefined) rules.required = required
    if (validate !== undefined) rules.validate = validate
    formConfigContext.registerFieldValidation({
      name: name as string,
      type: "number",
      rules,
    })
    return () => formConfigContext.unregisterFieldValidation?.(name as string)
  }, [formConfigContext, name, required, validate, min, max])

  const { field, fieldState } = useController<TFieldValues, TName>({ name, control })
  const errorMessage = customError ?? fieldState.error?.message
  const effectiveDisabled = disabled ?? formConfig.disabled
  const numeric = typeof field.value === "number" ? field.value : min

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
      <Slider
        id={inputId}
        min={min}
        max={max}
        step={step}
        disabled={effectiveDisabled}
        value={[numeric]}
        aria-invalid={!!errorMessage}
        aria-describedby={
          errorMessage ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
        }
        className={className}
        onValueChange={(next) => field.onChange(next[0] ?? min)}
      />
    </FieldLayout>
  )
}

FormSlider.displayName = "FormSlider"
