/** @vitest-environment happy-dom */

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { cleanup, fireEvent, render, waitFor } from "@testing-library/react"
import { Tour, TourTrigger, startTour } from "./Tour"

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const steps = (count = 2) =>
  Array.from({ length: count }, (_, i) => ({
    target: `[data-tour="step.${i + 1}"]`,
    title: `Step ${i + 1}`,
    description: `Description for step ${i + 1}`,
  }))

const mountTargets = (defs: ReturnType<typeof steps>) => {
  const container = document.createElement("div")
  defs.forEach((s) => {
    const match = s.target.match(/data-tour="([^"]+)"/)
    const key = match?.[1] ?? s.target
    const el = document.createElement("div")
    el.setAttribute("data-tour", key)
    el.textContent = `target ${s.target}`
    container.appendChild(el)
  })
  document.body.appendChild(container)
  return container
}

function waitForDialog(): Promise<HTMLElement> {
  return waitFor(() => {
    const el = document.querySelector("[role='dialog']")
    if (!el) throw new Error("No dialog found yet")
    return el as HTMLElement
  })
}

function dialogButtons(dialog: HTMLElement) {
  return Array.from(dialog.querySelectorAll("button"))
}

// ---------------------------------------------------------------------------
// Tour
// ---------------------------------------------------------------------------

describe("Tour", () => {
  beforeEach(() => {
    document.querySelectorAll("[data-tour-overlay]").forEach((n) => n.remove())
    document.querySelectorAll("[data-tour]").forEach((n) => n.remove())
  })

  afterEach(cleanup)

  it("renders nothing when closed (defaultOpen=false)", () => {
    render(<Tour steps={steps()} />)
    expect(document.querySelector("[role='dialog']")).toBeNull()
  })

  it("renders the popover when open", async () => {
    const defs = steps(2)
    mountTargets(defs)
    render(<Tour steps={defs} defaultOpen />)

    const dialog = await waitForDialog()
    expect(dialog.textContent).toContain("Step 1")
  })

  it("renders nothing when all steps are missing and optional=true", () => {
    render(
      <Tour
        steps={[
          { target: ".nonexistent", title: "x", description: "", optional: true },
        ]}
        defaultOpen
      />
    )
    expect(document.querySelector("[role='dialog']")).toBeNull()
  })

  it("advances to the next step on Next", async () => {
    const defs = steps(3)
    mountTargets(defs)
    render(<Tour steps={defs} defaultOpen />)

    const d1 = await waitForDialog()
    expect(d1.textContent).toContain("Step 1")

    fireEvent.click(dialogButtons(d1).at(-1)!)

    const d2 = await waitForDialog()
    expect(d2.textContent).toContain("Step 2")
  })

  it("calls onComplete when the last step finishes via Done", async () => {
    const onComplete = vi.fn()
    const defs = steps(2)
    mountTargets(defs)
    render(<Tour steps={defs} defaultOpen onComplete={onComplete} />)

    const d1 = await waitForDialog()
    fireEvent.click(dialogButtons(d1).at(-1)!)

    const d2 = await waitForDialog()
    expect(d2.textContent).toContain("Done")
    fireEvent.click(dialogButtons(d2).at(-1)!)
    expect(onComplete).toHaveBeenCalledTimes(1)
  })

  it("goes back on Back", async () => {
    const defs = steps(3)
    mountTargets(defs)
    render(<Tour steps={defs} defaultOpen />)

    const d1 = await waitForDialog()
    fireEvent.click(dialogButtons(d1).at(-1)!)
    expect((await waitForDialog()).textContent).toContain("Step 2")

    const d2 = await waitForDialog()
    fireEvent.click(dialogButtons(d2).at(-2)!)
    expect((await waitForDialog()).textContent).toContain("Step 1")
  })

  it("does not render Back on the first step", async () => {
    const defs = steps(2)
    mountTargets(defs)
    render(<Tour steps={defs} defaultOpen />)

    const dialog = await waitForDialog()
    const labels = dialogButtons(dialog).map((b) => b.textContent)
    expect(labels).not.toContain("Back")
  })

  it("calls onSkip when Skip is clicked", async () => {
    const onSkip = vi.fn()
    const defs = steps(2)
    mountTargets(defs)
    render(<Tour steps={defs} defaultOpen onSkip={onSkip} />)

    const dialog = await waitForDialog()
    fireEvent.click(dialogButtons(dialog)[0])
    expect(onSkip).toHaveBeenCalledTimes(1)
  })

  it("shows progress bar with correct labels", async () => {
    const defs = steps(4)
    mountTargets(defs)
    render(<Tour steps={defs} defaultOpen />)

    const dialog = await waitForDialog()
    expect(dialog.textContent).toContain("1 / 4")
  })

  it("uses custom labels", async () => {
    const defs = steps(2)
    mountTargets(defs)
    render(
      <Tour
        steps={defs}
        defaultOpen
        nextLabel="Continue"
        backLabel="Previous"
        doneLabel="Finish"
        skipLabel="Close"
      />
    )

    const d1 = await waitForDialog()
    expect(d1.textContent).toContain("Continue")
    expect(d1.textContent).toContain("Close")
    expect(d1.textContent).not.toContain("Finish")

    fireEvent.click(dialogButtons(d1).at(-1)!)

    const d2 = await waitForDialog()
    expect(d2.textContent).toContain("Finish")
  })

  it("renders a backdrop and spotlight when open", async () => {
    const defs = steps(2)
    mountTargets(defs)
    render(<Tour steps={defs} defaultOpen />)

    await waitForDialog()
    const overlay = document.querySelector("[data-tour-overlay]")
    expect(overlay).toBeTruthy()

    const spotlights = document.querySelectorAll("[aria-hidden='true'] > div:last-child")
    expect(spotlights.length).toBeGreaterThan(0)
  })

  it("has aria-modal and aria-label on the dialog", async () => {
    const defs = steps(2)
    mountTargets(defs)
    render(<Tour steps={defs} defaultOpen />)

    const dialog = await waitForDialog()
    expect(dialog.getAttribute("aria-modal")).toBe("true")
    expect(dialog.getAttribute("aria-label")).toBe("Step 1")
  })

  it("respects the open prop in controlled mode", async () => {
    const onOpenChange = vi.fn()
    const defs = steps(2)
    mountTargets(defs)
    render(<Tour steps={defs} open={true} onOpenChange={onOpenChange} />)

    const dialog = await waitForDialog()
    expect(dialog.textContent).toContain("Step 1")

    fireEvent.click(dialogButtons(dialog)[0])
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })
})

// ---------------------------------------------------------------------------
// TourTrigger
// ---------------------------------------------------------------------------

describe("TourTrigger", () => {
  afterEach(cleanup)

  it("renders a button", () => {
    render(<TourTrigger onClick={() => undefined} />)
    expect(document.querySelector("button")).toBeTruthy()
  })

  it("renders with visible label when showLabel is true", () => {
    render(<TourTrigger onClick={() => undefined} showLabel />)
    expect(document.body.textContent).toContain("Tour")
  })

  it("fires onClick when clicked", () => {
    const onClick = vi.fn()
    render(<TourTrigger onClick={onClick} />)
    fireEvent.click(document.querySelector("button")!)
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it("is disabled when disabled is true", () => {
    render(<TourTrigger onClick={() => undefined} disabled />)
    expect((document.querySelector("button") as HTMLButtonElement).disabled).toBe(true)
  })
})
