import { cn } from "@repo/utils";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

export const Tabs = TabsPrimitive.Root;

const tabsListVariants = cva(
  "inline-flex items-center justify-center text-muted-foreground",
  {
    variants: {
      variant: {
        underline: [
          "gap-1 border-b border-border/60",
          "bg-transparent p-0",
        ],
        pills: [
          "gap-1 rounded-xl bg-muted/60 p-1",
        ],
        soft: [
          "gap-1.5 rounded-xl bg-muted/40 p-1.5",
        ],
        segment: [
          "gap-0 rounded-lg bg-muted/60 p-0.5",
        ],
      },
    },
    defaultVariants: {
      variant: "underline",
    },
  }
);

export interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>,
    VariantProps<typeof tabsListVariants> {}

export const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, variant, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(tabsListVariants({ variant }), className)}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const tabsTriggerVariants = cva(
  [
    "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium",
    "ring-offset-background transition-all duration-200 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        underline: [
          "relative px-4 py-2.5 -mb-px",
          "border-b-2 border-transparent",
          "hover:text-foreground hover:bg-muted/30",
          "rounded-t-md",
          "data-[state=active]:border-primary data-[state=active]:text-foreground",
          "data-[state=active]:bg-transparent",
        ],
        pills: [
          "px-4 py-2 rounded-lg",
          "hover:bg-background/60",
          "data-[state=active]:bg-background data-[state=active]:text-foreground",
          "data-[state=active]:shadow-[0_1px_3px_0_oklch(0_0_0/0.06),0_1px_2px_-1px_oklch(0_0_0/0.06)]",
        ],
        soft: [
          "px-4 py-2 rounded-lg",
          "hover:bg-background/50",
          "data-[state=active]:bg-background data-[state=active]:text-foreground",
          "data-[state=active]:shadow-[0_1px_2px_0_oklch(0_0_0/0.05)]",
        ],
        segment: [
          "flex-1 px-3 py-1.5 rounded-md text-sm",
          "hover:text-foreground",
          "data-[state=active]:bg-background data-[state=active]:text-foreground",
          "data-[state=active]:shadow-sm",
        ],
      },
    },
    defaultVariants: {
      variant: "underline",
    },
  }
);

export interface TabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>,
    VariantProps<typeof tabsTriggerVariants> {}

export const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ className, variant, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(tabsTriggerVariants({ variant }), className)}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

export const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-4 ring-offset-background",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "data-[state=inactive]:hidden",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { tabsListVariants, tabsTriggerVariants };
