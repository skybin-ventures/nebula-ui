'use client';

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "@/utils/cn";
import { Button } from "@/components/Button";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface TourStep {
  /** CSS selector, e.g. `[data-tour="payroll.settings.intro"]` */
  target: string;
  title: string;
  description: string;
  /** Skip if element is missing. Default: true */
  optional?: boolean;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
}

export interface TourProps {
  steps: TourStep[];
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onComplete?: () => void;
  onSkip?: () => void;
  showProgress?: boolean;
  nextLabel?: string;
  backLabel?: string;
  doneLabel?: string;
  skipLabel?: string;
  /** Classes applied to the root overlay wrapper */
  className?: string;
  /** Classes applied to the dark backdrop */
  backdropClassName?: string;
  /** Classes applied to the spotlight ring around the target element */
  spotlightClassName?: string;
  /** Padding (px) around the target for the spotlight ring. Default: 4 */
  spotlightPadding?: number;
  /** Classes applied to the popover dialog panel */
  popoverClassName?: string;
  /** Classes applied to the progress bar track */
  progressClassName?: string;
  /** Classes applied to the progress bar fill */
  progressFillClassName?: string;
  /** Classes applied to the Skip/close text button */
  skipClassName?: string;
  /** Classes applied to the Next/Done primary button */
  nextClassName?: string;
  /** Classes applied to the Back secondary button */
  backClassName?: string;
}

interface ResolvedStep extends TourStep {
  element: HTMLElement;
  rect: DOMRect;
}

interface PopoverGeometry {
  top: number;
  left: number;
  maxWidth: number;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getSpotlightRect(el: HTMLElement, padding: number): DOMRect {
  const rect = el.getBoundingClientRect();
  return new DOMRect(
    rect.left - padding,
    rect.top - padding,
    rect.width + padding * 2,
    rect.height + padding * 2
  );
}

function computePopoverGeometry(
  spotlight: DOMRect,
  viewportW: number,
  viewportH: number,
  popoverH: number,
  popoverW: number,
  side: string,
  align: "start" | "center" | "end",
  gap = 12
): PopoverGeometry {
  if (popoverH > viewportH * 0.7 || popoverW > viewportW * 0.7) {
    return { top: 16, left: 16, maxWidth: viewportW - 32 };
  }

  const isHorizontal = side === "left" || side === "right";
  let top: number;
  let left: number;

  if (isHorizontal) {
    const cursor = side === "right" ? 1 : -1;
    left = cursor === 1 ? spotlight.right + gap : spotlight.left - popoverW - gap;
    top = spotlight.top + spotlight.height / 2 - popoverH / 2;
    top = Math.max(8, Math.min(top, viewportH - popoverH - 8));
  } else {
    const cursor = side === "bottom" ? 1 : -1;
    top = cursor === 1 ? spotlight.bottom + gap : spotlight.top - popoverH - gap;

    if (align === "start") left = spotlight.left;
    else if (align === "end") left = spotlight.right - popoverW;
    else left = spotlight.left + spotlight.width / 2 - popoverW / 2;

    top = Math.max(8, Math.min(top, viewportH - popoverH - 8));
    left = Math.max(8, Math.min(left, viewportW - popoverW - 8));
  }

  return { top, left, maxWidth: popoverW };
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

function useControllableState<T>({
  value,
  onChange,
  defaultValue,
}: {
  value?: T;
  onChange?: (v: T) => void;
  defaultValue: T;
}): [T, (v: T) => void] {
  const [internal, setInternal] = useState(defaultValue);
  const isControlled = value !== undefined;
  const state = isControlled ? value : internal;
  const setState = useCallback(
    (v: T) => {
      if (!isControlled) setInternal(v);
      onChange?.(v);
    },
    [isControlled, onChange]
  );
  return [state, setState];
}

// ---------------------------------------------------------------------------
// Tour
// ---------------------------------------------------------------------------

const POPOVER_EST_H = 180;
const POPOVER_EST_W = 320;

export function Tour({
  steps,
  open,
  defaultOpen = false,
  onOpenChange,
  onComplete,
  onSkip,
  showProgress = true,
  nextLabel = "Next",
  backLabel = "Back",
  doneLabel = "Done",
  skipLabel = "Skip",
  className,
  backdropClassName,
  spotlightClassName,
  spotlightPadding = 4,
  popoverClassName,
  progressClassName,
  progressFillClassName,
  skipClassName,
  nextClassName,
  backClassName,
}: TourProps): React.ReactElement | null {
  const [isOpen, setIsOpen] = useControllableState({
    value: open,
    onChange: onOpenChange,
    defaultValue: defaultOpen,
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [resolvedSteps, setResolvedSteps] = useState<ResolvedStep[]>([]);
  const [popoverPos, setPopoverPos] = useState<PopoverGeometry | null>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const effectiveSteps = useMemo(
    () =>
      steps.filter((s) =>
        s.optional ? Boolean(document.querySelector(s.target)) : true
      ),
    [steps]
  );

  // Resolve steps when the tour opens
  useEffect(() => {
    if (!isOpen) return;

    if (effectiveSteps.length === 0) {
      setIsOpen(false);
      onSkip?.();
      return;
    }

    previousFocusRef.current = document.activeElement as HTMLElement | null;

    const resolved: ResolvedStep[] = [];
    for (const step of effectiveSteps) {
      const el = document.querySelector<HTMLElement>(step.target);
      if (el) {
        resolved.push({
          ...step,
          element: el,
          rect: el.getBoundingClientRect(),
        });
      }
    }

    if (resolved.length === 0) {
      setIsOpen(false);
      onSkip?.();
      return;
    }

    setCurrentIndex((prev) => Math.min(prev, resolved.length - 1));
    setResolvedSteps(resolved);
    setPopoverPos(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, effectiveSteps.length]);

  // Refine popover position after paint using actual DOM measurements
  useLayoutEffect(() => {
    if (!isOpen || resolvedSteps.length === 0) return;

    const step = resolvedSteps[currentIndex];
    if (!step) return;

    const measure = () => {
      const rect = step.element.getBoundingClientRect();
      const spotlight = getSpotlightRect(step.element, spotlightPadding);

      setResolvedSteps((prev) =>
        prev.map((s, i) => (i === currentIndex ? { ...s, rect } : s))
      );

      const pop = popoverRef.current;
      const popW = pop?.offsetWidth ?? POPOVER_EST_W;
      const popH = pop?.offsetHeight ?? POPOVER_EST_H;

      setPopoverPos(
        computePopoverGeometry(
          spotlight,
          window.innerWidth,
          window.innerHeight,
          popH,
          popW,
          step.side ?? "bottom",
          step.align ?? "center"
        )
      );
    };

    const id = requestAnimationFrame(measure);

    const onResize = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(measure);
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onResize, true);

    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onResize, true);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, currentIndex, resolvedSteps.length]);

  // Keyboard: Escape → skip
  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(false);
        onSkip?.();
      }
    };

    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, [isOpen, setIsOpen, onSkip]);

