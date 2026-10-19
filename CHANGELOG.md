# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Chore
- Release workflow uses manual `workflow_dispatch` with `NPM_TOKEN` (optional dry-run); `repository.url` points at `skybin-ventures/nebula-ui`

## [1.0.3] - 2026-10-19

### Changed
- Ref-during-render patterns replaced with `useEffect` ref syncs in `Form`, `useControllableState`, `useDataGrid`, and `SearchInput`; derived-state-during-render corrections in `TreeView` and `FormAutocomplete` remove StrictMode ref-write warnings

### Fixed
- `react-refresh/only-export-components` violations resolved — cva style helpers (`navigationMenuTriggerStyle`), the Sonner `toast` API, `defaultFileId`, and provider/hook pairs are exported outside component files
- `defaultFileId` second parameter is now a real `index` argument instead of an unused `_index`

### Chore
- eslint `react-refresh` rule configured with `allowConstantExport` and `forwardFormRef`/`forwardRef`/`memo` HOCs
- `*.tgz` added to `.gitignore`

## [1.0.2] - 2026-10-18

### Fixed
- Form field `control` props accept RHF 7.90 `Control<T, any, TTransformed>` (`Control<TFieldValues, any, any>`)
- `forwardFormRef` remaps `control` onto the call-site `TFieldValues` so typed `useForm` controls type-check in consumers

## [1.0.1] - 2026-10-18

### Added
- Form fields: `FormInputOTP`, `FormSlider`, `FormCurrencyInput`, `FormPercentageInput`, `FormRating`, `FormConsent`, `FormPassword`, `FormAutocomplete`, `TagInput`/`FormTagInput`, `ColorPicker`/`FormColorPicker`
- `SearchInput`, `TreeView`, `AvatarGroup`, `NavigationMenu`, chart family (`ChartCard`, `LineTrend`, `BarCompare`, `DonutShare`, `Sparkline`, `AreaRange`)
- Data display: `StatCard`/`Metric`, Skeleton presets, `Divider`, `Section`/`SectionHeader`, `KeyValue`, `CodeBlock`, `JsonView`
- Layout/nav: `TopNavigation`, `MobileNav`/`BottomNav`, `TabBar`
- Feedback: `ModalForm`, `StatusIndicator`, `LoadingSpinner`, `ProgressBar`, `useNotification`/`NotificationBell`
- A11y: `SkipLink`, `ErrorBoundary`, `SuspenseFallback`
- `NebulaTheme` + `useTheme()`, `FormConfig.messages`, `useFormShallow()`, FileUpload per-file status/`onFileProgress`
- CI workflows, size-limit, Storybook a11y fail-on-violation; docs (`theming`, `forms`, migration notes)

### Changed
- `FormConfig.colon` defaults to `false`
- Public toast surface is Sonner `Toaster` + `toast` only (radix `ToastProvider` / `useToast` removed from public API)
- DataGrid: `enableRowSelection` defaults to `false`; import `ColumnDef` from the package (not `@tanstack/react-table/legacy`)
- Form success borders use theme tokens; field registration uses `useLayoutEffect`; DatePicker locale/`formatString` support

### Fixed
- `FormSelect` clear → `undefined`; optional boolean schema; `useControllableState` StrictMode-safe; DataGrid a11y selection/sort

### Removed
- Dead `Button.css`; unused `--form-*` token set (replaced by `--success` / `--warning`)

## [1.0.0] - 2026-10-12

### Changed
- Major version bump to 1.0.0 marking the component library's API as stable; the 0.0.34–0.0.40 line ships Command, DataTable/DataGrid, KanbanBoard, Sidebar, ToastProvider, and the remaining Tier 2/Tier 3 components

## [0.0.40] - 2026-10-12

### Changed
- Dependency bumps across Radix UI, Storybook 10.6.2, Vite 8.3.4, Vitest 5.0.5, TanStack Table 9.3.1, lucide-react 1.59.0, react-day-picker 10.0.2, react-hook-form 7.90.0, zod 4.6.7, and dev tooling
- TypeScript pinned back to 6.0.x — 7.x does not ship the JavaScript Compiler API that `unplugin-dts` needs for declaration generation

## [0.0.39] - 2026-10-12

### Changed
- Version bump for npm publish; no functional changes since 0.0.38

## [0.0.38] - 2026-09-30

