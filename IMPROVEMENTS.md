# nebula-ui — Improvement Roadmap

Reviewed against the repo at `v1.0.0` (CHANGELOG dated 2026-10-12), 2026-10-17.

> **Status (2026-10-18):** Shipped as **1.0.1** — roadmap WPs landed (theme/CI/size, form depth, priority components, colon default, Sonner-only toast, DataGrid `ColumnDef`). See [CHANGELOG.md](CHANGELOG.md) and [docs/migration-2.0.md](docs/migration-2.0.md).

Scope: component gaps, engineering/DX quality, and architecture. Claims below are
tied to files in the repo so each item can be acted on directly.

---

## 0. What is already good

Before the list: the library is in better shape than most component libraries at
v1.0.0.

- **One React instance guarantee.** Only `react` / `react-dom` are peer
  dependencies; everything else (Radix, Sonner, cmdk, date-fns, zod, RHF) is a
  regular dependency. That is the right call and the README states it plainly.
- **Form validation derived from props** (`src/components/Form/context.ts`
  `buildZodSchemaFromRules`) with a stable ref-based registry so field
  registration never re-renders. The comments in `Form.tsx` explain the race
  they solved. This is a genuine differentiator, not boilerplate.
- **Real package tests.** `tests/package-exports.test.ts` asserts that every
  `exports` target exists on disk, then actually imports the ESM, CJS, `.d.ts`,
  and CSS artifacts from `dist`. Most libraries never test their own packaging.
- **Storybook a11y addon is wired in** (`.storybook/main.ts`), and unit +
  Storybook tests are split into separate Vitest projects with browser-mode
  Playwright for the visual suite.
- **`strict: true` with no `any` escapes** anywhere in `src`. There are zero
  occurrences of `: any`, `as any`, or `as unknown as` under `src/`.

The rest of this document is about closing the gaps around those strengths.

---

## 1. Missing components

### 1.1 Highest value — the ones the current form system wants

| Component | Why now |
| --- | --- |
| `FormInputOTP` | `InputOTP` exists but is a bare Radix passthrough. No `name`, no `label`, no `required`, no `onComplete` callback. OTP is a near-certain requirement once `PhoneInput` users ask for SMS verification. |
| `FormSlider` | Same story — standalone `Slider` exists, no form field, no `min`/`max` validation rules. Trivial to add against the existing pattern. |
| `FormFileUpload` variants (image, avatar, multi-drop with per-file status) | `FormFileUpload` is wired to RHF but there is no visual state for uploading/failed/removed per file, which is what real upload flows need. |
| `SearchInput` | The README shows `<TextBox name="search" prefix={<SearchIcon />} allowClear />`. A dedicated `SearchInput` with built-in clear, debounce (`useDebounce` already ships), and `onSearchChange` would replace a recipe everyone writes by hand. |
| `FormStepper` / `FormStepperLayout` | `FormWizard` exists, but steps have no shared schema, no per-step validation, and no cross-step dirty tracking. |

### 1.2 Data display — the biggest visible gap

There is no `EmptyState`-adjacent data-display layer for anything with
dimensions. Missing entirely:

- **`StatCard` / `Metric`** — the single most-used component in dashboards. Today you compose `Card` + `Badge` + a hardcoded trend `<span>` by hand.
- **`Tooltip`-rich `AvatarGroup`** — `Avatar` is there; nothing stacks avatars with overflow count.
- **`Tooltip` + `Skeleton` skeleton variants** — no `Skeleton` presets for text/line/title shapes. Every consumer invents the same `<Skeleton className="h-3 w-24" />` markup.
- **`Divider`** with content slot, `Section`/`SectionHeader` (title + description + actions), `Grid`/`Flex` layout primitives. These are the workhorses behind every admin surface.
- **`KeyValue`** / `FieldDefinitionList` — for "Details" panels. Currently consumers render a nested stack of `Label` + `<span>` pairs.
- **`CodeBlock`** with copy button + language label. Needed the first time you render generated code, API keys, or webhook URLs.
- **`JsonView`** — collapsible tree for JSON payloads. No library dependency required.
- **`Markdown`** viewer (unified/remark). Every content surface hits this.
- **`QRCode`** — cheap, no deps, used for 2FA and verification screens.

### 1.3 Charts

Zero charting. This is the largest single gap for a library whose headline
composites are `DataGrid`, `Sidebar`, and `KanbanBoard` — all of which imply a
dashboard consumer. Options, in order of fit:

1. **Recharts** — the default pairing with shadcn-style libraries, tree-shakes
   per chart.
2. **visx** — lower-level, more work to wrap.
3. Ship only chart *shells* (`ChartCard`, axis label, legend, tooltip card,
   empty-state) and let consumers bring their own chart lib. This is the safest
   choice for a library that already ships 40+ components — it avoids a heavy
   dependency and the version-maintenance tax.

Recommend option 3 first, then wrap Recharts for the five common cases
(`LineTrend`, `BarCompare`, `DonutShare`, `Sparkline`, `AreaRange`).

### 1.4 Navigation & layout

- **`TopNavigation`** — `Sidebar` exists and is well-built; there is no
  horizontal counterpart.
- **`MobileNav` / `BottomNav`** — `Sheet` already provides the drawer shell, so
  this is mostly composition.
- **`NavigationMenu`** (Radix primitive, not yet vendored in `src/primitives/`).
- **`TabBar`** separate from `Tabs` — segmented control / filter tabs. `Tabs` is
  content-switching; products need filter tabs too.

### 1.5 Forms — the field types nobody has

- **`FormColorPicker`** — no dependency required (native `<input type="color">`
  plus swatch presets and a hex/text field).
