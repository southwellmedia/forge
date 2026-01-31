"use client";

import { cn } from "@repo/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, type HTMLMotionProps } from "framer-motion";
import * as React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardMedia,
} from "./base";

// ============================================================================
// INTERACTIVE CARD - Click/tap enabled with enhanced feedback
// ============================================================================

const interactiveCardVariants = cva(
  [
    "cursor-pointer select-none",
    "active:scale-[0.98] active:shadow-[var(--shadow-soft-sm)]",
  ],
  {
    variants: {
      intent: {
        navigate: "group",
        action: "group",
        select: "group",
      },
    },
    defaultVariants: {
      intent: "navigate",
    },
  }
);

export interface InteractiveCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof interactiveCardVariants> {
  variant?: "default" | "elevated" | "outlined" | "glass" | "ghost" | "soft";
  /** Shows a subtle arrow indicator on hover */
  showArrow?: boolean;
  /** Callback when card is clicked */
  onAction?: () => void;
}

export const InteractiveCard = React.forwardRef<HTMLDivElement, InteractiveCardProps>(
  ({ className, variant = "default", intent, showArrow, onAction, children, ...props }, ref) => {
    return (
      <Card
        ref={ref}
        variant={variant}
        onClick={onAction}
        className={cn(
          interactiveCardVariants({ intent }),
          "transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
          className
        )}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onAction?.();
          }
        }}
        {...props}
      >
        {children}
        {showArrow && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
            <svg
              className="w-5 h-5 text-muted-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        )}
      </Card>
    );
  }
);
InteractiveCard.displayName = "InteractiveCard";

// ============================================================================
// STAT CARD - For displaying metrics and KPIs
// ============================================================================

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The main stat value */
  value: string | number;
  /** Label describing the stat */
  label: string;
  /** Optional trend indicator */
  trend?: {
    value: number;
    direction: "up" | "down" | "neutral";
  };
  /** Optional icon */
  icon?: React.ReactNode;
  /** Color accent */
  accent?: "default" | "success" | "warning" | "error" | "info";
  /** Card variant */
  variant?: "default" | "elevated" | "outlined" | "glass" | "soft";
}

const accentClasses = {
  default: {
    icon: "bg-primary/10 text-primary",
    trend: { up: "text-success", down: "text-error", neutral: "text-muted-foreground" },
  },
  success: {
    icon: "bg-[var(--color-success-50)] text-success",
    trend: { up: "text-success", down: "text-error", neutral: "text-muted-foreground" },
  },
  warning: {
    icon: "bg-[var(--color-warning-50)] text-warning",
    trend: { up: "text-success", down: "text-error", neutral: "text-muted-foreground" },
  },
  error: {
    icon: "bg-[var(--color-error-50)] text-error",
    trend: { up: "text-success", down: "text-error", neutral: "text-muted-foreground" },
  },
  info: {
    icon: "bg-[var(--color-info-50)] text-info",
    trend: { up: "text-success", down: "text-error", neutral: "text-muted-foreground" },
  },
};

export const StatCard = React.forwardRef<HTMLDivElement, StatCardProps>(
  ({ className, value, label, trend, icon, accent = "default", variant = "default", ...props }, ref) => {
    const colors = accentClasses[accent];

    return (
      <Card ref={ref} variant={variant} className={cn("relative overflow-hidden", className)} {...props}>
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">{label}</p>
              <p className="text-3xl font-bold tracking-tight">{value}</p>
              {trend && (
                <div className={cn("flex items-center gap-1 text-sm font-medium", colors.trend[trend.direction])}>
                  {trend.direction === "up" && (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l5-5 5 5M7 7l5 5 5-5" />
                    </svg>
                  )}
                  {trend.direction === "down" && (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 7l-5 5-5-5M17 17l-5-5-5 5" />
                    </svg>
                  )}
                  <span>{trend.value > 0 ? "+" : ""}{trend.value}%</span>
                </div>
              )}
            </div>
            {icon && (
              <div className={cn("p-3 rounded-xl", colors.icon)}>
                {icon}
              </div>
            )}
          </div>
        </CardContent>
        {/* Decorative gradient orb */}
        <div
          className={cn(
            "absolute -right-8 -bottom-8 w-32 h-32 rounded-full opacity-[0.07] blur-2xl",
            accent === "success" && "bg-success",
            accent === "warning" && "bg-warning",
            accent === "error" && "bg-error",
            accent === "info" && "bg-info",
            accent === "default" && "bg-primary"
          )}
        />
      </Card>
    );
  }
);
StatCard.displayName = "StatCard";

