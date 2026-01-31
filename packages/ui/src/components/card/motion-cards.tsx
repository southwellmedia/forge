"use client";

import { cn } from "@repo/utils";
import { motion, useMotionValue, useSpring, useTransform, type HTMLMotionProps } from "framer-motion";
import * as React from "react";

// ============================================================================
// TILT CARD - 3D tilt effect on hover
// ============================================================================

export interface TiltCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Tilt intensity (degrees) */
  tiltIntensity?: number;
  /** Glow effect on hover */
  glowOnHover?: boolean;
  /** Scale on hover */
  scaleOnHover?: number;
  /** Disable tilt effect */
  disabled?: boolean;
}

export const TiltCard = React.forwardRef<HTMLDivElement, TiltCardProps>(
  ({
    className,
    tiltIntensity = 10,
    glowOnHover = true,
    scaleOnHover = 1.02,
    disabled = false,
    children,
    style,
    ...props
  }, ref) => {
    const cardRef = React.useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = React.useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [tiltIntensity, -tiltIntensity]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-tiltIntensity, tiltIntensity]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (disabled || !cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      x.set((mouseX / width) - 0.5);
      y.set((mouseY / height) - 0.5);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
      setIsHovered(false);
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    return (
      <motion.div
        ref={(node) => {
          (cardRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        className={cn(
          "relative",
          "transition-shadow duration-300",
          glowOnHover && "hover:shadow-[var(--shadow-glow-primary),var(--shadow-soft-lg)]",
          className
        )}
        style={{
          ...style,
          perspective: 1000,
        }}
        animate={{
          scale: isHovered && !disabled ? scaleOnHover : 1,
        }}
        transition={{ duration: 0.2 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        {...(props as HTMLMotionProps<"div">)}
      >
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    );
  }
);
TiltCard.displayName = "TiltCard";

// ============================================================================
// SPOTLIGHT CARD - Follows cursor with a spotlight effect
// ============================================================================

export interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Spotlight color */
  spotlightColor?: string;
  /** Spotlight size */
  spotlightSize?: number;
  /** Card variant styling */
  variant?: "default" | "elevated" | "outlined";
}

export const SpotlightCard = React.forwardRef<HTMLDivElement, SpotlightCardProps>(
  ({
    className,
    spotlightColor = "oklch(0.55 0.15 250 / 0.15)",
    spotlightSize = 300,
    variant = "default",
    children,
    ...props
  }, ref) => {
    const [position, setPosition] = React.useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = React.useState(false);
    const cardRef = React.useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      setPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const variantClasses = {
      default: "shadow-[var(--shadow-soft-sm)]",
      elevated: "shadow-[var(--shadow-soft-md)]",
      outlined: "border border-border/60 shadow-none",
    };

    return (
      <div
        ref={(node) => {
          (cardRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        className={cn(
          "relative overflow-hidden rounded-2xl bg-card text-card-foreground",
          "transition-all duration-300 ease-out",
          variantClasses[variant],
          className
        )}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        {/* Spotlight gradient */}
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(${spotlightSize}px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 70%)`,
          }}
        />

        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    );
  }
);
SpotlightCard.displayName = "SpotlightCard";

// ============================================================================
// FLIP CARD - Flips to reveal back content
// ============================================================================

export interface FlipCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Front content */
  front: React.ReactNode;
  /** Back content */
  back: React.ReactNode;
  /** Flip direction */
  direction?: "horizontal" | "vertical";
  /** Flip trigger */
  trigger?: "hover" | "click";
  /** Whether card is flipped (controlled) */
  flipped?: boolean;
  /** Callback when flip state changes */
  onFlip?: (flipped: boolean) => void;
}

export const FlipCard = React.forwardRef<HTMLDivElement, FlipCardProps>(
  ({
    className,
    front,
    back,
    direction = "horizontal",
    trigger = "hover",
    flipped: controlledFlipped,
    onFlip,
    ...props
  }, ref) => {
    const [internalFlipped, setInternalFlipped] = React.useState(false);
    const isControlled = controlledFlipped !== undefined;
    const isFlipped = isControlled ? controlledFlipped : internalFlipped;

    const handleFlip = () => {
      if (trigger === "click") {
        const newState = !isFlipped;
        if (!isControlled) setInternalFlipped(newState);
        onFlip?.(newState);
      }
    };

    const rotationAxis = direction === "horizontal" ? "rotateY" : "rotateX";

    return (
      <div
        ref={ref}
        className={cn("relative isolate", className)}
        style={{ perspective: 1200 }}
        onClick={trigger === "click" ? handleFlip : undefined}
        onMouseEnter={trigger === "hover" ? () => !isControlled && setInternalFlipped(true) : undefined}
        onMouseLeave={trigger === "hover" ? () => !isControlled && setInternalFlipped(false) : undefined}
        {...props}
      >
        <motion.div
          className="relative w-full"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ [rotationAxis]: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        >
          {/* Front - relative to establish height */}
          <div
            className="relative w-full"
            style={{ backfaceVisibility: "hidden" }}
          >
            {front}
          </div>

          {/* Back - absolute positioned */}
          <div
            className="absolute inset-0 w-full"
            style={{
              backfaceVisibility: "hidden",
              transform: direction === "horizontal" ? "rotateY(180deg)" : "rotateX(180deg)",
            }}
          >
            {back}
          </div>
        </motion.div>
      </div>
    );
  }
);
FlipCard.displayName = "FlipCard";

// ============================================================================
// STACK CARD - Stacked card effect with peek animation
// ============================================================================

export interface StackCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of cards to show in stack */
  stackCount?: number;
  /** Stack offset (px) */
  stackOffset?: number;
  /** Spread cards on hover */
  spreadOnHover?: boolean;
  /** Spread angle (degrees) */
  spreadAngle?: number;
}

export const StackCard = React.forwardRef<HTMLDivElement, StackCardProps>(
  ({
    className,
    stackCount = 3,
    stackOffset = 8,
    spreadOnHover = true,
    spreadAngle = 5,
    children,
    ...props
  }, ref) => {
    const [isHovered, setIsHovered] = React.useState(false);

    return (
      <div
        ref={ref}
        className={cn("relative", className)}
        style={{ paddingBottom: (stackCount - 1) * stackOffset }}
        onMouseEnter={() => spreadOnHover && setIsHovered(true)}
        onMouseLeave={() => spreadOnHover && setIsHovered(false)}
        {...props}
      >
        {/* Background cards */}
        {Array.from({ length: stackCount - 1 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute inset-x-0 top-0 rounded-2xl bg-card border border-border/20"
            style={{
              height: "100%",
              zIndex: stackCount - i - 1,
            }}
            initial={{
              y: (i + 1) * stackOffset,
              scale: 1 - (i + 1) * 0.02,
              opacity: 1 - (i + 1) * 0.15,
            }}
            animate={{
              y: isHovered ? (i + 1) * (stackOffset + 4) : (i + 1) * stackOffset,
              rotate: isHovered ? (i + 1) * (i % 2 === 0 ? spreadAngle : -spreadAngle) : 0,
              scale: 1 - (i + 1) * 0.02,
            }}
            transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
          />
        ))}

        {/* Main card */}
        <motion.div
          className="relative z-10 rounded-2xl bg-card text-card-foreground shadow-[var(--shadow-soft-md)]"
          animate={{
            y: isHovered ? -4 : 0,
          }}
          transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
        >
          {children}
        </motion.div>
      </div>
    );
  }
);
StackCard.displayName = "StackCard";

// ============================================================================
// REVEAL CARD - Content reveals on hover with various effects
// ============================================================================

export interface RevealCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Always visible content */
  preview: React.ReactNode;
  /** Content revealed on hover */
  revealed: React.ReactNode;
  /** Reveal direction/style */
  revealStyle?: "slide-up" | "slide-down" | "fade" | "scale" | "blur";
}

export const RevealCard = React.forwardRef<HTMLDivElement, RevealCardProps>(
  ({
    className,
    preview,
    revealed,
    revealStyle = "slide-up",
    ...props
  }, ref) => {
    const revealVariants = {
      "slide-up": {
        initial: { y: "100%", opacity: 0 },
        animate: { y: 0, opacity: 1 },
      },
      "slide-down": {
        initial: { y: "-100%", opacity: 0 },
        animate: { y: 0, opacity: 1 },
      },
      "fade": {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
      },
      "scale": {
        initial: { scale: 0.8, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
      },
      "blur": {
        initial: { filter: "blur(8px)", opacity: 0 },
        animate: { filter: "blur(0px)", opacity: 1 },
      },
    };

    return (
      <motion.div
        ref={ref}
        className={cn(
          "group relative overflow-hidden rounded-2xl bg-card text-card-foreground",
          "shadow-[var(--shadow-soft-md)]",
          className
        )}
        whileHover="animate"
        initial="initial"
        {...(props as HTMLMotionProps<"div">)}
      >
        {/* Preview content */}
        <div className="relative z-10">
          {preview}
        </div>

        {/* Revealed content */}
        <motion.div
          className="absolute inset-0 z-20 flex items-center justify-center bg-card/95 backdrop-blur-sm"
          variants={revealVariants[revealStyle]}
          transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
        >
          {revealed}
        </motion.div>
      </motion.div>
    );
  }
);
RevealCard.displayName = "RevealCard";

// ============================================================================
// MAGNETIC CARD - Subtle magnetic pull toward cursor
// ============================================================================

export interface MagneticCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Magnetic strength (px movement) */
  strength?: number;
  /** Spring tension */
  springTension?: number;
}

export const MagneticCard = React.forwardRef<HTMLDivElement, MagneticCardProps>(
  ({
    className,
    strength = 20,
    springTension = 150,
    children,
    ...props
  }, ref) => {
    const cardRef = React.useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springX = useSpring(x, { stiffness: springTension, damping: 15 });
    const springY = useSpring(y, { stiffness: springTension, damping: 15 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) / rect.width;
      const deltaY = (e.clientY - centerY) / rect.height;

      x.set(deltaX * strength);
      y.set(deltaY * strength);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    return (
      <motion.div
        ref={(node) => {
          (cardRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        className={cn(
          "rounded-2xl bg-card text-card-foreground",
          "shadow-[var(--shadow-soft-md)]",
          "transition-shadow duration-300 hover:shadow-[var(--shadow-soft-lg)]",
          className
        )}
        style={{
          x: springX,
          y: springY,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...(props as HTMLMotionProps<"div">)}
      >
        {children}
      </motion.div>
    );
  }
);
MagneticCard.displayName = "MagneticCard";

// ============================================================================
// GLOW CARD - Animated gradient border glow
// ============================================================================

export interface GlowCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Glow colors (array of color stops) */
  glowColors?: string[];
  /** Animation duration (seconds) */
  animationDuration?: number;
  /** Glow intensity */
  glowIntensity?: "subtle" | "medium" | "intense";
  /** Only show glow on hover */
  glowOnHover?: boolean;
}

const glowIntensityClasses = {
  subtle: "opacity-40",
  medium: "opacity-60",
  intense: "opacity-80",
};

export const GlowCard = React.forwardRef<HTMLDivElement, GlowCardProps>(
  ({
    className,
    glowColors = ["oklch(0.55 0.15 250)", "oklch(0.60 0.18 25)", "oklch(0.55 0.15 250)"],
    animationDuration = 4,
    glowIntensity = "medium",
    glowOnHover = false,
    children,
    ...props
  }, ref) => {
    const gradientStyle = `linear-gradient(90deg, ${glowColors.join(", ")})`;
    const animationName = "glow-card-shift";

    // Inject keyframes once
    React.useEffect(() => {
      const styleId = "glow-card-keyframes";
      if (!document.getElementById(styleId)) {
        const style = document.createElement("style");
        style.id = styleId;
        style.textContent = `
          @keyframes ${animationName} {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `;
        document.head.appendChild(style);
      }
    }, []);

    return (
      <div
        ref={ref}
        className={cn("relative group rounded-2xl p-px", className)}
        {...props}
      >
        {/* Animated gradient border */}
        <div
          className={cn(
            "absolute inset-0 rounded-2xl blur-sm",
            glowIntensityClasses[glowIntensity],
            glowOnHover && "opacity-0 group-hover:opacity-60",
            "transition-opacity duration-300"
          )}
          style={{
            background: gradientStyle,
            backgroundSize: "200% 100%",
            animation: `${animationName} ${animationDuration}s linear infinite`,
          }}
        />

        {/* Gradient border */}
        <div
          className={cn(
            "absolute inset-0 rounded-2xl",
            glowOnHover ? "opacity-30 group-hover:opacity-100" : "opacity-100",
            "transition-opacity duration-300"
          )}
          style={{
            background: gradientStyle,
            backgroundSize: "200% 100%",
            animation: `${animationName} ${animationDuration}s linear infinite`,
          }}
        />

        {/* Content container */}
        <div className="relative rounded-[15px] bg-card text-card-foreground">
          {children}
        </div>
      </div>
    );
  }
);
GlowCard.displayName = "GlowCard";
