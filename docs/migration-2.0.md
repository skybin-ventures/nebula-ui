# Migrating to nebula-ui 1.0.1

> Note: filename kept as `migration-2.0.md` for continuity; this release is published as **1.0.1**.

## Breaking changes

### Form label colons

`FormConfig.colon` now defaults to `false` (shadcn-style labels). To keep trailing colons:

```tsx
<Form config={{ colon: true }}>…</Form>
```

### Toast API

Sonner is the only public toast surface:

```tsx
import { Toaster, toast } from "@skybin-tech/nebula-ui";

<Toaster />
toast.success("Saved");
```

Removed from the public API:

- `ToastProvider` / `ToastProviderRoot` / `useToastContext`
- Radix `Toast*` primitives (`Toast`, `ToastViewport`, …)
- `useToast` / `radixToast`

### DataGrid

- `enableRowSelection` defaults to `true` (same as 1.0.0). Pass `enableRowSelection={false}` to opt out.
- Import column types from nebula-ui, not `@tanstack/react-table/legacy`:

```tsx
import { DataGrid, type ColumnDef } from "@skybin-tech/nebula-ui";
```

Internally DataGrid still uses TanStack Table’s official compatibility layer (`useLegacyTable`) because the v9 `useTable` programming model is a separate rewrite. Consumer apps should not import `/legacy` directly.

### Removed package subpaths

- `@skybin-tech/nebula-ui/components/ToastProvider`
- `@skybin-tech/nebula-ui/hooks/useToast` (use `toast` from the main entry)
- Prefer `@skybin-tech/nebula-ui` main exports for Toast primitives (removed)

## Theme

Wrap the app with `NebulaTheme` for light/dark/system — see [theming.md](./theming.md).
