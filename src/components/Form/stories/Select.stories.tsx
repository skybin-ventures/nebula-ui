import type { Meta, StoryObj } from '@storybook/react-vite';
import { Form } from '../Form';
import { Select } from '../Select';
import { Button } from '../../Button/Button';

const meta = {
  title: 'Form/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Form defaultValues={{ field: '' }} onSubmit={() => {}}>
        <div style={{ width: '350px' }}>
          <Story />
        </div>
      </Form>
    ),
  ],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    required: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const countryOptions = [
  { label: 'United States', value: 'us' },
  { label: 'Canada', value: 'ca' },
  { label: 'United Kingdom', value: 'uk' },
  { label: 'Australia', value: 'au' },
  { label: 'Germany', value: 'de' },
  { label: 'France', value: 'fr' },
  { label: 'Japan', value: 'jp' },
];

export const Default: Story = {
  args: {
    name: 'field',
    label: 'Country',
    options: countryOptions,
    placeholder: 'Select a country',
  },
};

export const WithHelperText: Story = {
  args: {
    name: 'field',
    label: 'Country',
    options: countryOptions,
    placeholder: 'Select a country',
    helperText: 'Select your country of residence',
  },
};

export const Required: Story = {
  args: {
    name: 'field',
    label: 'Country',
    options: countryOptions,
    placeholder: 'Select a country',
    required: 'Please select a country',
  },
};

export const WithDisabledOptions: Story = {
  args: {
    name: 'field',
    label: 'Country',
    options: [
      { label: 'United States', value: 'us' },
      { label: 'Canada', value: 'ca' },
      { label: 'United Kingdom (Unavailable)', value: 'uk', disabled: true },
      { label: 'Australia', value: 'au' },
      { label: 'Germany (Unavailable)', value: 'de', disabled: true },
    ],
    placeholder: 'Select a country',
  },
};

export const AllowClear: Story = {
  args: {
    name: 'field',
    label: 'Country',
    options: countryOptions,
    placeholder: 'Select a country',
    allowClear: true,
  },
};

export const Disabled: Story = {
  args: {
    name: 'field',
    label: 'Country',
    options: countryOptions,
    placeholder: 'Select a country',
    disabled: true,
  },
};

export const SmallSize: Story = {
  args: {
    name: 'field',
    label: 'Country',
    options: countryOptions,
    placeholder: 'Select',
    size: 'sm',
  },
};

export const LargeSize: Story = {
  args: {
    name: 'field',
    label: 'Country',
    options: countryOptions,
    placeholder: 'Select',
    size: 'lg',
  },
};

export const Searchable: Story = {
  args: {
    name: 'field',
    label: 'Country',
    options: countryOptions,
    placeholder: 'Search a country',
    searchable: true,
    searchPlaceholder: 'Filter countries...',
  },
};

export const SearchableWithClear: Story = {
  args: {
    name: 'field',
    label: 'Country',
    options: countryOptions,
    placeholder: 'Search a country',
    searchable: true,
    allowClear: true,
  },
};

export const AllSizes: Story = {
  args: {
    name: 'field',
    label: 'Select',
    options: countryOptions,
  },
  render: () => (
    <Form defaultValues={{ sm: '', md: '', lg: '' }} onSubmit={() => {}}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '350px' }}>
        <Select name="sm" label="Small" options={countryOptions} placeholder="Select" size="sm" />
        <Select name="md" label="Medium" options={countryOptions} placeholder="Select" size="md" />
        <Select name="lg" label="Large" options={countryOptions} placeholder="Select" size="lg" />
      </div>
    </Form>
  ),
};

export const WithFormSubmit: Story = {
  args: {
    name: 'field',
    label: 'Country',
    options: countryOptions,
  },
  render: () => (
    <Form 
      defaultValues={{ country: '' }} 
      onSubmit={(data) => alert(JSON.stringify(data, null, 2))}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '350px' }}>
        <Select 
          name="country" 
          label="Country" 
          options={countryOptions}
          placeholder="Select a country"
          required="Please select a country"
        />
        <Button type="submit">Submit</Button>
      </div>
    </Form>
  ),
};
