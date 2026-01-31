import { cn } from "@repo/utils";
import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-5 w-5 shrink-0 rounded-md",
      "border-2 border-muted-foreground/30",
      "bg-background",
      "data-[state=checked]:bg-primary data-[state=checked]:border-primary",
      "focus-visible:outline-none focus-visible:shadow-focus",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "transition-all duration-200",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn(
        "flex items-center justify-center text-primary-foreground",
        "data-[state=checked]:animate-in data-[state=checked]:zoom-in-75 data-[state=checked]:duration-150"
      )}
    >
      <Check className="h-3.5 w-3.5" strokeWidth={3} />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export interface CheckboxCardProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  /** Label text for the checkbox */
  label?: React.ReactNode;
  /** Optional description text */
  description?: React.ReactNode;
  /** Children content (alternative to label/description) */
  children?: React.ReactNode;
}

const CheckboxCard = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxCardProps
>(({ className, label, description, children, ...props }, ref) => (
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
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        "peer h-5 w-5 shrink-0 rounded-md mt-0.5",
        "border-2 border-muted-foreground/30",
        "bg-background",
        "data-[state=checked]:bg-primary data-[state=checked]:border-primary",
        "focus-visible:outline-none",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "transition-all duration-200"
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className={cn(
          "flex items-center justify-center text-primary-foreground",
          "data-[state=checked]:animate-in data-[state=checked]:zoom-in-75 data-[state=checked]:duration-150"
        )}
      >
        <Check className="h-3.5 w-3.5" strokeWidth={3} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
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
));
CheckboxCard.displayName = "CheckboxCard";

export { Checkbox, CheckboxCard };
