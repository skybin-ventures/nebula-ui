"use client"

import { cn } from "../../utils/cn"
import { useControllableState } from "../../hooks/useControllableState"

const HEX_PATTERN = /^#([0-9a-fA-F]{6})$/
const NATIVE_COLOR_FALLBACK = "#000000"

export interface ColorPickerProps {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  onBlur?: () => void
  swatches?: string[]
  disabled?: boolean
  className?: string
  id?: string
  "aria-label"?: string
  "aria-invalid"?: boolean
  "aria-describedby"?: string
}

export function ColorPicker({
  value,
  defaultValue = "",
  onChange,
  onBlur,
  swatches = ["#000000", "#ffffff", "#ef4444", "#22c55e", "#3b82f6", "#eab308"],
  disabled = false,
  className,
  id,
  ...aria
}: ColorPickerProps) {
  const [color, setColor] = useControllableState(value, defaultValue, onChange)
  // Native <input type="color"> requires a valid hex; keep form/text empty until the user picks.
  const nativeValue = HEX_PATTERN.test(color) ? color : NATIVE_COLOR_FALLBACK

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <input
        id={id}
        type="color"
        value={nativeValue}
        disabled={disabled}
        aria-label={aria["aria-label"] ?? "Color"}
        aria-invalid={aria["aria-invalid"]}
        aria-describedby={aria["aria-describedby"]}
        className="h-10 w-12 cursor-pointer rounded-md border border-input bg-card p-1 disabled:cursor-not-allowed disabled:opacity-50"
        onChange={(event) => setColor(event.target.value)}
        onBlur={onBlur}
      />
      <input
        type="text"
        value={color}
        disabled={disabled}
        spellCheck={false}
        placeholder="#rrggbb"
        aria-label="Hex color"
        aria-invalid={aria["aria-invalid"]}
        className={cn(
          "h-10 w-28 rounded-md border border-input bg-card px-3 text-sm",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          "disabled:cursor-not-allowed disabled:bg-muted",
          aria["aria-invalid"] && "border-destructive"
        )}
        onChange={(event) => setColor(event.target.value)}
        onBlur={onBlur}
      />
      <div className="flex flex-wrap gap-1">
        {swatches.map((swatch) => (
          <button
            key={swatch}
            type="button"
            disabled={disabled}
            aria-label={`Select ${swatch}`}
            className="h-7 w-7 rounded-md border border-input disabled:opacity-50"
            style={{ backgroundColor: swatch }}
            onClick={() => setColor(swatch)}
          />
        ))}
      </div>
    </div>
  )
}

ColorPicker.displayName = "ColorPicker"

export { HEX_PATTERN }
