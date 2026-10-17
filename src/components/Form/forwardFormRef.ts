import {
  forwardRef,
  type ForwardedRef,
  type ReactElement,
  type Ref,
} from "react"
import type { FieldPath, FieldValues } from "react-hook-form"

type FormFieldRender<TProps, TRef> = (
  props: TProps,
  ref: ForwardedRef<TRef>
) => ReactElement | null

/**
 * Typed `forwardRef` for generic form fields — keeps `TFieldValues` / `TName`
 * inference at the call site without an inline `as <T, TName>()` cast.
 */
export function forwardFormRef<TProps extends { name: string }, TRef>(
  render: FormFieldRender<TProps, TRef>
): <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: Omit<TProps, "name"> & { name: TName; ref?: Ref<TRef> }
) => ReactElement | null {
  return forwardRef(render as never) as never
}
