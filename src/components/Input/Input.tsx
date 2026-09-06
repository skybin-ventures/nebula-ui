"use client"

import { forwardRef, useState } from "react"
import type { ComponentPropsWithoutRef, ElementRef } from "react"
import { Input as InputPrimitive } from "../../primitives/input"
import { cn } from "../../utils/cn"
import { PasswordRevealToggle } from "../Form/PasswordRevealToggle"

export type InputProps = ComponentPropsWithoutRef<typeof InputPrimitive> & {
  /**
   * Show an eye toggle for password fields.
   * Defaults to true when `type="password"`.
   */
  passwordToggle?: boolean
}

export const Input = forwardRef<
  ElementRef<typeof InputPrimitive>,
  InputProps
>(({ type, className, passwordToggle, disabled, ...props }, ref) => {
  const [passwordVisible, setPasswordVisible] = useState(false)
  const isPasswordType = type === "password"
  const showPasswordToggle = isPasswordType && passwordToggle !== false
  const resolvedType = showPasswordToggle && passwordVisible ? "text" : type

  if (!showPasswordToggle) {
    return (
      <InputPrimitive
        ref={ref}
        type={type}
        className={className}
        disabled={disabled}
        {...props}
      />
    )
  }

  return (
    <div className="relative w-full" style={{ position: "relative", width: "100%" }}>
      <InputPrimitive
        ref={ref}
        type={resolvedType}
        className={cn("pr-10", className)}
        disabled={disabled}
        {...props}
      />
      <div
        className="absolute right-1 top-1/2 z-10 -translate-y-1/2"
        style={{ position: "absolute", right: "0.25rem", top: "50%", transform: "translateY(-50%)", zIndex: 10 }}
      >
        <PasswordRevealToggle
          visible={passwordVisible}
          onToggle={() => setPasswordVisible((visible) => !visible)}
          disabled={disabled}
        />
      </div>
    </div>
  )
})
Input.displayName = "Input"
