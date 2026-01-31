import { cn } from "@repo/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const badgeVariants = cva(
  [
    "inline-flex items-center font-medium",
    "transition-all duration-200 ease-out",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  ],
  {
    variants: {
      variant: {
        // Default soft primary
        default: [
          "bg-primary/10 text-primary",
          "hover:bg-primary/15",
        ],
        secondary: [
          "bg-secondary text-secondary-foreground",
          "hover:bg-secondary/80",
        ],
        soft: [
          "bg-muted text-muted-foreground",
          "hover:bg-muted/80",
        ],
        // Solid filled backgrounds
        solid: [
          "bg-primary text-primary-foreground",
          "shadow-sm",
          "hover:bg-primary/90",
        ],
        // Outlined with subtle hover
        outline: [
          "border border-border bg-transparent",
          "hover:bg-muted/50",
        ],
        // Semantic variants - soft backgrounds with rich text
        success: [
          "bg-[var(--color-success-50)] text-[var(--color-success-700)]",
          "hover:bg-[var(--color-success-100)]",
        ],
        warning: [
          "bg-[var(--color-warning-50)] text-[var(--color-warning-700)]",
          "hover:bg-[var(--color-warning-100)]",
        ],
        error: [
          "bg-[var(--color-error-50)] text-[var(--color-error-700)]",
          "hover:bg-[var(--color-error-100)]",
        ],
        info: [
          "bg-[var(--color-info-50)] text-[var(--color-info-700)]",
          "hover:bg-[var(--color-info-100)]",
        ],
        // Dot variant - leading colored dot indicator
        dot: [
          "bg-muted/70 text-foreground",
          "hover:bg-muted",
          "gap-1.5",
        ],
      },
      size: {
        xs: "h-5 px-1.5 text-[10px] leading-none gap-1",
        sm: "h-5.5 px-2 text-xs gap-1",
        default: "h-6 px-2.5 text-xs gap-1.5",
        lg: "h-7 px-3 text-sm gap-2",
      },
      rounded: {
        default: "rounded-full",
        md: "rounded-md",
        lg: "rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  /** Color for the dot indicator (only used with variant="dot") */
  dotColor?: "primary" | "success" | "warning" | "error" | "info" | "muted";
}

const dotColorClasses = {
  primary: "bg-primary",
  success: "bg-success",
  warning: "bg-warning",
  error: "bg-error",
  info: "bg-info",
  muted: "bg-muted-foreground/60",
};

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, size, rounded, dotColor = "primary", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(badgeVariants({ variant, size, rounded }), className)}
        {...props}
      >
        {variant === "dot" && (
          <span
            className={cn(
              "h-2 w-2 rounded-full shrink-0",
              "shadow-[0_0_0_1px_oklch(1_0_0/0.1)]",
              dotColorClasses[dotColor]
            )}
          />
        )}
        {children}
      </div>
    );
  }
);
Badge.displayName = "Badge";

export { badgeVariants };