// ============================================================================
// PROFILE CARD - For user/team member displays
// ============================================================================

export interface ProfileCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** User's name */
  name: string;
  /** Role or title */
  role?: string;
  /** Avatar image URL */
  avatar?: string;
  /** Avatar fallback (initials) */
  avatarFallback?: string;
  /** Status indicator */
  status?: "online" | "offline" | "busy" | "away";
  /** Social links or action buttons */
  actions?: React.ReactNode;
  /** Bio or description */
  bio?: string;
  /** Layout variant */
  layout?: "vertical" | "horizontal" | "compact";
  /** Card variant */
  variant?: "default" | "elevated" | "outlined" | "glass" | "soft";
}

const statusColors = {
  online: "bg-success",
  offline: "bg-muted-foreground/50",
  busy: "bg-error",
  away: "bg-warning",
};

export const ProfileCard = React.forwardRef<HTMLDivElement, ProfileCardProps>(
  ({
    className,
    name,
    role,
    avatar,
    avatarFallback,
    status,
    actions,
    bio,
    layout = "vertical",
    variant = "default",
    ...props
  }, ref) => {
    const isHorizontal = layout === "horizontal";
    const isCompact = layout === "compact";

    return (
      <Card
        ref={ref}
        variant={variant}
        className={cn(
          isHorizontal && "flex flex-row items-center",
          isCompact && "flex flex-row items-center",
          className
        )}
        {...props}
      >
        <CardContent className={cn(
          "p-6",
          isHorizontal && "flex items-center gap-5 w-full",
          isCompact && "flex items-center gap-4 py-4 w-full"
        )}>
          {/* Avatar */}
          <div className={cn(
            "relative shrink-0",
            !isHorizontal && !isCompact && "mx-auto mb-4"
          )}>
            <div className={cn(
              "rounded-full overflow-hidden bg-muted",
              isCompact ? "w-12 h-12" : "w-20 h-20"
            )}>
              {avatar ? (
                <img src={avatar} alt={name} className="w-full h-full object-cover" />
              ) : (
                <div className={cn(
                  "w-full h-full flex items-center justify-center font-semibold bg-gradient-to-br from-primary/80 to-primary text-primary-foreground",
                  isCompact ? "text-lg" : "text-2xl"
                )}>
                  {avatarFallback || name.charAt(0)}
                </div>
              )}
            </div>
            {status && (
              <span className={cn(
                "absolute bottom-0.5 right-0.5 rounded-full ring-2 ring-card",
                isCompact ? "w-3 h-3" : "w-4 h-4",
                statusColors[status]
              )} />
            )}
          </div>

          {/* Info */}
          <div className={cn(
            "flex-1 min-w-0",
            !isHorizontal && !isCompact && "text-center"
          )}>
            <h3 className={cn(
              "font-semibold truncate",
              isCompact ? "text-base" : "text-lg"
            )}>
              {name}
            </h3>
            {role && (
              <p className="text-sm text-muted-foreground truncate">{role}</p>
            )}
            {bio && !isCompact && (
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{bio}</p>
            )}
          </div>

          {/* Actions */}
          {actions && (
            <div className={cn(
              "shrink-0",
              !isHorizontal && !isCompact && "mt-4 w-full",
              (isHorizontal || isCompact) && "ml-auto"
            )}>
              {actions}
            </div>
          )}
        </CardContent>
      </Card>
    );
  }
);
ProfileCard.displayName = "ProfileCard";

// ============================================================================
// PRICING CARD - For subscription/pricing tiers
// ============================================================================

export interface PricingCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Plan name */
  name: string;
  /** Price amount */
  price: string | number;
  /** Billing period */
  period?: string;
  /** Plan description */
  description?: string;
  /** Feature list */
  features?: Array<{ text: string; included: boolean }>;
  /** CTA button */
  cta?: React.ReactNode;
  /** Whether this is the featured/recommended plan */
  featured?: boolean;
  /** Badge text (e.g., "Popular", "Best Value") */
  badge?: string;
  /** Card variant */
  variant?: "default" | "elevated" | "outlined" | "glass" | "soft";
}

