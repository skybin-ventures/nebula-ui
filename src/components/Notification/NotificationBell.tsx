"use client"

import { Bell } from "lucide-react"
import { cn } from "../../utils/cn"
import { Button } from "../../primitives/button"
import { Popover, PopoverContent, PopoverTrigger } from "../Popover"
import { useNotification } from "./NotificationContext"

export interface NotificationBellProps {
  className?: string
  emptyText?: string
}

export function NotificationBell({
  className,
  emptyText = "No notifications",
}: NotificationBellProps) {
  const { notifications, unreadCount, markRead, markAllRead } = useNotification()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className={cn("relative", className)}
          aria-label={`Notifications${unreadCount ? `, ${unreadCount} unread` : ""}`}
        >
          <Bell className="h-4 w-4" />
          {unreadCount > 0 ? (
            <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] text-destructive-foreground">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          ) : null}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0">
        <div className="flex items-center justify-between border-b px-3 py-2">
          <p className="text-sm font-medium">Notifications</p>
          {unreadCount > 0 ? (
            <button
              type="button"
              className="text-xs text-muted-foreground hover:text-foreground"
              onClick={markAllRead}
            >
              Mark all read
            </button>
          ) : null}
        </div>
        <ul className="max-h-72 overflow-y-auto">
          {notifications.length === 0 ? (
            <li className="px-3 py-6 text-center text-sm text-muted-foreground">{emptyText}</li>
          ) : (
            notifications.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  className={cn(
                    "flex w-full flex-col gap-0.5 px-3 py-2.5 text-left text-sm hover:bg-accent",
                    !item.read && "bg-accent/40"
                  )}
                  onClick={() => markRead(item.id)}
                >
                  <span className="font-medium">{item.title}</span>
                  {item.description ? (
                    <span className="text-muted-foreground">{item.description}</span>
                  ) : null}
                </button>
              </li>
            ))
          )}
        </ul>
      </PopoverContent>
    </Popover>
  )
}

NotificationBell.displayName = "NotificationBell"
