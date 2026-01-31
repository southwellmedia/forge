import { cn } from "@repo/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

export const cardVariants = cva(
  [
    "rounded-2xl bg-card text-card-foreground",
    "transition-all duration-300 ease-out",
  ],
  {
    variants: {
      variant: {
        default: [
          "shadow-[var(--shadow-soft-sm)]",
          "hover:shadow-[var(--shadow-soft-md)]",
          "hover:-translate-y-0.5",
        ],
        elevated: [
          "shadow-[var(--shadow-soft-md)]",
          "hover:shadow-[var(--shadow-soft-lg)]",
          "hover:-translate-y-1",
        ],
        outlined: [
          "border border-border/60",
          "shadow-none",
          "hover:border-border hover:shadow-[var(--shadow-soft-xs)]",
        ],
        glass: [
          "bg-card/80 backdrop-blur-md",
          "border border-white/10 dark:border-white/5",
          "shadow-[var(--shadow-soft)]",
          "hover:shadow-[var(--shadow-soft-md)]",
          "hover:bg-card/90",
        ],
        ghost: [
          "border-transparent shadow-none bg-transparent",
          "hover:bg-muted/50",
        ],
        soft: [
          "bg-muted/40 border border-border/30",
          "shadow-none",
          "hover:bg-muted/60",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, className }))}
      {...props}
    />
  )
);
Card.displayName = "Card";

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    />
  )
);
CardHeader.displayName = "CardHeader";

export interface CardTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {}

export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        "text-xl font-semibold leading-none tracking-tight",
        className
      )}
      {...props}
    />
  )
);
CardTitle.displayName = "CardTitle";

export interface CardDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  CardDescriptionProps
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

export interface CardContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center p-6 pt-0", className)}
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter";

export interface CardMediaProps extends React.HTMLAttributes<HTMLDivElement> {
  aspectRatio?: "video" | "square" | "wide" | "portrait";
}

export const CardMedia = React.forwardRef<HTMLDivElement, CardMediaProps>(
  ({ className, aspectRatio = "video", children, ...props }, ref) => {
    const aspectClasses = {
      video: "aspect-video",
      square: "aspect-square",
      wide: "aspect-[2/1]",
      portrait: "aspect-[3/4]",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "overflow-hidden rounded-t-2xl",
          aspectClasses[aspectRatio],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
CardMedia.displayName = "CardMedia";
