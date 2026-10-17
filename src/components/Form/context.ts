'use client';

import { createContext, useCallback, useRef } from "react";
import type { UseFormReturn, FieldValues } from "react-hook-form";
import { z } from "zod";

/**
 * Validation rule types that can be applied to form fields
 */
export interface FieldValidationRules {
  /** Field is required */
  required?: boolean | string;
  /** Minimum length for strings */
  minLength?: number | { value: number; message: string };
  /** Maximum length for strings */
  maxLength?: number | { value: number; message: string };
  /** Minimum value for numbers */
  min?: number | { value: number; message: string };
  /** Maximum value for numbers */
  max?: number | { value: number; message: string };
  /** Regex pattern for validation */
  pattern?: RegExp | { value: RegExp; message: string };
  /** Email validation */
  email?: boolean | string;
  /** URL validation */
  url?: boolean | string;
  /** Custom validation function */
  validate?: (value: unknown) => boolean | string | Promise<boolean | string>;
}

/**
 * Overridable validation message strings used by `buildZodSchemaFromRules`.
 */
export interface FormValidationMessages {
  required: string;
  email: string;
  url: string;
  invalidFormat: string;
  invalidPhone: string;
  invalidValue: string;
  minLength: (min: number) => string;
  maxLength: (max: number) => string;
  minValue: (min: number) => string;
  maxValue: (max: number) => string;
}

export const defaultValidationMessages: FormValidationMessages = {
  required: "This field is required",
  email: "Invalid email address",
  url: "Invalid URL",
  invalidFormat: "Invalid format",
  invalidPhone: "Invalid phone number",
  invalidValue: "Invalid value",
  minLength: (min) => `Minimum ${min} characters required`,
  maxLength: (max) => `Maximum ${max} characters allowed`,
  minValue: (min) => `Minimum value is ${min}`,
  maxValue: (max) => `Maximum value is ${max}`,
};

/**
 * Form configuration options
 */
export interface FormConfig {
  /** Show validation errors inline */
  showInlineErrors?: boolean;
  /** Validate on blur */
  validateOnBlur?: boolean;
  /** Validate on change */
  validateOnChange?: boolean;
  /** Size of form controls */
  size?: "sm" | "md" | "lg";
  /** Layout direction */
  layout?: "horizontal" | "vertical" | "inline";
  /** Label width for horizontal layout */
  labelWidth?: string | number;
  /** Whether form is disabled */
  disabled?: boolean;
  /** Colon after label */
  colon?: boolean;
  /**
   * When true, form fields receive `disabled` while submit is in flight
   * and re-entrant submits are ignored.
   */
  disabledOnSubmit?: boolean;
  /** Override default Zod validation messages */
  messages?: Partial<FormValidationMessages>;
}

/**
 * Field registration info
 */
export interface FieldRegistration {
  name: string;
  type: "string" | "number" | "boolean" | "date" | "datetime" | "array";
  rules: FieldValidationRules;
}

/**
 * Form context value
 */
export interface FormContextValue<TFieldValues extends FieldValues = FieldValues>
  extends FormConfig {
  form: UseFormReturn<TFieldValues>;
  /** Register a field's validation rules */
  registerFieldValidation: (field: FieldRegistration) => void;
  /** Unregister a field's validation rules */
  unregisterFieldValidation: (name: string) => void;
  /** Get current validation schema */
  getValidationSchema: (
    messageOverrides?: Partial<FormValidationMessages>
  ) => z.ZodObject<Record<string, z.ZodTypeAny>>;
  /** Trigger validation for a specific field */
  triggerValidation: (name: string) => Promise<boolean>;
}

/**
 * Default form configuration
 */
export const defaultFormConfig: FormConfig = {
  showInlineErrors: true,
  validateOnBlur: true,
  validateOnChange: false,
  size: "md",
  layout: "vertical",
  disabled: false,
  colon: false,
  disabledOnSubmit: true,
};

/**
 * Form context for sharing form state and configuration
 */
export const FormConfigContext = createContext<FormContextValue | null>(null);

/**
 * Build a Zod schema from validation rules
 */