- **`FormCurrencyInput`** — mask + locale + symbol. Pairs naturally with
  `TextBox type="number"`.
- **`FormPercentageInput`** — same shape as currency.
- **`TagInput` / `FormTagInput`** — free-text chips. High-demand, zero deps.
- **`FormRating`** — star input. Used for reviews, NPS, and support feedback.
- **`FormAddress`** — country select + postal code + address lines. `CountrySelect`
  already gives the country half.
- **`FormLicensePlate`**, **`FormSSN`/masked identifiers** — niche but easy.
- **`FormPassword`** — strength meter + `PasswordRevealToggle` (already built) +
  `zod/string` password rule presets. `PasswordRevealToggle` currently lives
  behind `type="password"` only; it should be usable standalone.
- **`FormConsent`** — checkbox + inline agreement text with link support, distinct
  from `FormCheckbox`.
- **`FormAutocomplete`** with typed suggestions and keyboard nav. `Combobox`
  covers basic search; the autocomplete-with-external-suggestions variant is the
  missing piece.

### 1.6 Feedback & modal patterns

`ConfirmDialog` + `useConfirm` is already a strong pattern. The same recipe is
missing for other imperative UI:

- **`useToast` imperative helper** with rich payloads — `sonner` supports
  actions, images, and durations; the current `toast` re-export exposes none of
  that ergonomically, and `ToastProvider` duplicates a second API surface on
  top of it. See §4.1.
- **`Toast` notification grouping** (action toasts, progress toasts).
- **`useNotification`** for a modal-free notification panel (bell icon + badge +
  popover list).
- **`ModalForm`** — `Dialog` + `Form` + loading/error/reset state, one component.
- **`Drawer`** — right-side slide-in distinct from `Sheet` (which is the shadcn
  side drawer); most products need a right-anchored one that is visually separate
  from the settings sidebar.
- **`Snackbar`** — persistent action bar distinct from toast.
- **`Onboarding` / `Tour` / `Spotlight`** — guided walkthrough. No good
  lightweight dependency; this is custom work.
- **`Popover`** with auto-positioning and `arrow` — verify the current primitive
  exposes `side`, `align`, and `collisionPadding`; the primitive set is thin
  compared to shadcn's current popover surface.
- **`ContextMenu`** — Radix primitive not vendored.
- **`MenuButton`** — button + popover combo, replaces dozens of hand-rolled
  dropdown-trigger patterns.
- **`SplitButton`**, **`IconTextButton`**, **`LinkButton`** — thin wrappers,
  high reuse.
- **`StatusIndicator`** — dot + label + optional pulse. `Badge` is not shaped for
  this.
- **`Watermark`**, **`PrintPreview`**, **`LoadingSpinner`** as a first-class
  public component (today the spinner is private inside `Button`), **`ProgressBar`**
  with label/speed, **`Loader`** full-page/blocking.

### 1.7 Media, content & data viz

- **`Image`** with lazy load, blur-up placeholder, aspect-ratio lock, error state,
  and skeleton. Currently absent — every consumer writes their own.
- **`ImageGallery`**, **`Carousel`**, **`SliderGallery`** — all missing.
- **`VideoPlayer`**, **`AudioPlayer`**, **`MediaPlayer`**.
- **`RichTextEditor`** (Tiptap or Lexical wrapper) — high-value, big dependency
  decision.
- **`MarkdownEditor`**, **`CodeEditor`** (Monaco or CodeMirror).
- **`SignaturePad`**, **`DrawingPad`** — niche but real.
- **`Calendar`** upgrades: current `Calendar` is a `react-day-picker` wrapper.
  Missing: month/day/time presets, quick-select ("This week", "Last 30 days"),
  recurring events, timezone controls, keyboard nav audit.
- **`TimePicker`** is form-only — no standalone version exported.
- **`DurationPicker`**, **`RecurrencePicker`** — for scheduling surfaces.
- **`TagList`** (non-input display of tags with remove).
- **`DiffView`** — side-by-side or inline diff of two strings/objects.
- **`LogViewer`** — monospace, colored levels, filter, virtualized rows. Pairs
  with `DataGrid` for any ops surface.
- **`Timeline`**, **`Gantt`**, **`Schedule`**, **`Roadmap`**, **`Calendar365`** —
  the whole schedule/planning family is absent.
- **`MindMap`**, **`Graph`**, **`NetworkDiagram`**, **`OrgChart`**.
- **`FileList`**, **`DownloadList`**, **`UploadList`**, **`MediaLibrary`**,
  **`AssetPicker`** — natural extensions of `FileUpload` and `Dropzone`.
- **`MarkdownPreview`**, **`CodeHighlighter`**.
- **`Chart`** family: bar, line, area, pie, donut, radar, scatter, gauge, heatmap,
  tree map, sankey, waterfall, treemap, funnel, network, word cloud, 3D globe.
  Do **not** build all of these — build chart shells first (see §1.3).
- **`Map`**, **`GeoPicker`**, **`LocationPicker`**.
- **`3DModel`**, **`Scene`**, **`ARPreview`** — only if the product actually has a
  3D surface; otherwise skip.

### 1.8 Accessibility & i18n

- **`SkipLink`** — one-line component, high accessibility value.
- **`FocusTrap`** as a public, reusable component (Radix traps focus internally
  but there is no public component for trapping focus in a custom container).
- **`ErrorBoundary`** as a first-class export with a default fallback UI.
- **`SuspenseFallback`** wrapper that uses `Skeleton`.
- **`LazyComponent`** wrapper with default skeleton + error state.
- **`RTLProvider`** and **`useDirection`** — full RTL story is missing; Tailwind
  v4 makes this a real opportunity.
