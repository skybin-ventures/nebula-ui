'use client';

import { useCallback, useEffect, useMemo, useState } from "react";
import { cn } from "../../utils/cn";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../../primitives/command";

export interface CommandPaletteItem {
  id: string;
  label: string;
  group?: string;
  shortcut?: string;
  disabled?: boolean;
  onSelect?: () => void;
}

export interface CommandPaletteProps {
  items: CommandPaletteItem[];
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  placeholder?: string;
  emptyText?: string;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  enableShortcut?: boolean;
}

export function CommandPalette({
  items,
  open,
  defaultOpen = false,
  onOpenChange,
  placeholder = "Search commands...",
  emptyText = "No results found.",
  loading = false,
  disabled = false,
  className,
  enableShortcut = true,
}: CommandPaletteProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : uncontrolledOpen;

  const setOpen = useCallback((next: boolean) => {
    if (!isControlled) setUncontrolledOpen(next);
    onOpenChange?.(next);
  }, [isControlled, onOpenChange]);

  useEffect(() => {
    if (!enableShortcut || disabled) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(!isOpen);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [disabled, enableShortcut, isOpen, setOpen]);

  const groups = useMemo(() => {
    const map = new Map<string, CommandPaletteItem[]>();
    for (const item of items) {
      const key = item.group ?? "Commands";
      const list = map.get(key) ?? [];
      list.push(item);
      map.set(key, list);
    }
    return [...map.entries()];
  }, [items]);

  return (
    <CommandDialog open={isOpen} onOpenChange={setOpen}>
      <div className={cn(className)} aria-busy={loading || undefined}>
        <CommandInput placeholder={loading ? "Loading…" : placeholder} disabled={disabled || loading} />
        <CommandList>
          <CommandEmpty>{emptyText}</CommandEmpty>
          {groups.map(([group, groupItems], index) => (
            <div key={group}>
              {index > 0 ? <CommandSeparator /> : null}
              <CommandGroup heading={group}>
                {groupItems.map((item) => (
                  <CommandItem
                    key={item.id}
                    disabled={disabled || item.disabled || loading}
                    onSelect={() => {
                      item.onSelect?.();
                      setOpen(false);
                    }}
                  >
                    <span>{item.label}</span>
                    {item.shortcut ? (
                      <span className="ml-auto text-xs text-muted-foreground">{item.shortcut}</span>
                    ) : null}
                  </CommandItem>
                ))}
              </CommandGroup>
            </div>
          ))}
        </CommandList>
      </div>
    </CommandDialog>
  );
}

CommandPalette.displayName = "CommandPalette";
