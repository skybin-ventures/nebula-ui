"use client"

import { useContext, useEffect, useId, type ComponentProps } from "react"
import {
  useController,
  useFormContext as useRHFFormContext,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form"
import { cn } from "../../utils/cn"
import { TextBoxPrimitive } from "../../primitives/textbox"
import { FormConfigContext, type FieldValidationRules, type FormConfig } from "./context"
import { FieldLayout } from "./FieldLayout"

export interface FormCurrencyInputProps<
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
  /** ISO 4217 currency code used for symbol + formatting hints */
  currency?: string
  locale?: string
  min?: number
  max?: number
  step?: number
  placeholder?: string
  ref?: ComponentProps<"input">["ref"]
}

function currencySymbol(locale: string, currency: string): string {
  try {
    const parts = new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      currencyDisplay: "narrowSymbol",
    }).formatToParts(0)
    return parts.find((p) => p.type === "currency")?.value ?? currency
  } catch {
    return currency
  }
}

function parseNumber(raw: string): number | undefined {
  const trimmed = raw.trim()
  if (trimmed === "" || trimmed === "-" || trimmed === ".") return undefined
  const n = Number(trimmed.replace(/,/g, ""))
  return Number.isFinite(n) ? n : undefined
}

export function FormCurrencyInput<
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
  currency = "USD",
  locale = "en-US",
  min,
  max,
  step = 0.01,
  placeholder,
  ref,
}: FormCurrencyInputProps<TFieldValues, TName>) {
  const generatedId = useId()
  const inputId = providedId ?? generatedId
  const formConfigContext = useContext(FormConfigContext)
  const formConfig: FormConfig = formConfigContext ?? {}
  const rhfContext = useRHFFormContext<TFieldValues>()
  const control = externalControl ?? rhfContext?.control
  const symbol = currencySymbol(locale, currency)

  useEffect(() => {
    if (!formConfigContext?.registerFieldValidation) return
    const rules: FieldValidationRules = {}
    if (required !== undefined) rules.required = required
    if (validate !== undefined) rules.validate = validate
    if (min !== undefined) rules.min = min
    if (max !== undefined) rules.max = max
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
  const display =
    field.value === undefined || field.value === null || field.value === ""
      ? ""
      : String(field.value)

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
        <span
          className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-sm text-muted-foreground"
          aria-hidden="true"
        >
          {symbol}
        </span>
        <TextBoxPrimitive
          ref={ref}
          id={inputId}
          name={field.name}
          type="number"
          inputMode="decimal"
          step={step}
          min={min}
          max={max}
          disabled={effectiveDisabled}
          placeholder={placeholder}
          value={display}
          onBlur={field.onBlur}
          onChange={(event) => {
            const next = parseNumber(event.target.value)
            field.onChange(next === undefined ? undefined : next)
          }}
          aria-invalid={!!errorMessage}
          aria-describedby={
            errorMessage ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
          }
          className={cn("pl-8", className)}
        />
      </div>
    </FieldLayout>
  )
}

FormCurrencyInput.displayName = "FormCurrencyInput"