- **`i18nProvider`** and a message dictionary pattern — the library has English
  defaults baked into every component (`"No data available"`, `"Remove item"`,
  `"Add item"`, `"Clear selection"`, `"Showing X of Y"`). None of these are
  overridable centrally; each component exposes an individual label prop. A
  single message-override surface would be the difference between usable and
  blocking for non-English consumers.

---

## 2. Form system — real bugs, not guesses

These are the items worth fixing before adding new components.

### 2.1 `FormCheckbox` and `FormSwitch` cannot use RHF's `defaultValues` for booleans

Both components are typed `boolean` fields and they always register their field
as `type: "boolean"`. In `src/components/Form/context.ts`:

```ts
if (type === "boolean") {
  const schema = z.boolean();
  ...
  return finalizeSchema(schema.optional(), rules);
}
```

`z.boolean()` rejects `undefined`. So a form with `defaultValues={{ terms: false }}`
works, but a form that omits `terms` from `defaultValues` — the ordinary RHF
default — fails validation on submit with "Expected boolean, received
undefined", *even when the field is optional*.

`FieldRegistration.type` allows `"string" | "number" | "boolean" | "date" |
"datetime" | "array"`, but `boolean` is the only one that is not resilient to a
missing value.

**Fix (one line):**

```ts
if (type === "boolean") {
  const schema = z.coerce.boolean();
  ...
}
```

Add a regression test in `src/components/Form/context.test.ts` of the shape
`buildZodSchemaFromRules("boolean", {})` → `safeParse(undefined).success === true`.

### 2.2 Optional `FormSelect` fields store `""` instead of `undefined`

In `src/components/Form/Select.tsx:188`:

```ts
value={field.value?.toString() ?? ""}
```

The Radix `Select` requires an empty string to represent "no selection", so the
display-side coercion is correct. But on the write path:

```ts
onValueChange={(value) => {
  if (value === "" && allowClear) {
    field.onChange("");
  } else {
    field.onChange(value);
  }
}}
```

When `allowClear` is set, clearing writes `""` back into form state. So an
optional select field that was never touched starts as `undefined`, but the
moment the user clears it, the form value is `""` — never `undefined` again.
Downstream, the schema built by `buildZodSchemaFromRules("string", {})` produces
`z.string().optional()` which accepts `""`, so validation passes — but the
submit payload now has `""` where the caller might reasonably expect `undefined`
(for JSON serialization, PATCH bodies, etc.).

The `allowClear` and non-`allowClear` paths also diverge subtly: without
`allowClear`, the initial value `undefined` is displayed as `""` by Radix but
is never written back, so the form value stays `undefined`. With `allowClear`,
it can become `""`.

**Fix:** on the write path, map `""` back to `undefined` when the field's
current value is already `undefined`:

```ts
onValueChange={(value) => {
  field.onChange(value === "" ? undefined : value);
}}
```

Or, more explicitly, only write `""` when the user actively cleared and keep
`undefined` as the untouched value. Also normalize this in `buildZodSchemaFromRules`
for the optional-string case — `z.string().optional()` should accept both `""`
and `undefined` uniformly.

### 2.3 Field registration in `useEffect` is fragile under StrictMode and `forwardRef` casts

Every form field registers its validation rules in a `useEffect`
(e.g. `TextBox.tsx` line 175, `Select.tsx` line 140). The pattern is defensible —
the registry is a ref map and the resolver reads it at validation time, so the
race is theoretical rather than real. But two things make it fragile:

1. Under React 18/19 StrictMode the effect runs, cleans up, and runs again. The
   registry is a `Map`, so a duplicate register is a no-op and cleanup is
   idempotent — this is safe today. But the safety is incidental, not designed.
2. `TextBox`, `FormCheckbox`, and `FormSwitch` all use the
   `forwardRef(X) as <T, TName>(props) => JSX.Element` cast
   (`TextBox.tsx:332`, `Form/Checkbox.tsx:221`, `FormSwitch.tsx:209`).
   This loses the generic inference chain at the call site in some TS versions
   and it means `ref` forwarding is not typed through the wrapper.

**Recommendation:** move registration into `useLayoutEffect` (or a
`useInsertionEffect`) with an explicit comment about why the effect-based
approach is correct, and replace the `as <T, TName>()` casts with
`React.forwardRef<Props, Ref>((props, ref) => ...)` typed through a proper
generic factory. Both are non-breaking.

### 2.4 `Form` re-renders every consumer on every form state change

`Form.tsx` builds a `contextValue` with `useMemo` over `form` and a dozen
config fields (line 160). `form` is the `useForm` return object, which RHF
returns with stable identity — so this is fine. But `FormProvider {...form}`
spreads the *entire* RHF return into `FormProvider`, which means every consumer
of `useFormContext()` re-renders on every field change inside the form.

This is RHF's default behavior and it is usually fine, but it shows up as jank
on long forms with many `useController` consumers. The fix is to document the
cost and provide a `useFormShallow()` helper that uses
`useFormContext().getValues()` inside a `useSyncExternalStore` — that is a real,
non-breaking improvement for large forms.

### 2.5 `FormConfig.colon` is a leaky abstraction

`defaultFormConfig.colon = true` means every label in the library ends with a
colon by default (`FieldLayout.tsx:56`). This is a design-system opinion
baked into the default. Two problems:

- It clashes with `labelVariants({ required: true })` which appends a `*`, so a
  required label reads `Name:*` — visually cluttered.
- Consumers who don't want colons must set `colon={false}` in every form, or
  set it via `config` on every `<Form>` — easy to miss.

