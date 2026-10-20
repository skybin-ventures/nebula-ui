# Cursor Plan — nebula-ui (v1.0.1 → v1.1)

Synced 2026-10-18 against `src/`, `CHANGELOG.md`, `package.json`, `README.md`,
and `docs/migration-2.0.md`.

## What shipped in 1.0.1 (already done, don't redo)

**Components:** `FormInputOTP`, `FormSlider`, `FormCurrencyInput`,
`FormPercentageInput`, `FormRating`, `FormConsent`, `FormPassword`,
`FormAutocomplete`, `TagInput`/`FormTagInput`, `ColorPicker`/`FormColorPicker`,
`SearchInput`, `TreeView`, `AvatarGroup`, `NavigationMenu`, `ChartCard` +
Recharts wrappers (`LineTrend`, `BarCompare`, `DonutShare`, `Sparkline`,
`AreaRange`), `StatCard`/`Metric`, Skeleton presets, `Divider`, `Section`/
`SectionHeader`, `KeyValue`, `CodeBlock`, `JsonView`, `TopNavigation`,
`MobileNav`/`BottomNav`, `TabBar`, `ModalForm`, `StatusIndicator`,
`LoadingSpinner`, `ProgressBar`, `useNotification`/`NotificationBell`,
`SkipLink`, `ErrorBoundary`, `SuspenseFallback`, `NebulaTheme` + `useTheme()`.

**Tooling:** CI workflows, `size-limit`, Storybook a11y fail-on-violation,
`vitest.workspace.ts` in `tsconfig.node.json` include, docs (`theming`,
`forms`, `migration-2.0`).

**Form system:** `FormConfig.colon` defaults to `false`, Sonner is the only
public toast surface, `DataGrid.enableRowSelection` defaults to `false`,
`ColumnDef` importable from the package (not `/legacy`), form success borders
use theme tokens, field registration via `useLayoutEffect`, DatePicker
`locale`/`formatString`, `FormSelect` clear → `undefined`, optional boolean
schema, `useControllableState` StrictMode-safe, DataGrid a11y selection/sort.

**Removed:** dead `Button.css`, unused `--form-*` token set (replaced by
`--success` / `--warning`).

**Still pending in 1.0.1 that most of this plan addresses:**
- `FieldLayout` orientation (label-first vs input-first)
- `MultiCheck` / checkbox group for `string[]` fields
- `TextArea` still uses the inline `forwardRef(...) as <T, TName>` cast
- `@types/react-dom@^19.0.0` pin in README
- `FormConfig.messages` isn't threaded through `buildZodSchemaFromRules` yet
- `useFormShallow` isn't exported from `src/index.ts` yet
- No `.nvmrc`, no `packageManager` field, `tsconfig.node.json` `lib` still
  ES2023-only (no DOM) so it can't check Storybook DOM usage
- No JSDoc enforcement on public exports, no generated API docs
- Chart family is narrow (no `PieDistribution`, `ScatterPlot`, `StackedBar`,
  or `HorizontalBar`)
- No `RadioGroup.direction` rename (deferred to 2.0)

## Ground rules

- Run `pnpm lint && pnpm test && pnpm build` before declaring a task done.
  `tests/package-exports.test.ts` reads from `dist/`, so run
  `pnpm build:lib` first when packaging assertions fail.
- Never add a new `any`. Never add a `.css` file under `src/components/`.
  Never add a new hardcoded hex color or `border-green-500` / `border-red-500`.
- Never move a runtime dependency to `peerDependencies`.
- Add a `CHANGELOG.md` entry for every user-visible change, in the
  `[Unreleased]` section at the top.
- One task per branch. If a task balloons past ~200 lines of diff, split it.

---

## Phase 0 — Small, do these first

### 0.1 Add a `packageManager` field

`package.json` has no `packageManager` field, and `.github/workflows/ci.yml`
pins `pnpm/action-setup@v4` without a `version` input. Local and CI pnpm
versions can silently diverge, which corrupts `pnpm-lock.yaml` (currently
`lockfileVersion: '9.0'`).

**Change:** add `"packageManager": "pnpm@<actual-version>"` to
`package.json`. Pin `pnpm/action-setup@v4` with
`with: { version: <same> }`.

**Verify:** `pnpm install --frozen-lockfile` succeeds; CI runs the same pnpm
as local.

### 0.2 Create `.nvmrc`

