import type { Meta, StoryObj } from "@storybook/react-vite"
import { NotificationBell, NotificationProvider } from "../index"

const meta = {
  title: "Components/Notification",
  component: NotificationBell,
} satisfies Meta<typeof NotificationBell>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <NotificationProvider
      initialNotifications={[
        { id: "1", title: "Welcome", description: "Thanks for joining.", read: false },
        { id: "2", title: "Invoice paid", read: true },
      ]}
    >
      <NotificationBell />
    </NotificationProvider>
  ),
}