**Fix:** default `colon` to `false` (shadcn convention) and treat the current
behavior as an opt-in. This is a breaking change to the rendered output, so
gate it behind a `2.0.0` release or add a `legacyColons` flag first.

### 2.6 Validation messages are hardcoded and not overridable

`buildZodSchemaFromRules` hardcodes every default message
("This field is required", "Invalid email address", "Invalid URL", "Invalid
format", "Invalid phone number", and the interpolated "Minimum X characters
required"). There is no central way to change them, no locale support, and the
`maxLength`/`minValue` messages interpolate a value that is only safe because
the value is number-typed.

Add a `FormConfig.messages` object with an override map and thread it through
`buildZodSchemaFromRules`. Also export a `defaultValidationMessages` constant so
consumers can extend rather than replace.

### 2.7 `FieldLayout` puts the label before the input for every layout

`FormCheckbox`, `FormSwitch`, and `RadioGroup` all correctly route through
`FieldLayout` (verified in `Checkbox.tsx:143`, `FormSwitch.tsx:196`,
`Radio.tsx:196`). `labelVariants` in `variants.ts` is also correctly
layout-aware — `mb-1.5` only applies to `vertical`, and `mb-0` for
`horizontal`/`inline`.

The real inconsistency is that `FieldLayout` renders `[Label] [Input]` for
every layout, including `layout: "horizontal"`. For text inputs that's fine,
but for checkboxes and switches the conventional order is `[Input] [Label]` —
the label sits *after* the control.

Setting `layout: "horizontal"` on a form gives every checkbox and switch a
`Name: [x]` rendering instead of `[x] Name`. Also:

- `FormCheckbox` treats non-string labels differently — they're rendered inline
  after the checkbox (`Checkbox.tsx:175`), bypassing `FieldLayout`'s label
  pipeline entirely. So `formConfig.labelWidth`, `formConfig.colon`, and
  `required` asterisks only apply to string labels.
- `RadioGroup`'s `direction` prop (horizontal/vertical, controls the radio
  item grid) is separate from `formConfig.layout` (controls label position).
  Both affect layout, and a user setting both is confused about which one does
  what.

**Fix:** add an `orientation: "label-first" | "input-first"` prop to
`FieldLayout` (default `label-first`, set to `input-first` for checkbox and
switch). Unify the non-string label path in `FormCheckbox` so all labels go
through `FieldLayout`. Consider merging `RadioGroup.direction` and
`formConfig.layout` into a single axis, or rename them to make the distinction
obvious.

### 2.8 `FormConfig.colon` and the required asterisk collide

`FieldLayout.tsx:56` appends `":"` to the label when `formConfig.colon` is
true. `labelVariants({ required: true })` in `variants.ts` appends `*` via
`after:content-['*']`. A required label therefore renders as `Name:*` with the
colon inside the label text and the asterisk as a CSS `::after` — visually
`Name:*` but structurally two separate mechanisms.

With `colon: false` it's `Name*`. With `colon: true` it's `Name:*`. Neither
matches any mainstream design system (shadcn renders `Name *` with a space and
no colon; Ant Design renders `*Name` with the asterisk first). Pick one and
make it configurable. The current default produces the most visually cluttered
combination.

### 2.9 `useControllableState` has a controlled-mode stale-closure risk

`src/hooks/useControllableState.ts` resolves the next value from `current`,
which is captured in the `useCallback` dependency array. This is correct for
the controlled path (the caller owns the next value), but the uncontrolled path
mixes strategies: it uses `setUncontrolled((previous) => ...)` for state
resolution but also calls `onChange?.(resolved)` *inside* the updater.

Calling `onChange` inside a state updater is a React anti-pattern — the updater
may run more than once under StrictMode, and calling side effects from within
an updater is disallowed by the React compiler. It also breaks when `onChange`
is async (which is exactly what form submission wants).

**Fix:** resolve `next` outside the updater using `current` from the closure,
then call `onChange` and `setUncontrolled` in sequence. The hook is used by
`DataGrid` and `Repeater`, so this is a real surface.

### 2.10 Form field `variant` is hardcoded to green for success

`border-green-500` appears in 8 form fields: `TextBox.tsx:26`, `Select.tsx:211`,
`TextArea.tsx:25`, `CountrySelect.tsx:21`, `DatePicker.tsx:38`,
`DateTimePicker.tsx:28`, `Combobox.tsx:32`, `PhoneInput.tsx:27`. Every one of
them hardcodes the success color inline rather than using a theme token. This
breaks in dark mode and defeats any theming effort.

The `--form-success` and `--form-warning` tokens already exist in
`src/styles/index.css:56-57`, they are just unused by the components. Either
reference those tokens, or (recommended) delete the `--form-*` set entirely and
add a proper `--color-success` and `--color-warning` to the shadcn `@theme`
block so `text-success`, `border-success`, `ring-success` become first-class
Tailwind utilities.

### 2.11 `DateTimePicker` hardcodes `en-US`-style `date-fns` formatting

`src/components/Form/DateTimePicker.tsx:4` imports `format` and `startOfDay`
from `date-fns` and uses them throughout without a locale. `format(date,
"MMM d, yyyy")` produces English output only. The `Calendar` primitive has the
same issue. For a library that ships `CountrySelect` with full country-code
support and `PhoneInput` with E.164, hardcoding English date output is
inconsistent — especially for a library whose README is aimed at a global
audience.

**Fix:** add a `locale` prop to `DateTimePicker`, `DatePicker`, `TimePicker`,
and `Calendar` (defaulting to `enUS`), and accept `date-fns/locale` subpath
imports. Also make the format strings configurable. This is the same story as
the `--form-*` token duplication — the library has the pieces, they just aren't
wired together.


---

## 3. Engineering & DX

