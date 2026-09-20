'use client';

import type { ReactNode } from "react";
import { Form, type FormProps } from "../Form/Form";
import { Stepper, type StepperStep } from "./Stepper";

export interface FormWizardProps<TValues extends Record<string, unknown> = Record<string, unknown>>
  extends Omit<FormProps<TValues>, "children"> {
  steps: StepperStep[];
  current?: number;
  defaultCurrent?: number;
  onCurrentChange?: (index: number) => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  children?: ReactNode;
}

export function FormWizard<TValues extends Record<string, unknown> = Record<string, unknown>>({
  steps,
  current,
  defaultCurrent,
  onCurrentChange,
  disabled,
  loading,
  className,
  children,
  ...formProps
}: FormWizardProps<TValues>) {
  return (
    <Form {...formProps}>
      <Stepper
        steps={steps}
        current={current}
        defaultCurrent={defaultCurrent}
        onCurrentChange={onCurrentChange}
        disabled={disabled}
        loading={loading}
        className={className}
      />
      {children}
    </Form>
  );
}

FormWizard.displayName = "FormWizard";
