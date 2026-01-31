import { cn } from "@repo/utils";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const tooltipContentVariants = cva(
  [
    "z-50 overflow-hidden rounded-lg px-3 py-1.5 text-sm",
    "shadow-[0_4px_12px_-4px_oklch(0_0_0/0.12),0_4px_8px_-4px_oklch(0_0_0/0.08)]",
    // Spring animation
    "animate-in fade-in-0 zoom-in-95",
    "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
    "data-[side=bottom]:slide-in-from-top-2",
    "data-[side=left]:slide-in-from-right-2",
    "data-[side=right]:slide-in-from-left-2",
    "data-[side=top]:slide-in-from-bottom-2",
  ],
  {
    variants: {
      variant: {
        default: "bg-popover text-popover-foreground border border-border/30",
        dark: "bg-foreground text-background",
        primary: "bg-primary text-primary-foreground",
      },
      glass: {
        true: "backdrop-blur-md bg-opacity-90",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      glass: false,
    },
  }
);

// Arrow variants to match content styling
const arrowVariantClasses = {
  default: "fill-popover drop-shadow-sm",
  dark: "fill-foreground",
  primary: "fill-primary",
};

export interface TooltipContentProps
  extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>,
    VariantProps<typeof tooltipContentVariants> {
  showArrow?: boolean;
}

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  TooltipContentProps
>(({
  className,
  sideOffset = 6,
  showArrow = false,
  variant = "default",
  glass,
  children,
  ...props
}, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={showArrow ? sideOffset : sideOffset + 2}
      className={cn(tooltipContentVariants({ variant, glass }), className)}
      {...props}
    >
      {children}
      {showArrow && (
        <TooltipPrimitive.Arrow
          className={cn(arrowVariantClasses[variant || "default"])}
          width={12}
          height={6}
        />
      )}
    </TooltipPrimitive.Content>
  </TooltipPrimitive.Portal>
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

// Keep TooltipArrow export for backwards compatibility
const TooltipArrow = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Arrow>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Arrow>
>(({ className, ...props }, ref) => (
  <TooltipPrimitive.Arrow
    ref={ref}
    className={cn("fill-popover", className)}
    {...props}
  />
));
TooltipArrow.displayName = TooltipPrimitive.Arrow.displayName;

export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  TooltipArrow,
  tooltipContentVariants,
};