### 3.1 Theming is only half-built

`src/styles/index.css` defines a full HSL token set for light and dark modes
(`--background`, `--primary`, `--destructive`, etc.) and a parallel
`--form-*` token set (lines 51-63 and 88-98). Only the `--form-*` set is
actually used by the form components; the shadcn tokens are used by the
display components. Two parallel theming systems, neither complete.

Concrete issues:

- **No `Theme` component.** `grep -r "Theme\|useTheme\|colorScheme\|theme-" src/`
  returns zero matches. There is no component to switch between light and dark,
  no `useTheme()` hook, and no `color-scheme` CSS property set. The `.dark`
  class exists in the stylesheet but nothing applies it.
- **No token generation script.** shadcn ships a `baseColor` + `baseRadius`
  generator (`components.json` declares `baseColor: "slate"`,
  `cssVariables: true`, but there is no code in the repo that reads those and
  emits the tokens). Today, changing the palette means hand-editing 30+ lines
  in `src/styles/index.css`.
- **Tailwind v4 `@theme inline` is set up correctly**, which is good — but the
  `--form-*` tokens are not registered in `@theme`, so they cannot be used as
  Tailwind utility values (`text-form-primary`, `bg-form-bg`, etc.). Either add
  them to `@theme` or delete the duplicate system.

**Recommendation:** add `NebulaTheme` (a context-based provider with `theme`,
`resolvedTheme`, `setTheme`, `system` preference detection, and `colorScheme`
syncing), add `useTheme()`, generate tokens from a `theme.config.ts` script,
and either unify on one token system or document the split explicitly.

### 3.2 Bundle size is not measured, and `Button.css` is dead weight

`src/components/Button/Button.css` contains only the comment
`/* Button styles are now handled by Tailwind via CVA in Button.tsx */` and is
not imported anywhere (`grep "Button.css"` returns zero matches). It is only
in the package because `"files": ["dist", "src/styles"]` does not ship `src/`,
but the file will keep confusing future contributors. Delete it.

More importantly: there is no bundle-size reporting anywhere. `vite build` with
`preserveModules: true` produces hundreds of small files and no summary.

**Add three things:**

1. `rollup-plugin-visualizer` in the build (dev-only, generates `stats.html`).
2. `@size-limit/preset-small-lib` (or just `size-limit`) with a budget. Given
   the `preserveModules: true` setup, measure `dist/index.js` and the largest
   subpath exports separately.
3. A CI job that fails on budget overrun. Without this, every new component
   ships with unreviewed dependencies.

### 3.3 `primitives/` + `components/` is the right shape, but the boundary is leaky

The `src/primitives/index.ts` header says "INTERNAL USE ONLY / DO NOT modify
these files / DO NOT export this barrel from the public API". Good discipline.
But two leaks exist:

1. `src/index.ts:137` exports `Select`, `SelectGroup`, `SelectValue`, etc.
   **directly from `./primitives/select`**, not from `./components/Select`.
   Every other component is exported through its `components/` wrapper. The
   Select case is a special case because it was documented as "raw Radix for
   standalone use" in the CHANGELOG (0.0.23, 0.0.28).
2. `DataGrid.tsx:4-19` imports `Button` from `@/primitives/button` and
   `DropdownMenu`, `Table`, `Skeleton`, `ErrorState` directly from
   `@/primitives/*` and `@/components/*`. This is fine internally, but it means
   the primitive layer is not really "internal" — components routinely reach
   into it.

The naming (`primitives` vs `components`) is right. The problem is that
`primitives/` is not consistently enforced as a boundary. Two fixes:

- Add a lint rule (`eslint-plugin-boundaries` or a custom rule) that forbids
  `@/primitives/*` imports from anything outside `src/components/` and
  `src/primitives/`.
- Document that `primitives/` is vendored shadcn and version-locked to the
  shadcn release it was generated from, and add a `GENERATED_FROM` comment or
  `shadcn-lock.json` per file so the upgrade path is traceable.

### 3.4 Storybook a11y is enabled but not configured

`.storybook/main.ts` includes `@storybook/addon-a11y`, and `.storybook/preview.ts`
configures only `controls.matchers`. That means:

- The a11y addon runs in the browser (visible via the toolbar) but there is no
  automated a11y assertion in CI.
- No `addons: ['@storybook/addon-a11y']` `parameters` block configures the
  ruleset. The default axe ruleset is fine, but form components need
  `axe.config` rules for color-contrast on the `--form-text-secondary` rgba
  values (which are 45% opacity — likely to fail WCAG AA).
- `storybookTest()` in `vite.config.ts:166-179` runs the storybook project with
  a browser provider, but the project's `setupFiles` is `.storybook/vitest.setup.ts`
  — nothing in that setup file (per the repo listing) appears to configure
  automated a11y assertions per story.

**Recommendation:** add `expect(a11yViolations).toHaveLength(0)` per story via
`storybook-a11y` or the vitest-a11y matcher, and fail the build if any story
produces an axe violation. This is the single highest-leverage a11y change
available.

### 3.5 Test coverage is thin on the components that matter

16 test files exist, but the distribution is uneven:

| Has tests | Missing tests |
| --- | --- |
| `DataGrid`, `MultiSelect`, `DateRangePicker`, `FileUpload`, `Repeater`, `Stepper`, `EmptyState`, `ErrorState`, `ConfirmDialog`, `CommandPalette`, `FilterPanel`, `useToast`, `context`, `dateTime`, `DateTimePicker`, `KanbanBoard/resolveDragCard` | `Form` (end-to-end submit + validation), `TextBox`, `TextArea`, `Select`, `FormCheckbox`, `FormSwitch`, `RadioGroup`, `PhoneInput`, `CountrySelect`, `Combobox`, `DatePicker`, `TimePicker`, `FormRepeater`, `FormFileUpload`, `FormMultiSelect`, `FormDateRangePicker`, `FormWizard`, `FieldLayout`, `Sidebar`, `DataGrid` a11y, every component's a11y tree |

