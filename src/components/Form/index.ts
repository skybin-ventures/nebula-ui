// Form components
export { Form } from "./Form";
export type { FormProps } from "./Form";

export { TextBox } from "./TextBox";
export type { TextBoxProps } from "./TextBox";

export { TextArea } from "./TextArea";
export type { TextAreaProps } from "./TextArea";

export { Select, Select as FormSelect } from "./Select";
export type { SelectProps, SelectProps as FormSelectProps, SelectOption } from "./Select";

export { CountrySelect, CountrySelect as FormCountrySelect } from "./CountrySelect";
export type {
  CountrySelectProps,
  CountrySelectProps as FormCountrySelectProps,
} from "./CountrySelect";

export { PhoneInput, PhoneInput as FormPhoneInput } from "./PhoneInput";
export type { PhoneInputProps, PhoneInputProps as FormPhoneInputProps } from "./PhoneInput";

export { DatePicker, DatePicker as FormDatePicker } from "./DatePicker";
export type { DatePickerProps, DatePickerProps as FormDatePickerProps } from "./DatePicker";

export { Combobox, Combobox as FormCombobox } from "./Combobox";
export type { ComboboxProps, ComboboxProps as FormComboboxProps } from "./Combobox";

export { Checkbox, Checkbox as FormCheckbox } from "./Checkbox";
export type { CheckboxProps } from "./Checkbox";

export { RadioGroup, RadioItem } from "./Radio";
export type { RadioGroupProps, RadioItemProps, RadioOption } from "./Radio";

export { FormSwitch } from "./FormSwitch";
export type { FormSwitchProps } from "./FormSwitch";

export { FieldLayout } from "./FieldLayout";
export type { FieldLayoutProps } from "./FieldLayout";

export { CountryPicker } from "./CountryPicker";
export type { CountryPickerProps } from "./CountryPicker";

// Context and types
export {
  FormConfigContext,
  defaultFormConfig,
  buildZodSchemaFromRules,
  useFieldValidationRegistry,
} from "./context";
export type {
  FormConfig,
  FormContextValue,
  FieldValidationRules,
  FieldRegistration,
} from "./context";

// Hooks
export { useFormConfig, useForm, useFormField, useFieldError } from "./hooks";
