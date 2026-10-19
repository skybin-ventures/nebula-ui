"use client"

import { useContext, useLayoutEffect, useId, type ReactNode } from "react"
import {
  useController,
  useFormContext as useRHFFormContext,
  type FieldPath,
  type FieldValues,
} from "react-hook-form"
import type { FormControl } from "./formControl"
import { cn } from "../../utils/cn"
import { Checkbox as ShadcnCheckbox } from "../../primitives/checkbox"
import { FormConfigContext, type FieldValidationRules, type FormConfig } from "./context"
import { FieldLayout } from "./FieldLayout"

export interface FormConsentProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName
  /** Agreement body; may include links as children */
  children: ReactNode
  label?: string
  helperText?: string
  showError?: boolean
  error?: string
  disabled?: boolean
  className?: string
  id?: string
  control?: FormControl<TFieldValues>
  required?: boolean | string
  validate?: (value: unknown) => boolean | string | Promise<boolean | string>
}

export function FormConsent<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  children,
  label,
  helperText,
  showError = true,
  error: customError,
  disabled,
  className,
  id: providedId,
  control: externalControl,
  required = "You must accept to continue",
  validate,
}: FormConsentProps<TFieldValues, TName>) {
  const generatedId = useId()
  const inputId = providedId ?? generatedId
  const formConfigContext = useContext(FormConfigContext)
  const formConfig: FormConfig = formConfigContext ?? {}
  const rhfContext = useRHFFormContext<TFieldValues>()
  const control = externalControl ?? rhfContext?.control

  useLayoutEffect(() => {
    if (!formConfigContext?.registerFieldValidation) return
    const rules: FieldValidationRules = {}
    if (required !== undefined) rules.required = required
    if (validate !== undefined) rules.validate = validate
    formConfigContext.registerFieldValidation({
      name: name as string,
      type: "boolean",
      rules,
    })
    return () => formConfigContext.unregisterFieldValidation?.(name as string)
  }, [formConfigContext, name, required, validate])

  const { field, fieldState } = useController<TFieldValues, TName>({ name, control })
  const errorMessage = customError ?? fieldState.error?.message
  const effectiveDisabled = disabled ?? formConfig.disabled
  // When FieldLayout already owns the accessible name via `label`, keep the
  // agreement body as a non-label container to avoid dual labelling.
  const AgreementBody = label ? "div" : "label"

  return (
    <FieldLayout
      inputId={inputId}
      label={label}
      required={!!required}
      helperText={helperText}
      errorMessage={showError ? errorMessage : undefined}
      showError={showError}
      formConfig={formConfig}
    >
      <div className={cn("flex items-start gap-3 rounded-md border border-border bg-muted/30 p-3", className)}>
        <ShadcnCheckbox
          id={inputId}
          checked={field.value === true}
          onCheckedChange={(checked) => field.onChange(checked === true)}
          onBlur={field.onBlur}
          disabled={effectiveDisabled}
          aria-invalid={!!errorMessage}
          aria-describedby={
            errorMessage ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
          }
          className="mt-0.5"
        />
        <AgreementBody
          {...(label ? {} : { htmlFor: inputId })}
          className="text-sm leading-relaxed text-foreground"
        >
          {children}
        </AgreementBody>
      </div>
    </FieldLayout>
  )
}

FormConsent.displayName = "FormConsent"
