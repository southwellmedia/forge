"use client";

import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cn } from "@repo/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden rounded-full",
  {
    variants: {
      size: {
        xs: "h-6 w-6 text-[10px]",
        sm: "h-8 w-8 text-xs",
        md: "h-10 w-10 text-sm",
        lg: "h-12 w-12 text-base",
        xl: "h-16 w-16 text-lg",
        "2xl": "h-20 w-20 text-xl",
      },
      ring: {
        none: "",
        default: "ring-2 ring-background shadow-sm",
        primary: "ring-2 ring-primary shadow-sm",
        success: "ring-2 ring-success shadow-sm",
        warning: "ring-2 ring-warning shadow-sm",
        error: "ring-2 ring-error shadow-sm",
        gradient: "ring-2 ring-offset-2 ring-offset-background ring-primary/50",
      },
    },
    defaultVariants: {
      size: "md",
      ring: "none",
    },
  }
);

export interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>,
    VariantProps<typeof avatarVariants> {}

export const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, size, ring, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(avatarVariants({ size, ring }), className)}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

export interface AvatarImageProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image> {}

export const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  AvatarImageProps
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full overflow-hidden rounded-full object-cover", className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const fallbackGradients = [
  "from-violet-500 to-purple-600",
  "from-blue-500 to-cyan-500",
  "from-emerald-500 to-teal-500",
  "from-amber-500 to-orange-500",
  "from-rose-500 to-pink-500",
  "from-indigo-500 to-blue-600",
  "from-fuchsia-500 to-pink-500",
  "from-sky-500 to-blue-500",
];

export interface AvatarFallbackProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> {
  /** Use gradient background based on the initials */
  gradient?: boolean;
}

export const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  AvatarFallbackProps
>(({ className, gradient, children, ...props }, ref) => {
  const gradientClass = gradient
    ? fallbackGradients[
        (typeof children === "string" ? children.charCodeAt(0) : 0) %
          fallbackGradients.length
      ]
    : "";

  return (
    <AvatarPrimitive.Fallback
      ref={ref}
      className={cn(
        "flex h-full w-full items-center justify-center rounded-full font-medium",
        gradient
          ? `bg-gradient-to-br ${gradientClass} text-white`
          : "bg-muted text-muted-foreground",
        className
      )}
      {...props}
    >
      {children}
    </AvatarPrimitive.Fallback>
  );
});
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

// Status dot for online/offline/busy/away
const statusVariants = cva(
  "absolute rounded-full ring-2 ring-background",
  {
    variants: {
      status: {
        online: "bg-success",
        offline: "bg-muted-foreground/50",
        busy: "bg-error",
        away: "bg-warning",
      },
      size: {
        xs: "h-1.5 w-1.5 right-0 bottom-0",
        sm: "h-2 w-2 right-0 bottom-0",
        md: "h-2.5 w-2.5 right-0 bottom-0",
        lg: "h-3 w-3 right-0.5 bottom-0.5",
        xl: "h-3.5 w-3.5 right-0.5 bottom-0.5",
        "2xl": "h-4 w-4 right-1 bottom-1",
      },
    },
    defaultVariants: {
      status: "online",
      size: "md",
    },
  }
);

export interface AvatarStatusProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof statusVariants> {}

export const AvatarStatus = React.forwardRef<HTMLSpanElement, AvatarStatusProps>(
  ({ className, status, size, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(statusVariants({ status, size }), className)}
      {...props}
    />
  )
);
AvatarStatus.displayName = "AvatarStatus";

/**
 * Wrapper component for Avatar with status indicator.
 * Use this when you need a status dot that won't be clipped by the avatar's overflow-hidden.
 *
 * Usage:
 * <AvatarWithStatus status="online" size="md">
 *   <AvatarImage src="..." />
 *   <AvatarFallback>AB</AvatarFallback>
 * </AvatarWithStatus>
 */
export interface AvatarWithStatusProps extends AvatarProps {
  status?: "online" | "offline" | "busy" | "away";
}

export const AvatarWithStatus = React.forwardRef<
  HTMLDivElement,
  AvatarWithStatusProps
>(({ status, size = "md", children, className, ...props }, ref) => (
  <div ref={ref} className="relative inline-flex">
    <Avatar size={size} className={className} {...props}>
      {children}
    </Avatar>
    {status && <AvatarStatus status={status} size={size} />}
  </div>
));
AvatarWithStatus.displayName = "AvatarWithStatus";

export { avatarVariants, statusVariants };