The most-used components (`Form`, `TextBox`, `FormSelect`) have no tests. Add a
single integration test per form field that renders the field inside `<Form>` and
asserts on the error message when the field is invalid — this would cover the
registry, the resolver, and the field layout in one test.

Add `vitest.workspace.ts` (the projects are configured inline in
`vite.config.ts`, which works but is not discoverable via `vitest --help`).
Also add `@vitest/coverage-v8` thresholds (e.g. `lines: 60, functions: 60,
branches: 50, statements: 60`) so coverage cannot silently regress.

### 3.6 CI is absent

`.github/workflows/` does not exist in the repo. `package.json` defines
`prepublishOnly: "npm run build:lib"` but there is no CI that runs
`pnpm test`, `pnpm lint`, or `pnpm build` before publish. `deploy` is
`npm publish --access public` with no dry-run, no provenance, and no
`--provenance` flag for npm's supply-chain attestation.

**Add a minimal workflow:**

- `ci.yml` — `pnpm install --frozen-lockfile`, `pnpm test`, `pnpm lint`,
  `pnpm build`, `pnpm test:coverage`, and `pnpm test:storybook`.
- `release.yml` — triggered by tag push, runs `npm publish --provenance`,
  requires a `GITHUB_TOKEN` with publish scope, and uploads `dist/` as an
  artifact.
- Add `pnpm/action-setup` and `actions/setup-node` with a cache.

### 3.7 README drift is real and blocks adoption

The README documents API that has moved on since it was written. Concrete
mismatches between README and source:

| README says | Source says |
| --- | --- |
| `FormSelect` is imported from the main package | Correct — `src/index.ts:36` |
| `FormSelect` requires `options` or `children` | Correct |
| `PhoneInput` "supports the same `required` prop as `TextBox`" | Correct |
| `CheckBox` `required` requires the checkbox to be checked | Correct — but see §2.1 |
| `RadioGroup` accepts `direction="horizontal"` | Correct — `src/components/Form/Radio.tsx:78` |
| `Checkbox` is the standalone primitive | Correct — `src/index.ts:79` |
| `FormCheckbox` exists | Correct — `src/index.ts:12` |
| `ToastProvider` is Sonner-based | **Wrong.** `ToastProvider` is a custom context (`src/components/ToastProvider/toast-context.ts`), and `Toaster` is the Sonner export. The README's installation section says "Use **Sonner** for app toasts" but the exported name is `Toaster`, not `ToastProvider`. |
| "Import `Toaster` from `@skybin-tech/nebula-ui`" | Correct, but the same section immediately below says to use `ToastProvider` for the Sonner API — confusing. |
| `FormConfig.validateOnChange` default is `false` | Correct |
| `FormConfig.colon` default is `true` | Correct, but see §2.5 |
| `useDebounce` and `useToggle` are the only hooks | **Wrong.** `useControllableState`, `useToast`, `useConfirm`, `useDataGrid`, `useFormConfig`, `useFormField`, `useFieldError`, `useForm`, `useFieldValidationRegistry` all exist and are exported. |
| Button variants: `primary`, `secondary`, `outline`, `ghost`, `danger` | Correct |
| Sizes: `sm`, `md`, `lg` | Correct |

**Recommendation:** replace the hand-written prop tables with auto-generated
API docs. Options:

- **Storybook docs** as the source of truth, published to a static site
  (`storybook-static` build). The Storybook install is already there.
- **`api-extractor` + `documentation-md`** to generate `docs/api/*.md` from
  the exported types at build time.
- **`type-fest`-style JSDoc** in every exported interface, checked by
  `documentation-jsx` in CI so stale docs fail the build.

Do all three over time, but the first is a one-weekend win.

### 3.8 `tsconfig.node.json` type-checks only `vite.config.ts`

`tsconfig.node.json:26` has `"include": ["vite.config.ts"]`. That means
`eslint.config.js`, `.storybook/main.ts`, `.storybook/preview.ts`,
`.storybook/vite.config.ts`, `.storybook/vitest.setup.ts`,
`vitest.shims.d.ts`, and `tests/package-exports.test.ts` are all **not type
checked by `tsc -b`** (the root `tsconfig.json` references only `app` and `node`).

`vite-plugin-checker` runs only on `src` via `tsconfigPath: "./tsconfig.app.json"`
in `vite.config.ts:104`.

**Fix:** expand `tsconfig.node.json` `include` to cover `eslint.config.js`,
`.storybook/*.ts`, `tests/**/*.ts`, and `vitest.shims.d.ts`. Also add a
`vitest.workspace.ts` (see §3.5) so the projects are discoverable outside the
vite config.

### 3.9 The `forwardRef` + `as <T, TName>()` cast pattern needs an upgrade

See §2.3 for the specific instances. More broadly: React 19 supports `ref` as
a prop, so `forwardRef` is not required for new components. The existing
`forwardRef` calls are all correct — but the `as <T, TName>()` cast at the end
of `TextBox`, `FormCheckbox`, `FormSwitch` (and possibly others) is a pattern
that predates React 19's `ref`-as-prop and it loses generic inference.

**Migration path:** for new components, take `ref` as a prop. For existing
components, keep `forwardRef` (backward compat with React 18 consumers — the
package.json peer is `^18.0.0 || ^19.0.0`) but replace the `as <T, TName>()`
cast with a typed factory function.

