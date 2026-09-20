'use client';

import { Plus, Trash2 } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "../../utils/cn";
import { Button } from "../Button";
import { useControllableState } from "../../hooks/useControllableState";

export interface RepeaterItem {
  id: string;
}

export interface RepeaterProps<TItem extends RepeaterItem> {
  value?: TItem[];
  defaultValue?: TItem[];
  onChange?: (items: TItem[]) => void;
  createItem: () => TItem;
  renderItem: (item: TItem, index: number, helpers: { remove: () => void; disabled: boolean }) => ReactNode;
  min?: number;
  max?: number;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  addLabel?: string;
  emptyText?: string;
}

export function Repeater<TItem extends RepeaterItem>({
  value,
  defaultValue = [],
  onChange,
  createItem,
  renderItem,
  min = 0,
  max,
  disabled = false,
  loading = false,
  className,
  addLabel = "Add item",
  emptyText = "No items yet",
}: RepeaterProps<TItem>) {
  const [items, setItems] = useControllableState(value, defaultValue, onChange);
  const isDisabled = disabled || loading;
  const canAdd = !isDisabled && (max === undefined || items.length < max);
  const canRemove = !isDisabled && items.length > min;

  return (
    <div className={cn("space-y-3", className)}>
      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground">{loading ? "Loading…" : emptyText}</p>
      ) : (
        <ul className="space-y-3">
          {items.map((item, index) => (
            <li key={item.id} className="rounded-md border p-3">
              {renderItem(item, index, {
                disabled: isDisabled,
                remove: () => {
                  if (canRemove) {
                    setItems((current) => current.filter((entry) => entry.id !== item.id));
                  }
                },
              })}
              <div className="mt-2 flex justify-end">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  disabled={!canRemove}
                  aria-label="Remove item"
                  onClick={() => setItems((current) => current.filter((entry) => entry.id !== item.id))}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Remove
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <Button type="button" variant="outline" disabled={!canAdd} loading={loading} onClick={() => setItems((current) => [...current, createItem()])}>
        <Plus className="mr-2 h-4 w-4" />
        {addLabel}
      </Button>
    </div>
  );
}

Repeater.displayName = "Repeater";
