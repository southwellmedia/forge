import { cn } from "@repo/utils";
import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Label } from "../label";

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {}

export const Form = React.forwardRef<HTMLFormElement, FormProps>(
  ({ className, ...props }, ref) => {
    return (
      <form
        ref={ref}
        className={cn("space-y-6", className)}
        {...props}
      />
    );
  }
);
Form.displayName = "Form";

export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {}

export const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("space-y-2", className)}
        {...props}
      />
    );
  }
);
FormField.displayName = "FormField";

const formRowVariants = cva("grid gap-4", {
  variants: {
    columns: {
      1: "grid-cols-1",
      2: "grid-cols-1 sm:grid-cols-2",
      3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
    },
  },
  defaultVariants: {
    columns: 2,
  },
});

export interface FormRowProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof formRowVariants> {}

export const FormRow = React.forwardRef<HTMLDivElement, FormRowProps>(
  ({ className, columns, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(formRowVariants({ columns }), className)}
        {...props}
      />
    );
  }
);
FormRow.displayName = "FormRow";

export interface FormSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Section title */
  title?: string;
  /** Section description */
  description?: string;
}

export const FormSection = React.forwardRef<HTMLDivElement, FormSectionProps>(
  ({ className, title, description, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("space-y-4", className)}
        {...props}
      >
        {(title || description) && (
          <div className="space-y-1">
            {title && (
              <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            )}
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
        )}
        <div className="space-y-4">{children}</div>
      </div>
    );
  }
);
FormSection.displayName = "FormSection";

export interface FormLabelProps
  extends React.ComponentPropsWithoutRef<typeof Label> {
  required?: boolean;
}

export const FormLabel = React.forwardRef<
  React.ElementRef<typeof Label>,
  FormLabelProps
>(({ className, children, required, ...props }, ref) => {
  return (
    <Label ref={ref} className={className} {...props}>
      {children}
      {required && <span className="ml-1 text-destructive">*</span>}
    </Label>
  );
});
FormLabel.displayName = "FormLabel";

export interface FormControlProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

export const FormControl = React.forwardRef<HTMLDivElement, FormControlProps>(
  ({ asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return <Comp ref={ref} {...props} />;
  }
);
FormControl.displayName = "FormControl";

export interface FormDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  FormDescriptionProps
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
});
FormDescription.displayName = "FormDescription";

export interface FormMessageProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  FormMessageProps
>(({ className, children, ...props }, ref) => {
  if (!children) return null;
  return (
    <p
      ref={ref}
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    >
      {children}
    </p>
  );
});
FormMessage.displayName = "FormMessage";