### 3.10 `package.json` hygiene

- `exports` block is 570 lines. It is correct but unreadable. Consider
  generating it from a single source of truth (a script that reads `src/**/index.ts`
  and emits the exports block). This is the same problem `vite.config.ts`
  solves with `collectLibEntries()` — extend that pattern to `package.json`.
- `typesVersions` duplicates the `exports` map. Same fix.
- No `publishConfig.registry` — fine if this is a private package, but worth
  setting if publishing to npm public.
- `deploy` script is `npm publish --access public` with no `--provenance` flag
  for npm's supply-chain attestation. Add it.
- `files: ["dist", "src/styles"]` — `src/styles/index.css` is referenced by
  `src/styles-entry.ts` which imports it and re-exports it as `dist/styles.css`.
  So the `src/styles` entry in `files` is redundant — `dist/styles.css` is the
  shipped artifact. Consider narrowing `files` to `["dist", "README.md",
  "LICENSE", "CHANGELOG.md"]` and removing `src/styles`.
- No `sideEffects` entry for `src/styles-entry.ts` — the current
  `"sideEffects": ["**/*.css"]` is fine because the CSS import is in a `.ts`
  file that just imports CSS. But confirm that tree-shakers do not drop the
  `styles.css` side-effect import when the consumer imports only `cn`.

### 3.11 Add a `docs/` folder

The README is the only documentation. A `docs/` folder with `installation.md`,
`theming.md`, `forms.md`, `data-grid.md`, `a11y.md`, and `migration-0.x.md`
would make the library maintainable as it grows. Each should be generated
from Storybook stories where possible to avoid drift.

---

## 4. Known code issues to fix in this order

Ordered by "bug risk × fix cost".

### 4.1 Consolidate `ToastProvider` and Sonner

Two toast APIs in one library:
- `Toaster` + `toast` from `./components/Sonner` (Sonner)
- `ToastProviderRoot` + `useToast` + `radixToast` from `./components/ToastProvider`
  and `./hooks/useToast`

The README says Sonner is the recommended default. The duplication is
confusing. Pick one. If Sonner stays, deprecate `ToastProvider` and `useToast`
in 2.x. Add a `useToast` shim that calls `toast()` from Sonner for the
deprecation period.

### 4.2 `FormSelect` `undefined → ""` coercion

See §2.2. One-line fix.

### 4.3 `FieldLayout` shows the helper text below the input in horizontal layout but the input is not vertically aligned

