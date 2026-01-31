"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import * as React from "react";
import { presets } from "./presets";
import { useShouldAnimate } from "./context";

export interface SlideProps extends Omit<HTMLMotionProps<"div">, "animate"> {
  /** Direction the slide comes from */
  direction?: "top" | "bottom" | "left" | "right";
  /** Duration override in seconds */
  duration?: number;
  /** Delay before animation starts */
  delay?: number;
  /**
   * Override the global animation setting for this component
   * true = always animate, false = never animate, undefined = use context
   */
  animate?: boolean;
  /** Content to render */
  children?: React.ReactNode;
}

const directionMap = {
  top: presets.slideInFromTop,
  bottom: presets.slideInFromBottom,
  left: presets.slideInFromLeft,
  right: presets.slideInFromRight,
} as const;

export const Slide = React.forwardRef<HTMLDivElement, SlideProps>(
  ({ direction = "bottom", duration, delay, animate: animateProp, children, ...props }, ref) => {
    const shouldAnimate = useShouldAnimate();

    // Allow per-component override
    const isAnimated = animateProp ?? shouldAnimate;

    // If animations are disabled, render children directly
    if (!isAnimated) {
      const { style, className, id, ...rest } = props;
      return (
        <div ref={ref} style={style as React.CSSProperties} className={className} id={id}>
          {children}
        </div>
      );
    }

    const preset = directionMap[direction];

    return (
      <motion.div
        ref={ref}
        initial={preset.initial}
        animate={preset.animate}
        exit={preset.exit}
        transition={{
          ...preset.transition,
          ...(duration !== undefined && { duration }),
          ...(delay !== undefined && { delay }),
        }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
Slide.displayName = "Slide";
