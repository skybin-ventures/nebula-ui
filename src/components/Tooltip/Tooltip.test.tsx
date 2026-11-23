/** @vitest-environment happy-dom */

import { describe, expect, it } from "vitest"
import { cleanup, render, screen } from "@testing-library/react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./Tooltip"

describe("Tooltip", () => {
  it("renders its content when open", () => {
    render(
      <TooltipProvider>
        <Tooltip defaultOpen>
          {/* asChild: Radix renders its own <button> trigger by default, which would nest a second button. */}
          <TooltipTrigger asChild>
            <button type="button">Target</button>
          </TooltipTrigger>
          <TooltipContent>Tooltip text</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
    expect(screen.getByRole("button", { name: "Target" })).toBeTruthy()
    expect(screen.getByText("Tooltip text")).toBeTruthy()
    cleanup()
  })
})
