"use client"

import type { ReactNode } from "react"
import { cn } from "../../utils/cn"

export interface TopNavigationLink {
  href?: string
  label: ReactNode
  active?: boolean
  onClick?: () => void
}

export interface TopNavigationProps {
  brand?: ReactNode
  links?: TopNavigationLink[]
  actions?: ReactNode
  className?: string
}

export function TopNavigation({ brand, links = [], actions, className }: TopNavigationProps) {
  return (
    <header
      className={cn(
        "flex h-14 items-center gap-4 border-b bg-background px-4",
        className
      )}
    >
      {brand ? <div className="shrink-0 font-semibold">{brand}</div> : null}
      <nav className="flex flex-1 items-center gap-1 overflow-x-auto" aria-label="Primary">
        {links.map((link, index) => {
          const classNameLink = cn(
            "rounded-md px-3 py-1.5 text-sm transition-colors",
            link.active
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
          )
          if (link.href) {
            return (
              <a key={index} href={link.href} className={classNameLink} aria-current={link.active ? "page" : undefined}>
                {link.label}
              </a>
            )
          }
          return (
            <button
              key={index}
              type="button"
              className={classNameLink}
              aria-current={link.active ? "page" : undefined}
              onClick={link.onClick}
            >
              {link.label}
            </button>
          )
        })}
      </nav>
      {actions ? <div className="ml-auto flex shrink-0 items-center gap-2">{actions}</div> : null}
    </header>
  )
}

TopNavigation.displayName = "TopNavigation"
