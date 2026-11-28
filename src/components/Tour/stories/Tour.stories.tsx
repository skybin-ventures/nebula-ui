import { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { Tour, TourTrigger, startTour } from "@/components/Tour/Tour"

const meta = {
  title: "Components/Tour",
  component: Tour,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Tour>

export default meta
type Story = StoryObj<typeof meta>

// ---------------------------------------------------------------------------
// Shared demo page
// ---------------------------------------------------------------------------

const demoTargets = (
  <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16, maxWidth: 600 }}>
    <div data-tour="step.one" style={{ padding: 16, border: "1px solid #e5e7eb", borderRadius: 8 }}>
      <h2 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>Dashboard</h2>
      <p style={{ margin: "4px 0 0", fontSize: 13, color: "#6b7280" }}>Your overview panel.</p>
    </div>
    <div data-tour="step.two" style={{ padding: 16, border: "1px solid #e5e7eb", borderRadius: 8 }}>
      <h2 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>Settings</h2>
      <p style={{ margin: "4px 0 0", fontSize: 13, color: "#6b7280" }}>Configure your preferences here.</p>
    </div>
    <div data-tour="step.three" style={{ padding: 16, border: "1px solid #e5e7eb", borderRadius: 8 }}>
      <h2 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>Reports</h2>
      <p style={{ margin: "4px 0 0", fontSize: 13, color: "#6b7280" }}>Export and view reports.</p>
    </div>
  </div>
)

const steps = [
  {
    target: "[data-tour='step.one']",
    title: "Welcome to the Dashboard",
    description: "This is your main overview. You can see key metrics and recent activity at a glance.",
  },
  {
    target: "[data-tour='step.two']",
    title: "Configure Settings",
    description: "Adjust your preferences, notifications, and account details here.",
  },
  {
    target: "[data-tour='step.three']",
    title: "Generate Reports",
    description: "Export data and build custom reports from this section.",
    side: "left" as const,
  },
]

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const Default: Story = {
  render: function DefaultRender() {
    const [open, setOpen] = useState(false)

    return (
      <div>
        <div style={{ padding: 16 }}>
          <TourTrigger onClick={() => setOpen(true)} showLabel />
        </div>
        {demoTargets}
        <Tour
          open={open}
          onOpenChange={setOpen}
          steps={steps}
          onComplete={() => alert("Tour complete!")}
          onSkip={() => alert("Tour skipped.")}
        />
      </div>
    )
  },
}

export const WithOptionalStep: Story = {
  render: function WithOptionalRender() {
    const [open, setOpen] = useState(false)

    return (
      <div>
        <div style={{ padding: 16 }}>
          <TourTrigger onClick={() => setOpen(true)} showLabel />
        </div>
        {demoTargets}
        <Tour
          open={open}
          onOpenChange={setOpen}
          steps={[
            ...steps,
            {
              target: "[data-tour='nonexistent']",
              title: "Optional step",
              description: "This target doesn't exist, so this step is skipped.",
              optional: true,
            },
          ]}
          onComplete={() => alert("Tour complete!")}
        />
      </div>
    )
  },
}

export const Uncontrolled: Story = {
  render: function UncontrolledRender() {
    return (
      <div>
        <div style={{ padding: 16 }}>
          <TourTrigger
            onClick={() =>
              startTour(steps, {
                onComplete: () => alert("Tour complete!"),
              })
            }
            showLabel
          />
        </div>
        {demoTargets}
      </div>
    )
  },
}

export const PayrollSettings: Story = {
  render: function PayrollRender() {
    const [open, setOpen] = useState(false)

    return (
      <div>
        <div style={{ padding: 16 }}>
          <TourTrigger onClick={() => setOpen(true)} showLabel />
        </div>
        <div style={{ padding: 24, maxWidth: 640 }}>
          <div data-tour="payroll.settings.intro" style={{ padding: 16, border: "1px solid #e5e7eb", borderRadius: 8, marginBottom: 12 }}>
            <h2 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>Payroll Settings</h2>
            <p style={{ margin: "4px 0 0", fontSize: 13, color: "#6b7280" }}>Defines company rules before a run can finalize.</p>
          </div>
          <div data-tour="payroll.settings.tabs" style={{ padding: 16, border: "1px solid #e5e7eb", borderRadius: 8 }}>
            <h2 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>Tabs</h2>
            <p style={{ margin: "4px 0 0", fontSize: 13, color: "#6b7280" }}>Finance rules, Statutory (TDS enabled), and TDS slabs.</p>
          </div>
        </div>
        <Tour
          open={open}
          onOpenChange={setOpen}
          steps={[
            {
              target: "[data-tour='payroll.settings.intro']",
              title: "Why payroll settings?",
              description: "Defines company rules before a run can finalize.",
            },
            {
              target: "[data-tour='payroll.settings.tabs']",
              title: "What each tab is for",
              description: "Finance rules, Statutory (TDS enabled), and TDS slabs.",
              optional: true,
            },
          ]}
          onComplete={() => alert("Tour complete!")}
        />
      </div>
    )
  },
}

