"use client";

import * as React from "react";

// ============================================================================
// useReducedMotion Hook
// ============================================================================

/**
 * Hook to detect user's prefers-reduced-motion setting
 * Returns true if the user prefers reduced motion
 */
export function useReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = React.useState(false);

  React.useEffect(() => {
    // Check if window is available (SSR safety)
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Set initial value
    setPrefersReduced(mediaQuery.matches);

    // Listen for changes
    const handler = (event: MediaQueryListEvent) => {
      setPrefersReduced(event.matches);
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return prefersReduced;
}

// ============================================================================
// Animation Context
// ============================================================================

export interface AnimationContextValue {
  /** Whether animations are enabled globally */
  enabled: boolean;
  /** Whether user prefers reduced motion (from OS/browser settings) */
  prefersReducedMotion: boolean;
  /** Computed value: should animations run? (enabled && !prefersReducedMotion) */
  shouldAnimate: boolean;
  /** Override the enabled state */
  setEnabled: (enabled: boolean) => void;
}

const AnimationContext = React.createContext<AnimationContextValue | null>(null);

export interface AnimationProviderProps {
  children: React.ReactNode;
  /** Initial enabled state (default: true) */
  enabled?: boolean;
  /**
   * Whether to respect prefers-reduced-motion (default: true)
   * Set to false to ignore OS settings (not recommended for accessibility)
   */
  respectReducedMotion?: boolean;
}

/**
 * Provider to control animations globally across the app
 *
 * @example
 * ```tsx
 * // In your app layout
 * <AnimationProvider>
 *   <App />
 * </AnimationProvider>
 *
 * // Disable all animations
 * <AnimationProvider enabled={false}>
 *   <App />
 * </AnimationProvider>
 * ```
 */
export function AnimationProvider({
  children,
  enabled: initialEnabled = true,
  respectReducedMotion = true,
}: AnimationProviderProps) {
  const [enabled, setEnabled] = React.useState(initialEnabled);
  const prefersReducedMotion = useReducedMotion();

  const shouldAnimate = React.useMemo(() => {
    if (!enabled) return false;
    if (respectReducedMotion && prefersReducedMotion) return false;
    return true;
  }, [enabled, respectReducedMotion, prefersReducedMotion]);

  const value = React.useMemo<AnimationContextValue>(
    () => ({
      enabled,
      prefersReducedMotion,
      shouldAnimate,
      setEnabled,
    }),
    [enabled, prefersReducedMotion, shouldAnimate]
  );

  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
}

/**
 * Hook to access animation context
 * Returns default values if used outside of AnimationProvider
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { shouldAnimate } = useAnimation();
 *
 *   if (!shouldAnimate) {
 *     return <div>{children}</div>; // No animation wrapper
 *   }
 *
 *   return <Fade>{children}</Fade>;
 * }
 * ```
 */
export function useAnimation(): AnimationContextValue {
  const context = React.useContext(AnimationContext);
  const prefersReducedMotion = useReducedMotion();

  // If no provider, return sensible defaults
  if (!context) {
    return {
      enabled: true,
      prefersReducedMotion,
      shouldAnimate: !prefersReducedMotion,
      setEnabled: () => {
        console.warn(
          "useAnimation: setEnabled called outside of AnimationProvider. " +
          "Wrap your app in <AnimationProvider> to control animations."
        );
      },
    };
  }

  return context;
}

/**
 * Simple hook that just returns whether animations should run
 * Useful for components that just need a boolean check
 */
export function useShouldAnimate(): boolean {
  const { shouldAnimate } = useAnimation();
  return shouldAnimate;
}