  // Overlay backdrop
  useEffect(() => {
    if (!isOpen) return;

    const overlay = document.createElement("div");
    overlay.setAttribute("data-tour-overlay", "");
    overlay.style.cssText = "position:fixed;inset:0;z-index:100;pointer-events:auto;background:rgba(0,0,0,0.45);";
    document.body.appendChild(overlay);

    return () => overlay.remove();
  }, [isOpen]);

  // Tab trap: keep focus within the popover dialog
  useLayoutEffect(() => {
    if (!isOpen || !popoverRef.current) return;

    const popover = popoverRef.current;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      const focusable = popover.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) {
        e.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first || !popover.contains(document.activeElement)) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last || !popover.contains(document.activeElement)) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    popover.addEventListener("keydown", onKeyDown);
    popover.focus();

    return () => popover.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  // Restore focus when the tour closes
  useLayoutEffect(() => {
    return () => {
      if (previousFocusRef.current && document.contains(previousFocusRef.current)) {
        previousFocusRef.current.focus();
      }
      previousFocusRef.current = null;
    };
  }, []);

  // ------------------------------------------------------------------
  // Navigation
  // ------------------------------------------------------------------

  const close = useCallback(
    (reason: "skip" | "complete") => {
      setIsOpen(false);
      if (reason === "skip") {
        onSkip?.();
      } else {
        onComplete?.();
      }
    },
    [setIsOpen, onSkip, onComplete]
  );

  const handleNext = useCallback(() => {
    if (currentIndex >= resolvedSteps.length - 1) {
      close("complete");
    } else {
      setCurrentIndex((i) => i + 1);
    }
  }, [currentIndex, resolvedSteps.length, close]);

