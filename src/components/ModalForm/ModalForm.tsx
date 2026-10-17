"use client"

import type { ReactNode } from "react"
import type { FieldValues, SubmitHandler, UseFormProps } from "react-hook-form"
import type { z } from "zod"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../Dialog"
import { Form, type FormProps } from "../Form/Form"
import { Button } from "../Button"
import { cn } from "../../utils/cn"

export interface ModalFormProps<TFieldValues extends FieldValues = FieldValues> {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  title: ReactNode
  description?: ReactNode
  children: ReactNode
  onSubmit?: SubmitHandler<TFieldValues>
  defaultValues?: UseFormProps<TFieldValues>["defaultValues"]
  schema?: z.ZodType<TFieldValues>
  submitting?: boolean
  error?: ReactNode
  submitLabel?: string
  cancelLabel?: string
  className?: string
  formClassName?: string
  config?: FormProps<TFieldValues>["config"]
}

export function ModalForm<TFieldValues extends FieldValues = FieldValues>({
  open,
  onOpenChange,
  title,
  description,
  children,
  onSubmit,
  defaultValues,
  schema,
  submitting = false,
  error,
  submitLabel = "Save",
  cancelLabel = "Cancel",
  className,
  formClassName,
  config,
}: ModalFormProps<TFieldValues>) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn("sm:max-w-lg", className)}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description ? <DialogDescription>{description}</DialogDescription> : null}
        </DialogHeader>
        <Form<TFieldValues>
          schema={schema}
          defaultValues={defaultValues}
          onSubmit={onSubmit}
          config={config}
          className={cn("space-y-4", formClassName)}
        >
          {children}
          {error ? (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          ) : null}
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              disabled={submitting}
              onClick={() => onOpenChange?.(false)}
            >
              {cancelLabel}
            </Button>
            <Button type="submit" loading={submitting}>
              {submitLabel}
            </Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

ModalForm.displayName = "ModalForm"