`engines.node: ">=20"` is in `package.json`, `ci.yml` uses
`node-version: 22`, but there is no `.nvmrc`, `.node-version`, or
`.tool-versions`. A developer with Node 20 installs successfully and gets no
signal until CI fails.

**Change:** create `.nvmrc` with `22` and switch `ci.yml` to
`node-version-file: .nvmrc`.

**Verify:** `ci.yml` references `.nvmrc`; `nvm use` works from repo root.

### 0.3 Widen `tsconfig.node.json` `lib`

Current `tsconfig.node.json` includes `vite.config.ts`, `eslint.config.js`,
`.storybook/**/*.ts`, `tests/**/*.ts`, `vitest.shims.d.ts`,
`vitest.workspace.ts`, `size-limit.config.js` — but `lib: ["ES2023"]` with no
DOM. Storybook config and test files reference `HTMLElement`, `Document`,
`localStorage`, `window.matchMedia`. `skipLibCheck: true` masks most of it, but
`tests/package-exports.test.ts` and the vitest storybook browser setup
reference DOM globals that don't exist in the ES2023 lib.

**Change:** change to `"lib": ["ES2023", "DOM", "DOM.Iterable"]`. This was
called out in the earlier plan; the include was widened but the lib wasn't.

**Verify:** `pnpm exec tsc -b` and fix whatever the new scope surfaces in
Storybook config.

### 0.4 Order CI steps so `dist/` exists before tests

Current order: `pnpm lint` → `pnpm exec tsc -b` → `pnpm test` →
`pnpm build:lib` → `pnpm size` → `pnpm test:coverage`. The
`tests/package-exports.test.ts` assertions run in `pnpm test`, but `dist/`
isn't built until the next step.

**Change:** move `pnpm build:lib` ahead of `pnpm test`. `pnpm exec tsc -b`
can stay where it is as an early failure signal.

**Verify:** fresh clone, CI passes the exports assertions.

### 0.5 Drop the `@types/react-dom@^19.0.0` pin from README

The pin is now actively harmful: `peerDependenciesMeta` marks `@types/react`
and `@types/react-dom` as optional, so React 18 consumers shouldn't be told
to install `@types/react-dom@^19`.

**Change:** README line ~235 — remove the pin and add:

> If you also use React 18 types elsewhere, `nebula-ui` won't force an
> upgrade; the peer range accepts both.

**Verify:** `grep "@types/react-dom@\\^19" README.md` returns nothing.

---

## Phase 1 — Form system refinements

### 1.1 Migrate `TextArea` off the inline cast

`TextArea` is the last form field using `forwardRef(TextAreaInner) as <...>`.
The pattern for the other fields is now in `src/components/Form/forwardFormRef.ts`
with a factory that preserves inference — use it.

**Change:**

```ts
export const TextArea = createFormRef<HTMLTextAreaElement>(TextAreaInner);
(TextArea as React.FC).displayName = "TextArea";
```

Match the surrounding TextBox/Checkbox/FormSwitch call sites exactly.

**Verify:** `pnpm build` (dts plugin surfaces inference regressions), and one
existing `.stories.tsx` still compiles.

### 1.2 Add `MultiCheck` / checkbox group for `string[]` fields

There is no multi-select checkbox in the form system. `TagInput` covers
free-form multi-values, `FormMultiSelect` covers dropdown-based multi-select,
but for "Select your interests" you need a labelled group of checkboxes bound
to a single `string[]` field.

**Create** `src/components/Form/MultiCheck.tsx`:

- Same shape as `RadioGroup` — `name`, `options`, `children`, `variant`, `size`.
- Registers with `type: "array"`.
- Uses `z.array(z.string())` via `buildZodSchemaFromRules`.
- Renders through `FieldLayout`.
- Accessible pattern: `role="group"`, `aria-labelledby` pointing at the group
  label.

**Wire up (all four, per `.cursorrules`):** component + barrel + `src/index.ts`
+ `package.json` exports/typesVersions.

### 1.3 Add `FieldLayout` orientation

`FormCheckbox`, `FormSwitch`, `RadioGroup`, and `TextArea` all route through
`FieldLayout`, and `labelVariants` is correctly layout-aware. But
`FieldLayout` renders `[Label] [Input]` for every layout, including
`layout: "horizontal"`. For checkboxes and switches the conventional order is
`[Input] [Label]`. Setting `layout: "horizontal"` gives every checkbox
`Name: [x]` instead of `[x] Name`.

