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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "../InputOTP"

export interface FormInputOTPProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName
  label?: string
  helperText?: string
  showError?: boolean
  error?: string
  fullWidth?: boolean
  length?: number
  disabled?: boolean
  className?: string
  id?: string
  control?: Control<TFieldValues>
  required?: boolean | string
  onComplete?: (value: string) => void
  validate?: (value: unknown) => boolean | string | Promise<boolean | string>
}

export function FormInputOTP<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  label,
  helperText,
  showError = true,
  error: customError,
  fullWidth = true,
  length = 6,
  disabled,
  className,
  id: providedId,
  control: externalControl,
  required,
  onComplete,
  validate,
}: FormInputOTPProps<TFieldValues, TName>) {
  const generatedId = useId()
  const inputId = providedId ?? generatedId
  const formConfigContext = useContext(FormConfigContext)
  const formConfig: FormConfig = formConfigContext ?? {}
  const rhfContext = useRHFFormContext<TFieldValues>()
  const control = externalControl ?? rhfContext?.control

  useLayoutEffect(() => {
    if (!formConfigContext?.registerFieldValidation) return
    const rules: FieldValidationRules = {
      minLength: { value: length, message: `Enter all ${length} digits` },
      maxLength: length,
    }
    if (required !== undefined) rules.required = required
    if (validate !== undefined) rules.validate = validate
    formConfigContext.registerFieldValidation({
      name: name as string,
      type: "string",
      rules,
    })
    return () => formConfigContext.unregisterFieldValidation?.(name as string)
  }, [formConfigContext, name, required, validate, length])

  const { field, fieldState } = useController<TFieldValues, TName>({ name, control })
  const errorMessage = customError ?? fieldState.error?.message
  const effectiveDisabled = disabled ?? formConfig.disabled
  const value = typeof field.value === "string" ? field.value : ""

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
      <InputOTP
        id={inputId}
        maxLength={length}
        value={value}
        disabled={effectiveDisabled}
        containerClassName={className}
        onChange={(next) => {
          field.onChange(next)
          if (next.length === length) onComplete?.(next)
        }}
      >
        <InputOTPGroup>
          {Array.from({ length }, (_, index) => (
            <InputOTPSlot key={index} index={index} />
          ))}
        </InputOTPGroup>
      </InputOTP>
    </FieldLayout>
  )
}

FormInputOTP.displayName = "FormInputOTP"
