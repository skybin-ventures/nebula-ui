import type { Meta, StoryObj } from "@storybook/react-vite";
import { Form } from "../Form";
import { Combobox } from "../Combobox";

const meta = {
  title: "Form/Combobox",
  component: Combobox,
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <Form defaultValues={{ role: "" }} onSubmit={() => {}}>
        <div style={{ width: "350px" }}>
          <Story />
        </div>
      </Form>
    ),
  ],
} satisfies Meta<typeof Combobox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "role",
    label: "Role",
    placeholder: "Select role",
    options: [
      { label: "Admin", value: "admin" },
      { label: "Manager", value: "manager" },
      { label: "Employee", value: "employee" },
    ],
  },
};