### Changed
- Text-like primitives (`textbox`, `textarea`, `select`, outline `button`) and related form controls use `bg-card` instead of `bg-background` for design-system surface tone
- Disabled `select` / `textarea` / `textbox` use `disabled:bg-muted` with full opacity for a visible faded state
- Export Sonner `toast` from the main package entry; rename Radix toast helper to `radixToast` to avoid name collision

## [0.0.37] - 2026-09-21

### Fixed
- Password reveal toggle vertical alignment in `Input` and `TextBox` — replaced `top-1/2` + inline `translateY(-50%)` (double transform under Tailwind v4) with `inset-y-0 flex items-center`
- Removed redundant inline positioning styles from `PasswordRevealToggle`

## [0.0.36] - 2026-09-20

### Added
- `DataGrid` with server-side AJAX pagination via `loadPage`, loading skeletons, and error retry
- `useDataGrid` hook and `DataGridQuery` / `DataGridPage` / `DataGridLoader` types
- Storybook stories and unit tests for client-side and AJAX pagination

### Changed
- Renamed `DataTable` to `DataGrid` (`DataTable` / `useDataTable` remain as deprecated aliases)
- `./components/DataGrid` package subpath export added; `./components/DataTable` re-exports the new component

## [0.0.35] - 2026-09-20

### Added
- `DateRangePicker`, `MultiSelect`, `FileUpload`/`Dropzone`, `FormRepeater`, `Stepper`/`FormWizard`, `EmptyState`, `ErrorState`, `ConfirmDialog` with `useConfirm`, `CommandPalette`, and `FilterPanel`
- `useControllableState` hook and consumer package export tests

### Changed
- UI runtime libraries (Radix, Sonner, cmdk, date-fns, react-day-picker, lucide-react, CVA, clsx, tailwind-merge, react-hook-form, zod) are regular dependencies — only `react` and `react-dom` remain peer dependencies
- Compiled styles ship via `@skybin-tech/nebula-ui/styles.css`
- README installation simplified to a single-package setup

### Fixed
- KanbanBoard drag overlay stale state
- `DateTimePicker` `timeSet` initialization
- `PhoneInput` controlled updates
- `ToastProvider` timer cleanup and `useToast` subscription stability
- `DataTable` typing without `any`
- TypeScript 6 `baseUrl` deprecation in tsconfig

## [0.0.33] - 2026-09-06

### Fixed
- Password reveal toggle hit target enlarged with `z-index` so clicks reliably toggle visibility
- `TextBoxPrimitive` applies `type` after prop spread so password reveal cannot be overridden

## [0.0.32] - 2026-09-06

### Fixed
- Password reveal toggle positioning no longer depends on consumer Tailwind content scanning (inline position styles)

## [0.0.31] - 2026-09-06

### Added
- Built-in password reveal toggle on `TextBox` and `Input` when `type="password"` (opt out with `passwordToggle={false}`)
- `PasswordRevealToggle` exported for reuse

## [Unreleased] - 2026-09-01

### Added
- `DateTimePicker` and `TimePicker` form components with Storybook stories and package exports
- `datetime` field type support in the Zod schema builder with coercion tests

### Changed
- Normalize `DatePicker` values with `startOfDay` for consistent date-only handling

## [0.0.30] - 2026-08-13

### Changed
- Bump package to `0.0.30`
- Dev toolchain: ESLint 9→10, Storybook 10.5.5→10.5.7, Vite 8.1.5→8.2.1, lucide-react 1.27→1.31, react-hook-form 7.83→7.85, and related type/plugin patches
- `vite-plugin-dts`: use v5 `outDirs` / `bundleTypes` options (replaces `outDir` / `rollupTypes`)
- Allow `globals@17.11.0` in `pnpm-workspace.yaml` `minimumReleaseAgeExclude`

## [0.0.29] - 2026-07-28

### Added
- Form fields: `Combobox`, `CountrySelect` / `CountryPicker`, `DatePicker`, `PhoneInput`, and shared `FieldLayout`
- Components: `AlertDialog`, `Breadcrumb`, `InputOTP`, `Progress`, `Sheet`, `Slider`, plus stories for Alert/Badge/Card/Dialog/Tabs
- Package export `./styles.css` (ships `src/styles`) and unit test scripts (`test`, `test:coverage`)
- Storybook Vite/Vitest setup files; remove the old template `src/stories` samples

### Changed
- Bump package to `0.0.29`; expand peer deps for new Radix primitives and `input-otp`
- Harden Form context/Select/TextBox registration and Pagination button wiring
- Export additional primitives and components from the main barrel

