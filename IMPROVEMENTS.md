# nebula-ui — Improvement Roadmap

Reviewed against the repo at `v1.0.6`, 2026-11-04. Supersedes the 2026-10-17
review (which targeted `v1.0.0`).

> **Status:** The work packages from the original roadmap have largely shipped
> across **1.0.1 → 1.0.6**. Most items in the previous revision of this file
> are now present in `src/`. Below, §1–§3 record what's done (so it isn't
> re-litigated), §4 records the still-open gaps that were re-verified against
> the current tree, and §5 is the DataGrid /legacy assessment (Task 3).

## 0. What is still good (unchanged)

- **One React instance.** Only `react`/`react-dom` are peer deps; Radix,
  Sonner, cmdk, date-fns, zod, RHF are regular deps.
- **Form validation derived from props** via `buildZodSchemaFromRules`
  (`src/components/Form/context.ts`) with a ref-based registry so field
  registration never re-renders.
- **Real package tests.** `tests/package-exports.test.ts` asserts every
  `exports` target exists and imports the ESM/CJS/`.d.ts`/CSS artifacts from
  `dist`. (Note: on a slow checkout the two load-tests can exceed their 20s/5s
  caps and time out — that's environmental, not a packaging defect.)
- **Strict types.** `strict: true`; the only `any` under `src/` is the
  deliberate `Control<TFieldValues, any, any>` variance widening in
  `src/components/Form/formControl.ts` (lint-disabled with a reason).

---

## 1. Component roadmap — what shipped (do not redo)

Confirmed present under `src/components/` as of 1.0.6:

- **Form fields:** `FormInputOTP`, `FormSlider`, `FormCurrencyInput`,
  `FormPercentageInput`, `FormTagInput`, `FormRating`, `FormPassword`,
  `FormConsent`, `FormAutocomplete`, `FormColorPicker`, plus the standalone
  `TagInput` / `ColorPicker` counterparts.
- **Data display:** `StatCard`/`Metric`, `AvatarGroup`, `Skeleton` presets,
  `Divider`, `Section`/`SectionHeader`, `KeyValue`, `CodeBlock`, `JsonView`.
- **Charts:** `ChartCard` + Recharts wrappers `LineTrend`, `BarCompare`,
  `DonutShare`, `Sparkline`, `AreaRange`.
- **Layout/nav:** `TopNavigation`, `MobileNav`, `NavigationMenu`, `TabBar`.
- **A11y/feedback:** `SkipLink`, `ErrorBoundary`, `SuspenseFallback`,
  `ModalForm`, `StatusIndicator`, `LoadingSpinner`, `ProgressBar`,
  `useNotification`/`NotificationBell`.
- **Theme:** `NebulaTheme` + `useTheme()` under `src/components/Theme/`.

## 2. Form-system fixes that shipped (do not redo)

- **Boolean schema** accepts `undefined` when optional (`z.boolean().optional()`).
- **`FormSelect` clear → `undefined`** (`field.onChange(value === "" ? undefined : value)`).
- **Field registration** moved to `useLayoutEffect`; the `forwardRef + as <T, TName>()`
  cast is centralized in `forwardFormRef` (used by `TextArea`/`Form*` fields).
- **`useFormShallow()`** is present in `src/components/Form/hooks.ts` and exported from the barrel.
- **`FormConfig.colon` defaults to `false`** (shadcn convention).
- **`FormConfig.messages`** is threaded through `buildZodSchemaFromRules`; a
  `defaultValidationMessages` constant is exported.
- **`useControllableState`** resolves the next value in the closure and calls
  `onChange`/`setUncontrolled` outside the state updater (StrictMode-safe).
- **Success borders** use theme tokens — no `border-green-*` under `src/`.
- **`DateTimePicker`/`DatePicker`** take `locale` + `formatString`.
- **`FileUpload`** exposes per-file `status` + `onFileProgress`.
- **`Form`** has `disabledOnSubmit` (disables fields and ignores re-entrant
  submits while `isSubmitting`).
- **`DataGrid`** `enableRowSelection` default was **restored to `true`** in 1.0.2
  (it had been briefly flipped to `false` in 1.0.1); docs and stories were
  aligned to that. See CHANGELOG 1.0.2.

## 3. Engineering / DX that shipped (do not redo)

- **CI:** `.github/workflows/ci.yml` + `release.yml`; CI and release run
  `build:lib` before tests so the package-export checks see `dist/`.
- **Storybook a11y:** `.storybook/preview.ts` sets `a11y.test: "error"` (fails
  the Vitest Storybook project on axe violations) with a `color-contrast` rule
  override for the muted-opacity form text.
- **Coverage:** `vitest.workspace.ts` + `@vitest/coverage-v8` thresholds
  (`lines/functions 40, branches 35, statements 40`).
- **Bundle-size budget:** `size-limit` (`pnpm size`) + `rollup-plugin-visualizer`
  (`stats.html`), `Button.css` and the unused `--form-*` token set are gone.
- **Docs:** `docs/` now has `forms.md`, `theming.md`, `migration-1.0.1.md`,
  `cursor-plan.md`.
- **Type checking:** `tsconfig.node.json` includes `eslint.config.js`,
  `.storybook/**`, `tests/**`, `vitest.shims.d.ts`, `vitest.workspace.ts`,
  `size-limit.config.js`.
- **Consumer type fixture:** `tests/consumer/consumer-types.tsx` +
  `tsconfig.consumer.json` compile-check the public entry + subpaths against the
  built `dist` declarations (wired into `tsc -b`).

---

## 4. Still open (re-verified against 1.0.6)

### 4.1 Components that remain absent

Verified no directory under `src/components/`:

- **Content:** `Markdown` (viewer), `QRCode`, `Image` (lazy/blur-up/aspect lock),
  `LogViewer`, `DiffView`, `TagList`.
- **Media:** `ImageGallery`/`Carousel`, `VideoPlayer`/`AudioPlayer`,
  `RichTextEditor`, `CodeEditor` (dependency decisions).
- **Scheduling/diagram:** `Timeline`, `Gantt`, `Calendar365`, `OrgChart`, `Graph`.
- **Menus/dialogs:** `ContextMenu`, `Drawer` (right-anchored, distinct from
  `Sheet`), `SplitButton`/`MenuButton`/`IconTextButton`, `Snackbar`.
- **A11y/i18n:** `FocusTrap` (public), `LazyComponent`, `RTLProvider`/`useDirection`,
  a central message-override / i18n surface (English strings are still baked in per component).
- **Onboarding:** `Onboarding`/`Tour`/`Spotlight`.

### 4.2 `FormWizard` has no per-step validation

`src/components/Stepper/FormWizard.tsx` exists but has **no** per-step schema,
dirty tracking, or `canProceed` gating (grep for `validate`/`schema`/`dirty`
returns nothing). If step-advancement validation is wanted, that's the gap.

### 4.3 `FieldLayout` has no `orientation`

`FieldLayout` always renders `[label] [input]`. Checkboxes/switches
conventionally want `[input] [label]`. No `orientation: "label-first" |
"input-first"` prop exists.

### 4.4 `primitives/` vs `components/` boundary

`primitives/` is documented as internal, but no lint rule (e.g.
`eslint-plugin-boundaries`) forbids importing `@/primitives/*` from outside
`src/components/` + `src/primitives/`, and `Select` is re-exported from the
root barrel straight out of `primitives/select`.

### 4.5 `package.json` / release hygiene

- `typesVersions` still duplicates the `exports` map — generate one from the
  other.
- No `publishConfig.registry`; `release.yml` runs `npm publish --access public`
  without `--provenance`.
- No `.nvmrc` / `packageManager` field.

### 4.6 `KanbanBoard` does not surface the full drag event

`onCardMove: (fromColumnId, toColumnId, newIndex) => void` discards the
`DragEndEvent` (drop coordinates, pointer offset) that undo/redo or animation
callbacks need. The handler receives it but re-exposes a reduced tuple.

### 4.7 Docs

No `docs/data-grid.md` or `docs/a11y.md`. The README hooks table now lists
`useFormConfig`/`useFormField`/`useFieldError`/`useDataGrid`/`useConfirm`/
`useControllableState`/`toast`, but still doesn't mention `useFormShallow`.

---

## 5. DataGrid — `/legacy` → v9 `useTable` assessment (Task 3)

**Decision: keep `/legacy` for now; do not migrate speculatively.**

Facts checked against the installed `@tanstack/react-table@9.3.1`:

- The `/legacy` subpath is **shipped and supported, not marked deprecated** in
  9.3.1 (no `deprecated` marker on the package or subpath). The legacy bridge
  exists precisely so `accessorKey`-style columns and the v8 option surface
  keep working on v9.
- Our public `ColumnDef` is `LegacyColumnDef<TData, TValue>` (consumers write
  `{ accessorKey, header }`), and `useDataGrid` drives the grid through
  `useLegacyTable` with the v8 option style (`getCoreRowModel`,
  `getSortedRowModel`, …).
- The new model is **feasible, not a drop-in**: every `Table` method DataGrid
  uses (`getHeaderGroups`, `getRowModel`, `getColumn`, `getPageCount`,
  `getFilteredSelectedRowModel`, `getIsAllRowsSelected`,
  `toggleAllRowsSelected`, `toggleSelected`, `getCoreRowModel`) is present on
  the new-model `Table`. But the migration is a **feature-composition
  rewrite** — `useTable` needs `features: tableFeatures(createCoreRowModel(),
  createSortedRowModel(), createFilteredRowModel(), createPaginatedRowModel(),
  …)` instead of the `get*RowModel` options — and it changes the public
  `ColumnDef` type (the new `ColumnDef<Features, TData, TValue>` is generic
  over the feature set). That touches a shipping, well-tested component's
  public surface and core logic.

**Concrete blocker:** no deprecation pressure — our pinned 9.3.1 still ships
`/legacy`, and there's no new-model-only capability we currently need.
Migrating now is a speculative rewrite with regression risk to selection,
pagination, and sort, and no forced benefit.

**Migration trigger (do it when either is true):**
1. A future `@tanstack/react-table` major **deprecates or removes the
   `/legacy` subpath** (watch the changelog / a deprecation banner on
   `useLegacyTable`), **or**
2. We need a **new-model-only feature** (a row model or capability the legacy
   bridge doesn't expose).

**Migration scope (for when it's triggered):** `useDataGrid.ts` (switch
`useLegacyTable` → `useTable` + declare `features`, move controlled state into
the v9 state slices), `types.ts` (re-export a source-compatible `ColumnDef` so
`{ accessorKey, header }` columns keep working), and the DataGrid stories/tests.
Keep the column shape backward-compatible to avoid a consumer breaking change.

---

## Suggested order (updated)

1. **Cheap, high-leverage:** `FieldLayout` `orientation` (§4.3); `FormWizard`
   per-step validation (§4.2); surface the `DragEndEvent` in `KanbanBoard`
   (§4.6); add `useFormShallow` to the README hooks table + `docs/data-grid.md`
   (§4.7).
2. **Hygiene:** de-dupe `typesVersions`/`exports`, add `--provenance` +
   `publishConfig.registry`, add `.nvmrc`/`packageManager` (§4.5); add a
   `primitives` boundary lint rule (§4.4).
3. **New components** by demand: `Image`, `Markdown`, `QRCode` (no/heavy-dep
   first), then media/schedule families (§4.1).
4. **DataGrid /legacy → v9 `useTable`** only when the §5 trigger fires.
