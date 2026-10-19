"use client"

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react"

export interface NotificationItem {
  id: string
  title: string
  description?: string
  read?: boolean
  createdAt?: string
}

export interface NotificationContextValue {
  notifications: NotificationItem[]
  unreadCount: number
  addNotification: (item: Omit<NotificationItem, "id"> & { id?: string }) => string
  markRead: (id: string) => void
  markAllRead: () => void
  removeNotification: (id: string) => void
  clear: () => void
}

const NotificationContext = createContext<NotificationContextValue | null>(null)

export interface NotificationProviderProps {
  children: ReactNode
  initialNotifications?: NotificationItem[]
}

export function NotificationProvider({
  children,
  initialNotifications = [],
}: NotificationProviderProps) {
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications)

  const addNotification = useCallback(
    (item: Omit<NotificationItem, "id"> & { id?: string }) => {
      const id = item.id ?? `n-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
      setNotifications((current) => [{ ...item, id, read: item.read ?? false }, ...current])
      return id
    },
    []
  )

  const markRead = useCallback((id: string) => {
    setNotifications((current) =>
      current.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  }, [])

  const markAllRead = useCallback(() => {
    setNotifications((current) => current.map((n) => ({ ...n, read: true })))
  }, [])

  const removeNotification = useCallback((id: string) => {
    setNotifications((current) => current.filter((n) => n.id !== id))
  }, [])

  const clear = useCallback(() => setNotifications([]), [])

  const value = useMemo<NotificationContextValue>(
    () => ({
      notifications,
      unreadCount: notifications.filter((n) => !n.read).length,
      addNotification,
      markRead,
      markAllRead,
      removeNotification,
      clear,
    }),
    [notifications, addNotification, markRead, markAllRead, removeNotification, clear]
  )

  return (
    <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components -- provider + hook pair
export function useNotification(): NotificationContextValue {
  const ctx = useContext(NotificationContext)
  if (!ctx) {
    throw new Error("useNotification must be used within NotificationProvider")
  }
  return ctx
}
