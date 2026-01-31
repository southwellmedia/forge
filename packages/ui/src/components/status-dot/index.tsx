import { cn } from "@repo/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const statusDotVariants = cva(
  "inline-block rounded-full shrink-0",
  {
    variants: {
      status: {
        online: "bg-success",
        offline: "bg-muted-foreground/50",
        busy: "bg-error",
        away: "bg-warning",
        default: "bg-primary",
      },
      size: {
        xs: "h-1.5 w-1.5",
        sm: "h-2 w-2",
        md: "h-2.5 w-2.5",
        lg: "h-3 w-3",
        xl: "h-4 w-4",
      },
      pulse: {
        true: "animate-pulse",
        false: "",
      },
      ring: {
        true: "ring-2 ring-background shadow-sm",
        false: "",
      },
      glow: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        status: "online",
        glow: true,
        className: "shadow-[0_0_6px_2px_oklch(0.60_0.16_145/0.4)]",
      },
      {
        status: "busy",
        glow: true,
        className: "shadow-[0_0_6px_2px_oklch(0.60_0.18_25/0.4)]",
      },
      {
        status: "away",
        glow: true,
        className: "shadow-[0_0_6px_2px_oklch(0.75_0.15_60/0.4)]",
      },
      {
        status: "default",
        glow: true,
        className: "shadow-[0_0_6px_2px_oklch(0.55_0.15_250/0.4)]",
      },
    ],
    defaultVariants: {
      status: "default",
      size: "md",
      pulse: false,
      ring: false,
      glow: false,
    },
  }
);

export interface StatusDotProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof statusDotVariants> {
  /** Optional label for accessibility */
  label?: string;
}

export const StatusDot = React.forwardRef<HTMLSpanElement, StatusDotProps>(
  ({ className, status, size, pulse, ring, glow, label, ...props }, ref) => {
    const statusLabels = {
      online: "Online",
      offline: "Offline",
      busy: "Busy",
      away: "Away",
      default: "Status",
    };

    return (
      <span
        ref={ref}
        role="status"
        aria-label={label || statusLabels[status || "default"]}
        className={cn(statusDotVariants({ status, size, pulse, ring, glow }), className)}
        {...props}
      />
    );
  }
);
StatusDot.displayName = "StatusDot";

export { statusDotVariants };
