import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../index";

const meta = {
  title: "Layout/Table",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const rows = [
  { name: "Neon", email: "neon@nebula.dev", role: "Admin" },
  { name: "Pulsar", email: "pulsar@nebula.dev", role: "Editor" },
  { name: "Comet", email: "comet@nebula.dev", role: "Viewer" },
];

export const Default: Story = {
  render: () => (
    <div className="w-full">
      <Table>
        <TableCaption>
          A list of team members and their roles.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-right">Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.email}>
              <TableCell className="font-medium">{row.name}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell className="text-right">{row.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ),
};
