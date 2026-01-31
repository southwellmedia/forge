import { cn } from "@repo/utils";
import * as React from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Optional left icon/element */
  startIcon?: React.ReactNode;
  /** Optional right icon/element */
  endIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, startIcon, endIcon, ...props }, ref) => {
    const inputClasses = cn(
      // Base
      "flex h-11 w-full rounded-lg px-4 py-3 text-sm",
      // Background states
      "bg-input-bg hover:bg-input-bg-hover focus:bg-background",
      // Border (subtle 1px border, colored on focus)
      "border border-border/40 focus:border-primary",
      // Focus glow instead of ring
      "focus:shadow-focus focus:outline-none",
      // Transitions
      "transition-all duration-200",
      // Placeholder
      "placeholder:text-muted-foreground",
      // Disabled
      "disabled:cursor-not-allowed disabled:opacity-50",
      // File input
      "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
      startIcon && "pl-11",
      endIcon && "pr-11",
      className
    );

    if (startIcon || endIcon) {
      return (
        <div className="relative flex items-center w-full">
          {startIcon && (
            <div className="absolute left-4 flex items-center justify-center text-muted-foreground pointer-events-none">
              {startIcon}
            </div>
          )}
          <input
            type={type}
            className={inputClasses}
            ref={ref}
            {...props}
          />
          {endIcon && (
            <div className="absolute right-4 flex items-center justify-center text-muted-foreground">
              {endIcon}
            </div>
          )}
        </div>
      );
    }

    return (
      <input
        type={type}
        className={inputClasses}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
