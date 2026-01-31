import { cn } from "@repo/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const skeletonVariants = cva(
  [
    "relative overflow-hidden",
    "bg-muted/70",
  ],
  {
    variants: {
      variant: {
        default: "rounded-lg",
        text: "rounded-md h-4 w-full",
        circle: "rounded-full aspect-square",
        card: "rounded-2xl",
        image: "rounded-xl aspect-video",
        avatar: "rounded-full",
        button: "rounded-lg h-10",
        input: "rounded-lg h-10",
      },
      animation: {
        shimmer: [
          "before:absolute before:inset-0",
          "before:-translate-x-full",
          "before:animate-[shimmer_2s_ease-in-out_infinite]",
          "before:bg-gradient-to-r",
          "before:from-transparent before:via-white/30 before:to-transparent",
          "dark:before:via-white/10",
          "isolate overflow-hidden",
        ],
        pulse: "animate-pulse",
        wave: [
          "after:absolute after:inset-0",
          "after:animate-[wave_2s_ease-in-out_infinite]",
          "after:bg-gradient-to-r",
          "after:from-transparent after:via-foreground/5 after:to-transparent",
          "isolate overflow-hidden",
        ],
        none: "",
      },
    },
    defaultVariants: {
      variant: "default",
      animation: "shimmer",
    },
  }
);

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant, animation, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(skeletonVariants({ variant, animation }), className)}
        {...props}
      />
    );
  }
);
Skeleton.displayName = "Skeleton";

// Pre-built skeleton patterns
export interface SkeletonTextProps extends Omit<SkeletonProps, "variant"> {
  lines?: number;
  lastLineWidth?: "full" | "3/4" | "1/2" | "1/4";
}

export const SkeletonText = React.forwardRef<HTMLDivElement, SkeletonTextProps>(
  ({ className, lines = 3, lastLineWidth = "3/4", animation, ...props }, ref) => {
    const lastLineWidthClass = {
      full: "w-full",
      "3/4": "w-3/4",
      "1/2": "w-1/2",
      "1/4": "w-1/4",
    };

    return (
      <div ref={ref} className={cn("space-y-2.5", className)} {...props}>
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton
            key={i}
            variant="text"
            animation={animation}
            className={cn(
              i === lines - 1 && lastLineWidthClass[lastLineWidth]
            )}
          />
        ))}
      </div>
    );
  }
);
SkeletonText.displayName = "SkeletonText";

export interface SkeletonCardProps extends Omit<SkeletonProps, "variant"> {
  showImage?: boolean;
  showAvatar?: boolean;
}

export const SkeletonCard = React.forwardRef<HTMLDivElement, SkeletonCardProps>(
  ({ className, showImage = true, showAvatar = false, animation, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl bg-card shadow-[0_2px_12px_-4px_oklch(0_0_0/0.08)] overflow-hidden",
          className
        )}
        {...props}
      >
        {showImage && (
          <Skeleton
            variant="image"
            animation={animation}
            className="rounded-none"
          />
        )}
        <div className="p-6 space-y-4">
          {showAvatar && (
            <div className="flex items-center gap-3">
              <Skeleton
                variant="avatar"
                animation={animation}
                className="h-10 w-10"
              />
              <div className="space-y-2 flex-1">
                <Skeleton animation={animation} className="h-4 w-28" />
                <Skeleton animation={animation} className="h-3 w-20" />
              </div>
            </div>
          )}
          <Skeleton animation={animation} className="h-5 w-3/4" />
          <SkeletonText lines={2} animation={animation} lastLineWidth="1/2" />
        </div>
      </div>
    );
  }
);
SkeletonCard.displayName = "SkeletonCard";

export { skeletonVariants };
