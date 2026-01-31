"use client";

import { cn } from "@repo/utils";
import { motion, type HTMLMotionProps } from "framer-motion";
import * as React from "react";

// ============================================================================
// CARD GRID - Responsive grid layouts for cards
// ============================================================================

export interface CardGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of columns at different breakpoints */
  columns?: {
    default?: 1 | 2 | 3 | 4 | 5 | 6;
    sm?: 1 | 2 | 3 | 4 | 5 | 6;
    md?: 1 | 2 | 3 | 4 | 5 | 6;
    lg?: 1 | 2 | 3 | 4 | 5 | 6;
    xl?: 1 | 2 | 3 | 4 | 5 | 6;
  };
  /** Gap size */
  gap?: "sm" | "md" | "lg" | "xl";
  /** Enable masonry-style layout */
  masonry?: boolean;
}

const columnClasses = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
};

const gapClasses = {
  sm: "gap-3",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-8",
};

export const CardGrid = React.forwardRef<HTMLDivElement, CardGridProps>(
  ({
    className,
    columns = { default: 1, sm: 2, lg: 3 },
    gap = "lg",
    masonry = false,
    children,
    ...props
  }, ref) => {
    if (masonry) {
      return (
        <div
          ref={ref}
          className={cn(
            "columns-1",
            columns.sm && `sm:columns-${columns.sm}`,
            columns.md && `md:columns-${columns.md}`,
            columns.lg && `lg:columns-${columns.lg}`,
            columns.xl && `xl:columns-${columns.xl}`,
            gapClasses[gap],
            "[&>*]:mb-4 [&>*]:break-inside-avoid",
            className
          )}
          {...props}
        >
          {children}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          "grid",
          columns.default && columnClasses[columns.default],
          columns.sm && `sm:${columnClasses[columns.sm]}`,
          columns.md && `md:${columnClasses[columns.md]}`,
          columns.lg && `lg:${columnClasses[columns.lg]}`,
          columns.xl && `xl:${columnClasses[columns.xl]}`,
          gapClasses[gap],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
CardGrid.displayName = "CardGrid";

// ============================================================================
// STAGGERED CARD GRID - Cards animate in with stagger
// ============================================================================

export interface StaggeredCardGridProps extends CardGridProps {
  /** Stagger delay between cards (seconds) */
  staggerDelay?: number;
  /** Animation direction */
  animateFrom?: "bottom" | "top" | "left" | "right" | "scale";
}

const animationVariants = {
  bottom: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  },
  top: {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0 },
  },
  left: {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 },
  },
  right: {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  },
};

export const StaggeredCardGrid = React.forwardRef<HTMLDivElement, StaggeredCardGridProps>(
  ({
    className,
    columns = { default: 1, sm: 2, lg: 3 },
    gap = "lg",
    staggerDelay = 0.1,
    animateFrom = "bottom",
    children,
    ...props
  }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          "grid",
          columns.default && columnClasses[columns.default],
          columns.sm && `sm:${columnClasses[columns.sm]}`,
          columns.md && `md:${columnClasses[columns.md]}`,
          columns.lg && `lg:${columnClasses[columns.lg]}`,
          columns.xl && `xl:${columnClasses[columns.xl]}`,
          gapClasses[gap],
          className
        )}
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: staggerDelay,
            },
          },
        }}
        {...(props as HTMLMotionProps<"div">)}
      >
        {React.Children.map(children, (child) => (
          <motion.div
            variants={animationVariants[animateFrom]}
            transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
          >
            {child}
          </motion.div>
        ))}
      </motion.div>
    );
  }
);
StaggeredCardGrid.displayName = "StaggeredCardGrid";

// ============================================================================
// BENTO GRID - Asymmetric grid with featured items
// ============================================================================

export interface BentoGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Gap size */
  gap?: "sm" | "md" | "lg" | "xl";
}

