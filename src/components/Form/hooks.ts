'use client';

import { useCallback, useContext, useRef, useSyncExternalStore } from "react";
import {
  useFormContext as useRHFFormContext,
  useController,
  type FieldValues,
  type FieldPath,
  type UseControllerProps,
  type UseControllerReturn,
} from "react-hook-form";
import { FormConfigContext, type FormContextValue, type FormConfig } from "./context";

function shallowEqualValues(
  previous: FieldValues,
  next: FieldValues
): boolean {
  if (previous === next) return true;
  const previousKeys = Object.keys(previous);
  const nextKeys = Object.keys(next);
  if (previousKeys.length !== nextKeys.length) return false;
  for (const key of previousKeys) {
    if (previous[key] !== next[key]) return false;
  }
  return true;
}

/**
 * Hook to access form configuration context
 */
export function useFormConfig<TFieldValues extends FieldValues = FieldValues>(): FormContextValue<TFieldValues> {
  const context = useContext(FormConfigContext) as FormContextValue<TFieldValues> | null;
  if (!context) {
    throw new Error("useFormConfig must be used within a Form component");
  }
  return context;
}

/**
 * Hook to access react-hook-form context directly
 */
export function useForm<TFieldValues extends FieldValues = FieldValues>() {
  return useRHFFormContext<TFieldValues>();
}

/**
 * Hook to create a controlled field with form context awareness
 */
export function useFormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  props: UseControllerProps<TFieldValues, TName>
): UseControllerReturn<TFieldValues, TName> & { config: FormConfig } {
  const { form, ...config } = useFormConfig<TFieldValues>();
  const controller = useController<TFieldValues, TName>({
    ...props,
    control: form.control,
  });

  return {
    ...controller,
    config,
  };
}

/**
 * Hook to get field error
 */
export function useFieldError<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(name: TName): string | undefined {
  const { form } = useFormConfig<TFieldValues>();
  const error = form.formState.errors[name];
  return error?.message as string | undefined;
}

/**
 * Subscribe to form values without re-rendering on every keystroke when unused.
 * Uses RHF `subscribe` + `getValues` via `useSyncExternalStore`.
 * Prefer this over `useFormContext()` for large forms that only need a snapshot.
 *
 * Snapshots are referentially stable when field values are shallow-equal —
 * RHF `getValues()` always returns a new object, which would otherwise break
 * `useSyncExternalStore` and cause update loops.
 */
export function useFormShallow<TFieldValues extends FieldValues = FieldValues>(): TFieldValues {
  const { control, getValues, subscribe } = useRHFFormContext<TFieldValues>();
  const snapshotRef = useRef<TFieldValues | null>(null);

  const subscribeStore = useCallback(
    (onStoreChange: () => void) => {
      if (typeof subscribe === "function") {
        return subscribe({
          formState: { values: true },
          callback: onStoreChange,
        });
      }
      const subscription = control._subjects.state.subscribe({
        next: onStoreChange,
      });
      return () => subscription.unsubscribe();
    },
    [control, subscribe]
  );

  const getSnapshot = useCallback(() => {
    const next = getValues() as TFieldValues;
    const previous = snapshotRef.current;
    if (previous && shallowEqualValues(previous, next)) {
      return previous;
    }
    snapshotRef.current = next;
    return next;
  }, [getValues]);

  return useSyncExternalStore(subscribeStore, getSnapshot, getSnapshot);
}
