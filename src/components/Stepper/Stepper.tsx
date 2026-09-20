'use client';

import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { cn } from "../../utils/cn";
import { Button } from "../Button";
import { useControllableState } from "../../hooks/useControllableState";

export interface StepperStep {
  id: string;
  label: string;
  description?: string;
  content?: ReactNode;
  optional?: boolean;
}

export interface StepperProps {
  steps: StepperStep[];
  current?: number;
  defaultCurrent?: number;
  onCurrentChange?: (index: number) => void;
  onFinish?: () => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  nextLabel?: string;
  backLabel?: string;
  finishLabel?: string;
}

export function Stepper({
  steps,
  current,
  defaultCurrent = 0,
  onCurrentChange,
  onFinish,
  disabled = false,
  loading = false,
  className,
  nextLabel = "Next",
  backLabel = "Back",
  finishLabel = "Finish",
}: StepperProps) {
  const [index, setIndex] = useControllableState(current, defaultCurrent, onCurrentChange);
  const isDisabled = disabled || loading;
  const isLast = index >= steps.length - 1;
  const active = steps[index];

  return (
    <div className={cn("space-y-6", className)}>
      <ol className="flex flex-wrap gap-3" aria-label="Progress">
        {steps.map((step, stepIndex) => {
          const complete = stepIndex < index;
          const selected = stepIndex === index;
          return (
            <li key={step.id} className="flex items-center gap-2 text-sm">
              <span
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-full border text-xs",
                  selected && "border-primary bg-primary text-primary-foreground",
                  complete && "border-primary bg-primary/10 text-primary"
                )}
                aria-current={selected ? "step" : undefined}
              >
                {complete ? <Check className="h-4 w-4" /> : stepIndex + 1}
              </span>
              <span>
                {step.label}
                {step.optional ? <span className="ml-1 text-muted-foreground">(optional)</span> : null}
              </span>
            </li>
          );
        })}
      </ol>

      <div>{active?.content}</div>

      <div className="flex justify-between">
        <Button type="button" variant="outline" disabled={isDisabled || index === 0} onClick={() => setIndex((value) => Math.max(0, value - 1))}>
          {backLabel}
        </Button>
        <Button
          type={isLast ? "submit" : "button"}
          loading={loading}
          disabled={isDisabled}
          onClick={() => {
            if (isLast) {
              onFinish?.();
              return;
            }
            setIndex((value) => Math.min(steps.length - 1, value + 1));
          }}
        >
          {isLast ? finishLabel : nextLabel}
        </Button>
      </div>
    </div>
  );
}

Stepper.displayName = "Stepper";
