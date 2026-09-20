import { createRequire } from "node:module"
import { existsSync, readFileSync } from "node:fs"
import path from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"
import { describe, expect, it } from "vitest"

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const pkg = JSON.parse(readFileSync(path.join(rootDir, "package.json"), "utf8")) as {
  exports: Record<string, string | { import?: { types?: string; default?: string }; require?: { types?: string; default?: string } }>
}

function resolveExportPath(exportPath: string): string {
  return path.resolve(rootDir, exportPath)
}

function expectExport(module: Record<string, unknown>, name: string) {
  expect(module[name], `missing export ${name}`).toBeDefined()
}

describe("package exports", () => {
  it("points every export at a generated or shipped file", () => {
    const missing: string[] = []

    for (const [subpath, target] of Object.entries(pkg.exports)) {
      if (typeof target === "string") {
        if (!existsSync(resolveExportPath(target))) {
          missing.push(`${subpath} -> ${target}`)
        }
        continue
      }

      const files = [
        target.import?.types,
        target.import?.default,
        target.require?.types,
        target.require?.default,
      ].filter((value): value is string => Boolean(value))

      for (const file of files) {
        if (!existsSync(resolveExportPath(file))) {
          missing.push(`${subpath} -> ${file}`)
        }
      }
    }

    expect(missing, missing.join("\n")).toEqual([])
  })

  it("loads ESM subpaths, the main entry, and CSS", async () => {
    const cn = await import(pathToFileURL(path.join(rootDir, "dist/utils/cn.js")).href) as { cn: unknown }
    const card = await import(pathToFileURL(path.join(rootDir, "dist/components/Card/index.js")).href) as { Card: unknown }
    const debounce = await import(pathToFileURL(path.join(rootDir, "dist/hooks/useDebounce.js")).href) as { useDebounce: unknown }
    const button = await import(pathToFileURL(path.join(rootDir, "dist/components/Button/index.js")).href) as Record<string, unknown>
    const esm = await import(pathToFileURL(path.join(rootDir, "dist/index.js")).href) as Record<string, unknown>
    const css = readFileSync(path.join(rootDir, "dist/styles.css"), "utf8")

    expect(typeof cn.cn).toBe("function")
    expectExport(card, "Card")
    expect(typeof debounce.useDebounce).toBe("function")
    expectExport(button, "Button")
    expectExport(esm, "KanbanBoard")
    expectExport(esm, "DateRangePicker")
    expectExport(esm, "CommandPalette")
    expect(typeof esm.cn).toBe("function")
    expect(css.length).toBeGreaterThan(100)
  }, 20_000)

  it("loads CommonJS entries and TypeScript declarations", () => {
    const require = createRequire(import.meta.url)
    const cjs = require(path.join(rootDir, "dist/cjs/index.cjs")) as Record<string, unknown>
    const button = require(path.join(rootDir, "dist/cjs/components/Button/index.cjs")) as Record<string, unknown>
    const card = require(path.join(rootDir, "dist/cjs/components/Card/index.cjs")) as Record<string, unknown>
    const cn = require(path.join(rootDir, "dist/cjs/utils/cn.cjs")) as { cn: unknown }
    const declarations = readFileSync(path.join(rootDir, "dist/index.d.ts"), "utf8")
    const cardDeclarations = readFileSync(path.join(rootDir, "dist/components/Card/index.d.ts"), "utf8")

    expect(typeof cn.cn).toBe("function")
    expectExport(cjs, "Button")
    expectExport(cjs, "KanbanBoard")
    expectExport(button, "Button")
    expectExport(card, "Card")
    expect(declarations).toContain("export")
    expect(cardDeclarations).toContain("Card")
  })
})
