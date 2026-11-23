/** @vitest-environment happy-dom */

import { describe, expect, it } from "vitest"
import { cleanup, render, screen } from "@testing-library/react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./Accordion"

describe("Accordion", () => {
  it("expands the default item and keeps others collapsed", () => {
    render(
      <Accordion type="single" collapsible defaultValue="a1">
        <AccordionItem value="a1">
          <AccordionTrigger>First question</AccordionTrigger>
          <AccordionContent>First answer</AccordionContent>
        </AccordionItem>
        <AccordionItem value="a2">
          <AccordionTrigger>Second question</AccordionTrigger>
          <AccordionContent>Second answer</AccordionContent>
        </AccordionItem>
      </Accordion>
    )
    expect(
      screen.getByRole("button", { name: /first question/i }).getAttribute("aria-expanded")
    ).toBe("true")
    expect(
      screen.getByRole("button", { name: /second question/i }).getAttribute("aria-expanded")
    ).toBe("false")
    expect(screen.getByText("First answer")).toBeTruthy()
    cleanup()
  })
})
