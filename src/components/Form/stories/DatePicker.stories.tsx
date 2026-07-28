import type { Meta, StoryObj } from "@storybook/react-vite";
import { Form } from "../Form";
import { DatePicker } from "../DatePicker";

const meta = {
  title: "Form/DatePicker",
  component: DatePicker,
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <Form defaultValues={{ date: "" }} onSubmit={() => {}}>
        <div style={{ width: "350px" }}>
          <Story />
        </div>
      </Form>
    ),
  ],
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "date",
    label: "Date of birth",
    placeholder: "Pick a date",
  },
};
