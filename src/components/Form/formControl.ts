import type { Control, FieldValues } from "react-hook-form"

/**
 * RHF 7.90 `Control` with context/transformed generics widened so
 * `useForm<T>()` controls are assignable to form field props.
 */
export type FormControl<TFieldValues extends FieldValues = FieldValues> =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- RHF Control TContext / TTransformedValues variance
  Control<TFieldValues, any, any>