## [0.0.28] - 2026-07-11

### Added
- **FormSelect**: form-integrated `Select` exported from the main barrel as `FormSelect` (with `FormSelectProps` and `SelectOption` types); also available from `@skybin-tech/nebula-ui/components/Form`

### Fixed
- Form `Select` was declared in types but missing from the published JS bundle because it was not imported by the main entry
- `./components/Form` package export pointed at `Form.js` only; barrel `index.js` is now emitted and exported so subpath imports resolve `FormSelect`, `TextBox`, and other form fields

## [0.0.27] - 2026-07-05

### Added
- **Switch**: standalone shadcn/Radix `Switch` primitive exported from the main barrel and `./components/Switch` subpath
- `StandaloneSwitchProps` type alias exported from the main barrel for the standalone switch

### Changed
- **Breaking**: form-integrated switch renamed from `Switch` / `SwitchProps` to `FormSwitch` / `FormSwitchProps` to avoid collision with the standalone primitive (mirrors `FormCheckbox` pattern)
- **Calendar**: updated `classNames` keys to react-day-picker v10 API (`caption` → `month_caption`, `nav_button_*` → `button_previous`/`button_next`, `table` → `month_grid`, `head_row/cell` → `weekdays/weekday`, `row` → `week`, `cell` → `day`, `day` → `day_button`, `day_*` modifiers → bare names)
- **deps**: removed unused devDependencies (`@chromatic-com/storybook`, `glob`, `@types/glob`, `esbuild`, `playwright`, `vite-plugin-eslint`); pinned `vitest`/`@vitest/browser-playwright`/`@vitest/coverage-v8` to `4.1.9` to resolve peer dependency conflict with `@storybook/addon-vitest`; sorted `@radix-ui` entries alphabetically

## [0.0.26] - 2026-06-16

### Changed
- `package.json` — bump Storybook 10.2→10.4, Vite 7→8, Vitest 4.1.0→4.1.9, Tailwind 4.2→4.3, Radix UI dev deps, lucide-react, react-day-picker 9→10, zod 3→4, and related toolchain packages; `@radix-ui/react-tabs` 1.1.13→1.1.15

## [0.0.25] - 2026-04-27

### Added
- **Tooltip**: `Tooltip`, `TooltipTrigger`, `TooltipContent`, `TooltipProvider` — wraps `@radix-ui/react-tooltip` with portal, animation, and theme-aware styling
- **Skeleton**: `Skeleton` — animated pulse placeholder for loading states; accepts any `className` for sizing
- **Accordion**: `Accordion`, `AccordionItem`, `AccordionTrigger`, `AccordionContent` — wraps `@radix-ui/react-accordion` with animated open/close and chevron rotation
- **Pagination**: `Pagination`, `PaginationContent`, `PaginationItem`, `PaginationLink`, `PaginationPrevious`, `PaginationNext`, `PaginationEllipsis` — fully accessible page navigation with aria labels and active-state styling
- **Badge variants** `success`, `warning`, `info` — semantic colour variants (emerald/amber/sky) alongside existing `default`, `secondary`, `destructive`, `outline`

### Changed
- `package.json` — added `@radix-ui/react-tooltip` and `@radix-ui/react-accordion` to peer deps and dev deps
- `vite.config.ts` — new Radix packages externalised for proper tree-shaking

## [Unreleased] — New primitives; expanded barrel exports; Form field updates; hooks

### Added
- **Dialog**: full Radix dialog exported from barrel (`Dialog`, `DialogPortal`, `DialogOverlay`, `DialogClose`, `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogFooter`, `DialogTitle`, `DialogDescription`)
- **Popover**: `Popover`, `PopoverTrigger`, `PopoverContent`, `PopoverAnchor` exported from barrel
- **ScrollArea**: `ScrollArea`, `ScrollBar` exported from barrel
- **Toggle**: `Toggle`, `toggleVariants` exported from barrel
- **Table**: full table set exported from barrel (`Table`, `TableHeader`, `TableBody`, `TableFooter`, `TableHead`, `TableRow`, `TableCell`, `TableCaption`)
- **Calendar**, **Command**, **Sonner**, **Toast** primitives added to `src/primitives/` and `src/components/`
- **Standalone Select**: raw Radix root and all sub-parts (`SelectGroup`, `SelectValue`, `SelectTrigger`, `SelectContent`, `SelectLabel`, `SelectItem`, `SelectSeparator`, scroll buttons) exported for use outside a Form context
- `src/hooks/useToast.ts` — toast hook for use with the Sonner/Toast primitives
- `src/hooks/useDebounce.ts`, `useToggle.ts` — general-purpose hooks exported from barrel
- `vite.config.ts` — expanded rollup `external` and `input` entries to cover new primitives; proper tree-shaking boundaries
- `src/primitives/index.ts` — barrel for all primitives (used internally; not re-exported publicly)

