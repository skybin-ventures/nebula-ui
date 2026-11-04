/**
 * Consumer type-validation fixture.
 *
 * Imports representative components/types from the package entry point and
 * supported subpaths, exactly the way a consumer app would, and exercises the
 * generic props (RHF form integration, DataGrid columns) that are the
 * highest-risk surface of the public API.
 *
 * This file is compile-checked by `tsc -b` (tsconfig.consumer.json) against
 * the built `dist` declarations — it is not a runtime test, and `pnpm test`
 * does not execute it.
 */
import {
  Button,
  DataGrid,
  Form,
  FormColorPicker,
  FormDateRangePicker,
  FormSelect,
  FormTagInput,
  Toaster,
  TextBox,
  toast,
  type ColumnDef,
  type DateRangeValue,
} from "@skybin-tech/nebula-ui"
import { useDataGrid } from "@skybin-tech/nebula-ui/components/DataGrid"
import { FormColorPicker as SubpathFormColorPicker } from "@skybin-tech/nebula-ui/components/ColorPicker"
import { FormTagInput as SubpathFormTagInput } from "@skybin-tech/nebula-ui/components/TagInput"
import { useDebounce } from "@skybin-tech/nebula-ui/hooks/useDebounce"
import { cn } from "@skybin-tech/nebula-ui/utils/cn"
import { useForm, type FieldValues } from "react-hook-form"

type Customer = {
  id: string
  name: string
  role: "admin" | "member"
}

// Public ColumnDef is the TanStack compatibility column def; a plain object
// with accessorKey + header must satisfy it for a typed DataGrid.
const columns: ColumnDef<Customer>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "role", header: "Role" },
]

function CustomerGrid({ data, onSelectionChange }: { data: Customer[]; onSelectionChange?: (rows: Customer[]) => void }) {
  // Render the DataGrid component straight from the main entry.
  return <DataGrid<Customer> columns={columns} data={data} onSelectionChange={onSelectionChange} />
}

// The useDataGrid hook (subpath entry) returns the same table state the
// component uses internally; a consumer can drive selection/pagination manually.
function CustomerGridController({ data }: { data: Customer[] }) {
  const { selectedRows, allColumnIds, table } = useDataGrid<Customer>({ columns, data })
  const rows = table.getRowModel().rows
  return (
    <span aria-hidden="true">
      {rows.length} {selectedRows.length} {allColumnIds.join(" ")}
    </span>
  )
}

type CustomerFormShape = {
  name: string
  skills: string[]
  brand: string
  trip: DateRangeValue
  role: string
}

const emptyCustomerForm: CustomerFormShape = {
  name: "",
  skills: [],
  brand: "",
  trip: {},
  role: "",
}

function CustomerForm() {
  const { control } = useForm<CustomerFormShape>({ defaultValues: emptyCustomerForm })

  // control is a widened Control — every Form* field must accept it with
  // call-site field-name inference.
  const fields = [
    <FormTagInput key="skills" name="skills" label="Skills" control={control} required />,
    <FormColorPicker key="brand" name="brand" label="Brand color" control={control} />,
    <FormDateRangePicker key="trip" name="trip" label="Trip dates" control={control} required="Pick dates" />,
  ]

  return (
    <Form<CustomerFormShape> onSubmit={(data) => console.log(data)} defaultValues={emptyCustomerForm}>
      <TextBox name="name" label="Name" required minLength={2} />
      <FormSelect
        name="role"
        label="Role"
        options={[
          { label: "Admin", value: "admin" },
          { label: "Member", value: "member" },
        ]}
      />
      {fields}
      <Button type="submit">Save</Button>
    </Form>
  )
}

// The subpath entries must expose the same components as the main entry.
function SubpathForm() {
  const { control } = useForm<CustomerFormShape>({ defaultValues: emptyCustomerForm })
  return (
    <Form<CustomerFormShape> onSubmit={(data) => console.log(data)} defaultValues={emptyCustomerForm}>
      <SubpathFormTagInput name="skills" label="Skills" control={control} />
      <SubpathFormColorPicker name="brand" label="Brand" control={control} />
      <Button type="submit">Save</Button>
    </Form>
  )
}

function ToastSurface() {
  toast.success("Saved")
  return <Toaster />
}

function DebouncedQuery(query: string) {
  const debounced = useDebounce(query, 300)
  const classes = cn("panel", debounced && "has-query")
  return { debounced, classes }
}

function UntypedForm() {
  const methods = useForm<FieldValues>()
  return methods.getValues()
}

export { CustomerGrid, CustomerGridController, CustomerForm, SubpathForm, ToastSurface, DebouncedQuery, UntypedForm }
export type { Customer }
