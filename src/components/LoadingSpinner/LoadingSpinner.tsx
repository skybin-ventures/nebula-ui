"use client"

import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../utils/cn"

const spinnerVariants = cva(
  "inline-block animate-spin rounded-full border-2 border-current border-r-transparent",
  {
    variants: {
      size: {
        sm: "size-3",
        md: "size-4",
        lg: "size-6",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

export interface LoadingSpinnerProps extends VariantProps<typeof spinnerVariants> {
  className?: string
  label?: string
}

export function LoadingSpinner({ size, className, label = "Loading" }: LoadingSpinnerProps) {
  return (
    <span
      role="status"
      aria-label={label}
      className={cn(spinnerVariants({ size }), className)}
    />
  )
}

LoadingSpinner.displayName = "LoadingSpinner"
