import { cn } from "@repo/utils";
import * as React from "react";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          // Base
          "flex min-h-[100px] w-full rounded-lg px-4 py-3 text-sm",
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
          // Resize
          "resize-y",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";
