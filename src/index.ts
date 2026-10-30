// ─── Button ─────────────────────────────────────────────────────────────────
export { Button, buttonVariants } from "./components/Button"
export type { ButtonProps } from "./components/Button"

// ─── Form + Field Wrappers ───────────────────────────────────────────────────
export {
  Form,
  TextBox,
  PasswordRevealToggle,
  TextArea,
  FormCheckbox,
  RadioGroup,
  RadioItem,
  FormSwitch,
  FormInputOTP,
  FormSlider,
  FormCurrencyInput,
  FormPercentageInput,
  FormRating,
  FormConsent,
  FormPassword,
  FormAutocomplete,
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
  DateTimePicker,
  FormDateTimePicker,
  TimePicker,
  Combobox,
  FormCombobox,
} from "./components/Form"

export { Select as FormSelect } from "./components/Form/Select"

export type {
  FormProps,
  TextBoxProps,
  PasswordRevealToggleProps,
  TextAreaProps,
  CheckboxProps,
  RadioGroupProps,
  RadioItemProps,
  RadioOption,
  FormSwitchProps,
  FormInputOTPProps,
  FormSliderProps,
  FormCurrencyInputProps,
  FormPercentageInputProps,
  FormRatingProps,
  FormConsentProps,
  FormPasswordProps,
  FormAutocompleteProps,
  AutocompleteSuggestion,
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
  DateTimePickerProps,
  FormDateTimePickerProps,
  TimePickerProps,
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

export { Toaster, toast } from "./components/Sonner"

// ─── Hooks ───────────────────────────────────────────────────────────────────
export { useToggle } from "./hooks/useToggle"
export { useDebounce } from "./hooks/useDebounce"

// ─── Tooltip ─────────────────────────────────────────────────────────────────
export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "./components/Tooltip"
export type { TooltipContentProps } from "./components/Tooltip"

// ─── Skeleton ────────────────────────────────────────────────────────────────
export {
  Skeleton,
  SkeletonText,
  SkeletonTitle,
  SkeletonAvatar,
} from "./components/Skeleton"
export type {
  SkeletonProps,
  SkeletonTextProps,
  SkeletonTitleProps,
  SkeletonAvatarProps,
} from "./components/Skeleton"

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

// ─── Tier 1 Composite Components ─────────────────────────────────────────────
export { DataGrid, useDataGrid, DataTable, useDataTable } from "./components/DataGrid"
export type {
  ColumnDef,
  ColumnDef as DataGridColumnDef,
  DataGridProps,
  DataGridQuery,
  DataGridPage,
  DataGridLoader,
  UseDataGridResult,
  DataTableProps,
} from "./components/DataGrid"

export { KanbanBoard } from "./components/KanbanBoard"
export type {
  KanbanBoardProps,
  KanbanCard,
  KanbanColumn,
} from "./components/KanbanBoard"

export { Sidebar } from "./components/Sidebar"
export type {
  SidebarProps,
  SidebarItem,
  SidebarGroup,
} from "./components/Sidebar"

export { TreeView } from "./components/TreeView"
export type {
  TreeViewProps,
  TreeSelectionMode,
  TreeNode,
  TreeNodeId,
} from "./components/TreeView"

export { DateRangePicker, FormDateRangePicker } from "./components/DateRangePicker"
export type {
  DateRangePickerProps,
  DateRangeValue,
  FormDateRangePickerProps,
} from "./components/DateRangePicker"

export { MultiSelect, FormMultiSelect } from "./components/MultiSelect"
export type { MultiSelectProps, FormMultiSelectProps } from "./components/MultiSelect"

export { FileUpload, Dropzone, FormFileUpload, defaultFileId } from "./components/FileUpload"
export type {
  FileUploadProps,
  FormFileUploadProps,
  FileUploadStatus,
  FileUploadItemStatus,
} from "./components/FileUpload"

export { Repeater, FormRepeater } from "./components/FormRepeater"
export type { RepeaterProps, RepeaterItem, FormRepeaterProps } from "./components/FormRepeater"

export { Stepper, FormWizard } from "./components/Stepper"
export type { StepperProps, StepperStep, FormWizardProps } from "./components/Stepper"

export { EmptyState } from "./components/EmptyState"
export type { EmptyStateProps } from "./components/EmptyState"

export { ErrorState } from "./components/ErrorState"
export type { ErrorStateProps } from "./components/ErrorState"

export { ConfirmDialog, ConfirmProvider, useConfirm } from "./components/ConfirmDialog"
export type { ConfirmDialogProps, ConfirmOptions } from "./components/ConfirmDialog"

export { CommandPalette } from "./components/CommandPalette"
export type { CommandPaletteProps, CommandPaletteItem } from "./components/CommandPalette"

export { FilterPanel } from "./components/FilterPanel"
export type { FilterPanelProps, FilterField, FilterValue } from "./components/FilterPanel"

export {
  ColumnVisibilityPopover,
  ColumnsMenu,
  ColumnVisibilityButton,
  ColumnVisibilityItem,
  useColumnVisibility,
  DEFAULT_COLUMN_VISIBILITY_STORAGE_PREFIX,
  loadColumnPreferences,
  saveColumnPreferences,
  resolveStorageKey,
} from "./components/ColumnVisibility"
export type {
  ColumnVisibilityPopoverProps,
  ColumnVisibilityButtonProps,
  ColumnVisibilityItemProps,
  ColumnDefinition,
  ColumnVisibilityState,
  ColumnVisibilityStored,
  UseColumnVisibilityOptions,
} from "./components/ColumnVisibility"

export { TagInput, FormTagInput } from "./components/TagInput"
export type { TagInputProps, FormTagInputProps } from "./components/TagInput"

export { ColorPicker, FormColorPicker } from "./components/ColorPicker"
export type { ColorPickerProps, FormColorPickerProps } from "./components/ColorPicker"

export { SearchInput } from "./components/SearchInput"
export type { SearchInputProps } from "./components/SearchInput"

export { AvatarGroup } from "./components/AvatarGroup"
export type { AvatarGroupProps, AvatarGroupItem } from "./components/AvatarGroup"

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "./components/NavigationMenu"

export {
  ChartCard,
  LineTrend,
  BarCompare,
  DonutShare,
  Sparkline,
  AreaRange,
} from "./components/Chart"
export type {
  ChartCardProps,
  LineTrendProps,
  LineTrendPoint,
  BarCompareProps,
  BarComparePoint,
  DonutShareProps,
  DonutShareSlice,
  SparklineProps,
  SparklinePoint,
  AreaRangeProps,
  AreaRangePoint,
} from "./components/Chart"

export { useControllableState } from "./hooks/useControllableState"

export { NebulaTheme, useTheme } from "./components/Theme"
export type {
  NebulaThemeProps,
  NebulaThemeContextValue,
  ThemeMode,
  ResolvedTheme,
} from "./components/Theme"

export { StatCard, Metric } from "./components/StatCard"
export type { StatCardProps, MetricProps, StatTrend } from "./components/StatCard"

export { Divider } from "./components/Divider"
export type { DividerProps } from "./components/Divider"

export { Section, SectionHeader } from "./components/Section"
export type { SectionProps, SectionHeaderProps } from "./components/Section"

export { KeyValue } from "./components/KeyValue"
export type { KeyValueProps, KeyValueItem } from "./components/KeyValue"

export { CodeBlock } from "./components/CodeBlock"
export type { CodeBlockProps } from "./components/CodeBlock"

export { JsonView } from "./components/JsonView"
export type { JsonViewProps } from "./components/JsonView"

export { TopNavigation } from "./components/TopNavigation"
export type { TopNavigationProps, TopNavigationLink } from "./components/TopNavigation"

export { MobileNav, BottomNav } from "./components/MobileNav"
export type { MobileNavProps, BottomNavProps, MobileNavItem } from "./components/MobileNav"

export { TabBar } from "./components/TabBar"
export type { TabBarProps, TabBarItem } from "./components/TabBar"

export { ModalForm } from "./components/ModalForm"
export type { ModalFormProps } from "./components/ModalForm"

export { StatusIndicator } from "./components/StatusIndicator"
export type { StatusIndicatorProps } from "./components/StatusIndicator"

export { LoadingSpinner } from "./components/LoadingSpinner"
export type { LoadingSpinnerProps } from "./components/LoadingSpinner"

export { ProgressBar } from "./components/ProgressBar"
export type { ProgressBarProps } from "./components/ProgressBar"

export {
  NotificationProvider,
  useNotification,
  NotificationBell,
} from "./components/Notification"
export type {
  NotificationItem,
  NotificationContextValue,
  NotificationProviderProps,
  NotificationBellProps,
} from "./components/Notification"

export { SkipLink } from "./components/SkipLink"
export type { SkipLinkProps } from "./components/SkipLink"

export { ErrorBoundary } from "./components/ErrorBoundary"
export type { ErrorBoundaryProps, ErrorBoundaryFallbackProps } from "./components/ErrorBoundary"

export { SuspenseFallback } from "./components/SuspenseFallback"
export type { SuspenseFallbackProps } from "./components/SuspenseFallback"