Also, `FormCheckbox` renders non-string labels inline after the checkbox
(`Checkbox.tsx`, the `label && typeof label !== "string"` branch), bypassing
`FieldLayout`'s label pipeline — so `formConfig.colon`,
`formConfig.labelWidth`, and the required asterisk only apply to string labels.

**Change:**

1. Add `orientation?: "label-first" | "input-first"` to `FieldLayoutProps`,
   default `"label-first"`. In horizontal and inline layouts, reorder the
   children and label accordingly.
2. `FormCheckbox` and `FormSwitch` pass `orientation="input-first"`.
3. Route non-string labels through the same `labelVariants` call so they get
   the required-asterisk treatment too.
4. Add a comment on `RadioGroup.direction` distinguishing it from
   `formConfig.layout` — renaming is a breaking change and belongs in 2.0.

**Verify:** stories showing a horizontal form with TextBox, Checkbox, and
Switch side by side — labels should align and checkboxes should read
`[x] Name`.

### 1.4 Wire `FormConfig.messages` through the schema builder

The 1.0.1 changelog lists `FormConfig.messages` as added. Verify it actually
threads through `buildZodSchemaFromRules` in `src/components/Form/context.ts`
— every default validation message is still hardcoded: "This field is
required", "Invalid email address", "Invalid URL", "Invalid format", plus
interpolated min/max.

If `messages` is on the type but not plumbed to the schema builder, finish
the job:

- Thread `messages` as a third optional parameter to
  `buildZodSchemaFromRules`.
- Export `defaultValidationMessages` as a constant.
- Interpolated messages need a format function:
  `messages.minLength?.({ value: n }) ?? defaultMessage`.

**Verify:** unit tests for the default and override paths, including the
interpolated cases.

### 1.5 Export `useFormShallow`

`src/components/Form/index.ts` exports `useFormShallow` (per
1.0.1 changelog) but `src/index.ts` doesn't re-export it — so it's only
reachable via `@skybin-tech/nebula-ui/components/Form`. That's a packaging
inconsistency: every other form hook is re-exported from the main entry.

**Change:** add `useFormShallow` (and its result type) to `src/index.ts`.
Match the existing hook export block (`useFieldValidationRegistry`,
`useFormConfig`, `useForm`, `useFormField`, `useFieldError`).

**Verify:** `grep "useFormShallow" src/index.ts` returns a match.

### 1.6 Extract `useFieldRegistration`

Every form field now uses `useLayoutEffect` for registration, with an inline
comment in `Form.tsx` explaining why. That's correct — the comment about
layout timing is the one thing that needs to be in one place — but the
comment is duplicated across ~14 fields.

**Change:** extract `src/components/Form/useFieldRegistration.ts` used by
every field, with the comment moved here once:

- the registry is a ref, so reads are always current;
- the resolver defers schema construction to validation time;
- `useLayoutEffect` (not `useEffect`) so there's no paint-then-validate
  flash;
- duplicate register is a `Map.set` no-op, so StrictMode double-invoke is safe;
- cleanup is `Map.delete`, idempotent.

**Verify:** `pnpm test` plus a StrictMode-rendered form story.

### 1.7 Integration tests for `TextBox`, `FormSelect`, `FormCheckbox`, `FormSwitch`, `RadioGroup`, `TextArea`

`src/components/Form/*.test.tsx` covers the newer additions
(`FormCurrencyInput`, `FormPercentageInput`, `FormRating`, `FormConsent`,
`FormPassword`, `FormAutocomplete`, `FormInputOTP`, `FormSlider`,
`DateTimePicker`, `Form.phase0`). The most-used, load-bearing fields —
`TextBox`, `FormSelect`, `FormCheckbox`, `FormSwitch`, `RadioGroup`,
`TextArea` — are untested at the integration level.

Follow the pattern in `src/components/DataGrid/DataGrid.test.tsx` (note the
`/** @vitest-environment happy-dom */` pragma): render the field inside a
`<Form>`, submit, assert on the error message.

Priority order:

1. `TextBox` — required, minLength, maxLength, email, url, pattern, minValue,
   maxValue, `type="number"` coercion
