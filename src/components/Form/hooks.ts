'use client';

import { useCallback, useContext, useSyncExternalStore } from "react";
import {
  useFormContext as useRHFFormContext,
  useController,
  type FieldValues,
  type FieldPath,
  type UseControllerProps,
  type UseControllerReturn,
} from "react-hook-form";
import { FormConfigContext, type FormContextValue, type FormConfig } from "./context";

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
 */
export function useFormShallow<TFieldValues extends FieldValues = FieldValues>(): TFieldValues {
  const { control, getValues, subscribe } = useRHFFormContext<TFieldValues>();

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

  return useSyncExternalStore(
    subscribeStore,
    () => getValues() as TFieldValues,
    () => getValues() as TFieldValues
  );
}