### Changed
- `src/components/Form/` — all form field components (`Checkbox`, `Radio`, `Select`, `Switch`, `TextArea`, `TextBox`, context, hooks, index) updated with minor fixes
- `src/components/Button/Button.tsx` — minor variant update
- Barrel (`src/index.ts`) — `Checkbox` form export renamed to `FormCheckbox`; standalone `Checkbox` now the default `Checkbox` export; `Select` form export removed from Form group (raw primitives exported separately)
- `package.json` — updated peer dependencies and dev tooling

## [0.0.24] - 2026-04-25

### Added

- **Checkbox** (standalone): `Checkbox` component exported from barrel for use without a `<Form>` / RHF context — wraps the Radix checkbox primitive with the same styled API as `Input` and `Label`
- **FormCheckbox**: Form-integrated checkbox now also exported as `FormCheckbox` from barrel so both variants are accessible at the same import path without conflict

### Changed

- Barrel export of `Checkbox` now points to the standalone primitive wrapper (most common use case); form-integrated version is still available as `FormCheckbox`

## [0.0.23] - 2026-04-25

### Fixed

- Export raw `Select` root + all sub-parts (`SelectGroup`, `SelectValue`, `SelectTrigger`, `SelectContent`, `SelectLabel`, `SelectItem`, `SelectSeparator`) from barrel for standalone (non-form) use
- Remove duplicate `Select` export from Form barrel entry to avoid conflict

## [0.0.22] - 2026-04-25

### Fixed

- Emit `'use client'` on all output files (primitives + components + hooks) — fixes cmdk and other third-party primitives that lack the directive

## [0.0.21] - 2026-04-25

### Fixed

- Rollup `banner` function now emits `'use client';` at the top of all built component and hook files — fixes Next.js App Router RSC compatibility where Vite was stripping the directive from source files

## [0.0.20] - 2026-04-25

### Fixed

- Added `'use client'` directives to all Form components (`Form`, `Select`, `Checkbox`, `Radio`, `Switch`, `TextArea`, `TextBox`, `context`, `hooks`) and hooks (`useToast`, `useToggle`, `useDebounce`) — required for Next.js App Router RSC compatibility

## [0.0.19] - 2026-04-25

### Added

- **Dialog**: `Dialog`, `DialogTrigger`, `DialogContent`, `DialogHeader`, `DialogFooter`, `DialogTitle`, `DialogDescription`, `DialogClose`, `DialogOverlay`, `DialogPortal`
- **Popover**: `Popover`, `PopoverTrigger`, `PopoverContent`, `PopoverAnchor`
- **ScrollArea**: `ScrollArea`, `ScrollBar`
- **Toggle**: `Toggle`, `toggleVariants`
- **Table**: `Table`, `TableHeader`, `TableBody`, `TableFooter`, `TableHead`, `TableRow`, `TableCell`, `TableCaption`
- **Command**: `Command`, `CommandDialog`, `CommandInput`, `CommandList`, `CommandEmpty`, `CommandGroup`, `CommandItem`, `CommandSeparator`, `CommandShortcut`
- **Calendar**: `Calendar` (built on `react-day-picker` v9)
- **Sonner**: `Toaster` (sonner-based toast notifications)
- **Toast**: `Toast`, `ToastProvider`, `ToastViewport`, `ToastTitle`, `ToastDescription`, `ToastAction`, `ToastClose`
- **useToast**: `useToast` hook and `toast` helper for imperative toast dispatch
- New peer dependencies: `@radix-ui/react-dialog`, `@radix-ui/react-popover`, `@radix-ui/react-scroll-area`, `@radix-ui/react-toggle`, `@radix-ui/react-toast`, `cmdk`, `date-fns`, `react-day-picker`, `sonner`

## [0.0.17] - 2026-04-03

### Added

