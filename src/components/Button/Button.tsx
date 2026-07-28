import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { type VariantProps } from "class-variance-authority";
import { cn } from "../../utils/cn";
import { ButtonPrimitive, buttonVariants as buttonVariantsPrimitive } from "../../primitives/button"

// Re-exported for consumers that compose custom button styles
// eslint-disable-next-line react-refresh/only-export-components
export const buttonVariants = buttonVariantsPrimitive;

type PrimitiveVariant = NonNullable<VariantProps<typeof buttonVariants>["variant"]>;
type PrimitiveSize = NonNullable<VariantProps<typeof buttonVariants>["size"]>;

const variantMap: Record<string, PrimitiveVariant> = {
  primary: "default",
  secondary: "secondary",
  outline: "outline",
  ghost: "ghost",
  danger: "destructive",
};

const sizeMap: Record<string, PrimitiveSize> = {
  sm: "sm",
  md: "default",
  lg: "lg",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant */
  variant?: keyof typeof variantMap;
  /** Size of the button */
  size?: keyof typeof sizeMap;
  /** Stretch button to full container width */
  fullWidth?: boolean;
  /** Show a loading spinner and disable interaction */
  loading?: boolean;
  /** Render as child element via Slot (e.g. wrap a Link) */
  asChild?: boolean;
  children: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    children,
    variant = "primary",
    size = "md",
    fullWidth = false,
    loading = false,
    disabled,
    className,
    asChild = false,
    style,
    ...props
  },
  ref
) {
  return (
    <ButtonPrimitive
      ref={ref}
      variant={variantMap[variant]}
      size={sizeMap[size]}
      asChild={asChild}
      disabled={disabled || loading}
      className={cn(fullWidth && "w-full", "relative cursor-pointer", className)}
      style={style}
      {...props}
    >
      {asChild ? (
        children
      ) : (
        <>
          {loading && (
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="size-4 border-2 border-current border-r-transparent rounded-full animate-spin" />
            </span>
          )}
          <span className={cn("inline-flex items-center gap-2", loading && "invisible")}>{children}</span>
        </>
      )}
    </ButtonPrimitive>
  );
});

Button.displayName = "Button";
