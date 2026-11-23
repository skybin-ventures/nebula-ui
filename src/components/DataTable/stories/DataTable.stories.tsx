import type { Meta, StoryObj } from "@storybook/react-vite";
import { DataTable } from "..";

type Person = {
  id: string;
  name: string;
  role: string;
};

const rows: Person[] = [
  { id: "1", name: "Neon", role: "Admin" },
  { id: "2", name: "Pulsar", role: "Editor" },
  { id: "3", name: "Comet", role: "Viewer" },
];

const meta = {
  title: "Components/DataTable",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Deprecated alias of `DataGrid` — migrate to `DataGrid` / `useDataGrid` (removed in 2.0.0).",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <DataTable
      data={rows}
      columns={[
        { accessorKey: "id", header: "ID" },
        { accessorKey: "name", header: "Name" },
        { accessorKey: "role", header: "Role" },
      ]}
      {...args}
    />
  ),
};
