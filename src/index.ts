// ─── Button ─────────────────────────────────────────────────────────────────
export { Button, buttonVariants } from "./components/Button"
export type { ButtonProps } from "./components/Button"

// ─── Form + Field Wrappers ───────────────────────────────────────────────────
export {
  Form,
  TextBox,
  TextArea,
  FormCheckbox,
  RadioGroup,
  RadioItem,
  FormSwitch,
  FormConfigContext,
  defaultFormConfig,
  buildZodSchemaFromRules,
  useFieldValidationRegistry,
  useFormConfig,
  useForm,
  useFormField,
  useFieldError,
  CountrySelect,
  FormCountrySelect,
  PhoneInput,
  FormPhoneInput,
  DatePicker,
  FormDatePicker,
  Combobox,
  FormCombobox,
} from "./components/Form"

export { Select as FormSelect } from "./components/Form/Select"

export type {
  FormProps,
  TextBoxProps,
  TextAreaProps,
  CheckboxProps,
  RadioGroupProps,
  RadioItemProps,
  RadioOption,
  FormSwitchProps,
  FormConfig,
  FormContextValue,
  FieldValidationRules,
  FieldRegistration,
  CountrySelectProps,
  FormCountrySelectProps,
  PhoneInputProps,
  FormPhoneInputProps,
  DatePickerProps,
  FormDatePickerProps,
  ComboboxProps,
  FormComboboxProps,
} from "./components/Form"

export type { SelectProps as FormSelectProps, SelectOption } from "./components/Form/Select"

export {
  getCountryFlag,
  getCountryByCode,
  getCountryName,
  getCountryDialCode,
  formatE164,
  parseE164,
  COUNTRIES,
} from "./data/countries"
export type { Country } from "./data/countries"

// ─── Standalone Checkbox ─────────────────────────────────────────────────────
export { Checkbox } from "./components/Checkbox/Checkbox"
export type { CheckboxProps as StandaloneCheckboxProps } from "./components/Checkbox/Checkbox"

// ─── Display Components ──────────────────────────────────────────────────────
export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./components/Card"

export { Badge, badgeVariants } from "./components/Badge"
export type { BadgeProps } from "./components/Badge"

export { Avatar, AvatarImage, AvatarFallback } from "./components/Avatar"

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
} from "./components/DropdownMenu"

export { Separator } from "./components/Separator"

// ─── Feedback / Layout ───────────────────────────────────────────────────────
export { Alert, AlertTitle, AlertDescription } from "./components/Alert"
export { Tabs, TabsList, TabsTrigger, TabsContent } from "./components/Tabs"

// ─── Form Primitives (standalone) ────────────────────────────────────────────
export { Input } from "./components/Input"
export type { InputProps } from "./components/Input"

// Select primitive (raw Radix root + sub-parts for standalone use)
export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
} from "./primitives/select"

export { Label } from "./components/Label"
export type { LabelProps } from "./components/Label"

export { Textarea } from "./components/Textarea"
export type { TextareaProps } from "./components/Textarea"

export { Switch } from "./components/Switch"
export type { SwitchProps as StandaloneSwitchProps } from "./components/Switch"

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "./components/Dialog"

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from "./components/Sheet"

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "./components/AlertDialog"

export { Progress } from "./components/Progress"

export { Slider } from "./components/Slider"

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "./components/Breadcrumb"

export {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "./components/InputOTP"

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor } from "./components/Popover"

export { ScrollArea, ScrollBar } from "./components/ScrollArea"

export { Toggle, toggleVariants } from "./components/Toggle"

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "./components/Table"

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
} from "./components/Command"

export { Calendar } from "./components/Calendar"
export type { CalendarProps } from "./components/Calendar"

export { Toaster } from "./components/Sonner"

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
} from "./components/Toast"

// ─── Hooks ───────────────────────────────────────────────────────────────────
export { useToggle } from "./hooks/useToggle"
export { useDebounce } from "./hooks/useDebounce"
export { useToast, toast } from "./hooks/useToast"

// ─── Tooltip ─────────────────────────────────────────────────────────────────
export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "./components/Tooltip"
export type { TooltipContentProps } from "./components/Tooltip"

// ─── Skeleton ────────────────────────────────────────────────────────────────
export { Skeleton } from "./components/Skeleton"
export type { SkeletonProps } from "./components/Skeleton"

// ─── Accordion ───────────────────────────────────────────────────────────────
export { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./components/Accordion"

// ─── Pagination ──────────────────────────────────────────────────────────────
export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "./components/Pagination"

// ─── Utils ───────────────────────────────────────────────────────────────────
export { cn } from "./utils/cn"
