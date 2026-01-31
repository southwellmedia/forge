"use client";

import { AnimatePresence, motion, type HTMLMotionProps } from "framer-motion";
import * as React from "react";
import { pageVariants } from "./presets";
import { useShouldAnimate } from "./context";

export interface PageTransitionProps extends Omit<HTMLMotionProps<"div">, "animate"> {
  /** Unique key for the page (usually pathname) */
  pageKey: string;
  /** Mode for AnimatePresence */
  mode?: "sync" | "wait" | "popLayout";
  /**
   * Override the global animation setting for this component
   * true = always animate, false = never animate, undefined = use context
   */
  animate?: boolean;
  /** Content to render */
  children?: React.ReactNode;
}

export const PageTransition = React.forwardRef<HTMLDivElement, PageTransitionProps>(
  ({ pageKey, mode = "wait", animate: animateProp, children, ...props }, ref) => {
    const shouldAnimate = useShouldAnimate();

    // Allow per-component override
    const isAnimated = animateProp ?? shouldAnimate;

    // If animations are disabled, render children directly
    if (!isAnimated) {
      return (
        <div ref={ref} key={pageKey} {...(props as React.HTMLAttributes<HTMLDivElement>)}>
          {children}
        </div>
      );
    }

    return (
      <AnimatePresence mode={mode}>
        <motion.div
          key={pageKey}
          ref={ref}
          initial="initial"
          animate="enter"
          exit="exit"
          variants={pageVariants}
          {...props}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    );
  }
);
PageTransition.displayName = "PageTransition";

// Simple layout animation wrapper
export interface LayoutTransitionProps extends Omit<HTMLMotionProps<"div">, "animate"> {
  /** Layout ID for shared element transitions */
  layoutId?: string;
  /**
   * Override the global animation setting for this component
   * true = always animate, false = never animate, undefined = use context
   */
  animate?: boolean;
  /** Content to render */
  children?: React.ReactNode;
}

export const LayoutTransition = React.forwardRef<HTMLDivElement, LayoutTransitionProps>(
  ({ layoutId, animate: animateProp, children, ...props }, ref) => {
    const shouldAnimate = useShouldAnimate();

    // Allow per-component override
    const isAnimated = animateProp ?? shouldAnimate;

    // If animations are disabled, render children directly
    if (!isAnimated) {
      return (
        <div ref={ref} {...(props as React.HTMLAttributes<HTMLDivElement>)}>
          {children}
        </div>
      );
    }

    return (
      <motion.div
        ref={ref}
        layoutId={layoutId}
        layout
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
LayoutTransition.displayName = "LayoutTransition";
