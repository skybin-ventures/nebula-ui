"use client"

import { useContext, useLayoutEffect, useId, useMemo, useState, type ComponentProps } from "react"
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
import { PasswordRevealToggle } from "./PasswordRevealToggle"

export interface FormPasswordProps<
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
  minLength?: number
  placeholder?: string
  showStrength?: boolean
  /** Defaults to `new-password`; use `current-password` for login forms. */
  autoComplete?: ComponentProps<"input">["autoComplete"]
  ref?: ComponentProps<"input">["ref"]
}

function scorePassword(value: string): { score: number; label: string } {
  let score = 0
  if (value.length >= 8) score += 1
  if (value.length >= 12) score += 1
  if (/[a-z]/.test(value) && /[A-Z]/.test(value)) score += 1
  if (/\d/.test(value)) score += 1
  if (/[^A-Za-z0-9]/.test(value)) score += 1
  const labels = ["Too weak", "Weak", "Fair", "Good", "Strong", "Excellent"]
  return { score, label: labels[Math.min(score, labels.length - 1)]! }
}

export function FormPassword<
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
  minLength,
  placeholder,
  showStrength = true,
  autoComplete = "new-password",
  ref,
}: FormPasswordProps<TFieldValues, TName>) {
  const generatedId = useId()
  const inputId = providedId ?? generatedId
  const [visible, setVisible] = useState(false)
  const formConfigContext = useContext(FormConfigContext)
  const formConfig: FormConfig = formConfigContext ?? {}
  const rhfContext = useRHFFormContext<TFieldValues>()
  const control = externalControl ?? rhfContext?.control

  useLayoutEffect(() => {
    if (!formConfigContext?.registerFieldValidation) return
    const rules: FieldValidationRules = {}
    if (required !== undefined) rules.required = required
    if (validate !== undefined) rules.validate = validate
    if (minLength !== undefined) rules.minLength = minLength
    formConfigContext.registerFieldValidation({
      name: name as string,
      type: "string",
      rules,
    })
    return () => formConfigContext.unregisterFieldValidation?.(name as string)
  }, [formConfigContext, name, required, validate, minLength])

  const { field, fieldState } = useController<TFieldValues, TName>({ name, control })
  const errorMessage = customError ?? fieldState.error?.message
  const effectiveDisabled = disabled ?? formConfig.disabled
  const password = typeof field.value === "string" ? field.value : ""
  const strength = useMemo(() => scorePassword(password), [password])

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
      <div className="space-y-2">
        <div className="relative">
          <TextBoxPrimitive
            ref={ref}
            id={inputId}
            name={field.name}
            type={visible ? "text" : "password"}
            autoComplete={autoComplete}
            disabled={effectiveDisabled}
            placeholder={placeholder}
            value={password}
            onBlur={field.onBlur}
            onChange={(event) => field.onChange(event.target.value)}
            aria-invalid={!!errorMessage}
            aria-describedby={
              errorMessage ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
            }
            className={cn("pr-10", className)}
          />
          <div className="absolute inset-y-0 right-1 z-10 flex items-center">
            <PasswordRevealToggle
              visible={visible}
              onToggle={() => setVisible((v) => !v)}
              disabled={effectiveDisabled}
            />
          </div>
        </div>
        {showStrength && password.length > 0 ? (
          <div className="space-y-1" aria-live="polite">
            <div className="flex gap-1">
              {Array.from({ length: 5 }, (_, i) => (
                <div
                  key={i}
                  className={cn(
                    "h-1 flex-1 rounded-full bg-muted",
                    i < strength.score &&
                      (strength.score <= 2
                        ? "bg-destructive"
                        : strength.score <= 3
                          ? "bg-amber-500"
                          : "bg-emerald-500")
                  )}
                />
              ))}
            </div>
            <p className="text-xs text-muted-foreground">{strength.label}</p>
          </div>
        ) : null}
      </div>
    </FieldLayout>
  )
}

FormPassword.displayName = "FormPassword"
