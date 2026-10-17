"use client"

import type { ReactNode } from "react"
import { cn } from "../../utils/cn"

export interface SectionHeaderProps {
  title: ReactNode
  description?: ReactNode
  actions?: ReactNode
  className?: string
}

export function SectionHeader({ title, description, actions, className }: SectionHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between", className)}>
      <div className="space-y-1">
        <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
        {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
      </div>
      {actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
    </div>
  )
}

SectionHeader.displayName = "SectionHeader"

export interface SectionProps {
  title?: ReactNode
  description?: ReactNode
  actions?: ReactNode
  children?: ReactNode
  className?: string
  headerClassName?: string
}

export function Section({
  title,
  description,
  actions,
  children,
  className,
  headerClassName,
}: SectionProps) {
  return (
    <section className={cn("space-y-4", className)}>
      {(title || description || actions) && (
        <SectionHeader
          title={title ?? ""}
          description={description}
          actions={actions}
          className={headerClassName}
        />
      )}
      {children}
    </section>
  )
}

Section.displayName = "Section"
