import { cn } from "@repo/utils";
import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";

export interface RadioGroupProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {}

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  RadioGroupProps
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

export interface RadioGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {}

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupItemProps
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "aspect-square h-5 w-5 rounded-full",
        "border-2 border-muted-foreground/30",
        "text-primary bg-background",
        "data-[state=checked]:border-primary",
        "focus:outline-none focus-visible:shadow-focus",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "transition-all duration-200",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <div className="h-2.5 w-2.5 rounded-full bg-primary animate-in zoom-in-75 duration-150" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = "RadioGroupItem";

export interface RadioGroupCardItemProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  /** Label text for the radio */
  label?: React.ReactNode;
  /** Optional description text */
  description?: React.ReactNode;
  /** Children content (alternative to label/description) */
  children?: React.ReactNode;
}

const RadioGroupCardItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  RadioGroupCardItemProps
>(({ className, label, description, children, ...props }, ref) => {
  return (
    <label
      className={cn(
        "flex items-start gap-3 rounded-xl p-4 cursor-pointer",
        "bg-card border border-border",
        "hover:bg-muted/50",
        "transition-all duration-200",
        "has-[:checked]:border-primary has-[:checked]:ring-1 has-[:checked]:ring-primary",
        "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-offset-2",
        "has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50",
        className
      )}
    >
      <RadioGroupPrimitive.Item
        ref={ref}
        className={cn(
          "aspect-square h-5 w-5 rounded-full shrink-0 mt-0.5",
          "border-2 border-muted-foreground/30",
          "text-primary bg-background",
          "data-[state=checked]:border-primary",
          "focus:outline-none",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "transition-all duration-200"
        )}
        {...props}
      >
        <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
          <div className="h-2.5 w-2.5 rounded-full bg-primary animate-in zoom-in-75 duration-150" />
        </RadioGroupPrimitive.Indicator>
      </RadioGroupPrimitive.Item>
      {children ? (
        <div className="flex-1">{children}</div>
      ) : (label || description) ? (
        <div className="flex flex-col gap-1">
          {label && <span className="text-sm font-medium leading-none">{label}</span>}
          {description && (
            <span className="text-sm text-muted-foreground">{description}</span>
          )}
        </div>
      ) : null}
    </label>
  );
});
RadioGroupCardItem.displayName = "RadioGroupCardItem";

export { RadioGroup, RadioGroupItem, RadioGroupCardItem };