  const handleBack = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
  }, [currentIndex]);

  // ------------------------------------------------------------------
  // Render
  // ------------------------------------------------------------------

  if (!isOpen || resolvedSteps.length === 0) return null;

  const step = resolvedSteps[currentIndex];
  if (!step) return null;

  const total = resolvedSteps.length;
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === total - 1;

  const padding = spotlightPadding;

  const popoverStyle: React.CSSProperties = {
    position: "fixed",
    zIndex: 101,
    ...(popoverPos
      ? { top: popoverPos.top, left: popoverPos.left, maxWidth: popoverPos.maxWidth }
      : { top: 0, left: 0 }),
  };

  return createPortal(
    <>
      {/* ── Overlay wrapper ─────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className={cn("fixed inset-0", className)}
        style={{ zIndex: 100, pointerEvents: "none" }}
      >
        {/* ── Backdrop ─────────────────────────────────────────── */}
        <div
          className={cn("fixed inset-0", backdropClassName)}
          style={{ background: "rgba(0,0,0,0.45)", pointerEvents: "auto", zIndex: 100 }}
        />

        {/* ── Spotlight ────────────────────────────────────────── */}
        <div
          className={cn(spotlightClassName)}
          style={{
            position: "fixed",
            top: step.rect.top - padding,
            left: step.rect.left - padding,
            width: step.rect.width + padding * 2,
            height: step.rect.height + padding * 2,
            borderRadius: 6,
            boxShadow:
              "0 0 0 9999px rgba(0,0,0,0.45), 0 0 0 3px rgba(255,255,255,0.85)",
            pointerEvents: "none",
            zIndex: 101,
          }}
        />
      </div>

      {/* ── Popover ───────────────────────────────────────────── */}
      <div
        ref={popoverRef}
        role="dialog"
        aria-modal="true"
        aria-label={step.title}
        tabIndex={-1}
        className={cn(
          "rounded-lg border border-border bg-popover p-4 text-popover-foreground shadow-lg outline-none",
          popoverClassName
        )}
        style={popoverStyle}
      >
        {showProgress && (
          <div className={cn("mb-2 flex items-center gap-2", progressClassName)}>
            <div className="h-1 flex-1 overflow-hidden rounded-full bg-muted">
              <div
                className={cn(
                  "h-full rounded-full bg-primary transition-all duration-200",
                  progressFillClassName
                )}
                style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
              />
            </div>
            <span className="text-xs text-muted-foreground tabular-nums">
              {currentIndex + 1} / {total}
            </span>
          </div>
        )}

        <div className="mb-3">
          <h3 className="text-sm font-semibold">{step.title}</h3>
          {step.description && (
            <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
          )}
        </div>

        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => close("skip")}
            className={cn(
              "text-xs text-muted-foreground transition-colors hover:text-foreground",
              skipClassName
            )}
          >
            {skipLabel}
          </button>

          <div className="flex items-center gap-2">
            {!isFirst && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleBack}
                className={backClassName}
              >
                {backLabel}
              </Button>
            )}
            <Button type="button" size="sm" onClick={handleNext} className={nextClassName}>
              {isLast ? doneLabel : nextLabel}
            </Button>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}

Tour.displayName = "Tour";

// ---------------------------------------------------------------------------
// TourTrigger
// ---------------------------------------------------------------------------

export interface TourTriggerProps {
  onClick?: () => void;
  label?: string;
  showLabel?: boolean;
  className?: string;
  disabled?: boolean;
}

export function TourTrigger({
  onClick,
  label = "Tour",
  showLabel = false,
  className,
  disabled = false,
}: TourTriggerProps): React.ReactElement {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:opacity-50 disabled:pointer-events-none",
        className
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
      {showLabel && <span>{label}</span>}
    </button>
  );
}

TourTrigger.displayName = "TourTrigger";

// ---------------------------------------------------------------------------
// Imperative helper
// ---------------------------------------------------------------------------

export function startTour(
  steps: TourStep[],
  options?: Omit<TourProps, "steps" | "open">
): { destroy: () => void } {
  let container: HTMLDivElement | null = null;
  let root: { unmount: () => void } | null = null;

  const mount = () => {
    if (container) return;
    container = document.createElement("div");
    document.body.appendChild(container);
  };

  mount();

  void import("react-dom/client").then((mod) => {
    if (!container) return;
    const { createRoot } = mod;
    const reactRoot = createRoot(container) as {
      render: (el: React.ReactElement) => void;
      unmount: () => void;
    };
    root = reactRoot;
    reactRoot.render(
      <Tour
        steps={steps}
        defaultOpen
        onOpenChange={(open) => {
          if (!open) {
            reactRoot.unmount();
            container?.remove();
            container = null;
            root = null;
            options?.onSkip?.();
            options?.onComplete?.();
          }
        }}
        {...options}
      />
    );
  });

  return {
    destroy: () => {
      if (root) {
        root.unmount();
        root = null;
      }
      container?.remove();
      container = null;
    },
  };
}
