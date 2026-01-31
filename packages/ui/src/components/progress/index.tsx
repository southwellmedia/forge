import { cn } from "@repo/utils";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const progressVariants = cva(
  "relative w-full overflow-hidden rounded-full bg-muted/60",
  {
    variants: {
      size: {
        xs: "h-1",
        sm: "h-1.5",
        default: "h-2.5",
        lg: "h-3.5",
        xl: "h-5",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

const indicatorVariants = cva(
  "h-full w-full flex-1 rounded-full transition-all duration-500 ease-out",
  {
    variants: {
      colorVariant: {
        default: "bg-primary",
        success: "bg-success",
        warning: "bg-warning",
        error: "bg-error",
        info: "bg-info",
        gradient: "bg-gradient-to-r from-primary to-primary/70",
      },
      glow: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        colorVariant: "default",
        glow: true,
        className: "shadow-[0_0_8px_2px_oklch(0.55_0.15_250/0.3)]",
      },
      {
        colorVariant: "success",
        glow: true,
        className: "shadow-[0_0_8px_2px_oklch(0.60_0.16_145/0.3)]",
      },
      {
        colorVariant: "warning",
        glow: true,
        className: "shadow-[0_0_8px_2px_oklch(0.75_0.15_60/0.3)]",
      },
      {
        colorVariant: "error",
        glow: true,
        className: "shadow-[0_0_8px_2px_oklch(0.60_0.18_25/0.3)]",
      },
      {
        colorVariant: "info",
        glow: true,
        className: "shadow-[0_0_8px_2px_oklch(0.58_0.15_240/0.3)]",
      },
    ],
    defaultVariants: {
      colorVariant: "default",
      glow: false,
    },
  }
);

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
    VariantProps<typeof progressVariants> {
  /** Color variant of the progress indicator */
  colorVariant?: "default" | "success" | "warning" | "error" | "info" | "gradient";
  /** Whether the indicator should have a glow effect */
  glow?: boolean;
  /** Custom class name for the indicator */
  indicatorClassName?: string;
  /** Whether to show indeterminate animation */
  indeterminate?: boolean;
  /** Show subtle stripes on the indicator */
  striped?: boolean;
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({
  className,
  value,
  size,
  colorVariant = "default",
  glow = false,
  indicatorClassName,
  indeterminate = false,
  striped = false,
  ...props
}, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(progressVariants({ size, className }))}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn(
        indicatorVariants({ colorVariant, glow }),
        indeterminate && "animate-indeterminate",
        striped && [
          "bg-[length:1rem_1rem]",
          "bg-[linear-gradient(45deg,rgba(255,255,255,0.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.15)_75%,transparent_75%,transparent)]",
        ],
        indicatorClassName
      )}
      style={{
        transform: indeterminate ? undefined : `translateX(-${100 - (value || 0)}%)`
      }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress, progressVariants, indicatorVariants };
