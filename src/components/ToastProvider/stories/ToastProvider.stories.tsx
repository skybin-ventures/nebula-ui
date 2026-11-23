import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../../../index";
import { ToastProvider, useToastContext } from "..";

const meta = {
  title: "Feedback/ToastProvider",
  parameters: {
    layout: "centered",
    // Radix-based provider; the Sonner Toaster is the recommended API.
    docs: {
      description: {
        component:
          "Deprecated in favour of `Toaster` + `toast` (Sonner). Removed in 2.0.0.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function Trigger() {
  const { toast } = useToastContext();
  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="outline"
        onClick={() => toast({ title: "Saved.", description: "Your changes are stored." })}
      >
        Show toast
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast({
            title: "Failed.",
            description: "The request could not be completed.",
            variant: "destructive",
          })
        }
      >
        Destructive
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast({
            title: "Link updated.",
            action: { label: "Undo", onClick: () => toast({ title: "Reverted." }) },
          })
        }
      >
        With action
      </Button>
    </div>
  );
}

export const Default: Story = {
  render: () => (
    <ToastProvider>
      <Trigger />
    </ToastProvider>
  ),
};

export const Positioned: Story = {
  render: () => (
    <ToastProvider position="top-left" duration={3000}>
      <Trigger />
    </ToastProvider>
  ),
};

export const RichColors: Story = {
  render: () => (
    <ToastProvider richColors>
      <Trigger />
    </ToastProvider>
  ),
};
