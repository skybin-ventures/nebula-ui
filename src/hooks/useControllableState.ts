import { useCallback, useState } from "react"

export function useControllableState<T>(
  value: T | undefined,
  defaultValue: T,
  onChange?: (value: T) => void
): [T, (next: T | ((previous: T) => T)) => void] {
  const [uncontrolled, setUncontrolled] = useState(defaultValue)
  const isControlled = value !== undefined
  const current = isControlled ? value : uncontrolled

  const setValue = useCallback(
    (next: T | ((previous: T) => T)) => {
      const resolve = (previous: T) =>
        typeof next === "function" ? (next as (previous: T) => T)(previous) : next

      if (isControlled) {
        onChange?.(resolve(current))
        return
      }

      setUncontrolled((previous) => {
        const resolved = resolve(previous)
        onChange?.(resolved)
        return resolved
      })
    },
    [current, isControlled, onChange]
  )

  return [current, setValue]
}
