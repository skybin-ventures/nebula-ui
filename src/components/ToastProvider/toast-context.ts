import * as React from "react"

export interface ToastOptions {
  id?: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: { label: React.ReactNode; onClick?: () => void }
  duration?: number
  variant?: "default" | "destructive"
}

export interface ToastContextValue {
  toast: (props: Omit<ToastOptions, "id"> & { id?: string }) => string
  dismiss: (id: string) => void
  dismissAll: () => void
}

export const ToastContext = React.createContext<ToastContextValue>({
  toast: () => "",
  dismiss: () => {},
  dismissAll: () => {},
})

export function useToastContext() {
  return React.useContext(ToastContext)
}
