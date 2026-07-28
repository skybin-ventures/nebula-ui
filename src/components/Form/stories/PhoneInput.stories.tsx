import type { Meta, StoryObj } from "@storybook/react-vite";
import { Form } from "../Form";
import { PhoneInput } from "../PhoneInput";
import { CountrySelect } from "../CountrySelect";
import { Button } from "../../Button/Button";

const meta = {
  title: "Form/PhoneInput",
  component: PhoneInput,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <Form
        defaultValues={{ phone: "" }}
        onSubmit={(data) => alert(JSON.stringify(data, null, 2))}
      >
        <div style={{ width: "380px", display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Story />
          <Button type="submit">Submit</Button>
        </div>
      </Form>
    ),
  ],
} satisfies Meta<typeof PhoneInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "phone",
    label: "Mobile number",
    defaultCountry: "IN",
    placeholder: "Enter mobile number",
    helperText: "Submitted value is E.164 (e.g. +919876543210)",
  },
};

export const Required: Story = {
  args: {
    name: "phone",
    label: "Mobile number",
    defaultCountry: "IN",
    required: "Please enter your mobile number",
    minLength: { value: 10, message: "Enter at least 10 digits" },
    priorityCountries: ["IN", "US", "GB", "AE"],
  },
};

export const WithExistingValue: Story = {
  decorators: [
    (Story) => (
      <Form
        defaultValues={{ phone: "+919876543210" }}
        onSubmit={(data) => alert(JSON.stringify(data, null, 2))}
      >
        <div style={{ width: "380px", display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Story />
          <Button type="submit">Submit</Button>
        </div>
      </Form>
    ),
  ],
  args: {
    name: "phone",
    label: "Mobile number",
    defaultCountry: "IN",
  },
};

export const ContactForm: Story = {
  args: {
    name: "phone",
    label: "Mobile number",
  },
  render: () => (
    <Form
      defaultValues={{ country: "IN", phone: "" }}
      onSubmit={(data) => alert(JSON.stringify(data, null, 2))}
    >
      <div style={{ width: "400px", display: "flex", flexDirection: "column", gap: "1rem" }}>
        <CountrySelect
          name="country"
          label="Country"
          required
          priorityCountries={["IN", "US", "GB"]}
        />
        <PhoneInput
          name="phone"
          label="Mobile number"
          defaultCountry="IN"
          required="Please enter your mobile number"
          minLength={10}
        />
        <Button type="submit">Submit contact</Button>
      </div>
    </Form>
  ),
};
