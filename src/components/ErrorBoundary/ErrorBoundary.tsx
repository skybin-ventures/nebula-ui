"use client"

import { Component, type ErrorInfo, type ReactNode } from "react"
import { cn } from "../../utils/cn"
import { Button } from "../Button"

export interface ErrorBoundaryFallbackProps {
  error: Error
  reset: () => void
}

export interface ErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode | ((props: ErrorBoundaryFallbackProps) => ReactNode)
  onError?: (error: Error, info: ErrorInfo) => void
  className?: string
}

interface ErrorBoundaryState {
  error: Error | null
}

function DefaultFallback({ error, reset }: ErrorBoundaryFallbackProps) {
  return (
    <div
      role="alert"
      className="flex flex-col items-start gap-3 rounded-lg border border-destructive/40 bg-destructive/5 p-6"
    >
      <div>
        <h2 className="text-base font-semibold">Something went wrong</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {error.message || "An unexpected error occurred."}
        </p>
      </div>
      <Button type="button" variant="outline" size="sm" onClick={reset}>
        Try again
      </Button>
    </div>
  )
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.props.onError?.(error, info)
  }

  reset = () => {
    this.setState({ error: null })
  }

  render() {
    const { error } = this.state
    const { children, fallback, className } = this.props

    if (error) {
      if (typeof fallback === "function") {
        return fallback({ error, reset: this.reset })
      }
      if (fallback) return fallback
      return (
        <div className={cn(className)}>
          <DefaultFallback error={error} reset={this.reset} />
        </div>
      )
    }

    return children
  }
}
