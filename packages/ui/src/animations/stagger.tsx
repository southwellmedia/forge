"use client";

import { motion, type HTMLMotionProps, type Variants } from "framer-motion";
import * as React from "react";
import { staggerPresets, staggerItemVariants, timing, easing } from "./presets";
import { useShouldAnimate } from "./context";

export interface StaggerContainerProps extends Omit<HTMLMotionProps<"div">, "animate"> {
  /** Speed of stagger between children */
  speed?: "fast" | "normal" | "slow";
  /** Delay before starting the stagger */
  delayChildren?: number;
  /**
   * Override the global animation setting for this component
   * true = always animate, false = never animate, undefined = use context
   */
  animate?: boolean;
  /** Content to render */
  children?: React.ReactNode;
}

export const StaggerContainer = React.forwardRef<HTMLDivElement, StaggerContainerProps>(
  ({ speed = "normal", delayChildren, animate: animateProp, children, ...props }, ref) => {
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

    const stagger = staggerPresets[speed];

    const containerVariants: Variants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: stagger.staggerChildren,
          delayChildren: delayChildren ?? stagger.delayChildren,
        },
      },
    };

    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={containerVariants}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
StaggerContainer.displayName = "StaggerContainer";

export interface StaggerItemProps extends Omit<HTMLMotionProps<"div">, "animate"> {
  /** Custom animation variants */
  variants?: Variants;
  /**
   * Override the global animation setting for this component
   * true = always animate, false = never animate, undefined = use context
   */
  animate?: boolean;
  /** Content to render */
  children?: React.ReactNode;
}

export const StaggerItem = React.forwardRef<HTMLDivElement, StaggerItemProps>(
  ({ variants = staggerItemVariants, animate: animateProp, children, ...props }, ref) => {
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
        variants={variants}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
StaggerItem.displayName = "StaggerItem";

// List-specific stagger with scale effect
const listItemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: timing.normal, ease: easing.smooth },
  },
};

export interface StaggerListProps extends StaggerContainerProps {
  /** Custom item variants */
  itemVariants?: Variants;
}

export const StaggerList = React.forwardRef<HTMLDivElement, StaggerListProps>(
  ({ speed = "normal", itemVariants = listItemVariants, animate: animateProp, children, ...props }, ref) => {
    const shouldAnimate = useShouldAnimate();

    // Allow per-component override
    const isAnimated = animateProp ?? shouldAnimate;

    // If animations are disabled, render children directly without stagger wrapper
    if (!isAnimated) {
      return (
        <div ref={ref} {...(props as React.HTMLAttributes<HTMLDivElement>)}>
          {children}
        </div>
      );
    }

    return (
      <StaggerContainer ref={ref} speed={speed} animate={true} {...props}>
        {React.Children.map(children as React.ReactNode, (child, index) => (
          <StaggerItem key={index} variants={itemVariants} animate={true}>
            {child}
          </StaggerItem>
        ))}
      </StaggerContainer>
    );
  }
);
StaggerList.displayName = "StaggerList";
