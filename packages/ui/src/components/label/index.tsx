import { cn } from "@repo/utils";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const labelVariants = cva(
  [
    // Base typography
    "text-sm font-medium leading-none",
    // Color with subtle warmth
    "text-foreground/90",
    // Spacing for form context
    "mb-2 block",
    // Disabled state
    "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
    // Selection styling
    "select-none",
  ],
  {
    variants: {
      variant: {
        default: "",
        muted: "text-muted-foreground font-normal",
        required: "after:content-['*'] after:ml-0.5 after:text-destructive",
        form: [
          "uppercase",
          "text-[0.8125rem]",
          "font-semibold",
          "tracking-[0.05em]",
          "text-muted-foreground",
        ],
      },
      size: {
        sm: "text-xs",
        default: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface LabelProps
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>,
    VariantProps<typeof labelVariants> {
  /** Show required indicator */
  required?: boolean;
}

export const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  LabelProps
>(({ className, variant, size, required, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(
      labelVariants({ variant: required ? "required" : variant, size }),
      className
    )}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { labelVariants };
