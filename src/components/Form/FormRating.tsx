"use client"

import { useContext, useEffect, useId, type KeyboardEvent } from "react"
import { Star } from "lucide-react"
import {
  useController,
  useFormContext as useRHFFormContext,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form"
import { cn } from "../../utils/cn"
import { FormConfigContext, type FieldValidationRules, type FormConfig } from "./context"
import { FieldLayout } from "./FieldLayout"

export interface FormRatingProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName
  label?: string
  helperText?: string
  showError?: boolean
  error?: string
  fullWidth?: boolean
  disabled?: boolean
  className?: string
  id?: string
  control?: Control<TFieldValues>
  required?: boolean | string
  validate?: (value: unknown) => boolean | string | Promise<boolean | string>
  /** Maximum rating (star count). Default 5. */
  max?: number
  readOnly?: boolean
}

export function FormRating<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  label,
  helperText,
  showError = true,
  error: customError,
  fullWidth = true,
  disabled,
  className,
  id: providedId,
  control: externalControl,
  required,
  validate,
  max = 5,
  readOnly = false,
}: FormRatingProps<TFieldValues, TName>) {
  const generatedId = useId()
  const inputId = providedId ?? generatedId
  const formConfigContext = useContext(FormConfigContext)
  const formConfig: FormConfig = formConfigContext ?? {}
  const rhfContext = useRHFFormContext<TFieldValues>()
  const control = externalControl ?? rhfContext?.control

  useEffect(() => {
    if (!formConfigContext?.registerFieldValidation) return
    const rules: FieldValidationRules = { min: 1, max }
    if (required !== undefined) rules.required = required
    if (validate !== undefined) rules.validate = validate
    formConfigContext.registerFieldValidation({
      name: name as string,
      type: "number",
      rules,
    })
    return () => formConfigContext.unregisterFieldValidation?.(name as string)
  }, [formConfigContext, name, required, validate, max])

  const { field, fieldState } = useController<TFieldValues, TName>({ name, control })
  const errorMessage = customError ?? fieldState.error?.message
  const effectiveDisabled = (disabled ?? formConfig.disabled) || readOnly
  const value = typeof field.value === "number" ? field.value : 0

  const setValue = (next: number) => {
    if (effectiveDisabled) return
    field.onChange(next)
  }

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (effectiveDisabled) return
    if (event.key === "ArrowRight" || event.key === "ArrowUp") {
      event.preventDefault()
      setValue(Math.min(max, (value || 0) + 1))
    } else if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
      event.preventDefault()
      setValue(Math.max(1, (value || 1) - 1))
    } else if (event.key === "Home") {
      event.preventDefault()
      setValue(1)
    } else if (event.key === "End") {
      event.preventDefault()
      setValue(max)
    }
  }

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
        id={inputId}
        role="slider"
        tabIndex={effectiveDisabled ? -1 : 0}
        aria-valuemin={1}
        aria-valuemax={max}
        aria-valuenow={value || undefined}
        aria-valuetext={value ? `${value} of ${max}` : "No rating"}
        aria-invalid={!!errorMessage}
        aria-describedby={
          errorMessage ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
        }
        aria-disabled={effectiveDisabled || undefined}
        onKeyDown={onKeyDown}
        onBlur={field.onBlur}
        className={cn("inline-flex items-center gap-1 outline-none", className)}
      >
        {Array.from({ length: max }, (_, index) => {
          const star = index + 1
          const active = star <= value
          return (
            <button
              key={star}
              type="button"
              disabled={effectiveDisabled}
              aria-label={`${star} star${star === 1 ? "" : "s"}`}
              className={cn(
                "rounded-sm p-0.5 text-muted-foreground transition-colors",
                "hover:text-amber-500 focus-visible:ring-2 focus-visible:ring-ring",
                active && "text-amber-500",
                effectiveDisabled && "cursor-not-allowed opacity-60"
              )}
              onClick={() => setValue(star)}
            >
              <Star className={cn("h-5 w-5", active && "fill-current")} />
            </button>
          )
        })}
      </div>
    </FieldLayout>
  )
}

FormRating.displayName = "FormRating"
