import { cn } from "@repo/utils";
import * as React from "react";

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  /** Optional label to display in the center of the divider */
  label?: React.ReactNode;
  /** Label position */
  labelPosition?: "left" | "center" | "right";
  /** Visual variant */
  variant?: "solid" | "dashed" | "dotted";
  /** Soft or strong appearance */
  soft?: boolean;
}

export const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({
    className,
    orientation = "horizontal",
    label,
    labelPosition = "center",
    variant = "solid",
    soft = false,
    ...props
  }, ref) => {
    const lineStyles = {
      solid: "bg-border",
      dashed: "bg-transparent border-t border-dashed border-border",
      dotted: "bg-transparent border-t border-dotted border-border",
    };

    const opacityClass = soft ? "opacity-50" : "";

    if (label && orientation === "horizontal") {
      return (
        <div
          ref={ref}
          className={cn("relative flex items-center w-full", className)}
          role="separator"
          {...props}
        >
          <div className={cn(
            "flex-1 h-px",
            variant === "solid" ? lineStyles.solid : lineStyles[variant],
            opacityClass
          )} />
          <span
            className={cn(
              "px-4 text-xs text-muted-foreground font-medium",
              "bg-background"
            )}
          >
            {label}
          </span>
          <div className={cn(
            "flex-1 h-px",
            variant === "solid" ? lineStyles.solid : lineStyles[variant],
            opacityClass
          )} />
        </div>
      );
    }

    return (
      <div
        ref={ref}
        role="separator"
        className={cn(
          "shrink-0",
          orientation === "horizontal"
            ? cn("h-px w-full", variant === "solid" ? lineStyles.solid : lineStyles[variant])
            : cn("h-full w-px", lineStyles.solid),
          opacityClass,
          className
        )}
        {...props}
      />
    );
  }
);
Divider.displayName = "Divider";