export function buildZodSchemaFromRules(
  type: FieldRegistration["type"],
  rules: FieldValidationRules,
  messageOverrides?: Partial<FormValidationMessages>
): z.ZodTypeAny {
  const messages: FormValidationMessages = {
    ...defaultValidationMessages,
    ...messageOverrides,
  };

  // Helper to extract value and message
  const getValueAndMessage = <T>(
    rule: T | { value: T; message: string } | undefined,
    defaultMessage: string
  ): { value: T; message: string } | null => {
    if (rule === undefined) return null;
    if (typeof rule === "object" && rule !== null && "value" in rule) {
      return rule as { value: T; message: string };
    }
    return { value: rule as T, message: defaultMessage };
  };

  // Build string schema
  if (type === "string") {
    let schema = z.string();

    const minLen =
      typeof rules.minLength === "number"
        ? rules.minLength
        : (rules.minLength as { value: number } | undefined)?.value;
    const minLengthRule = getValueAndMessage(
      rules.minLength,
      messages.minLength(minLen ?? 0)
    );
    if (minLengthRule) {
      schema = schema.min(minLengthRule.value as number, minLengthRule.message);
    }

    const maxLen =
      typeof rules.maxLength === "number"
        ? rules.maxLength
        : (rules.maxLength as { value: number } | undefined)?.value;
    const maxLengthRule = getValueAndMessage(
      rules.maxLength,
      messages.maxLength(maxLen ?? 0)
    );
    if (maxLengthRule) {
      schema = schema.max(maxLengthRule.value as number, maxLengthRule.message);
    }

    if (rules.pattern !== undefined) {
      const patternRule = rules.pattern instanceof RegExp
        ? { value: rules.pattern, message: messages.invalidFormat }
        : rules.pattern;
      schema = schema.regex(patternRule.value, patternRule.message);
    }

    if (rules.email) {
      const message = typeof rules.email === "string" ? rules.email : messages.email;
      schema = schema.email(message);
    }

    if (rules.url) {
      const message = typeof rules.url === "string" ? rules.url : messages.url;
      schema = schema.url(message);
    }

    // Handle required - for strings, require non-empty
    if (rules.required) {
      const message = typeof rules.required === "string" ? rules.required : messages.required;
      return finalizeSchema(
        z.preprocess(
          (value) => (value === undefined || value === null ? "" : value),
          schema.min(1, message)
        ),
        rules,
        messages
      );
    }

    return finalizeSchema(schema.optional(), rules, messages);
  }

  // Build number schema
  if (type === "number") {
    let schema = z.coerce.number();

    const minVal =
      typeof rules.min === "number"
        ? rules.min
        : (rules.min as { value: number } | undefined)?.value;
    const minRule = getValueAndMessage(rules.min, messages.minValue(minVal ?? 0));
    if (minRule) {
      schema = schema.min(minRule.value as number, minRule.message);
    }

    const maxVal =
      typeof rules.max === "number"
        ? rules.max
        : (rules.max as { value: number } | undefined)?.value;
    const maxRule = getValueAndMessage(rules.max, messages.maxValue(maxVal ?? 0));
    if (maxRule) {
      schema = schema.max(maxRule.value as number, maxRule.message);
    }

    if (!rules.required) {
      return finalizeSchema(schema.optional(), rules, messages);
    }
    return finalizeSchema(schema, rules, messages);
  }

  // Build boolean schema
  if (type === "boolean") {
    const requiredMessage =
      typeof rules.required === "string" ? rules.required : messages.required;

    if (rules.required) {
      // Untouched checkboxes stay `undefined` in RHF while the UI shows unchecked.
      // Coerce missing values to false so refine can emit the custom required message.
      return finalizeSchema(
        z.preprocess(
          (val) => (val === undefined ? false : val),
          z.boolean().refine((val) => val === true, { message: requiredMessage })
        ),
        rules,
        messages
      );
    }
    return finalizeSchema(z.boolean().optional(), rules, messages);
  }

  // Build date / datetime schema
  if (type === "date" || type === "datetime") {
    const schema = z.coerce.date();
    if (!rules.required) {
      return finalizeSchema(schema.optional(), rules, messages);
    }
    return finalizeSchema(schema, rules, messages);
  }

  // Build array schema
  if (type === "array") {
    let schema = z.array(z.unknown());
    if (rules.required) {
      const message = typeof rules.required === "string" ? rules.required : messages.required;
      schema = schema.min(1, message);
    }
    return finalizeSchema(schema, rules, messages);
  }

  // Default fallback
  return finalizeSchema(z.unknown(), rules, messages);
}

function applyCustomValidate(
  schema: z.ZodTypeAny,
  rules: FieldValidationRules,
  messages: FormValidationMessages
): z.ZodTypeAny {
  if (!rules.validate) {
    return schema;
  }

  const validateFn = rules.validate;

  return schema.superRefine(async (value, ctx) => {
    const result = await validateFn(value);

    if (result === true) {
      return;
    }

    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: typeof result === "string" ? result : messages.invalidValue,
    });
  });
}

function finalizeSchema(
  schema: z.ZodTypeAny,
  rules: FieldValidationRules,
  messages: FormValidationMessages
): z.ZodTypeAny {
  return applyCustomValidate(schema, rules, messages);
}

/**
 * Hook to manage field validations
 */
export function useFieldValidationRegistry() {
  const fieldsRef = useRef<Map<string, FieldRegistration>>(new Map());

  const registerFieldValidation = useCallback((field: FieldRegistration) => {
    fieldsRef.current.set(field.name, field);
  }, []);

  const unregisterFieldValidation = useCallback((name: string) => {
    fieldsRef.current.delete(name);
  }, []);

  const getValidationSchema = useCallback(
    (messageOverrides?: Partial<FormValidationMessages>) => {
      const shape: Record<string, z.ZodTypeAny> = {};

      fieldsRef.current.forEach((field) => {
        shape[field.name] = buildZodSchemaFromRules(
          field.type,
          field.rules,
          messageOverrides
        );
      });

      return z.object(shape);
    },
    []
  );

  return {
    registerFieldValidation,
    unregisterFieldValidation,
    getValidationSchema,
    fieldsRef,
  };
}
