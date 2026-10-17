/** Resolve CSS custom properties for Recharts stroke/fill theming. */
export function chartCssVar(name: string, fallbackChannels: string): string {
  if (typeof window === "undefined") return `hsl(${fallbackChannels})`
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  if (!value) return `hsl(${fallbackChannels})`
  if (value.startsWith("#") || value.startsWith("rgb") || value.startsWith("hsl")) return value
  return `hsl(${value})`
}

export function getChartColors() {
  return {
    primary: chartCssVar("--primary", "222.2 47.4% 11.2%"),
    muted: chartCssVar("--muted-foreground", "215.4 16.3% 46.9%"),
    accent: chartCssVar("--accent", "210 40% 96.1%"),
    border: chartCssVar("--border", "214.3 31.8% 91.4%"),
  }
}
