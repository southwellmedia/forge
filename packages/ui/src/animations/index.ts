// Animation context and hooks
export {
  AnimationProvider,
  useAnimation,
  useShouldAnimate,
  useReducedMotion,
  type AnimationProviderProps,
  type AnimationContextValue,
} from "./context";

// Animation presets and configuration
export {
  presets,
  timing,
  easing,
  transitions,
  springConfig,
  staggerPresets,
  staggerContainerVariants,
  staggerItemVariants,
  pageVariants,
} from "./presets";

// Animation components
export { Fade, type FadeProps } from "./fade";
export { Slide, type SlideProps } from "./slide";
export {
  StaggerContainer,
  StaggerItem,
  StaggerList,
  type StaggerContainerProps,
  type StaggerItemProps,
  type StaggerListProps,
} from "./stagger";
export {
  PageTransition,
  LayoutTransition,
  type PageTransitionProps,
  type LayoutTransitionProps,
} from "./page-transition";

// Re-export useful framer-motion utilities
export { AnimatePresence, motion } from "framer-motion";
export type { Variants, Transition, HTMLMotionProps } from "framer-motion";