2. `FormSelect` — required, `allowClear` returning `undefined`
3. `FormCheckbox` / `FormSwitch` — required, `undefined` defaultValues
4. `RadioGroup` — required, `direction`
5. `TextArea` — showCount/maxCount
6. `FieldLayout` — all three layouts, colon on/off, labelWidth, error vs helper

**Verify:** `pnpm test:coverage` — thresholds should rise naturally.

### 1.8 Wire `locale` through the whole date family

`DatePicker` and `DateTimePicker` now accept `locale` and `formatString`.
`TimePicker`, `DateRangePicker`, and the underlying `Calendar`/`Popover`
wrapper probably still use English defaults.

**Change:** thread `locale` and `formatString` from
`DatePicker`/`DateTimePicker`/`TimePicker`/`DateRangePicker` through to
`react-day-picker` and `date-fns`. Extract English strings from date
components into a `date-strings.ts` keyed by locale, defaulting to English.

Also cover:

- `FormFileUpload` — "Select a file", "Upload", "Uploaded X successfully"
- `DataGrid` — "No data available", "Clear selection"
- `KanbanBoard` — "Add item"
- `Repeater` — "Add"

A full `i18nProvider` is a 2.0 item; locale threading is 1.x.

---

## Phase 2 — Chart family extensions

The chart family in 1.0.1 is narrow: `ChartCard`, `LineTrend`, `BarCompare`,
`DonutShare`, `Sparkline`, `AreaRange`. Missing common chart types:

- `PieDistribution` — for single-series category shares beyond donut
- `ScatterPlot` — for correlation / 2D distribution
- `StackedBar` — for part-of-whole over time
- `HorizontalBar` — for ranked category comparisons

Also add:

- `ChartSkeleton` — loading state for any chart wrapper
- `ChartError` — error state (matches `ErrorState`, `EmptyState` patterns
  already in the library)

Check whether `ChartCard` already owns legend/tooltip rendering before
creating standalone `ChartLegend` / `ChartTooltip` — the wrappers probably
already render those inside `ChartCard`.

---

## Phase 3 — Tooling and docs

### 3.1 Generate API docs from the source

`README.md` still has hand-maintained prop tables. That's how they drifted
into the state you already fixed. The 1.0.1 doc set covers `theming`,
`forms`, and `migration-2.0` — the general API surface isn't generated.

**Order of effort:**

1. `pnpm build-storybook` to static HTML, hosted. The Storybook install is
   already there with `addon-docs` and `addon-a11y`.
2. Add `api-extractor` (or `documentation-md`) to generate
   `docs/api/*.md` from the public exports; CI check that the generated
   output is committed.
3. Enrich every exported interface with JSDoc; make missing JSDoc a lint
   error on public exports.

Do (1) first. It's a weekend of work and removes most of the drift.

### 3.2 Enforce JSDoc on public exports

Once you're generating docs (3.1), enforce completeness:

- Add a lint rule or a `pnpm check:docs` script that walks
  `src/index.ts` exports and asserts each has a JSDoc `@public` or a
  description.
- Wire into CI as a warning first; promote to error in 2.0.

### 3.3 Split the docs folder further

`docs/` has `theming.md`, `forms.md`, `migration-2.0.md`. Add:

- `installation.md` — install + peer version matching (move the README
  section that talks about React 18 vs 19 and RHF/Zod version alignment)
- `data-grid.md` — the DataGrid column API and selection model
- `a11y.md` — the a11y assertions from the Storybook suite, the axe
  categories enforced, and known caveats (loading spinners, `role="alert"`
  error states)
- `api/` — the generated output from 3.1

---

## Deferred — out of scope for 1.x

**Breaking, target 2.0.0** (already in `docs/migration-2.0.md`):

- Rename `RadioGroup.direction` (controls item grid, not label position, but
  shares a name with `formConfig.layout`)
- Full `i18nProvider` (1.8 threads locale props only)
- Migrate off `@tanstack/react-table/legacy` to the generic v9 API
  internally (consumer-facing `ColumnDef` is already exposed)

**Known debts not covered anywhere yet:**

- No RTL support
- `DataGrid` pagination + selection interaction is untested at scale
- `KanbanBoard.onCardMove` doesn't surface the drag event
- `FileUpload` per-file progress callback landed in 1.0.1 — verify the
  story shows it; the API is easy to document badly
- Storybook stories for the new 1.0.1 components may still be partial;
  `pnpm test:storybook` will surface anything missing
