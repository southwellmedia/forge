import type { Transition, Variants } from "framer-motion";

// Common timing presets
export const timing = {
  fast: 0.15,
  normal: 0.2,
  slow: 0.3,
  slower: 0.5,
} as const;

// Common easing presets
export const easing = {
  smooth: [0.4, 0, 0.2, 1],
  spring: [0.34, 1.56, 0.64, 1],
  outExpo: [0.19, 1, 0.22, 1],
  inOutCubic: [0.65, 0, 0.35, 1],
} as const;

// Default spring configuration
export const springConfig = {
  type: "spring",
  stiffness: 400,
  damping: 30,
} as const;

// Transition presets
export const transitions: Record<string, Transition> = {
  fast: { duration: timing.fast, ease: easing.smooth },
  normal: { duration: timing.normal, ease: easing.smooth },
  slow: { duration: timing.slow, ease: easing.smooth },
  spring: springConfig,
};

// Animation presets
export const presets = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: transitions.normal,
  },
  fadeInUp: {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
    transition: { duration: timing.slow, ease: easing.smooth },
  },
  fadeInDown: {
    initial: { opacity: 0, y: -16 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 8 },
    transition: { duration: timing.slow, ease: easing.smooth },
  },
  fadeInLeft: {
    initial: { opacity: 0, x: -16 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 16 },
    transition: { duration: timing.slow, ease: easing.smooth },
  },
  fadeInRight: {
    initial: { opacity: 0, x: 16 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -16 },
    transition: { duration: timing.slow, ease: easing.smooth },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: transitions.normal,
  },
  scaleInBounce: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
    transition: { ...springConfig, stiffness: 300 },
  },
  slideInFromTop: {
    initial: { y: "-100%" },
    animate: { y: 0 },
    exit: { y: "-100%" },
    transition: { duration: timing.slow, ease: easing.outExpo },
  },
  slideInFromBottom: {
    initial: { y: "100%" },
    animate: { y: 0 },
    exit: { y: "100%" },
    transition: { duration: timing.slow, ease: easing.outExpo },
  },
  slideInFromLeft: {
    initial: { x: "-100%" },
    animate: { x: 0 },
    exit: { x: "-100%" },
    transition: { duration: timing.slow, ease: easing.outExpo },
  },
  slideInFromRight: {
    initial: { x: "100%" },
    animate: { x: 0 },
    exit: { x: "100%" },
    transition: { duration: timing.slow, ease: easing.outExpo },
  },
} as const;

// Stagger configuration
export const staggerPresets = {
  fast: {
    staggerChildren: 0.05,
    delayChildren: 0,
  },
  normal: {
    staggerChildren: 0.08,
    delayChildren: 0.1,
  },
  slow: {
    staggerChildren: 0.12,
    delayChildren: 0.2,
  },
} as const;

// Stagger container variants
export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: staggerPresets.normal,
  },
};

// Stagger item variants (for children)
export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.normal,
  },
};

// Page transition variants
export const pageVariants: Variants = {
  initial: { opacity: 0, y: 8 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: timing.slow, ease: easing.smooth },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: timing.normal, ease: easing.smooth },
  },
};
