import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, Toaster, toast } from "../../../index";

const meta = {
  title: "Feedback/Sonner",
  parameters: { layout: "centered" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <>
      <div className="flex flex-wrap gap-2">
        <Button onClick={() => toast("Action completed.")}>Success toast</Button>
        <Button variant="outline" onClick={() => toast.error("Something went wrong.")}>
          Error toast
        </Button>
      </div>
      <Toaster />
    </>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <>
      <Button
        variant="outline"
        onClick={() =>
          toast("Message sent", {
            description: "Your message was delivered to 3 recipients.",
          })
        }
      >
        Toast with description
      </Button>
      <Toaster />
    </>
  ),
};

export const WithAction: Story = {
  render: () => (
    <>
      <Button
        variant="outline"
        onClick={() =>
          toast("File uploaded", {
            description: "You can undo this within 10 seconds.",
            action: { label: "Undo", onClick: () => toast("Upload cancelled.") },
          })
        }
      >
        Toast with action
      </Button>
      <Toaster />
    </>
  ),
};

export const PromiseLoading: Story = {
  render: () => (
    <>
      <Button
        variant="outline"
        onClick={() =>
          toast.promise(
            new Promise<void>((resolve) => setTimeout(resolve, 2000)),
            {
              loading: "Saving changes…",
              success: "Changes saved.",
              error: "Save failed.",
            }
          )
        }
      >
        Promise toast
      </Button>
      <Toaster />
    </>
  ),
};

export const RichColors: Story = {
  render: () => (
    <>
      <div className="flex flex-wrap gap-2">
        <Button onClick={() => toast.success("Saved to disk.", { richColors: true })}>
          Success
        </Button>
        <Button
          variant="outline"
          onClick={() => toast.error("Connection lost.", { richColors: true })}
        >
          Error
        </Button>
      </div>
      <Toaster />
    </>
  ),
};

export const DarkAndPositions: Story = {
  render: () => (
    <>
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          onClick={() => toast("Deployed to production.", { position: "top-center" })}
        >
          Top-center
        </Button>
        <Button
          variant="outline"
          onClick={() => toast("Sync complete.", { position: "bottom-left" })}
        >
          Bottom-left
        </Button>
      </div>
      <Toaster theme="dark" />
    </>
  ),
};
