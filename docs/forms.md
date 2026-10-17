# Forms

Nebula UI builds Zod schemas from field props via a ref-based registry (`buildZodSchemaFromRules`). Fields register in `useLayoutEffect` so rules are available before paint.

## Validation messages

Override defaults with `FormConfig.messages`:

```tsx
import { Form, TextBox, defaultValidationMessages } from "@skybin-tech/nebula-ui";

<Form
  config={{
    messages: {
      ...defaultValidationMessages,
      required: "Required",
      email: "Enter a valid email",
    },
  }}
>
  <TextBox name="email" label="Email" required email />
</Form>
```

## Submit types vs input types

Required strings use `z.preprocess` so empty/`undefined` become `""` before `.min(1)`. RHF form values stay the *input* shape; Zod’s output after submit may differ (empty disallowed). Prefer reading submit payloads from the `onSubmit` handler argument.

## Large forms

`useFormContext()` re-renders on every field change. Use `useFormShallow()` when you only need a values snapshot via `useSyncExternalStore`.

## Dates

`DatePicker` / `DateTimePicker` accept `locale` (`date-fns/locale`) and `formatString` (default `MMM d, yyyy`).
