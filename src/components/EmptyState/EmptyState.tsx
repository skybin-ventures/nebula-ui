'use client';

import type { ReactNode } from "react";
import { Inbox } from "lucide-react";
import { cn } from "../../utils/cn";
import { Button } from "../Button";

export interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
}

export function EmptyState({
  title = "Nothing here yet",
  description = "Get started by creating the first item.",
  icon,
  action,
  actionLabel,
  onAction,
  loading = false,
  disabled = false,
  className,
}: EmptyStateProps) {
  return (
    <div
      role="status"
      className={cn("flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed px-6 py-12 text-center", className)}
    >
      <div className="text-muted-foreground">{icon ?? <Inbox className="h-10 w-10" />}</div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="max-w-md text-sm text-muted-foreground">{description}</p>
      {action}
      {actionLabel ? (
        <Button type="button" onClick={onAction} loading={loading} disabled={disabled || loading}>
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}

EmptyState.displayName = "EmptyState";