export const PricingCard = React.forwardRef<HTMLDivElement, PricingCardProps>(
  ({
    className,
    name,
    price,
    period = "month",
    description,
    features = [],
    cta,
    featured = false,
    badge,
    variant = "default",
    ...props
  }, ref) => {
    return (
      <Card
        ref={ref}
        variant={featured ? "elevated" : variant}
        className={cn(
          "relative overflow-hidden",
          featured && "ring-2 ring-primary scale-[1.02]",
          className
        )}
        {...props}
      >
        {/* Featured gradient accent */}
        {featured && (
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-primary/80 to-primary" />
        )}

        {/* Badge */}
        {badge && (
          <div className="absolute -right-8 top-6 rotate-45 bg-primary text-primary-foreground text-xs font-medium px-10 py-1">
            {badge}
          </div>
        )}

        <CardHeader className={cn(featured && "pt-8")}>
          <CardTitle className="text-lg">{name}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Price */}
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold tracking-tight">
              {typeof price === "number" ? `$${price}` : price}
            </span>
            <span className="text-muted-foreground">/{period}</span>
          </div>

          {/* Features */}
          {features.length > 0 && (
            <ul className="space-y-3">
              {features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className={cn(
                    "mt-0.5 shrink-0 rounded-full p-0.5",
                    feature.included ? "text-success" : "text-muted-foreground/40"
                  )}>
                    {feature.included ? (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                  </span>
                  <span className={cn(
                    "text-sm",
                    feature.included ? "text-foreground" : "text-muted-foreground line-through"
                  )}>
                    {feature.text}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </CardContent>

        {cta && (
          <CardFooter className="mt-auto">
            {cta}
          </CardFooter>
        )}
      </Card>
    );
  }
);
PricingCard.displayName = "PricingCard";

// ============================================================================
// FEATURE CARD - For highlighting product features
// ============================================================================

export interface FeatureCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Feature title */
  title: string;
  /** Feature description */
  description?: string;
  /** Icon or illustration */
  icon?: React.ReactNode;
  /** Color accent for the icon background */
  accent?: "default" | "success" | "warning" | "error" | "info" | "gradient";
  /** Layout orientation */
  orientation?: "vertical" | "horizontal";
  /** Card variant */
  variant?: "default" | "elevated" | "outlined" | "glass" | "ghost" | "soft";
}

const featureAccentClasses = {
  default: "bg-primary/10 text-primary",
  success: "bg-[var(--color-success-50)] text-success",
  warning: "bg-[var(--color-warning-50)] text-warning",
  error: "bg-[var(--color-error-50)] text-error",
  info: "bg-[var(--color-info-50)] text-info",
  gradient: "bg-gradient-to-br from-primary/20 to-primary/5 text-primary",
};

export const FeatureCard = React.forwardRef<HTMLDivElement, FeatureCardProps>(
  ({
    className,
    title,
    description,
    icon,
    accent = "default",
    orientation = "vertical",
    variant = "default",
    ...props
  }, ref) => {
    const isHorizontal = orientation === "horizontal";

    return (
      <Card
        ref={ref}
        variant={variant}
        className={cn(
          "group",
          isHorizontal && "flex flex-row",
          className
        )}
        {...props}
      >
        <CardContent className={cn(
          "p-6",
          isHorizontal && "flex items-start gap-5"
        )}>
          {icon && (
            <div className={cn(
              "shrink-0 p-3 rounded-xl transition-transform duration-300 group-hover:scale-110",
              featureAccentClasses[accent],
              !isHorizontal && "w-fit mb-4"
            )}>
              {icon}
            </div>
          )}
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">{title}</h3>
            {description && (
              <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }
);
FeatureCard.displayName = "FeatureCard";

// ============================================================================
// TESTIMONIAL CARD - For customer reviews/testimonials
// ============================================================================

export interface TestimonialCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Testimonial quote */
  quote: string;
  /** Author name */
  author: string;
  /** Author role/company */
  role?: string;
  /** Author avatar */
  avatar?: string;
  /** Star rating (1-5) */
  rating?: number;
  /** Card variant */
  variant?: "default" | "elevated" | "outlined" | "glass" | "soft";
}

export const TestimonialCard = React.forwardRef<HTMLDivElement, TestimonialCardProps>(
  ({ className, quote, author, role, avatar, rating, variant = "default", ...props }, ref) => {
    return (
      <Card ref={ref} variant={variant} className={cn("relative", className)} {...props}>
        {/* Quote mark decoration */}
        <div className="absolute top-4 left-6 text-6xl font-serif text-primary/10 leading-none select-none">
          "
        </div>

        <CardContent className="pt-12 pb-6 px-6 space-y-4">
          {/* Rating */}
          {rating && (
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={cn(
                    "w-4 h-4",
                    star <= rating ? "text-warning fill-warning" : "text-muted-foreground/30"
                  )}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          )}

          {/* Quote */}
          <blockquote className="text-foreground leading-relaxed">
            {quote}
          </blockquote>

          {/* Author */}
          <div className="flex items-center gap-3 pt-2">
            {avatar ? (
              <img
                src={avatar}
                alt={author}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/80 to-primary flex items-center justify-center text-primary-foreground font-semibold">
                {author.charAt(0)}
              </div>
            )}
            <div>
              <p className="font-medium text-sm">{author}</p>
              {role && <p className="text-xs text-muted-foreground">{role}</p>}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
);
TestimonialCard.displayName = "TestimonialCard";

// ============================================================================
// MEDIA CARD - Enhanced media display with overlays
// ============================================================================

export interface MediaCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Image or video source */
  src: string;
  /** Alt text for accessibility */
  alt: string;
  /** Title overlay */
  title?: string;
  /** Subtitle or description */
  subtitle?: string;
  /** Aspect ratio */
  aspectRatio?: "video" | "square" | "wide" | "portrait" | "cinema";
  /** Overlay style */
  overlay?: "none" | "gradient" | "blur" | "dark";
  /** Badge in corner */
  badge?: React.ReactNode;
  /** Actions on hover */
  actions?: React.ReactNode;
  /** Card variant */
  variant?: "default" | "elevated" | "outlined" | "glass";
}

const aspectRatioClasses = {
  video: "aspect-video",
  square: "aspect-square",
  wide: "aspect-[2/1]",
  portrait: "aspect-[3/4]",
  cinema: "aspect-[21/9]",
};

const overlayClasses = {
  none: "",
  gradient: "bg-gradient-to-t from-black/70 via-black/20 to-transparent",
  blur: "backdrop-blur-sm bg-black/30",
  dark: "bg-black/50",
};

export const MediaCard = React.forwardRef<HTMLDivElement, MediaCardProps>(
  ({
    className,
    src,
    alt,
    title,
    subtitle,
    aspectRatio = "video",
    overlay = "gradient",
    badge,
    actions,
    variant = "default",
    ...props
  }, ref) => {
    return (
      <Card
        ref={ref}
        variant={variant}
        className={cn("group overflow-hidden p-0", className)}
        {...props}
      >
        <div className={cn("relative w-full", aspectRatioClasses[aspectRatio])}>
          <img
            src={src}
            alt={alt}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Badge */}
          {badge && (
            <div className="absolute top-3 left-3 z-10">
              {badge}
            </div>
          )}

          {/* Overlay & Content */}
          {(title || subtitle || actions) && overlay !== "none" && (
            <div className={cn(
              "absolute inset-0 flex flex-col justify-end p-4 text-white",
              "opacity-100 transition-opacity duration-300",
              overlayClasses[overlay]
            )}>
              <div className="space-y-1">
                {title && <h3 className="font-semibold text-lg drop-shadow-sm">{title}</h3>}
                {subtitle && <p className="text-sm text-white/80 drop-shadow-sm">{subtitle}</p>}
              </div>
              {actions && (
                <div className="mt-3 flex gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  {actions}
                </div>
              )}
            </div>
          )}
        </div>
      </Card>
    );
  }
);
MediaCard.displayName = "MediaCard";

// ============================================================================
// ARTICLE CARD - For blog posts, news articles
// ============================================================================

export interface ArticleCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Article title */
  title: string;
  /** Article excerpt */
  excerpt?: string;
  /** Featured image */
  image?: string;
  /** Author info */
  author?: {
    name: string;
    avatar?: string;
  };
  /** Publication date */
  date?: string;
  /** Reading time */
  readTime?: string;
  /** Category/tag */
  category?: string;
  /** Layout variant */
  layout?: "vertical" | "horizontal" | "featured";
  /** Card variant */
  variant?: "default" | "elevated" | "outlined" | "ghost" | "soft";
}

export const ArticleCard = React.forwardRef<HTMLDivElement, ArticleCardProps>(
  ({
    className,
    title,
    excerpt,
    image,
    author,
    date,
    readTime,
    category,
    layout = "vertical",
    variant = "default",
    ...props
  }, ref) => {
    const isHorizontal = layout === "horizontal";
    const isFeatured = layout === "featured";

    return (
      <Card
        ref={ref}
        variant={variant}
        className={cn(
          "group overflow-hidden",
          isHorizontal && "flex flex-row",
          isFeatured && "md:flex md:flex-row",
          className
        )}
        {...props}
      >
        {/* Image */}
        {image && (
          <div className={cn(
            "overflow-hidden",
            isHorizontal && "w-1/3 shrink-0",
            isFeatured && "md:w-1/2 shrink-0",
            !isHorizontal && !isFeatured && "aspect-[16/10]"
          )}>
            <img
              src={image}
              alt={title}
              className={cn(
                "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105",
                (isHorizontal || isFeatured) && "h-full"
              )}
            />
          </div>
        )}

        {/* Content */}
        <div className={cn(
          "flex flex-col p-5",
          isFeatured && "md:p-8 justify-center"
        )}>
          {/* Meta */}
          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
            {category && (
              <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                {category}
              </span>
            )}
            {date && <span>{date}</span>}
            {readTime && (
              <>
                <span>·</span>
                <span>{readTime}</span>
              </>
            )}
          </div>

          {/* Title & Excerpt */}
          <h3 className={cn(
            "font-semibold group-hover:text-primary transition-colors",
            isFeatured ? "text-2xl mb-3" : "text-lg mb-2"
          )}>
            {title}
          </h3>
          {excerpt && (
            <p className={cn(
              "text-muted-foreground line-clamp-2",
              isFeatured ? "text-base" : "text-sm"
            )}>
              {excerpt}
            </p>
          )}

          {/* Author */}
          {author && (
            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border/50">
              {author.avatar ? (
                <img
                  src={author.avatar}
                  alt={author.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                  {author.name.charAt(0)}
                </div>
              )}
              <span className="text-sm font-medium">{author.name}</span>
            </div>
          )}
        </div>
      </Card>
    );
  }
);
ArticleCard.displayName = "ArticleCard";

// ============================================================================
// NOTIFICATION CARD - For alerts, updates, activity items
// ============================================================================

export interface NotificationCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Notification title */
  title: string;
  /** Notification message */
  message?: string;
  /** Timestamp */
  time?: string;
  /** Icon or avatar */
  icon?: React.ReactNode;
  /** Notification type */
  type?: "default" | "success" | "warning" | "error" | "info";
  /** Whether it's unread */
  unread?: boolean;
  /** Dismiss callback */
  onDismiss?: () => void;
  /** Card variant */
  variant?: "default" | "outlined" | "ghost" | "soft";
}

const notificationTypeClasses = {
  default: { icon: "bg-muted text-muted-foreground", dot: "bg-primary" },
  success: { icon: "bg-[var(--color-success-50)] text-success", dot: "bg-success" },
  warning: { icon: "bg-[var(--color-warning-50)] text-warning", dot: "bg-warning" },
  error: { icon: "bg-[var(--color-error-50)] text-error", dot: "bg-error" },
  info: { icon: "bg-[var(--color-info-50)] text-info", dot: "bg-info" },
};

export const NotificationCard = React.forwardRef<HTMLDivElement, NotificationCardProps>(
  ({
    className,
    title,
    message,
    time,
    icon,
    type = "default",
    unread = false,
    onDismiss,
    variant = "soft",
    ...props
  }, ref) => {
    const colors = notificationTypeClasses[type];

    return (
      <Card
        ref={ref}
        variant={variant}
        className={cn(
          "relative group",
          unread && "border-l-4 border-l-primary",
          className
        )}
        {...props}
      >
        <CardContent className="p-4 flex items-start gap-3">
          {/* Icon */}
          {icon && (
            <div className={cn("shrink-0 p-2 rounded-lg", colors.icon)}>
              {icon}
            </div>
          )}

          {/* Content */}
          <div className="flex-1 min-w-0 space-y-1">
            <div className="flex items-start justify-between gap-2">
              <p className="font-medium text-sm">{title}</p>
              {unread && (
                <span className={cn("shrink-0 w-2 h-2 rounded-full mt-1.5", colors.dot)} />
              )}
            </div>
            {message && (
              <p className="text-sm text-muted-foreground line-clamp-2">{message}</p>
            )}
            {time && (
              <p className="text-xs text-muted-foreground/70">{time}</p>
            )}
          </div>

          {/* Dismiss */}
          {onDismiss && (
            <button
              onClick={onDismiss}
              className="shrink-0 p-1 rounded-md opacity-0 group-hover:opacity-100 hover:bg-muted transition-all"
              aria-label="Dismiss"
            >
              <svg className="w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </CardContent>
      </Card>
    );
  }
);
NotificationCard.displayName = "NotificationCard";

// ============================================================================
// PRODUCT CARD - For e-commerce product displays
// ============================================================================

export interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Product name */
  name: string;
  /** Product price */
  price: number;
  /** Sale price (if on sale) */
  salePrice?: number;
  /** Currency symbol */
  currency?: string;
  /** Product image */
  image: string;
  /** Additional images for hover */
  hoverImage?: string;
  /** Product rating */
  rating?: number;
  /** Number of reviews */
  reviewCount?: number;
  /** Badge (e.g., "New", "Sale", "Sold Out") */
  badge?: string;
  /** Badge color */
  badgeColor?: "default" | "success" | "warning" | "error";
  /** Whether product is out of stock */
  outOfStock?: boolean;
  /** Quick action buttons */
  actions?: React.ReactNode;
  /** Card variant */
  variant?: "default" | "elevated" | "outlined" | "ghost";
}

const badgeColorClasses = {
  default: "bg-primary text-primary-foreground",
  success: "bg-success text-white",
  warning: "bg-warning text-white",
  error: "bg-error text-white",
};

export const ProductCard = React.forwardRef<HTMLDivElement, ProductCardProps>(
  ({
    className,
    name,
    price,
    salePrice,
    currency = "$",
    image,
    hoverImage,
    rating,
    reviewCount,
    badge,
    badgeColor = "default",
    outOfStock = false,
    actions,
    variant = "default",
    ...props
  }, ref) => {
    return (
      <Card
        ref={ref}
        variant={variant}
        className={cn("group overflow-hidden", className)}
        {...props}
      >
        {/* Image */}
        <div className="relative aspect-[4/5] overflow-hidden bg-muted/30">
          <img
            src={image}
            alt={name}
            className={cn(
              "absolute inset-0 w-full h-full object-cover transition-all duration-500",
              hoverImage && "group-hover:opacity-0",
              outOfStock && "opacity-50"
            )}
          />
          {hoverImage && (
            <img
              src={hoverImage}
              alt={name}
              className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
          )}

          {/* Badge */}
          {badge && (
            <span className={cn(
              "absolute top-3 left-3 px-2 py-1 text-xs font-medium rounded-lg",
              badgeColorClasses[badgeColor]
            )}>
              {badge}
            </span>
          )}

          {/* Quick Actions */}
          {actions && (
            <div className="absolute bottom-3 left-3 right-3 flex justify-center gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
              {actions}
            </div>
          )}

          {/* Out of Stock Overlay */}
          {outOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/60">
              <span className="px-4 py-2 bg-foreground text-background text-sm font-medium rounded-lg">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <CardContent className="p-4 space-y-2">
          <h3 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
            {name}
          </h3>

          {/* Rating */}
          {rating !== undefined && (
            <div className="flex items-center gap-1">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={cn(
                      "w-3.5 h-3.5",
                      star <= Math.round(rating) ? "text-warning fill-warning" : "text-muted-foreground/30"
                    )}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              {reviewCount !== undefined && (
                <span className="text-xs text-muted-foreground">({reviewCount})</span>
              )}
            </div>
          )}

          {/* Price */}
          <div className="flex items-center gap-2">
            {salePrice ? (
              <>
                <span className="font-semibold text-error">
                  {currency}{salePrice.toFixed(2)}
                </span>
                <span className="text-sm text-muted-foreground line-through">
                  {currency}{price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="font-semibold">
                {currency}{price.toFixed(2)}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }
);
ProductCard.displayName = "ProductCard";