`src/components/Form/FieldLayout.tsx:83-95` — the horizontal layout uses
`flex items-start gap-4` with the label at `pt-2`. If the input is `h-8`
(size `sm`) the label's `pt-2` (8px) does not align with the input's top
(text baseline is inside the input's padding). This is a visual bug that
shows up on every form in horizontal layout with `sm` inputs.

**Fix:** compute the label's vertical offset from the effective input size,
or use a shared `alignInputAndLabel` helper that knows each size's line-height.

### 4.4 `Form` does not disable the form on submit when `onSubmit` is async

`Form.tsx:153-157`:

```ts
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (onSubmit) {
    form.handleSubmit(onSubmit, onError)(e);
  }
};
```

If `onSubmit` returns a Promise (which is the normal pattern for async form
submission), the form re-enables its buttons immediately after validation
passes. There is no `isSubmitting` state surfaced. Consumers have to wire
their own loading state.

**Fix:** add a `disabledOnSubmit` prop (default `false` for back-compat) and
optionally a `submitting` callback or `useFormIsSubmitting` hook. This is a
real usability gap.

### 4.5 `buildZodSchemaFromRules` produces different types than RHF's `FieldValues`

The schema builder uses `z.preprocess((value) => (value === undefined || value === null ? "" : value), schema.min(1, message))`
for required strings. This means the *input* type is `string` (empty allowed)
but the *output* type is `string` (empty disallowed). For RHF + zodResolver,
this means `formState.values` at submit time has the coerced output type.

This is correct behavior, but it is undocumented and the type inference from
`Form<TFieldValues>` uses the input type, not the output type. The generic
`TFieldValues` in `FormProps` is the input type.

**Fix:** document this in the README and add a `z.infer<typeof schema>` type
export so consumers can compute the submit type.

### 4.6 `useControllableState` calls `onChange` inside the state updater

See §2.9. Real bug, easy fix.

### 4.7 Delete `src/components/Button/Button.css`

Dead file, only contains a comment. `grep "Button.css"` returns zero matches
in the repo.

### 4.8 `--form-*` tokens are unused by the form components that should use them

`src/styles/index.css:51-63` defines `--form-primary`, `--form-error`,
`--form-success`, `--form-warning`, `--form-border`, etc. `grep --form- src/`
returns 25 matches, **all in `index.css` itself**. None of the components
reference these tokens.

The form components use hardcoded hex colors in some places (`#1890ff` in
`index.css:54` for `--form-primary`) and Tailwind utility classes in others.
Pick one approach. Recommend deleting the `--form-*` set and unifying on the
shadcn tokens. Same theme-token problem shows up in form components as
`border-green-500` hardcoded in 8 form fields — see §2.10.

### 4.9 `DataGrid` `enableRowSelection` defaults to `true`

`DataGrid.tsx:116` — `enableRowSelection = true`. This means every `DataGrid`
render gets selection checkboxes by default. For a library that aims to be
"drop in and it works", this is surprising. Most tables do not want row
selection.

**Fix:** default to `false`. Add a `selectable` alias for discoverability.

### 4.10 `DataGrid` does not accept a `getPaginationRowModel` for custom sort order

`useDataGrid.ts:4-7` imports `getSortedRowModel` and `getFilteredRowModel`
from `@tanstack/react-table/legacy` but does not accept a `rowSelection`
model or custom `getRowId`. For real server-side grids this is a blocker.

### 4.11 `useDataGrid` uses `useLegacyTable` from `@tanstack/react-table/legacy`

`useDataGrid.ts:3` imports `useLegacyTable` and `LegacyColumnDef`. This is the
TanStack Table legacy API (non-generic columns). The main TanStack Table v9
API is generic and tree-shakes better. This is a compatibility choice, but it
should be documented and a migration path to the non-legacy API should exist.

### 4.12 `KanbanBoard` `onCardMove` is not typed to the drag event

`KanbanBoard.tsx:46` — `onCardMove: (fromColumnId, toColumnId, newIndex) => void`.
The drag event (`DragEndEvent`) has more useful info (drop coordinates, whether
the drop was a valid target, the active card's pointer offset). Surfacing the
full event would let consumers do undo/redo and animation callbacks.

### 4.13 `FileUpload` does not expose per-file progress

There is a `FormFileUpload` but no per-file progress callback. Real upload
flows need this. Add an `onFileProgress: (fileId, percent) => void` prop and a
`status: "queued" | "uploading" | "done" | "error"` field on each file item.

---

## 5. Suggested order of work

**Phase 1 — Correctness (1-2 days)**
- §4.2 / §2.2 `FormSelect` `undefined → ""` coercion
- §2.1 `FormCheckbox`/`FormSwitch` boolean schema accepts `undefined`
- §2.9 `useControllableState` `onChange` out of updater
- §4.7 delete `Button.css`
- §4.8 delete `--form-*` tokens or use them
- §3.8 expand `tsconfig.node.json` include

**Phase 2 — Foundations (1 week)**
- §3.1 `NebulaTheme` + `useTheme()` + token generation script
- §3.2 bundle-size budget + visualizer
- §3.6 CI workflow
- §3.5 `vitest.workspace.ts` + coverage thresholds
- §3.4 Storybook a11y assertions in CI
- §3.7 README prop-tables → Storybook-generated docs

**Phase 3 — Form system (1 week)**
- §2.3 migrate registration from `useEffect` to `useLayoutEffect`, replace
  `as <T, TName>()` casts
- §2.4 add `useFormShallow()`
- §2.5 deprecate default `colon: true`
- §2.6 `FormConfig.messages` override map
- §4.4 `disabledOnSubmit` / `useFormIsSubmitting`
- §2.2 `FormSelect` `undefined` preservation

**Phase 4 — New components, priority order**
1. `FormInputOTP`, `FormSlider`, `FormColorPicker`, `FormCurrencyInput`,
   `TagInput`, `FormRating`, `FormConsent` — all fit the existing form pattern
   and are small.
2. `StatCard`, `AvatarGroup`, `Skeleton` variants, `Divider`, `Section`,
   `Grid`/`Flex`, `KeyValue`, `CodeBlock`, `JsonView` — data display.
3. `TopNavigation`, `MobileNav`, `NavigationMenu`, `TabBar` — layout.
4. Chart shells, then Recharts wrappers.
5. `useNotification` (toast grouping + modal-free notification panel).
6. `Onboarding` / `Tour` — high effort, do last.

**Phase 5 — 2.0.0 breaking cleanup**
- Remove deprecated `ToastProvider` (Sonner wins).
- Default `colon: false`.
- Default `DataGrid.enableRowSelection: false`.
- Drop `@tanstack/react-table/legacy` for the v9 generic API.
- Drop `React.forwardRef` wrappers in favor of `ref`-as-prop for new
  components, keep `forwardRef` for the ones that already shipped.

---

## Appendix — Files referenced

| File | Line | Issue |
| --- | --- | --- |
| `src/components/Form/context.ts` | 194-205 | boolean schema rejects `undefined` |
| `src/components/Form/Select.tsx` | 188 | `field.value?.toString() ?? ""` coercion |
| `src/components/Form/TextBox.tsx` | 332 | `forwardRef` + `as <T, TName>()` cast |
| `src/components/Form/Checkbox.tsx` | 221 | same cast pattern |
| `src/components/Form/FormSwitch.tsx` | 209 | same cast pattern |
| `src/components/Form/Form.tsx` | 153-157 | no `isSubmitting` state |
| `src/components/Form/FieldLayout.tsx` | 83-95 | horizontal layout label offset |
| `src/components/Form/TextBox.tsx` | 26 | `border-green-500` inline |
| `src/components/Form/Select.tsx` | 211 | `border-green-500` inline |
| `src/hooks/useControllableState.ts` | 22-28 | `onChange` inside updater |
| `src/components/DataGrid/DataGrid.tsx` | 116 | `enableRowSelection = true` default |
| `src/components/DataGrid/useDataGrid.ts` | 3-8 | legacy TanStack Table API |
| `src/components/KanbanBoard/KanbanBoard.tsx` | 46 | drag event not surfaced |
| `src/components/Button/Button.css` | 1-1 | dead file |
| `src/styles/index.css` | 51-63, 88-98 | `--form-*` tokens unused |
| `src/index.ts` | 137 | Select exported from `primitives/` directly |
| `src/index.ts` | 253-259 | two toast APIs (`ToastProviderRoot` + `Toaster`) |
| `tsconfig.node.json` | 26 | only `vite.config.ts` type-checked |
| `.storybook/main.ts` | 13-14 | a11y addon enabled, not asserted |
| `tests/package-exports.test.ts` | — | strong, keep and extend |
| `README.md` | 27-38 | Sonner vs `ToastProvider` confusion |
| `README.md` | 382-403 | hooks section lists only 2 of 11 hooks |
