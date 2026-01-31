// Icons (Font Awesome)
export * from "./icons";

// Layout Components
export { Container, type ContainerProps } from "./components/container";
export { Stack, type StackProps } from "./components/stack";
export { Divider, type DividerProps } from "./components/divider";

// Form Components
export { Button, buttonVariants, type ButtonProps } from "./components/button";
export { Input, type InputProps } from "./components/input";
export { Textarea, type TextareaProps } from "./components/textarea";
export { Label, labelVariants, type LabelProps } from "./components/label";
export {
  Form,
  FormField,
  FormRow,
  FormSection,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  type FormProps,
  type FormFieldProps,
  type FormRowProps,
  type FormSectionProps,
  type FormLabelProps,
  type FormControlProps,
  type FormDescriptionProps,
  type FormMessageProps,
} from "./components/form";
export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
} from "./components/select";
export {
  Checkbox,
  CheckboxCard,
  type CheckboxProps,
  type CheckboxCardProps,
} from "./components/checkbox";
export {
  RadioGroup,
  RadioGroupItem,
  RadioGroupCardItem,
  type RadioGroupProps,
  type RadioGroupItemProps,
  type RadioGroupCardItemProps,
} from "./components/radio-group";
export { Switch, switchVariants, type SwitchProps } from "./components/switch";
export { Slider, type SliderProps } from "./components/slider";

// Data Display Components
export {
  // Base Card Components
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardMedia,
  cardVariants,
  type CardProps,
  type CardHeaderProps,
  type CardTitleProps,
  type CardDescriptionProps,
  type CardContentProps,
  type CardFooterProps,
  type CardMediaProps,
  // Specialized Card Types
  InteractiveCard,
  StatCard,
  ProfileCard,
  PricingCard,
  FeatureCard,
  TestimonialCard,
  MediaCard,
  ArticleCard,
  NotificationCard,
  ProductCard,
  type InteractiveCardProps,
  type StatCardProps,
  type ProfileCardProps,
  type PricingCardProps,
  type FeatureCardProps,
  type TestimonialCardProps,
  type MediaCardProps,
  type ArticleCardProps,
  type NotificationCardProps,
  type ProductCardProps,
  // Motion-Enhanced Cards
  TiltCard,
  SpotlightCard,
  FlipCard,
  StackCard,
  RevealCard,
  MagneticCard,
  GlowCard,
  type TiltCardProps,
  type SpotlightCardProps,
  type FlipCardProps,
  type StackCardProps,
  type RevealCardProps,
  type MagneticCardProps,
  type GlowCardProps,
  // Card Layouts
  CardGrid,
  StaggeredCardGrid,
  BentoGrid,
  BentoItem,
  CardCarousel,
  CardStack,
  CardGroup,
  FeaturedLayout,
  ComparisonLayout,
  type CardGridProps,
  type StaggeredCardGridProps,
  type BentoGridProps,
  type BentoItemProps,
  type CardCarouselProps,
  type CardStackProps,
  type CardGroupProps,
  type FeaturedLayoutProps,
  type ComparisonLayoutProps,
} from "./components/card";
export { Badge, badgeVariants, type BadgeProps } from "./components/badge";
export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarStatus,
  AvatarWithStatus,
  avatarVariants,
  statusVariants,
  type AvatarProps,
  type AvatarImageProps,
  type AvatarFallbackProps,
  type AvatarStatusProps,
  type AvatarWithStatusProps,
} from "./components/avatar";
export {
  AvatarGroup,
  avatarGroupVariants,
  type AvatarGroupProps,
} from "./components/avatar-group";
export {
  StatusDot,
  statusDotVariants,
  type StatusDotProps,
} from "./components/status-dot";
export {
  Skeleton,
  SkeletonText,
  SkeletonCard,
  skeletonVariants,
  type SkeletonProps,
  type SkeletonTextProps,
  type SkeletonCardProps,
} from "./components/skeleton";
export { Progress, progressVariants, type ProgressProps } from "./components/progress";

// Feedback Components
export { Toaster, toast, type ToasterProps } from "./components/toast";
export {
  Alert,
  AlertTitle,
  AlertDescription,
  AlertIcon,
  alertVariants,
  type AlertProps,
  type AlertTitleProps,
  type AlertDescriptionProps,
  type AlertIconProps,
} from "./components/alert";
export {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogClose,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "./components/dialog";
export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  sheetVariants,
  type SheetContentProps,
} from "./components/sheet";

// Navigation Components
export {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  tabsListVariants,
  tabsTriggerVariants,
  type TabsListProps,
  type TabsTriggerProps,
} from "./components/tabs";
export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "./components/breadcrumb";
export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationNextIcon,
  PaginationPreviousIcon,
  paginationLinkVariants,
} from "./components/pagination";

// Overlay Components
export {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  TooltipArrow,
} from "./components/tooltip";
export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
} from "./components/dropdown-menu";

// Command Palette
export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
  type CommandDialogProps,
} from "./components/command";

// Animations
export {
  // Animation context and hooks
  AnimationProvider,
  useAnimation,
  useShouldAnimate,
  useReducedMotion,
  // Presets and configuration
  presets,
  timing,
  easing,
  transitions,
  springConfig,
  staggerPresets,
  staggerContainerVariants,
  staggerItemVariants,
  pageVariants,
  // Components
  Fade,
  Slide,
  StaggerContainer,
  StaggerItem,
  StaggerList,
  PageTransition,
  LayoutTransition,
  // Re-exports from framer-motion
  AnimatePresence,
  motion,
  // Types
  type AnimationProviderProps,
  type AnimationContextValue,
  type FadeProps,
  type SlideProps,
  type StaggerContainerProps,
  type StaggerItemProps,
  type StaggerListProps,
  type PageTransitionProps,
  type LayoutTransitionProps,
  type Variants,
  type Transition,
  type HTMLMotionProps,
} from "./animations";

// Hooks
export {
  useMediaQuery,
  useIsMobile,
  useIsTablet,
  useIsDesktop,
  usePrefersDarkMode,
  usePrefersReducedMotion,
  useDebounce,
  useDebouncedCallback,
  useLocalStorage,
  useRemoveLocalStorage,
} from "./hooks";
