'use client';

import type { ReactNode } from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "../../utils/cn";
import { Alert, AlertDescription, AlertTitle } from "../Alert";
import { Button } from "../Button";

export interface ErrorStateProps {
  title?: string;
  description?: string;
  icon?: ReactNode;
  retryLabel?: string;
  onRetry?: () => void;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

export function ErrorState({
  title = "Something went wrong",
  description = "Please try again. If the problem continues, contact support.",
  icon,
  retryLabel = "Try again",
  onRetry,
  loading = false,
  disabled = false,
  className,
}: ErrorStateProps) {
  return (
    <Alert variant="destructive" className={cn("flex flex-col items-start gap-3 p-6", className)}>
      <div className="flex items-start gap-3">
        {icon ?? <AlertCircle className="h-5 w-5" />}
        <div>
          <AlertTitle>{title}</AlertTitle>
          <AlertDescription>{description}</AlertDescription>
        </div>
      </div>
      {onRetry ? (
        <Button type="button" variant="outline" onClick={onRetry} loading={loading} disabled={disabled || loading}>
          {retryLabel}
        </Button>
      ) : null}
    </Alert>
  );
}

ErrorState.displayName = "ErrorState";
