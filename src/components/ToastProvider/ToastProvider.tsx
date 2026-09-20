import * as React from "react"
import { ToastProvider as ToastProviderPrimitive } from "@/primitives/toast"
import { ToastViewport, Toast, ToastTitle, ToastDescription, ToastClose, ToastAction } from "@/primitives/toast"
import { cn } from "@/utils"
import { ToastContext, type ToastOptions } from "./toast-context"

export interface ToastProviderProps {
  children: React.ReactNode
  duration?: number
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "top-center" | "bottom-center"
  richColors?: boolean
  className?: string
}

const positionClasses: Record<string, string> = {
  "top-left": "items-start",
  "top-right": "items-end",
  "bottom-left": "items-end sm:items-start",
  "bottom-right": "items-end",
  "top-center": "items-center",
  "bottom-center": "items-center",
}

export function ToastProvider({
  children,
  duration = 4000,
  position = "bottom-right",
  richColors = false,
  className,
}: ToastProviderProps) {
  const [toasts, setToasts] = React.useState<ToastOptions[]>([])
  const timersRef = React.useRef(new Map<string, ReturnType<typeof setTimeout>>())

  const dismiss = React.useCallback((id: string) => {
    const timer = timersRef.current.get(id)
    if (timer) {
      clearTimeout(timer)
      timersRef.current.delete(id)
    }
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const dismissAll = React.useCallback(() => {
    timersRef.current.forEach((timer) => clearTimeout(timer))
    timersRef.current.clear()
    setToasts([])
  }, [])

  const addToast = React.useCallback(
    (props: Omit<ToastOptions, "id"> & { id?: string }) => {
      const id = props.id ?? crypto.randomUUID()
      const toastData: ToastOptions = { ...props, id }
      setToasts((prev) => [...prev, toastData])
      const dur = toastData.duration ?? duration
      if (dur > 0) {
        const timer = setTimeout(() => dismiss(id), dur)
        timersRef.current.set(id, timer)
      }
      return id
    },
    [duration, dismiss]
  )

  React.useEffect(() => {
    const timers = timersRef.current
    return () => {
      timers.forEach((timer) => clearTimeout(timer))
      timers.clear()
    }
  }, [])

  const contextValue = React.useMemo(
    () => ({ toast: addToast, dismiss, dismissAll }),
    [addToast, dismiss, dismissAll]
  )

  const variantClass = richColors ? "" : "border bg-background text-foreground"

  return (
    <ToastContext.Provider value={contextValue}>
      <ToastProviderPrimitive>
        {children}
        <ToastViewport
          className={cn(
            "fixed z-[100] flex max-h-screen w-full flex-col-reverse gap-2 p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
            positionClasses[position],
            className
          )}
        >
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              variant={toast.variant}
              className={cn(variantClass)}
              onOpenChange={(open) => {
                if (!open && toast.id) {
                  dismiss(toast.id)
                }
              }}
            >
              {toast.action && (
                <ToastAction
                  altText={typeof toast.action.label === "string" ? toast.action.label : "Action"}
                  onClick={toast.action.onClick}
                >
                  {toast.action.label}
                </ToastAction>
              )}
              <ToastTitle>{toast.title}</ToastTitle>
              <ToastDescription>{toast.description}</ToastDescription>
              <ToastClose />
            </Toast>
          ))}
        </ToastViewport>
      </ToastProviderPrimitive>
    </ToastContext.Provider>
  )
}
