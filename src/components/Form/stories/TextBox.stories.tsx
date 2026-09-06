import type { Meta, StoryObj } from '@storybook/react-vite';
import { Form } from '../Form';
import { TextBox } from '../TextBox';
import { Button } from '../../Button/Button';

const meta = {
  title: 'Form/TextBox',
  component: TextBox,
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
} satisfies Meta<typeof TextBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'field',
    label: 'Username',
    placeholder: 'Enter username',
  },
};

export const WithHelperText: Story = {
  args: {
    name: 'field',
    label: 'Email',
    type: 'email',
    placeholder: 'Enter email',
    helperText: 'We will never share your email',
  },
};

export const Required: Story = {
  args: {
    name: 'field',
    label: 'Username',
    placeholder: 'Enter username',
    required: 'This field is required',
  },
};

export const WithMinLength: Story = {
  args: {
    name: 'field',
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
    required: true,
    minLength: { value: 8, message: 'Password must be at least 8 characters' },
  },
  parameters: {
    docs: {
      description: {
        story: 'Password fields include a built-in eye toggle. Pass `passwordToggle={false}` to hide it.',
      },
    },
  },
};

export const WithMaxLength: Story = {
  args: {
    name: 'field',
    label: 'Username',
    placeholder: 'Enter username',
    maxLength: { value: 20, message: 'Username cannot exceed 20 characters' },
  },
};

export const EmailValidation: Story = {
  args: {
    name: 'field',
    label: 'Email',
    type: 'email',
    placeholder: 'Enter email',
    required: true,
    email: 'Please enter a valid email address',
  },
};

export const URLValidation: Story = {
  args: {
    name: 'field',
    label: 'Website',
    placeholder: 'https://example.com',
    url: 'Please enter a valid URL',
  },
};

export const WithPrefix: Story = {
  args: {
    name: 'field',
    label: 'Price',
    type: 'number',
    placeholder: '0.00',
    prefix: <span>$</span>,
  },
};

export const WithSuffix: Story = {
  args: {
    name: 'field',
    label: 'Weight',
    type: 'number',
    placeholder: '0',
    suffix: <span>kg</span>,
  },
};

export const WithPrefixAndSuffix: Story = {
  args: {
    name: 'field',
    label: 'Price',
    type: 'number',
    placeholder: '0.00',
    prefix: <span>$</span>,
    suffix: <span>USD</span>,
  },
};

export const WithClearButton: Story = {
  args: {
    name: 'field',
    label: 'Search',
    placeholder: 'Search...',
    allowClear: true,
  },
};

export const Disabled: Story = {
  args: {
    name: 'field',
    label: 'Disabled Field',
    placeholder: 'Cannot edit',
    disabled: true,
  },
};

export const SmallSize: Story = {
  args: {
    name: 'field',
    label: 'Small Input',
    placeholder: 'Small',
    size: 'sm',
  },
};

export const LargeSize: Story = {
  args: {
    name: 'field',
    label: 'Large Input',
    placeholder: 'Large',
    size: 'lg',
  },
};

export const AllSizes: Story = {
  args: {
    name: 'field',
    label: 'Input',
  },
  render: () => (
    <Form defaultValues={{ sm: '', md: '', lg: '' }} onSubmit={() => {}}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '350px' }}>
        <TextBox name="sm" label="Small" placeholder="Small input" size="sm" />
        <TextBox name="md" label="Medium" placeholder="Medium input" size="md" />
        <TextBox name="lg" label="Large" placeholder="Large input" size="lg" />
      </div>
    </Form>
  ),
};

export const WithFormSubmit: Story = {
  args: {
    name: 'field',
    label: 'Username',
  },
  render: () => (
    <Form 
      defaultValues={{ username: '' }} 
      onSubmit={(data) => alert(JSON.stringify(data, null, 2))}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '350px' }}>
        <TextBox 
          name="username" 
          label="Username" 
          placeholder="Enter username"
          required="Username is required"
          minLength={{ value: 3, message: 'At least 3 characters' }}
        />
        <Button type="submit">Submit</Button>
      </div>
    </Form>
  ),
};
