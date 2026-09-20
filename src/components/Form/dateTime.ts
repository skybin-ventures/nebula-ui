export function toValidDate(value: unknown): Date | undefined {
  if (!value || value === "") {
    return undefined
  }

  const date = value instanceof Date ? value : new Date(value as string | number)
  if (Number.isNaN(date.getTime())) {
    return undefined
  }

  return date
}

export function hasTimePart(date: Date): boolean {
  return date.getHours() !== 0 || date.getMinutes() !== 0 || date.getSeconds() !== 0 || date.getMilliseconds() !== 0
}

export function withPreservedTime(nextDay: Date, previous: Date): Date {
  const next = new Date(nextDay)
  next.setHours(
    previous.getHours(),
    previous.getMinutes(),
    previous.getSeconds(),
    previous.getMilliseconds()
  )
  return next
}

export function deriveTimeSet(value: unknown): boolean {
  const date = toValidDate(value)
  return Boolean(date && hasTimePart(date))
}