- **Alert**: New `Alert`, `AlertTitle`, `AlertDescription` components exported from `components/Alert` and `primitives/alert.tsx`
- **Tabs**: New `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` components built on `@radix-ui/react-tabs`; exported from `components/Tabs` and `primitives/tabs.tsx`
- **Input**: New standalone `Input` component (with `InputProps` type) exported from `components/Input` and `primitives/input.tsx`
- **Label**: New standalone `Label` component (with `LabelProps` type) exported from `components/Label`
- **Textarea**: New `Textarea` component (with `TextareaProps` type) exported from `components/Textarea`
- **Select**, **Switch**: New `Select` and `Switch` component directories added
- **vite-plugin-dts**: Added `vite-plugin-dts` to build pipeline so TypeScript declaration files are generated correctly on every build
- Added `@radix-ui/react-tabs` as a runtime dependency

### Changed

- Bumped version 0.0.16 → 0.0.17
- Moved `"files": ["dist"]` to top of `package.json` exports block; fixed indentation of `./package.json` export entry
- Added `dts()` plugin to `vite.config.ts` with `rollupTypes: false` targeting `tsconfig.app.json`
- Added `@radix-ui/react-tabs` to `rollupOptions.external` in `vite.config.ts` so it is not bundled

## [0.0.14] - 2026-03-22

### Added

- **TextBox**: Auto-infers Zod validation rules from the `type` prop — no extra props needed:
  - `type="email"` → `z.string().email()`
  - `type="url"` → `z.string().url()`
  - `type="tel"` → `z.string().regex(/^\+?[\d\s\-().]{7,}$/)` with "Invalid phone number" message
  - `type="number"` → `z.coerce.number()`
  - `type="date"` → `z.coerce.date()`
  - Explicit props (`email`, `url`, `pattern`) still take precedence over auto-inferred rules.

### Changed

- **TextBox primitive**: Renamed `primitives/input.tsx` → `primitives/textbox.tsx`; export renamed `Input` → `TextBoxPrimitive` to match project naming conventions.

## [0.0.13] - 2026-03-17

### Added

- **Button**: New `primitives/button.tsx` — shadcn/ui-style `ButtonPrimitive` with `asChild`/`Slot` support and standard `buttonVariants` CVA (variants: `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`; sizes: `default`, `sm`, `lg`, `icon`).
- **Button**: `asChild` prop on the public `Button` component — renders children via Slot so it can wrap `<Link>` or any element without a wrapping `<button>`.
- **Exports**: `buttonVariants` is now exported from the package root for consumers who need to compose button styles externally.

### Changed

- **Button**: Refactored to wrap `ButtonPrimitive` instead of rendering a raw `<button>`. Variant/size names (`primary`→`default`, `danger`→`destructive`, `md`→`default`) are mapped internally, keeping the existing public API unchanged.
- **Button**: Loading overlay now uses `position: absolute` so the button dimensions stay stable while loading.

## [0.0.12] - 2026-03-17

### Fixed

- **Button**: Wrapped with `React.forwardRef` so refs are forwarded to the underlying `<button>` element — required for Radix UI's `asChild`/`Slot` pattern (e.g. `DropdownMenuTrigger`, `DialogTrigger`).
- **Button**: Removed `cursor-pointer` Tailwind utility from the `cva` base class and replaced with an inline `style={{ cursor: 'pointer' }}` to avoid silent breakage in Tailwind v4 consumers that don't configure a custom `@source` for `node_modules`.

## [0.0.11] - 2026-03-17

### Fixed

- **vite.config.ts**: Added `react/jsx-dev-runtime` to `rollupOptions.external` so Vite/Rollup no longer inlines a CJS shim for it in the ESM output. Without this entry, the lazy `require()` wrapper pattern injected by Rollup caused Turbopack to reject the build with "dynamic usage of require is not supported".

## [0.0.10] - 2026-03-17

### Fixed

- **package.json**: Removed the `./styles.css` export (`./dist/nebula-ui.css`) which was never generated by the build. Styling is now entirely the consumer's responsibility via their own Tailwind setup.

## [0.0.9] - 2026-03-17

### Fixed

- **Form**: Wrapped `contextValue` in `useMemo` to prevent unnecessary re-renders of all context consumers on every Form render.
- **TextBox**: Destructured `registerFieldValidation` and `unregisterFieldValidation` from context before the registration `useEffect`, replacing the full context object as a dependency with the stable function references. This eliminates the infinite re-render loop caused by the effect firing on every render due to context object identity changes.
