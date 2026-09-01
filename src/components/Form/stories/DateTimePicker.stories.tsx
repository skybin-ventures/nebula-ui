import type { Meta, StoryObj } from "@storybook/react-vite";
import { Form } from "../Form";
import { DateTimePicker } from "../DateTimePicker";

const meta = {
  title: "Form/DateTimePicker",
  component: DateTimePicker,
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <Form defaultValues={{ datetime: "" }} onSubmit={() => {}}>
        <div style={{ width: "350px" }}>
          <Story />
        </div>
      </Form>
    ),
  ],
} satisfies Meta<typeof DateTimePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "datetime",
    label: "Appointment",
    placeholder: "Pick a date",
  },
};

export const WithTime: Story = {
  args: {
    name: "datetime",
    label: "Scheduled at",
    placeholder: "Pick a date",
  },
  decorators: [
    (Story) => (
      <Form defaultValues={{ datetime: new Date(2026, 7, 13, 14, 30) }} onSubmit={() => {}}>
        <div style={{ width: "350px" }}>
          <Story />
        </div>
      </Form>
    ),
  ],
};

export const Required: Story = {
  args: {
    name: "datetime",
    label: "Due date",
    placeholder: "Pick a date",
    required: "Due date is required",
  },
};
