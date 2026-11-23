import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../../../index";
import {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "..";

const meta = {
  title: "Feedback/Toast",
  parameters: { layout: "centered" },
  decorators: [
    // Radix's `Toast` (the primitive root) registers with a `ToastProvider`
    // context and throws without one, so wrap every story in the provider.
    (Story) => (
      <div className="relative h-[300px] w-full">
        <ToastProvider>
          <div className="flex flex-wrap justify-end gap-2 p-4">
            <Story />
          </div>
          <ToastViewport className="top-4 bottom-auto" />
        </ToastProvider>
      </div>
    ),
  ],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function ToastDemo({ onDone }: { onDone?: () => void }) {
  const [open, setOpen] = React.useState(true);
  return (
    <Toast open={open} onOpenChange={onDone ? setOpen : undefined} duration={onDone ? 4000 : Infinity}>
      {onDone ? (
        <ToastAction altText="Undo" onClick={onDone}>
          Undo
        </ToastAction>
      ) : null}
      <ToastTitle>You have a new message.</ToastTitle>
      <ToastDescription>from the Radix toast primitive · just now</ToastDescription>
      <ToastClose />
    </Toast>
  );
}

export const Static: Story = {
  render: () => <ToastDemo />,
};

export const AutoDismiss: Story = {
  render: () => <ToastDemo onDone={() => {}} />,
};

export const Destructive: Story = {
  render: () => (
    <Toast variant="destructive">
      <ToastTitle>Something went wrong.</ToastTitle>
      <ToastDescription>Your session expired. Please log in again.</ToastDescription>
      <ToastClose />
    </Toast>
  ),
};

export const WithButton: Story = {
  render: () => (
    <div className="w-full max-w-md">
      <Toast>
        <ToastAction altText="Retry" asChild>
          <Button size="sm" variant="outline">
            Retry
          </Button>
        </ToastAction>
        <ToastTitle>Upload failed.</ToastTitle>
        <ToastDescription>The network timed out after 30 seconds.</ToastDescription>
        <ToastClose />
      </Toast>
    </div>
  ),
};
