"use client"

import { useState, type ComponentProps } from "react"
import { Check, Copy } from "lucide-react"
import { cn } from "../../utils/cn"
import { Button } from "../../primitives/button"

export interface CodeBlockProps {
  code: string
  language?: string
  className?: string
  ref?: ComponentProps<"pre">["ref"]
}

export function CodeBlock({ code, language, className, ref }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      // ignore clipboard failures in non-secure contexts
    }
  }

  return (
    <div className={cn("relative overflow-hidden rounded-md border bg-muted/40", className)}>
      <div className="flex items-center justify-between border-b px-3 py-1.5">
        <span className="text-xs text-muted-foreground">{language ?? "code"}</span>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-7 px-2"
          onClick={copy}
          aria-label={copied ? "Copied" : "Copy code"}
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
        </Button>
      </div>
      <pre ref={ref} className="overflow-x-auto p-3 text-sm leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  )
}

CodeBlock.displayName = "CodeBlock"
