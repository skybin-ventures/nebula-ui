'use client';

import { Plus, Trash2 } from "lucide-react";
import type { ReactNode } from "react";
import { useFieldArray, useFormContext, type ArrayPath, type FieldArray, type FieldValues } from "react-hook-form";
import { cn } from "../../utils/cn";
import { Button } from "../Button";

export interface FormRepeaterProps<TFieldValues extends FieldValues = FieldValues> {
  name: ArrayPath<TFieldValues>;
  renderItem: (index: number, helpers: { remove: () => void; disabled: boolean }) => ReactNode;
  createItem: () => FieldArray<TFieldValues, ArrayPath<TFieldValues>>;
  min?: number;
  max?: number;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  addLabel?: string;
  emptyText?: string;
}

export function FormRepeater<TFieldValues extends FieldValues = FieldValues>({
  name,
  renderItem,
  createItem,
  min = 0,
  max,
  disabled = false,
  loading = false,
  className,
  addLabel = "Add item",
  emptyText = "No items yet",
}: FormRepeaterProps<TFieldValues>) {
  const { control } = useFormContext<TFieldValues>();
  const { fields, append, remove } = useFieldArray({ control, name });
  const isDisabled = disabled || loading;
  const canAdd = !isDisabled && (max === undefined || fields.length < max);
  const canRemove = !isDisabled && fields.length > min;

  return (
    <div className={cn("space-y-3", className)}>
      {fields.length === 0 ? (
        <p className="text-sm text-muted-foreground">{loading ? "Loading…" : emptyText}</p>
      ) : (
        <ul className="space-y-3">
          {fields.map((field, index) => (
            <li key={field.id} className="rounded-md border p-3">
              {renderItem(index, {
                disabled: isDisabled,
                remove: () => {
                  if (canRemove) remove(index);
                },
              })}
              <div className="mt-2 flex justify-end">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  disabled={!canRemove}
                  aria-label="Remove item"
                  onClick={() => canRemove && remove(index)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Remove
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <Button type="button" variant="outline" disabled={!canAdd} loading={loading} onClick={() => append(createItem())}>
        <Plus className="mr-2 h-4 w-4" />
        {addLabel}
      </Button>
    </div>
  );
}

FormRepeater.displayName = "FormRepeater";
