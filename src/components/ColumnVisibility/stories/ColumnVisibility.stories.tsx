import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  ColumnVisibilityButton,
  ColumnVisibilityPopover,
  useColumnVisibility,
  type ColumnDefinition,
} from "../../../index";

type PersonKey = "id" | "name" | "role" | "email";

const columnDefs: ColumnDefinition<PersonKey>[] = [
  { key: "id", label: "ID", important: true },
  { key: "name", label: "Name", important: true },
  { key: "role", label: "Role" },
  { key: "email", label: "Email" },
];

const rows = [
  { id: "1", name: "Neon", role: "Admin", email: "neon@nebula.dev" },
  { id: "2", name: "Pulsar", role: "Editor", email: "pulsar@nebula.dev" },
  { id: "3", name: "Comet", role: "Viewer", email: "comet@nebula.dev" },
];

function ColumnsDemo() {
  const state = useColumnVisibility(columnDefs);
  return (
    <div className="w-full">
      <div className="mb-3 flex justify-end">
        <ColumnVisibilityPopover columns={columnDefs} state={state} />
      </div>
      <table className="w-full border">
        <thead>
          <tr>
            {state.visibleColumns.map((key) => (
              <th key={key} className="border bg-muted p-2 text-left text-xs">
                {columnDefs.find((column) => column.key === key)?.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              {state.visibleColumns.map((key) => (
                <td key={key} className="border p-2 text-sm">
                  {row[key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const meta = {
  title: "Components/ColumnVisibility",
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithPopover: Story = {
  render: () => <ColumnsDemo />,
};

export const StandaloneButton: Story = {
  render: () => {
    const state = useColumnVisibility(columnDefs, { storageKey: "custom-button-story" });
    return (
      <div className="w-full space-y-3">
        {/* The button alone drives state.open — pair it with your own popover or sheet shell. */}
        <ColumnVisibilityButton state={state} label="Show columns" />
        <p className="text-xs text-muted-foreground">
          Visible: {state.visibleColumns.join(", ") || "none"} · hidden: {state.hiddenColumnCount}
        </p>
      </div>
    );
  },
};
