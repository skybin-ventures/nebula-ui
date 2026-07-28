import type { Meta, StoryObj } from "@storybook/react-vite";
import { Form } from "../Form";
import { CountrySelect } from "../CountrySelect";
import { Button } from "../../Button/Button";

const meta = {
  title: "Form/CountrySelect",
  component: CountrySelect,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Form
        defaultValues={{ country: "" }}
        onSubmit={(data) => alert(JSON.stringify(data, null, 2))}
      >
        <div style={{ width: "360px", display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Story />
          <Button type="submit">Submit</Button>
        </div>
      </Form>
    ),
  ],
} satisfies Meta<typeof CountrySelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "country",
    label: "Country",
    placeholder: "Select a country",
    priorityCountries: ["IN", "US", "GB"],
    helperText: "Submitted value is ISO alpha-2 (e.g. IN, US)",
  },
};

export const Required: Story = {
  args: {
    name: "country",
    label: "Country",
    placeholder: "Select a country",
    required: "Please select a country",
    priorityCountries: ["IN", "US", "GB"],
  },
};

export const Preselected: Story = {
  decorators: [
    (Story) => (
      <Form
        defaultValues={{ country: "IN" }}
        onSubmit={(data) => alert(JSON.stringify(data, null, 2))}
      >
        <div style={{ width: "360px", display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Story />
          <Button type="submit">Submit</Button>
        </div>
      </Form>
    ),
  ],
  args: {
    name: "country",
    label: "Country",
    allowClear: true,
  },
};