export const BentoGrid = React.forwardRef<HTMLDivElement, BentoGridProps>(
  ({ className, gap = "lg", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[minmax(200px,auto)]",
          gapClasses[gap],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
BentoGrid.displayName = "BentoGrid";

export interface BentoItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Span multiple columns */
  colSpan?: 1 | 2 | 3;
  /** Span multiple rows */
  rowSpan?: 1 | 2 | 3;
}

export const BentoItem = React.forwardRef<HTMLDivElement, BentoItemProps>(
  ({ className, colSpan = 1, rowSpan = 1, children, ...props }, ref) => {
    const colSpanClasses = {
      1: "",
      2: "md:col-span-2",
      3: "md:col-span-2 lg:col-span-3",
    };

    const rowSpanClasses = {
      1: "",
      2: "row-span-2",
      3: "row-span-3",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-2xl bg-card text-card-foreground",
          "shadow-[var(--shadow-soft-sm)]",
          "transition-all duration-300 ease-out",
          "hover:shadow-[var(--shadow-soft-md)]",
          colSpanClasses[colSpan],
          rowSpanClasses[rowSpan],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
BentoItem.displayName = "BentoItem";

// ============================================================================
// CARD CAROUSEL - Horizontal scrolling card container
// ============================================================================

export interface CardCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Gap between cards */
  gap?: "sm" | "md" | "lg" | "xl";
  /** Peek amount (shows partial next card) */
  peek?: boolean;
  /** Snap to cards */
  snap?: boolean;
  /** Hide scrollbar */
  hideScrollbar?: boolean;
  /** Padding at edges */
  edgePadding?: boolean;
}

export const CardCarousel = React.forwardRef<HTMLDivElement, CardCarouselProps>(
  ({
    className,
    gap = "lg",
    peek = true,
    snap = true,
    hideScrollbar = true,
    edgePadding = true,
    children,
    ...props
  }, ref) => {
    const gapSizeMap = {
      sm: "gap-3",
      md: "gap-4",
      lg: "gap-6",
      xl: "gap-8",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex overflow-x-auto",
          gapSizeMap[gap],
          snap && "snap-x snap-mandatory",
          hideScrollbar && "scrollbar-hide",
          edgePadding && "px-4 md:px-6 lg:px-8 -mx-4 md:-mx-6 lg:-mx-8",
          peek && "pr-8 md:pr-16",
          className
        )}
        style={{
          scrollbarWidth: hideScrollbar ? "none" : "auto",
          msOverflowStyle: hideScrollbar ? "none" : "auto",
        }}
        {...props}
      >
        {React.Children.map(children, (child) => (
          <div className={cn("shrink-0", snap && "snap-start")}>
            {child}
          </div>
        ))}
      </div>
    );
  }
);
CardCarousel.displayName = "CardCarousel";

// ============================================================================
// CARD STACK - Overlapping stacked cards (like Tinder)
// ============================================================================

export interface CardStackProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Maximum visible cards in stack */
  maxVisible?: number;
  /** Offset between cards */
  offset?: number;
  /** Scale reduction per card */
  scaleReduction?: number;
}

export const CardStack = React.forwardRef<HTMLDivElement, CardStackProps>(
  ({
    className,
    maxVisible = 3,
    offset = 16,
    scaleReduction = 0.04,
    children,
    ...props
  }, ref) => {
    const childArray = React.Children.toArray(children);
    const visibleChildren = childArray.slice(0, maxVisible);
    const topCard = visibleChildren[visibleChildren.length - 1];
    const backgroundCards = visibleChildren.slice(0, -1);

    return (
      <div
        ref={ref}
        className={cn("relative", className)}
        {...props}
      >
        {/* Background cards - absolute positioned */}
        {backgroundCards.map((child, index) => {
          const stackPosition = backgroundCards.length - index; // 1, 2, 3... from top
          return (
            <motion.div
              key={index}
              className="absolute inset-x-0 top-0"
              style={{
                zIndex: index,
              }}
              initial={false}
              animate={{
                y: stackPosition * offset,
                scale: 1 - stackPosition * scaleReduction,
                opacity: 1 - stackPosition * 0.15,
              }}
              transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
            >
              {child}
            </motion.div>
          );
        })}

        {/* Top card - relative to establish height */}
        {topCard && (
          <motion.div
            className="relative"
            style={{ zIndex: visibleChildren.length }}
            initial={false}
          >
            {topCard}
          </motion.div>
        )}
      </div>
    );
  }
);
CardStack.displayName = "CardStack";

// ============================================================================
// CARD GROUP - Visual grouping with shared styling
// ============================================================================

export interface CardGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Layout direction */
  direction?: "horizontal" | "vertical";
  /** Whether cards are connected (no gap) */
  connected?: boolean;
  /** Gap size when not connected */
  gap?: "sm" | "md" | "lg";
}

