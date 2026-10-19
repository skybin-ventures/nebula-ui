// Form components
export { Form } from "./Form";
export type { FormProps } from "./Form";

export { TextBox } from "./TextBox";
export type { TextBoxProps } from "./TextBox";

export { PasswordRevealToggle } from "./PasswordRevealToggle";
export type { PasswordRevealToggleProps } from "./PasswordRevealToggle";

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

export { DateTimePicker, DateTimePicker as FormDateTimePicker } from "./DateTimePicker";
export type {
  DateTimePickerProps,
  DateTimePickerProps as FormDateTimePickerProps,
} from "./DateTimePicker";

export { TimePicker } from "./TimePicker";
export type { TimePickerProps, DayPeriod } from "./TimePicker";

export { Combobox, Combobox as FormCombobox } from "./Combobox";
export type { ComboboxProps, ComboboxProps as FormComboboxProps } from "./Combobox";

export { Checkbox, Checkbox as FormCheckbox } from "./Checkbox";
export type { CheckboxProps } from "./Checkbox";

export { RadioGroup, RadioItem } from "./Radio";
export type { RadioGroupProps, RadioItemProps, RadioOption } from "./Radio";

export { FormSwitch } from "./FormSwitch";
export type { FormSwitchProps } from "./FormSwitch";

export { FormInputOTP } from "./FormInputOTP";
export type { FormInputOTPProps } from "./FormInputOTP";

export { FormSlider } from "./FormSlider";
export type { FormSliderProps } from "./FormSlider";

export { FormCurrencyInput } from "./FormCurrencyInput";
export type { FormCurrencyInputProps } from "./FormCurrencyInput";

export { FormPercentageInput } from "./FormPercentageInput";
export type { FormPercentageInputProps } from "./FormPercentageInput";

export { FormRating } from "./FormRating";
export type { FormRatingProps } from "./FormRating";

export { FormConsent } from "./FormConsent";
export type { FormConsentProps } from "./FormConsent";

export { FormPassword } from "./FormPassword";
export type { FormPasswordProps } from "./FormPassword";

export { FormAutocomplete } from "./FormAutocomplete";
export type { FormAutocompleteProps, AutocompleteSuggestion } from "./FormAutocomplete";

export { FieldLayout } from "./FieldLayout";
export type { FieldLayoutProps } from "./FieldLayout";

export { CountryPicker } from "./CountryPicker";
export type { CountryPickerProps } from "./CountryPicker";

// Context and types
export {
  FormConfigContext,
  defaultFormConfig,
  defaultValidationMessages,
  buildZodSchemaFromRules,
  useFieldValidationRegistry,
} from "./context";
export type {
  FormConfig,
  FormContextValue,
  FormValidationMessages,
  FieldValidationRules,
  FieldRegistration,
} from "./context";

export type { FormControl } from "./formControl";

// Hooks
export {
  useFormConfig,
  useForm,
  useFormField,
  useFieldError,
  useFormShallow,
} from "./hooks";
