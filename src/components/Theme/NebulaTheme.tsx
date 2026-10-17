"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"

export type ThemeMode = "light" | "dark" | "system"
export type ResolvedTheme = "light" | "dark"

export interface NebulaThemeContextValue {
  theme: ThemeMode
  resolvedTheme: ResolvedTheme
  setTheme: (theme: ThemeMode) => void
}

const STORAGE_KEY = "nebula-ui-theme"

const NebulaThemeContext = createContext<NebulaThemeContextValue | null>(null)

function getSystemTheme(): ResolvedTheme {
  if (typeof window === "undefined") return "light"
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

function applyTheme(resolved: ResolvedTheme) {
  const root = document.documentElement
  root.classList.toggle("dark", resolved === "dark")
  root.style.colorScheme = resolved
}

export interface NebulaThemeProps {
  children: ReactNode
  /** Initial theme before storage / system resolution. Default: `"system"`. */
  defaultTheme?: ThemeMode
  /** Persist preference to localStorage. Default: `true`. */
  storageKey?: string | false
  /** Attribute/class applied for dark mode. Default: class `"dark"` on `documentElement`. */
  attribute?: "class"
}

export function NebulaTheme({
  children,
  defaultTheme = "system",
  storageKey = STORAGE_KEY,
}: NebulaThemeProps) {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    if (typeof window === "undefined" || storageKey === false) return defaultTheme
    const stored = window.localStorage.getItem(storageKey)
    if (stored === "light" || stored === "dark" || stored === "system") return stored
    return defaultTheme
  })

  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>(getSystemTheme)

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)")
    const onChange = () => setSystemTheme(media.matches ? "dark" : "light")
    onChange()
    media.addEventListener("change", onChange)
    return () => media.removeEventListener("change", onChange)
  }, [])

  const resolvedTheme: ResolvedTheme = theme === "system" ? systemTheme : theme

  useEffect(() => {
    applyTheme(resolvedTheme)
  }, [resolvedTheme])

  const setTheme = useCallback(
    (next: ThemeMode) => {
      setThemeState(next)
      if (storageKey !== false && typeof window !== "undefined") {
        window.localStorage.setItem(storageKey, next)
      }
    },
    [storageKey]
  )

  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme }),
    [theme, resolvedTheme, setTheme]
  )

  return <NebulaThemeContext.Provider value={value}>{children}</NebulaThemeContext.Provider>
}

export function useTheme(): NebulaThemeContextValue {
  const ctx = useContext(NebulaThemeContext)
  if (!ctx) {
    throw new Error("useTheme must be used within <NebulaTheme>")
  }
  return ctx
}
