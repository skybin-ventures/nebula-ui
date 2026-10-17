'use client';

import type { ReactNode } from "react";
import { cn } from "../../utils/cn";
import { Label } from "../../primitives/label";
import { labelVariants } from "./variants";
import type { FormConfig } from "./context";

export interface FieldLayoutProps {
  inputId: string;
  label?: string;
  required?: boolean;
  helperText?: string;
  errorMessage?: string;
  showError?: boolean;
  fullWidth?: boolean;
  formConfig?: FormConfig;
  children: ReactNode;
}

function resolveLabelWidth(labelWidth?: string | number): string | undefined {
  if (labelWidth === undefined) {
    return undefined;
  }

  return typeof labelWidth === "number" ? `${labelWidth}px` : labelWidth;
}

export function FieldLayout({
  inputId,
  label,
  required,
  helperText,
  errorMessage,
  showError = true,
  fullWidth = true,
  formConfig = {},
  children,
}: FieldLayoutProps) {
  const layout = formConfig.layout ?? "vertical";
  const size = formConfig.size ?? "md";
  const labelWidth = resolveLabelWidth(formConfig.labelWidth);
  const hasError = !!errorMessage;
  const showHelper = !!helperText && !hasError;
  // Align label with input top padding for horizontal layout (sm/md/lg heights).
  const horizontalLabelOffset =
    size === "sm" ? "pt-1.5" : size === "lg" ? "pt-3" : "pt-2.5";

  const labelNode = label ? (
    <Label
      id={`${inputId}-label`}
      htmlFor={inputId}
      className={cn(
        labelVariants({
          required: !!required,
          layout: layout === "inline" ? "inline" : layout === "horizontal" ? "horizontal" : "vertical",
        }),
        layout === "horizontal" && cn("shrink-0", horizontalLabelOffset),
        layout === "inline" && "shrink-0"
      )}
      style={layout === "horizontal" && labelWidth ? { width: labelWidth } : undefined}
    >
      {label}
      {formConfig.colon && ":"}
    </Label>
  ) : null;

  const messages = (
    <>
      {showError && hasError && (
        <p
          id={`${inputId}-error`}
          className="text-sm text-destructive"
          role="alert"
        >
          {errorMessage}
        </p>
      )}

      {showHelper && (
        <p
          id={`${inputId}-helper`}
          className="text-sm text-muted-foreground"
        >
          {helperText}
        </p>
      )}
    </>
  );

  if (layout === "horizontal") {
    return (
      <div className={cn("space-y-1.5", fullWidth && "w-full")}>
        <div className="flex items-start gap-4">
          {labelNode}
          <div className="min-w-0 flex-1 space-y-1.5">
            {children}
            {messages}
          </div>
        </div>
      </div>
    );
  }

  if (layout === "inline") {
    return (
      <div className={cn("space-y-1.5", fullWidth && "w-full")}>
        <div className="flex flex-wrap items-center gap-3">
          {labelNode}
          <div className="min-w-0 flex-1">{children}</div>
        </div>
        {messages}
      </div>
    );
  }

  return (
    <div className={cn("space-y-1.5", fullWidth && "w-full")}>
      {labelNode}
      {children}
      {messages}
    </div>
  );
}
