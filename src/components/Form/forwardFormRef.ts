import {
  forwardRef,
  type ForwardedRef,
  type ReactElement,
  type Ref,
} from "react"
import type { FieldPath, FieldValues } from "react-hook-form"
import type { FormControl } from "./formControl"

type FormFieldRender<TProps, TRef> = (
  props: TProps,
  ref: ForwardedRef<TRef>
) => ReactElement | null

/**
 * Typed `forwardRef` for generic form fields — keeps `TFieldValues` / `TName`
 * inference at the call site without an inline `as <T, TName>()` cast.
 *
 * `control` is remapped to `FormControl<TFieldValues>` so RHF 7.90
 * `useForm<T>()` controls are assignable (third generic + FieldValues variance).
 */
export function forwardFormRef<TProps extends { name: string }, TRef>(
  render: FormFieldRender<TProps, TRef>
): <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: Omit<TProps, "name" | "control"> & {
    name: TName
    control?: FormControl<TFieldValues>
    ref?: Ref<TRef>
  }
) => ReactElement | null {
  return forwardRef(render as never) as never
}
