import { useCallback, useEffect, useRef, useState } from "react"

export function useControllableState<T>(
  value: T | undefined,
  defaultValue: T,
  onChange?: (value: T) => void
): [T, (next: T | ((previous: T) => T)) => void] {
  const [uncontrolled, setUncontrolled] = useState(defaultValue)
  const isControlled = value !== undefined
  const current = isControlled ? value : uncontrolled
  const currentRef = useRef(current)
  useEffect(() => {
    currentRef.current = current
  })

  const setValue = useCallback(
    (next: T | ((previous: T) => T)) => {
      const previous = currentRef.current
      const resolved =
        typeof next === "function" ? (next as (previous: T) => T)(previous) : next

      currentRef.current = resolved

      if (!isControlled) {
        setUncontrolled(resolved)
      }
      onChange?.(resolved)
    },
    [isControlled, onChange]
  )

  return [current, setValue]
}
