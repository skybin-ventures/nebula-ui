'use client';

import { useCallback, useMemo, useRef, type ReactNode } from "react";
import {
  useForm,
  FormProvider as RHFFormProvider,
  type UseFormReturn,
  type FieldValues,
  type UseFormProps,
  type SubmitHandler,
  type SubmitErrorHandler,
  type Resolver,
  type Path,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { 
  FormConfigContext, 
  defaultFormConfig, 
  useFieldValidationRegistry,
  type FormConfig, 
  type FormContextValue 
} from "./context";

/**
 * Props for the Form component
 */
export interface FormProps<
  TFieldValues extends FieldValues = FieldValues,
  TContext = unknown
> extends Omit<React.FormHTMLAttributes<HTMLFormElement>, "onSubmit" | "onError"> {
  /** Base Zod schema for validation (will be extended by field props) */
  schema?: z.ZodType<TFieldValues>;
  /** Default values for the form */
  defaultValues?: UseFormProps<TFieldValues, TContext>["defaultValues"];
  /** Values to reset the form to */
  values?: UseFormProps<TFieldValues, TContext>["values"];
  /** Submit handler */
  onSubmit?: SubmitHandler<TFieldValues>;
  /** Error handler */
  onError?: SubmitErrorHandler<TFieldValues>;
  /** Form configuration */
  config?: FormConfig;
  /** Children */
  children?: ReactNode;
  /** External form instance (for controlled forms) */
  form?: UseFormReturn<TFieldValues>;
  /** Validation mode */
  mode?: UseFormProps<TFieldValues, TContext>["mode"];
  /** Revalidation mode */
  reValidateMode?: UseFormProps<TFieldValues, TContext>["reValidateMode"];
  /** Custom resolver (overrides schema) */
  resolver?: Resolver<TFieldValues>;
}

/**
 * Form component that provides form context and validation
 * 
 * Child components like TextBox can register their validation rules automatically.
 * 
 * @example
 * ```tsx
 * // Validation is automatically built from component props
 * <Form onSubmit={handleSubmit} defaultValues={{ username: "", email: "" }}>
 *   <TextBox name="username" label="Username" required minLength={3} maxLength={50} />
 *   <TextBox name="email" label="Email" type="email" required email />
 *   <Button type="submit">Submit</Button>
 * </Form>
 * 
 * // Or with a base schema that gets extended
 * const baseSchema = z.object({
 *   username: z.string(),
 *   email: z.string(),
 * });
 * 
 * <Form schema={baseSchema} onSubmit={handleSubmit}>
 *   <TextBox name="username" required minLength={3} /> // Adds required + minLength
 *   <TextBox name="email" required email /> // Adds required + email validation
 * </Form>
 * ```
 */
export function Form<
  TFieldValues extends FieldValues = FieldValues,
  TContext = unknown
>({
  schema: baseSchema,
  defaultValues,
  values,
  onSubmit,
  onError,
  config,
  children,
  form: externalForm,
  mode: modeProp,
  reValidateMode: reValidateModeProp,
  resolver: customResolver,
  ...formProps
}: FormProps<TFieldValues, TContext>) {
  const mergedConfig = { ...defaultFormConfig, ...config };

  const mode =
    modeProp ??
    (mergedConfig.validateOnChange
      ? "onChange"
      : mergedConfig.validateOnBlur !== false
        ? "onBlur"
        : "onSubmit");

  const reValidateMode =
    reValidateModeProp ??
    (mergedConfig.validateOnChange ? "onChange" : "onBlur");

  const {
    registerFieldValidation,
    unregisterFieldValidation,
    getValidationSchema,
  } = useFieldValidationRegistry();

  // Stable resolver that reads from fieldsRef at validation time — no re-renders
  // needed on field registration. Fields register via useLayoutEffect so rules
  // are present before paint / submit in StrictMode.
  const messagesRef = useRef(mergedConfig.messages);
  messagesRef.current = mergedConfig.messages;

  const dynamicResolver = useCallback<Resolver<TFieldValues>>(
    async (vals, context, options) => {
      if (customResolver) {
        return customResolver(vals, context, options);
      }
      const fieldSchema = getValidationSchema(messagesRef.current);
      const mergedSchema = baseSchema instanceof z.ZodObject
        ? baseSchema.merge(fieldSchema)
        : baseSchema ?? fieldSchema;
      const finalSchema = mergedSchema as z.ZodType<TFieldValues, TFieldValues>;
      return zodResolver(finalSchema)(vals, context, options);
    },
    // getValidationSchema reads a ref — always current, intentionally omitted.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [baseSchema, customResolver]
  );

  const internalForm = useForm<TFieldValues>({
    resolver: dynamicResolver,
    defaultValues,
    values,
    mode,
    reValidateMode,
  });

  const form = externalForm ?? internalForm;
  const { isSubmitting } = form.formState;
  const lockSubmit = mergedConfig.disabledOnSubmit ?? true;
  const disableWhileSubmitting = lockSubmit && isSubmitting;
  const effectiveDisabled = Boolean(mergedConfig.disabled) || disableWhileSubmitting;
  const submitLockRef = useRef(false);

  // Trigger validation for a specific field
  const triggerValidation = useCallback(async (name: string) => {
    return form.trigger(name as Path<TFieldValues>);
  }, [form]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!onSubmit) return;
    if (lockSubmit && (isSubmitting || submitLockRef.current)) return;

    if (lockSubmit) submitLockRef.current = true;

    void form.handleSubmit(
      async (data, event) => {
        try {
          await onSubmit(data, event);
        } finally {
          submitLockRef.current = false;
        }
      },
      (errors, event) => {
        submitLockRef.current = false;
        onError?.(errors, event);
      }
    )(e);
  };

  const contextValue = useMemo<FormContextValue<TFieldValues>>(
    () => ({
      form,
      registerFieldValidation,
      unregisterFieldValidation,
      getValidationSchema,
      triggerValidation,
      showInlineErrors: mergedConfig.showInlineErrors,
      validateOnBlur: mergedConfig.validateOnBlur,
      validateOnChange: mergedConfig.validateOnChange,
      size: mergedConfig.size,
      layout: mergedConfig.layout,
      labelWidth: mergedConfig.labelWidth,
      disabled: effectiveDisabled,
      colon: mergedConfig.colon,
      disabledOnSubmit: mergedConfig.disabledOnSubmit,
    }),
    [
      form,
      registerFieldValidation,
      unregisterFieldValidation,
      getValidationSchema,
      triggerValidation,
      mergedConfig.showInlineErrors,
      mergedConfig.validateOnBlur,
      mergedConfig.validateOnChange,
      mergedConfig.size,
      mergedConfig.layout,
      mergedConfig.labelWidth,
      effectiveDisabled,
      mergedConfig.colon,
      mergedConfig.disabledOnSubmit,
    ]
  );

  return (
    <FormConfigContext.Provider value={contextValue as FormContextValue}>
      <RHFFormProvider {...form}>
        <form
          {...formProps}
          onSubmit={handleSubmit}
          noValidate
          aria-busy={disableWhileSubmitting || undefined}
        >
          {children}
        </form>
      </RHFFormProvider>
    </FormConfigContext.Provider>
  );
}

Form.displayName = "Form";