export const AllSides: Story = {
  render: function AllSidesRender() {
    const [open, setOpen] = useState(false)

    return (
      <div>
        <div style={{ padding: 16 }}>
          <TourTrigger onClick={() => setOpen(true)} showLabel />
        </div>
        <div style={{ padding: 24, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, maxWidth: 600 }}>
          <div data-tour="side.top" style={{ padding: 16, border: "1px solid #e5e7eb", borderRadius: 8 }}>
            <h3 style={{ margin: 0 }}>Top</h3>
          </div>
          <div data-tour="side.right" style={{ padding: 16, border: "1px solid #e5e7eb", borderRadius: 8 }}>
            <h3 style={{ margin: 0 }}>Right</h3>
          </div>
          <div data-tour="side.bottom" style={{ padding: 16, border: "1px solid #e5e7eb", borderRadius: 8 }}>
            <h3 style={{ margin: 0 }}>Bottom</h3>
          </div>
          <div data-tour="side.left" style={{ padding: 16, border: "1px solid #e5e7eb", borderRadius: 8 }}>
            <h3 style={{ margin: 0 }}>Left</h3>
          </div>
        </div>
        <Tour
          open={open}
          onOpenChange={setOpen}
          steps={[
            {
              target: "[data-tour='side.top']",
              title: "Popover on top",
              description: "The popover appears above the target.",
              side: "top",
            },
            {
              target: "[data-tour='side.right']",
              title: "Popover on the right",
              description: "The popover appears to the right of the target.",
              side: "right",
            },
            {
              target: "[data-tour='side.bottom']",
              title: "Popover below (default)",
              description: "The popover appears below the target.",
              side: "bottom",
            },
            {
              target: "[data-tour='side.left']",
              title: "Popover on the left",
              description: "The popover appears to the left of the target.",
              side: "left",
            },
          ]}
          onComplete={() => alert("Tour complete!")}
        />
      </div>
    )
  },
}

export const CustomLabels: Story = {
  render: function CustomLabelsRender() {
    const [open, setOpen] = useState(false)

    return (
      <div>
        <div style={{ padding: 16 }}>
          <TourTrigger onClick={() => setOpen(true)} showLabel />
        </div>
        {demoTargets}
        <Tour
          open={open}
          onOpenChange={setOpen}
          steps={steps}
          nextLabel="Continue"
          backLabel="Previous"
          doneLabel="Finish"
          skipLabel="Close"
          onComplete={() => alert("Tour complete!")}
        />
      </div>
    )
  },
}

export const Minimal: Story = {
  render: function MinimalRender() {
    const [open, setOpen] = useState(false)

    return (
      <div>
        <div style={{ padding: 16 }}>
          <TourTrigger onClick={() => setOpen(true)} showLabel />
        </div>
        <div style={{ padding: 24, maxWidth: 400 }}>
          <div data-tour="minimal.one" style={{ padding: 16, border: "1px solid #e5e7eb", borderRadius: 8 }}>
            <h2 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>Single step</h2>
          </div>
        </div>
        <Tour
          open={open}
          onOpenChange={setOpen}
          showProgress={false}
          skipLabel="Dismiss"
          steps={[
            {
              target: "[data-tour='minimal.one']",
              title: "One step only",
              description: "No progress bar, no back button — just a single tip.",
            },
          ]}
          onComplete={() => {}}
        />
      </div>
    )
  },
}

export const CustomStyling: Story = {
  render: function CustomStylingRender() {
    const [open, setOpen] = useState(false)

    return (
      <div>
        <div style={{ padding: 16 }}>
          <TourTrigger onClick={() => setOpen(true)} showLabel />
        </div>
        {demoTargets}
        <Tour
          open={open}
          onOpenChange={setOpen}
          steps={steps}
          className="[&_[data-tour-overlay]]:bg-blue-900/60"
          backdropClassName="bg-blue-900/40"
          spotlightClassName="!"
          spotlightPadding={6}
          popoverClassName="rounded-xl border-2 border-blue-500 bg-white shadow-2xl"
          progressClassName="h-1.5"
          progressFillClassName="bg-blue-500"
          skipClassName="text-blue-600 hover:text-blue-800"
          nextClassName="bg-blue-600 hover:bg-blue-700"
          backClassName="text-blue-600"
          onComplete={() => alert("Tour complete!")}
        />
      </div>
    )
  },
}
