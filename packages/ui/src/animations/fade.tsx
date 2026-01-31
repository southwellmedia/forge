"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import * as React from "react";
import { presets } from "./presets";
import { useShouldAnimate } from "./context";

export interface FadeProps extends Omit<HTMLMotionProps<"div">, "animate"> {
  /** Direction for the fade animation */
  direction?: "up" | "down" | "left" | "right" | "none";
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
  up: presets.fadeInUp,
  down: presets.fadeInDown,
  left: presets.fadeInLeft,
  right: presets.fadeInRight,
  none: presets.fadeIn,
} as const;

export const Fade = React.forwardRef<HTMLDivElement, FadeProps>(
  ({ direction = "none", duration, delay, animate: animateProp, children, ...props }, ref) => {
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
Fade.displayName = "Fade";
