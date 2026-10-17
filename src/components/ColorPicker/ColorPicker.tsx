"use client"

import { cn } from "../../utils/cn"
import { useControllableState } from "../../hooks/useControllableState"

const HEX_PATTERN = /^#([0-9a-fA-F]{6})$/

export interface ColorPickerProps {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
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
  defaultValue = "#000000",
  onChange,
  swatches = ["#000000", "#ffffff", "#ef4444", "#22c55e", "#3b82f6", "#eab308"],
  disabled = false,
  className,
  id,
  ...aria
}: ColorPickerProps) {
  const [color, setColor] = useControllableState(value, defaultValue, onChange)
  const normalized = HEX_PATTERN.test(color) ? color : "#000000"

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <input
        id={id}
        type="color"
        value={normalized}
        disabled={disabled}
        aria-label={aria["aria-label"] ?? "Color"}
        aria-invalid={aria["aria-invalid"]}
        aria-describedby={aria["aria-describedby"]}
        className="h-10 w-12 cursor-pointer rounded-md border border-input bg-card p-1 disabled:cursor-not-allowed disabled:opacity-50"
        onChange={(event) => setColor(event.target.value)}
      />
      <input
        type="text"
        value={color}
        disabled={disabled}
        spellCheck={false}
        aria-label="Hex color"
        aria-invalid={aria["aria-invalid"]}
        className={cn(
          "h-10 w-28 rounded-md border border-input bg-card px-3 text-sm",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          "disabled:cursor-not-allowed disabled:bg-muted",
          aria["aria-invalid"] && "border-destructive"
        )}
        onChange={(event) => setColor(event.target.value)}
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
