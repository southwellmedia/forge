import { cn } from "@repo/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import * as React from "react";

const alertVariants = cva(
  [
    "relative w-full rounded-xl p-4",
    "transition-all duration-300 ease-out",
    "[&>svg~*]:pl-9 [&>svg+div]:translate-y-[-3px]",
    "[&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4",
  ],
  {
    variants: {
      variant: {
        default: [
          "bg-muted/60 text-foreground",
          "border border-border/40",
          "[&>svg]:text-foreground/70",
        ],
        info: [
          "bg-[var(--color-info-50)] text-[var(--color-info-700)]",
          "border border-info/15",
          "[&>svg]:text-info",
        ],
        success: [
          "bg-[var(--color-success-50)] text-[var(--color-success-700)]",
          "border border-success/15",
          "[&>svg]:text-success",
        ],
        warning: [
          "bg-[var(--color-warning-50)] text-[var(--color-warning-700)]",
          "border border-warning/15",
          "[&>svg]:text-warning",
        ],
        error: [
          "bg-[var(--color-error-50)] text-[var(--color-error-700)]",
          "border border-error/15",
          "[&>svg]:text-error",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  /** Whether the alert can be dismissed */
  dismissible?: boolean;
  /** Callback when the alert is dismissed */
  onDismiss?: () => void;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, dismissible, onDismiss, children, ...props }, ref) => (
    <div
      ref={ref}
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      {children}
      {dismissible && (
        <button
          type="button"
          onClick={onDismiss}
          className={cn(
            "absolute right-3 top-3 p-1.5 rounded-lg",
            "opacity-60 hover:opacity-100",
            "transition-all duration-200",
            "hover:bg-foreground/5",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          )}
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
);
Alert.displayName = "Alert";

export interface AlertIconProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "info" | "success" | "warning" | "error" | "default";
}

const iconVariantClasses = {
  default: "bg-foreground/5 text-foreground/70",
  info: "bg-info/10 text-info",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  error: "bg-error/10 text-error",
};

export const AlertIcon = React.forwardRef<HTMLDivElement, AlertIconProps>(
  ({ className, variant = "default", children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "absolute left-4 top-4 p-1.5 rounded-lg",
        iconVariantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
AlertIcon.displayName = "AlertIcon";

export interface AlertTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {}

export const AlertTitle = React.forwardRef<HTMLHeadingElement, AlertTitleProps>(
  ({ className, ...props }, ref) => (
    <h5
      ref={ref}
      className={cn("mb-1 font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  )
);
AlertTitle.displayName = "AlertTitle";

export interface AlertDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  AlertDescriptionProps
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed opacity-90", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { alertVariants };
