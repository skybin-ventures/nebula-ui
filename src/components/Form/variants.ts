import { cva } from "class-variance-authority";

/**
 * Shared label variant for all form field components.
 * Shows a required asterisk when required=true.
 */
export const labelVariants = cva("block text-sm font-medium", {
  variants: {
    required: {
      true: "after:content-['*'] after:ml-0.5 after:text-destructive",
      false: "",
    },
    layout: {
      vertical: "mb-1.5",
      horizontal: "mb-0",
      inline: "mb-0",
    },
  },
  defaultVariants: {
    required: false,
    layout: "vertical",
  },
});
