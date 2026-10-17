/** @vitest-environment happy-dom */

import { afterEach, describe, expect, it } from "vitest"
import { act, cleanup, render, screen } from "@testing-library/react"
import { NebulaTheme, useTheme } from "./NebulaTheme"

afterEach(() => {
  cleanup()
  document.documentElement.classList.remove("dark")
  document.documentElement.style.colorScheme = ""
  window.localStorage.clear()
})

function ThemeProbe() {
  const { theme, resolvedTheme, setTheme } = useTheme()
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <span data-testid="resolved">{resolvedTheme}</span>
      <button type="button" onClick={() => setTheme("dark")}>
        Dark
      </button>
    </div>
  )
}

describe("NebulaTheme", () => {
  it("applies dark class and color-scheme when theme is dark", () => {
    render(
      <NebulaTheme defaultTheme="dark" storageKey={false}>
        <ThemeProbe />
      </NebulaTheme>
    )

    expect(screen.getByTestId("theme").textContent).toBe("dark")
    expect(screen.getByTestId("resolved").textContent).toBe("dark")
    expect(document.documentElement.classList.contains("dark")).toBe(true)
    expect(document.documentElement.style.colorScheme).toBe("dark")
  })

  it("setTheme updates preference", () => {
    render(
      <NebulaTheme defaultTheme="light" storageKey={false}>
        <ThemeProbe />
      </NebulaTheme>
    )

    act(() => {
      screen.getByRole("button", { name: "Dark" }).click()
    })
    expect(screen.getByTestId("theme").textContent).toBe("dark")
    expect(document.documentElement.classList.contains("dark")).toBe(true)
  })
})
