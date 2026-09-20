# nebula-ui

A React component library built on [shadcn/ui](https://ui.shadcn.com/) patterns, providing form-integrated components with automatic Zod validation, accessible primitives, and utility hooks.

See [CHANGELOG.md](CHANGELOG.md) for release history.

## Installation

```bash
npm install @skybin-tech/nebula-ui
```

That single install includes Radix primitives, Sonner, cmdk, date-fns, react-day-picker, lucide-react, class-variance-authority, clsx, tailwind-merge, react-hook-form, Zod, and the other UI runtime libraries. You do not need to copy shadcn components or install Radix packages yourself.

The only **peer dependencies** are `react` and `react-dom`, so the app keeps a single React instance.

Form-connected fields (`Form`, `TextBox`, `FormDateRangePicker`, `FormRepeater`, and so on) use the `react-hook-form` and `zod` copies shipped with Nebula UI. If your app also uses those libraries directly, depend on the same major versions so the package manager hoists one copy. Apps that do not use the form system can skip `Form` entirely and use the standalone components (`DateRangePicker`, `MultiSelect`, `FileUpload`, `Repeater`, `Stepper`, etc.) with `value` / `onChange`.

### Styles

Import the Nebula UI stylesheet once in your app entry point:

```ts
import "@skybin-tech/nebula-ui/styles.css";
```

### Toast notifications

Use **Sonner** for app toasts:

```tsx
import { Toaster } from "@skybin-tech/nebula-ui";

// in root layout
<Toaster />
```

Radix Toast primitives remain exported for advanced custom toast UIs, but Sonner is the recommended default.

---

## Form system

The form system is built around `react-hook-form` and `zod`. Wrap fields in `<Form>` and each field automatically registers its validation rules — no need to define a schema separately.

### Form

The root form component. Provides context to all child fields and handles validation and submission.

```tsx
import { Form, TextBox, Button } from "@skybin-tech/nebula-ui";

<Form
  onSubmit={(data) => console.log(data)}
  defaultValues={{ username: "", email: "" }}
>
  <TextBox name="username" label="Username" required minLength={3} maxLength={50} />
  <TextBox name="email" label="Email" type="email" required email />
  <Button type="submit">Submit</Button>
</Form>
```

You can also provide a base Zod schema that gets merged with field-level rules:

```tsx
const baseSchema = z.object({ username: z.string(), email: z.string() });

<Form schema={baseSchema} onSubmit={handleSubmit}>
  <TextBox name="username" required minLength={3} />
  <TextBox name="email" required email />
</Form>
```

**Props**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onSubmit` | `SubmitHandler` | — | Form submit handler |
| `onError` | `SubmitErrorHandler` | — | Validation error handler |
| `defaultValues` | `object` | — | Initial field values |
| `values` | `object` | — | Controlled field values |
| `schema` | `ZodType` | — | Base Zod schema (merged with field rules) |
| `config` | `FormConfig` | — | Form-wide configuration (size, layout, etc.) |
| `form` | `UseFormReturn` | — | External RHF form instance |
| `mode` | `string` | `"onBlur"` | When to trigger validation |
| `reValidateMode` | `string` | `"onChange"` | When to re-validate after first submission |

**FormConfig options**

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Default size for all fields |
| `layout` | `"vertical" \| "horizontal" \| "inline"` | `"vertical"` | Layout direction |
| `labelWidth` | `string \| number` | — | Label width for horizontal layout |
| `disabled` | `boolean` | `false` | Disable all fields |
| `colon` | `boolean` | `true` | Append `:` to labels |
| `showInlineErrors` | `boolean` | `true` | Show validation errors inline |
| `validateOnBlur` | `boolean` | `true` | Validate on blur |
| `validateOnChange` | `boolean` | `false` | Validate on change |

---

### TextBox

Single-line text input with full form integration.

```tsx
<TextBox name="username" label="Username" required minLength={3} maxLength={50} />
<TextBox name="email" label="Email" type="email" required email />
<TextBox name="website" label="Website" url />
<TextBox name="amount" label="Amount" type="number" minValue={0} maxValue={100} />
<TextBox name="search" label="Search" prefix={<SearchIcon />} allowClear />
```

**Validation props**

| Prop | Type | Description |
|------|------|-------------|
| `required` | `boolean \| string` | Mark as required; string sets the error message |
| `minLength` | `number \| { value, message }` | Minimum character count |
| `maxLength` | `number \| { value, message }` | Maximum character count |
| `minValue` | `number \| { value, message }` | Minimum numeric value |
| `maxValue` | `number \| { value, message }` | Maximum numeric value |
| `pattern` | `RegExp \| { value, message }` | Regex pattern |
| `email` | `boolean \| string` | Email format validation |
| `url` | `boolean \| string` | URL format validation |
| `validate` | `(value) => boolean \| string` | Custom validation function |

---

### TextArea

Multi-line text input with optional character count display.

```tsx
<TextArea name="description" label="Description" required minLength={10} />
<TextArea name="bio" label="Bio" showCount maxCount={500} maxLength={500} />
```

Supports the same validation props as `TextBox` (except `minValue`, `maxValue`, `email`, `url`, `pattern`).

---

### Select

Dropdown select with support for an `options` array or custom `children`. Import as `FormSelect` from the main package (or `Select` from `@skybin-tech/nebula-ui/components/Form`).

```tsx
import { Form, FormSelect } from "@skybin-tech/nebula-ui";

<FormSelect
  name="country"
  label="Country"
  required
  options={[
    { label: "USA", value: "us" },
    { label: "Canada", value: "ca" },
  ]}
/>

// Or with custom children
<FormSelect name="role" label="Role" required>
  <SelectItem value="admin">Admin</SelectItem>
  <SelectItem value="user">User</SelectItem>
</FormSelect>
```

---

### CountrySelect

Searchable country picker with flag emoji and country name. Stores ISO alpha-2 codes (`"IN"`, `"US"`).

```tsx
<CountrySelect
  name="country"
  label="Country"
  required
  priorityCountries={["IN", "US", "GB"]}
/>
```

---

### PhoneInput

International mobile number input with country picker, read-only dial code, and national number field. Stores E.164 values (`"+919876543210"`).

```tsx
<PhoneInput
  name="phone"
  label="Mobile number"
  defaultCountry="IN"
  required="Please enter your mobile number"
  minLength={10}
/>
```

Supports the same `required` prop as `TextBox` — pass `true` or a custom error message string. Optional `minLength` / `maxLength` apply to the national number digits.

---

### DatePicker / Combobox

Form-integrated date picker and searchable combobox:

```tsx
<DatePicker name="birthDate" label="Date of birth" required />
<Combobox
  name="department"
  label="Department"
  options={[
    { label: "Engineering", value: "eng" },
    { label: "Sales", value: "sales" },
  ]}
/>
```

---

### Checkbox

Boolean checkbox field. When `required` is set, the checkbox must be checked to pass validation.

```tsx
<Checkbox name="terms" label="I agree to the terms and conditions" required />
<Checkbox name="newsletter" label="Subscribe to newsletter" />
```

---

### RadioGroup

A group of mutually exclusive radio buttons. Accepts an `options` array or custom `RadioItem` children.

```tsx
<RadioGroup
  name="gender"
  label="Gender"
  required
  options={[
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ]}
/>

// Horizontal layout
<RadioGroup name="size" label="Size" direction="horizontal" options={[...]} />
```

---

### Switch

Toggle switch backed by a boolean form field.

```tsx
<Switch name="notifications" label="Enable notifications" />
<Switch name="terms" label="Accept terms" required="You must accept the terms" />
<Switch name="darkMode" label="Dark mode" checkedText="On" uncheckedText="Off" />
```

---

## Display components

### Button

A styled button with multiple variants, sizes, and a built-in loading state.

```tsx
import { Button } from "@skybin-tech/nebula-ui";

<Button variant="primary" size="md">Save</Button>
<Button variant="outline" loading>Saving…</Button>
<Button variant="danger" fullWidth>Delete</Button>
```

| Variant | Description |
|---------|-------------|
| `primary` | Filled primary colour (default) |
| `secondary` | Filled secondary colour |
| `outline` | Transparent with primary border |
| `ghost` | Transparent, no border |
| `danger` | Destructive / red |

Sizes: `sm`, `md` (default), `lg`.

---

### Card

Composable card layout components.

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@skybin-tech/nebula-ui";

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Subtitle</CardDescription>
  </CardHeader>
  <CardContent>Content goes here</CardContent>
  <CardFooter>Footer</CardFooter>
</Card>
```

---

### Badge

Small status or label indicator.

```tsx
import { Badge } from "@skybin-tech/nebula-ui";

<Badge variant="default">New</Badge>
<Badge variant="secondary">Beta</Badge>
<Badge variant="destructive">Error</Badge>
<Badge variant="outline">Draft</Badge>
```

---

### Avatar

User avatar with image and fallback initials.

```tsx
import { Avatar, AvatarImage, AvatarFallback } from "@skybin-tech/nebula-ui";

<Avatar>
  <AvatarImage src="/avatar.jpg" alt="John Doe" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
```

---

### DropdownMenu

Accessible dropdown built on Radix UI.

```tsx
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@skybin-tech/nebula-ui";

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Options</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Edit</DropdownMenuItem>
    <DropdownMenuItem>Duplicate</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

---

### Separator

A horizontal or vertical divider line.

```tsx
import { Separator } from "@skybin-tech/nebula-ui";

<Separator />
<Separator orientation="vertical" />
```

---

## Hooks

### useDebounce

Debounces a value, returning the latest value only after the specified delay has elapsed with no further changes.

```tsx
import { useDebounce } from "@skybin-tech/nebula-ui";

const debouncedSearch = useDebounce(searchTerm, 300);
```

### useToggle

Returns a boolean state and a stable toggle function.

```tsx
import { useToggle } from "@skybin-tech/nebula-ui";

const [isOpen, toggleOpen] = useToggle(false);
```

---

## Utilities

### cn

Merges Tailwind CSS class names, handling conflicts via `tailwind-merge`.

```tsx
import { cn } from "@skybin-tech/nebula-ui";

<div className={cn("p-4 text-sm", isActive && "bg-primary text-white")} />
```