export const CardGroup = React.forwardRef<HTMLDivElement, CardGroupProps>(
  ({
    className,
    direction = "vertical",
    connected = false,
    gap = "md",
    children,
    ...props
  }, ref) => {
    const gapSizeMap = {
      sm: direction === "horizontal" ? "gap-x-2" : "gap-y-2",
      md: direction === "horizontal" ? "gap-x-3" : "gap-y-3",
      lg: direction === "horizontal" ? "gap-x-4" : "gap-y-4",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex",
          direction === "horizontal" ? "flex-row" : "flex-col",
          !connected && gapSizeMap[gap],
          connected && [
            direction === "horizontal"
              ? "[&>*:not(:first-child)]:rounded-l-none [&>*:not(:last-child)]:rounded-r-none [&>*:not(:last-child)]:border-r-0"
              : "[&>*:not(:first-child)]:rounded-t-none [&>*:not(:last-child)]:rounded-b-none [&>*:not(:last-child)]:border-b-0",
          ],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
CardGroup.displayName = "CardGroup";

// ============================================================================
// FEATURED CARD LAYOUT - Hero card with supporting cards
// ============================================================================

export interface FeaturedLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The featured/hero card */
  featured: React.ReactNode;
  /** Supporting cards */
  children: React.ReactNode;
  /** Featured card position */
  featuredPosition?: "left" | "right" | "top";
  /** Gap size */
  gap?: "sm" | "md" | "lg" | "xl";
}

export const FeaturedLayout = React.forwardRef<HTMLDivElement, FeaturedLayoutProps>(
  ({
    className,
    featured,
    children,
    featuredPosition = "left",
    gap = "lg",
    ...props
  }, ref) => {
    const isTop = featuredPosition === "top";

    return (
      <div
        ref={ref}
        className={cn(
          "grid",
          isTop
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-1 lg:grid-cols-[1.5fr_1fr]",
          gapClasses[gap],
          className
        )}
        {...props}
      >
        {/* Featured card */}
        <div
          className={cn(
            isTop && "md:col-span-2 lg:col-span-3",
            featuredPosition === "right" && "lg:order-2"
          )}
        >
          {featured}
        </div>

        {/* Supporting cards */}
        <div
          className={cn(
            "grid gap-4",
            isTop ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
          )}
        >
          {children}
        </div>
      </div>
    );
  }
);
FeaturedLayout.displayName = "FeaturedLayout";

// ============================================================================
// COMPARISON CARDS - Side-by-side comparison layout
// ============================================================================

export interface ComparisonLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of cards to compare */
  columns?: 2 | 3 | 4;
  /** Highlight specific column (1-indexed) */
  highlightColumn?: number;
  /** Gap size */
  gap?: "sm" | "md" | "lg";
}

export const ComparisonLayout = React.forwardRef<HTMLDivElement, ComparisonLayoutProps>(
  ({
    className,
    columns = 3,
    highlightColumn,
    gap = "md",
    children,
    ...props
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "grid items-stretch",
          columns === 2 && "grid-cols-1 md:grid-cols-2",
          columns === 3 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
          columns === 4 && "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
          gapClasses[gap],
          className
        )}
        {...props}
      >
        {React.Children.map(children, (child, index) => (
          <div
            className={cn(
              "relative",
              highlightColumn === index + 1 && "z-10 scale-[1.02] lg:scale-105"
            )}
          >
            {child}
          </div>
        ))}
      </div>
    );
  }
);
ComparisonLayout.displayName = "ComparisonLayout";
