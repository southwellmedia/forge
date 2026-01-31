import { cn } from "@repo/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const avatarGroupVariants = cva(
  "flex items-center",
  {
    variants: {
      spacing: {
        tight: "-space-x-3.5",
        default: "-space-x-2.5",
        loose: "-space-x-1.5",
      },
    },
    defaultVariants: {
      spacing: "default",
    },
  }
);

export interface AvatarGroupProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarGroupVariants> {
  /** Maximum number of avatars to show before truncating */
  max?: number;
  /** Total count (for showing +N overflow) */
  total?: number;
  /** Size of the avatars */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

const sizeClasses = {
  xs: "h-6 w-6 text-[10px]",
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-16 w-16 text-lg",
};

export const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ className, spacing, max, total, size = "md", children, ...props }, ref) => {
    const childArray = React.Children.toArray(children);
    const displayCount = max ? Math.min(childArray.length, max) : childArray.length;
    const overflow = total
      ? total - displayCount
      : max
        ? childArray.length - max
        : 0;

    const displayedChildren = max ? childArray.slice(0, max) : childArray;

    return (
      <div
        ref={ref}
        className={cn(avatarGroupVariants({ spacing }), className)}
        role="group"
        aria-label="Avatar group"
        {...props}
      >
        {React.Children.map(displayedChildren, (child, index) => (
          <div
            key={index}
            className="relative ring-2 ring-background rounded-full transition-transform duration-200 hover:z-10 hover:scale-105"
            style={{ zIndex: displayedChildren.length - index }}
          >
            {child}
          </div>
        ))}
        {overflow > 0 && (
          <div
            className={cn(
              "relative flex items-center justify-center rounded-full",
              "bg-muted text-muted-foreground font-medium",
              "ring-2 ring-background",
              "transition-transform duration-200 hover:scale-105",
              sizeClasses[size]
            )}
            style={{ zIndex: 0 }}
          >
            +{overflow}
          </div>
        )}
      </div>
    );
  }
);
AvatarGroup.displayName = "AvatarGroup";

export { avatarGroupVariants };
