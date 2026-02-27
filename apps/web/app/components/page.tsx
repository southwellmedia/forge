"use client";

import { useState } from "react";
import {
  // Layout
  Container,
  Divider,
  // Form Components
  Button,
  Input,
  Textarea,
  Label,
  Checkbox,
  CheckboxCard,
  RadioGroup,
  RadioGroupItem,
  RadioGroupCardItem,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Switch,
  Slider,
  // Data Display
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardMedia,
  Badge,
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarStatus,
  AvatarGroup,
  StatusDot,
  Skeleton,
  SkeletonText,
  SkeletonCard,
  Progress,
  // Specialized Cards
  StatCard,
  ProfileCard,
  PricingCard,
  FeatureCard,
  TestimonialCard,
  MediaCard,
  ArticleCard,
  NotificationCard,
  ProductCard,
  // Motion Cards
  TiltCard,
  SpotlightCard,
  FlipCard,
  GlowCard,
  // Card Layouts
  CardGrid,
  StaggeredCardGrid,
  BentoGrid,
  BentoItem,
  CardCarousel,
  CardStack,
  FeaturedLayout,
  ComparisonLayout,
  // Feedback
  Alert,
  AlertTitle,
  AlertDescription,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
  toast,
  Toaster,
  // Navigation
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
  // Overlay
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  // Animations
  Fade,
  Slide,
  StaggerList,
  // Icons
  FontAwesomeIcon,
  faEnvelope,
  faLock,
  faSearch,
  faEye,
  faPhone,
  faMapMarkerAlt,
  faLink,
  faCreditCard,
  faGlobe,
  faAt,
  faDollarSign,
} from "@repo/ui";
import { AlertCircle, CheckCircle, Info, AlertTriangle, User, Settings, LogOut, Bell, Heart, CreditCard, Zap, Shield, Users, DollarSign, Activity, Star, ArrowRight, Clock, Package, Sparkles, Rocket, Globe, Code, Palette } from "lucide-react";

function Section({ title, description, children, className }: { title: string; description?: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={`space-y-6 ${className || ""}`}>
      <div>
        <h2 className="text-2xl font-semibold">{title}</h2>
        {description && <p className="text-muted-foreground mt-1">{description}</p>}
      </div>
      {children}
    </section>
  );
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-muted-foreground">{title}</h3>
      {children}
    </div>
  );
}

export default function ComponentsPage() {
  const [sliderValue, setSliderValue] = useState([50]);
  const [progressValue, setProgressValue] = useState(60);
  const [isAnimating, setIsAnimating] = useState(true);
  const [showAlert, setShowAlert] = useState(true);

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background">
        <Toaster />

        {/* Header */}
        <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
          <Container className="py-6">
            <h1 className="text-3xl font-bold">Component Library</h1>
            <p className="text-muted-foreground mt-1">
              Clean, modern design system inspired by Vercel and shadcn
            </p>
          </Container>
        </div>

        <Container className="py-12">
          <div className="space-y-20">

            {/* ============== CARDS ============== */}
            <Section title="Cards" description="Flexible containers with soft shadows and generous rounding">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle>Default Card</CardTitle>
                    <CardDescription>Soft shadow with gentle hover lift</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Cards use diffused shadows for depth and rounded-2xl corners for an organic feel.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm">Learn more</Button>
                  </CardFooter>
                </Card>

                <Card variant="elevated">
                  <CardHeader>
                    <CardTitle>Elevated Card</CardTitle>
                    <CardDescription>More prominent shadow for emphasis</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Use elevated cards for content that needs to stand out from the page.
                    </p>
                  </CardContent>
                </Card>

                <Card variant="outlined">
                  <CardHeader>
                    <CardTitle>Outlined Card</CardTitle>
                    <CardDescription>Subtle border with no shadow</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Outlined cards work well for less prominent content or nested cards.
                    </p>
                  </CardContent>
                </Card>

                <Card variant="glass">
                  <CardHeader>
                    <CardTitle>Glass Card</CardTitle>
                    <CardDescription>Frosted glass effect with blur</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Glass cards add a modern, layered feel perfect for overlays.
                    </p>
                  </CardContent>
                </Card>

                <Card variant="ghost">
                  <CardHeader>
                    <CardTitle>Ghost Card</CardTitle>
                    <CardDescription>Minimal styling, hover reveals</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Ghost cards are subtle until interaction reveals them.
                    </p>
                  </CardContent>
                </Card>

                <Card variant="soft">
                  <CardHeader>
                    <CardTitle>Soft Card</CardTitle>
                    <CardDescription>Muted background with subtle border</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Soft cards blend gently with the background for secondary content.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </Section>

            {/* ============== SPECIALIZED CARDS ============== */}
            <Section title="Specialized Cards" description="Purpose-built card types for common use cases">
              <SubSection title="Stat Cards">
                <CardGrid columns={{ default: 1, sm: 2, lg: 4 }} gap="md">
                  <StatCard
                    label="Total Revenue"
                    value="$45,231"
                    trend={{ value: 12.5, direction: "up" }}
                    icon={<DollarSign className="h-5 w-5" />}
                    accent="success"
                  />
                  <StatCard
                    label="Active Users"
                    value="2,350"
                    trend={{ value: 8.2, direction: "up" }}
                    icon={<Users className="h-5 w-5" />}
                    accent="info"
                  />
                  <StatCard
                    label="Bounce Rate"
                    value="24.5%"
                    trend={{ value: 3.1, direction: "down" }}
                    icon={<Activity className="h-5 w-5" />}
                    accent="warning"
                  />
                  <StatCard
                    label="Avg. Session"
                    value="3m 42s"
                    icon={<Clock className="h-5 w-5" />}
                    accent="default"
                  />
                </CardGrid>
              </SubSection>

              <SubSection title="Profile & Testimonial Cards">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <ProfileCard
                    name="Sarah Johnson"
                    role="Product Designer"
                    bio="Passionate about creating intuitive user experiences that delight and inspire."
                    avatar="https://github.com/shadcn.png"
                    status="online"
                  />
                  <TestimonialCard
                    quote="This design system has transformed how we build products. The attention to detail is remarkable."
                    author="Alex Chen"
                    role="Engineering Lead"
                    avatar="https://github.com/vercel.png"
                    rating={5}
                  />
                  <TestimonialCard
                    quote="Clean, modern, and incredibly well-thought-out. A joy to work with every day."
                    author="Maria Garcia"
                    role="Design Director"
                    rating={5}
                    variant="elevated"
                  />
                </div>
              </SubSection>

              <SubSection title="Pricing Cards">
                <ComparisonLayout columns={3} highlightColumn={2}>
                  <PricingCard
                    name="Starter"
                    price={9}
                    period="month"
                    description="Perfect for side projects and experiments"
                    features={[
                      { text: "Up to 3 projects", included: true },
                      { text: "Basic analytics", included: true },
                      { text: "48-hour support", included: true },
                      { text: "Custom domain", included: false },
                      { text: "Team members", included: false },
                    ]}
                    cta={<Button variant="outline" className="w-full">Get Started</Button>}
                  />
                  <PricingCard
                    name="Pro"
                    price={29}
                    period="month"
                    description="For growing teams and businesses"
                    features={[
                      { text: "Unlimited projects", included: true },
                      { text: "Advanced analytics", included: true },
                      { text: "Priority support", included: true },
                      { text: "Custom domain", included: true },
                      { text: "Up to 10 team members", included: true },
                    ]}
                    cta={<Button className="w-full">Start Free Trial</Button>}
                    featured
                    badge="Popular"
                  />
                  <PricingCard
                    name="Enterprise"
                    price={99}
                    period="month"
                    description="For large organizations"
                    features={[
                      { text: "Everything in Pro", included: true },
                      { text: "Unlimited team members", included: true },
                      { text: "24/7 phone support", included: true },
                      { text: "Custom integrations", included: true },
                      { text: "SLA guarantee", included: true },
                    ]}
                    cta={<Button variant="secondary" className="w-full">Contact Sales</Button>}
                  />
                </ComparisonLayout>
              </SubSection>

              <SubSection title="Feature Cards">
                <CardGrid columns={{ default: 1, sm: 2, lg: 3 }} gap="lg">
                  <FeatureCard
                    icon={<Rocket className="h-6 w-6" />}
                    title="Lightning Fast"
                    description="Built for performance with optimized rendering and minimal bundle size."
                    accent="gradient"
                  />
                  <FeatureCard
                    icon={<Shield className="h-6 w-6" />}
                    title="Secure by Default"
                    description="Enterprise-grade security with encryption and compliance built in."
                    accent="success"
                  />
                  <FeatureCard
                    icon={<Palette className="h-6 w-6" />}
                    title="Beautiful Design"
                    description="Crafted with attention to every detail for a premium experience."
                    accent="info"
                  />
                </CardGrid>
              </SubSection>

              <SubSection title="Media & Article Cards">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <MediaCard
                    src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=400&fit=crop"
                    alt="Abstract gradient artwork"
                    title="Abstract Gradients"
                    subtitle="Exploring the beauty of color transitions in digital art."
                    badge={<Badge>Featured</Badge>}
                    aspectRatio="video"
                  />
                  <ArticleCard
                    title="Building Design Systems"
                    excerpt="Learn how to create scalable, maintainable component libraries that teams love to use."
                    author={{
                      name: "John Doe",
                      avatar: "https://github.com/github.png",
                    }}
                    date="Jan 15, 2025"
                    readTime="5 min read"
                    category="Design"
                  />
                  <ProductCard
                    image="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop"
                    name="Premium Headphones"
                    price={299}
                    salePrice={224}
                    rating={4.8}
                    reviewCount={128}
                    badge="25% Off"
                    badgeColor="error"
                  />
                </div>
              </SubSection>

              <SubSection title="Notification Cards">
                <div className="max-w-lg space-y-4">
                  <NotificationCard
                    icon={<CheckCircle className="h-5 w-5" />}
                    title="Payment successful"
                    message="Your payment of $99.00 has been processed."
                    time="2 minutes ago"
                    type="success"
                  />
                  <NotificationCard
                    icon={<AlertTriangle className="h-5 w-5" />}
                    title="Storage almost full"
                    message="You've used 90% of your storage quota."
                    time="1 hour ago"
                    type="warning"
                    unread
                  />
                  <NotificationCard
                    icon={<Bell className="h-5 w-5" />}
                    title="New comment on your post"
                    message="Sarah replied to your comment on 'Building Design Systems'."
                    time="3 hours ago"
                    unread
                  />
                </div>
              </SubSection>
            </Section>

            {/* ============== MOTION CARDS ============== */}
            <Section title="Motion Cards" description="Interactive cards with delightful motion effects">
              <SubSection title="Tilt & Spotlight Effects">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <TiltCard tiltIntensity={15} scaleOnHover={1.02}>
                    <Card className="h-48">
                      <CardHeader>
                        <CardTitle>Tilt Card</CardTitle>
                        <CardDescription>Hover to see the 3D tilt effect</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          Move your cursor around to see the card follow your movement.
                        </p>
                      </CardContent>
                    </Card>
                  </TiltCard>

                  <SpotlightCard spotlightColor="oklch(0.7 0.15 250 / 0.15)">
                    <Card className="h-48">
                      <CardHeader>
                        <CardTitle>Spotlight Card</CardTitle>
                        <CardDescription>Hover to reveal the spotlight</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          A radial gradient follows your cursor creating a spotlight effect.
                        </p>
                      </CardContent>
                    </Card>
                  </SpotlightCard>

                  <GlowCard glowColors={["oklch(0.55 0.15 145)", "oklch(0.60 0.18 200)", "oklch(0.55 0.15 145)"]} glowIntensity="medium" glowOnHover>
                    <Card className="h-48">
                      <CardHeader>
                        <CardTitle>Glow Card</CardTitle>
                        <CardDescription>Hover to see the glow</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          A soft glow appears around the card on hover.
                        </p>
                      </CardContent>
                    </Card>
                  </GlowCard>
                </div>
              </SubSection>

              <SubSection title="Flip Card">
                <div className="max-w-sm">
                  <FlipCard
                    front={
                      <Card className="h-64 flex flex-col items-center justify-center">
                        <Sparkles className="h-12 w-12 text-primary mb-4" />
                        <CardTitle>Click to Flip</CardTitle>
                        <CardDescription className="text-center px-4 mt-2">
                          Or hover over this card to see the back
                        </CardDescription>
                      </Card>
                    }
                    back={
                      <Card className="h-64 flex flex-col items-center justify-center bg-primary text-primary-foreground">
                        <Star className="h-12 w-12 mb-4" />
                        <CardTitle className="text-primary-foreground">Hello!</CardTitle>
                        <CardDescription className="text-center px-4 mt-2 text-primary-foreground/80">
                          This is the back of the card
                        </CardDescription>
                      </Card>
                    }
                    trigger="hover"
                  />
                </div>
              </SubSection>
            </Section>

            {/* ============== CARD LAYOUTS ============== */}
            <Section title="Card Layouts" description="Sophisticated layout systems for organizing cards">
              <SubSection title="Staggered Animation Grid">
                <StaggeredCardGrid
                  columns={{ default: 1, sm: 2, lg: 4 }}
                  gap="md"
                  staggerDelay={0.1}
                  animateFrom="bottom"
                >
                  {[1, 2, 3, 4].map((i) => (
                    <Card key={i}>
                      <CardHeader>
                        <CardTitle className="text-base">Card {i}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">Animated on mount</p>
                      </CardContent>
                    </Card>
                  ))}
                </StaggeredCardGrid>
              </SubSection>

              <SubSection title="Bento Grid">
                <BentoGrid gap="md">
                  <BentoItem colSpan={2} rowSpan={2}>
                    <div className="h-full p-6 flex flex-col justify-between">
                      <div>
                        <Globe className="h-8 w-8 text-primary mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Global Scale</h3>
                        <p className="text-muted-foreground">
                          Deploy to the edge with automatic scaling across 30+ regions worldwide.
                        </p>
                      </div>
                      <Button variant="outline" className="w-fit mt-4">
                        Learn more <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </BentoItem>
                  <BentoItem>
                    <div className="h-full p-6">
                      <Code className="h-6 w-6 text-primary mb-3" />
                      <h3 className="font-semibold mb-1">Developer First</h3>
                      <p className="text-sm text-muted-foreground">
                        Built by developers, for developers.
                      </p>
                    </div>
                  </BentoItem>
                  <BentoItem>
                    <div className="h-full p-6">
                      <Zap className="h-6 w-6 text-primary mb-3" />
                      <h3 className="font-semibold mb-1">Instant Deploy</h3>
                      <p className="text-sm text-muted-foreground">
                        Go from code to production in seconds.
                      </p>
                    </div>
                  </BentoItem>
                  <BentoItem colSpan={2}>
                    <div className="h-full p-6 flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold mb-1">Ready to get started?</h3>
                        <p className="text-sm text-muted-foreground">
                          Join thousands of developers building the future.
                        </p>
                      </div>
                      <Button>Get Started</Button>
                    </div>
                  </BentoItem>
                  <BentoItem>
                    <div className="h-full p-6">
                      <Shield className="h-6 w-6 text-primary mb-3" />
                      <h3 className="font-semibold mb-1">Secure</h3>
                      <p className="text-sm text-muted-foreground">
                        Enterprise-grade security built in.
                      </p>
                    </div>
                  </BentoItem>
                </BentoGrid>
              </SubSection>

              <SubSection title="Card Stack">
                <div className="max-w-sm mx-auto">
                  <CardStack maxVisible={3} offset={12} scaleReduction={0.05}>
                    <Card className="bg-gradient-to-br from-violet-500 to-purple-600 text-white">
                      <CardHeader>
                        <CardTitle className="text-white">First Card</CardTitle>
                      </CardHeader>
                      <CardContent>Top of the stack</CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white">
                      <CardHeader>
                        <CardTitle className="text-white">Second Card</CardTitle>
                      </CardHeader>
                      <CardContent>Middle of the stack</CardContent>
                    </Card>
                    <Card className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
                      <CardHeader>
                        <CardTitle className="text-white">Third Card</CardTitle>
                      </CardHeader>
                      <CardContent>Bottom of the stack</CardContent>
                    </Card>
                  </CardStack>
                </div>
              </SubSection>

              <SubSection title="Featured Layout">
                <FeaturedLayout
                  featuredPosition="left"
                  gap="lg"
                  featured={
                    <Card className="h-full">
                      <CardMedia aspectRatio="video">
                        <img
                          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=450&fit=crop"
                          alt="Featured"
                          className="w-full h-full object-cover"
                        />
                      </CardMedia>
                      <CardHeader>
                        <Badge className="w-fit mb-2">Featured</Badge>
                        <CardTitle>Hero Article Title</CardTitle>
                        <CardDescription>
                          This is the featured content that takes up more space and draws attention.
                        </CardDescription>
                      </CardHeader>
                      <CardFooter>
                        <Button>Read More</Button>
                      </CardFooter>
                    </Card>
                  }
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Supporting Article 1</CardTitle>
                      <CardDescription>Brief description here</CardDescription>
                    </CardHeader>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Supporting Article 2</CardTitle>
                      <CardDescription>Brief description here</CardDescription>
                    </CardHeader>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Supporting Article 3</CardTitle>
                      <CardDescription>Brief description here</CardDescription>
                    </CardHeader>
                  </Card>
                </FeaturedLayout>
              </SubSection>

              <SubSection title="Card Carousel">
                <CardCarousel gap="lg" snap hideScrollbar edgePadding>
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Card key={i} className="w-72 shrink-0">
                      <CardMedia aspectRatio="video">
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                          <Package className="h-12 w-12 text-primary/50" />
                        </div>
                      </CardMedia>
                      <CardHeader>
                        <CardTitle className="text-base">Carousel Item {i}</CardTitle>
                        <CardDescription>Scroll horizontally to see more</CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
                </CardCarousel>
              </SubSection>
            </Section>

            {/* ============== BADGES ============== */}
            <Section title="Badges" description="Soft pill-shaped status and category indicators">
              <Card>
                <CardContent className="pt-6 space-y-6">
                  <SubSection title="Variants">
                    <div className="flex flex-wrap gap-3">
                      <Badge>Default</Badge>
                      <Badge variant="secondary">Secondary</Badge>
                      <Badge variant="soft">Soft</Badge>
                      <Badge variant="solid">Solid</Badge>
                      <Badge variant="outline">Outline</Badge>
                    </div>
                  </SubSection>

                  <SubSection title="Semantic Colors">
                    <div className="flex flex-wrap gap-3">
                      <Badge variant="success">Success</Badge>
                      <Badge variant="warning">Warning</Badge>
                      <Badge variant="error">Error</Badge>
                      <Badge variant="info">Info</Badge>
                    </div>
                  </SubSection>

                  <SubSection title="Dot Variant">
                    <div className="flex flex-wrap gap-3">
                      <Badge variant="dot" dotColor="success">Online</Badge>
                      <Badge variant="dot" dotColor="warning">Away</Badge>
                      <Badge variant="dot" dotColor="error">Busy</Badge>
                      <Badge variant="dot" dotColor="muted">Offline</Badge>
                    </div>
                  </SubSection>

                  <SubSection title="Sizes">
                    <div className="flex flex-wrap items-center gap-3">
                      <Badge size="xs">Extra Small</Badge>
                      <Badge size="sm">Small</Badge>
                      <Badge size="default">Default</Badge>
                      <Badge size="lg">Large</Badge>
                    </div>
                  </SubSection>
                </CardContent>
              </Card>
            </Section>

            {/* ============== ALERTS ============== */}
            <Section title="Alerts" description="Contextual feedback with soft backgrounds and friendly colors">
              <div className="space-y-4">
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Default Alert</AlertTitle>
                  <AlertDescription>
                    A neutral message for general information or announcements.
                  </AlertDescription>
                </Alert>

                <Alert variant="info">
                  <Info className="h-4 w-4" />
                  <AlertTitle>Information</AlertTitle>
                  <AlertDescription>
                    Here's some helpful information you might want to know about.
                  </AlertDescription>
                </Alert>

                <Alert variant="success">
                  <CheckCircle className="h-4 w-4" />
                  <AlertTitle>Success!</AlertTitle>
                  <AlertDescription>
                    Your changes have been saved successfully.
                  </AlertDescription>
                </Alert>

                <Alert variant="warning">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Warning</AlertTitle>
                  <AlertDescription>
                    Please review your settings before continuing.
                  </AlertDescription>
                </Alert>

                <Alert variant="error">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>
                    Something went wrong. Please try again.
                  </AlertDescription>
                </Alert>

                {showAlert && (
                  <Alert variant="info" dismissible onDismiss={() => setShowAlert(false)}>
                    <Info className="h-4 w-4" />
                    <AlertTitle>Dismissible Alert</AlertTitle>
                    <AlertDescription>
                      Click the X to dismiss this alert.
                    </AlertDescription>
                  </Alert>
                )}
                {!showAlert && (
                  <Button variant="outline" size="sm" onClick={() => setShowAlert(true)}>
                    Show dismissible alert
                  </Button>
                )}
              </div>
            </Section>

            {/* ============== TABS ============== */}
            <Section title="Tabs" description="Multiple tab styles with smooth transitions">
              <div className="grid gap-8 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Underline Tabs (Default)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="account">
                      <TabsList variant="underline">
                        <TabsTrigger value="account" variant="underline">Account</TabsTrigger>
                        <TabsTrigger value="password" variant="underline">Password</TabsTrigger>
                        <TabsTrigger value="settings" variant="underline">Settings</TabsTrigger>
                      </TabsList>
                      <TabsContent value="account">
                        <p className="text-sm text-muted-foreground">Manage your account settings.</p>
                      </TabsContent>
                      <TabsContent value="password">
                        <p className="text-sm text-muted-foreground">Change your password.</p>
                      </TabsContent>
                      <TabsContent value="settings">
                        <p className="text-sm text-muted-foreground">Configure app settings.</p>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Pills Tabs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="overview">
                      <TabsList variant="pills">
                        <TabsTrigger value="overview" variant="pills">Overview</TabsTrigger>
                        <TabsTrigger value="analytics" variant="pills">Analytics</TabsTrigger>
                        <TabsTrigger value="reports" variant="pills">Reports</TabsTrigger>
                      </TabsList>
                      <TabsContent value="overview">
                        <p className="text-sm text-muted-foreground">Dashboard overview content.</p>
                      </TabsContent>
                      <TabsContent value="analytics">
                        <p className="text-sm text-muted-foreground">Analytics and metrics.</p>
                      </TabsContent>
                      <TabsContent value="reports">
                        <p className="text-sm text-muted-foreground">Generated reports.</p>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
            </Section>

            {/* ============== PROGRESS ============== */}
            <Section title="Progress" description="Visual progress indicators with gradient and glow options">
              <Card>
                <CardContent className="pt-6 space-y-6">
                  <SubSection title="Color Variants">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Default</span>
                          <span>{progressValue}%</span>
                        </div>
                        <Progress value={progressValue} />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Success</span>
                          <span>75%</span>
                        </div>
                        <Progress value={75} colorVariant="success" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Warning</span>
                          <span>50%</span>
                        </div>
                        <Progress value={50} colorVariant="warning" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Error</span>
                          <span>25%</span>
                        </div>
                        <Progress value={25} colorVariant="error" />
                      </div>
                    </div>
                  </SubSection>

                  <SubSection title="With Glow Effect">
                    <div className="space-y-4">
                      <Progress value={80} glow />
                      <Progress value={60} colorVariant="success" glow />
                    </div>
                  </SubSection>

                  <SubSection title="Sizes">
                    <div className="space-y-4">
                      <Progress value={70} size="xs" />
                      <Progress value={70} size="sm" />
                      <Progress value={70} size="default" />
                      <Progress value={70} size="lg" />
                      <Progress value={70} size="xl" />
                    </div>
                  </SubSection>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => setProgressValue(Math.max(0, progressValue - 10))}>-10</Button>
                    <Button size="sm" variant="outline" onClick={() => setProgressValue(Math.min(100, progressValue + 10))}>+10</Button>
                  </div>
                </CardContent>
              </Card>
            </Section>

            {/* ============== SKELETON ============== */}
            <Section title="Skeleton" description="Loading placeholders with shimmer animation">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Skeleton</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Skeleton variant="avatar" className="h-10 w-10" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                    </div>
                    <Skeleton className="h-20 w-full" />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>SkeletonText</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <SkeletonText lines={4} lastLineWidth="3/4" />
                  </CardContent>
                </Card>

                <SkeletonCard showImage showAvatar />
              </div>
            </Section>

            {/* ============== AVATAR ============== */}
            <Section title="Avatar" description="User profile images with status indicators and groups">
              <Card>
                <CardContent className="pt-6 space-y-6">
                  <SubSection title="Sizes">
                    <div className="flex items-end gap-4">
                      <Avatar size="xs">
                        <AvatarFallback>XS</AvatarFallback>
                      </Avatar>
                      <Avatar size="sm">
                        <AvatarFallback>SM</AvatarFallback>
                      </Avatar>
                      <Avatar size="md">
                        <AvatarFallback>MD</AvatarFallback>
                      </Avatar>
                      <Avatar size="lg">
                        <AvatarFallback>LG</AvatarFallback>
                      </Avatar>
                      <Avatar size="xl">
                        <AvatarFallback>XL</AvatarFallback>
                      </Avatar>
                      <Avatar size="2xl">
                        <AvatarFallback>2XL</AvatarFallback>
                      </Avatar>
                    </div>
                  </SubSection>

                  <SubSection title="With Image">
                    <div className="flex items-center gap-4">
                      <Avatar size="lg">
                        <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <Avatar size="lg">
                        <AvatarImage src="https://github.com/vercel.png" alt="Vercel" />
                        <AvatarFallback>V</AvatarFallback>
                      </Avatar>
                      <Avatar size="lg">
                        <AvatarImage src="https://github.com/github.png" alt="GitHub" />
                        <AvatarFallback>GH</AvatarFallback>
                      </Avatar>
                    </div>
                  </SubSection>

                  <SubSection title="Gradient Fallbacks">
                    <div className="flex items-center gap-4">
                      <Avatar size="lg">
                        <AvatarFallback gradient>JD</AvatarFallback>
                      </Avatar>
                      <Avatar size="lg">
                        <AvatarFallback gradient>AB</AvatarFallback>
                      </Avatar>
                      <Avatar size="lg">
                        <AvatarFallback gradient>CD</AvatarFallback>
                      </Avatar>
                      <Avatar size="lg">
                        <AvatarFallback gradient>EF</AvatarFallback>
                      </Avatar>
                    </div>
                  </SubSection>

                  <SubSection title="With Status Indicator">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <Avatar size="lg">
                          <AvatarFallback gradient>ON</AvatarFallback>
                        </Avatar>
                        <AvatarStatus status="online" size="lg" />
                      </div>
                      <div className="relative">
                        <Avatar size="lg">
                          <AvatarFallback gradient>AW</AvatarFallback>
                        </Avatar>
                        <AvatarStatus status="away" size="lg" />
                      </div>
                      <div className="relative">
                        <Avatar size="lg">
                          <AvatarFallback gradient>BS</AvatarFallback>
                        </Avatar>
                        <AvatarStatus status="busy" size="lg" />
                      </div>
                      <div className="relative">
                        <Avatar size="lg">
                          <AvatarFallback gradient>OF</AvatarFallback>
                        </Avatar>
                        <AvatarStatus status="offline" size="lg" />
                      </div>
                    </div>
                  </SubSection>

                  <SubSection title="Avatar Group">
                    <div className="space-y-4">
                      <AvatarGroup max={4} total={12}>
                        <Avatar>
                          <AvatarFallback gradient>A</AvatarFallback>
                        </Avatar>
                        <Avatar>
                          <AvatarFallback gradient>B</AvatarFallback>
                        </Avatar>
                        <Avatar>
                          <AvatarFallback gradient>C</AvatarFallback>
                        </Avatar>
                        <Avatar>
                          <AvatarFallback gradient>D</AvatarFallback>
                        </Avatar>
                        <Avatar>
                          <AvatarFallback gradient>E</AvatarFallback>
                        </Avatar>
                        <Avatar>
                          <AvatarFallback gradient>F</AvatarFallback>
                        </Avatar>
                      </AvatarGroup>
                    </div>
                  </SubSection>

                  <SubSection title="Avatar Group">
                    <div className="space-y-4">
                      <AvatarGroup max={5} total={8}>
                        <Avatar>
                          <AvatarFallback gradient>A</AvatarFallback>
                        </Avatar>
                        <Avatar>
                          <AvatarFallback gradient>B</AvatarFallback>
                        </Avatar>
                        <Avatar>
                          <AvatarFallback gradient>C</AvatarFallback>
                        </Avatar>
                        <Avatar>
                          <AvatarFallback gradient>D</AvatarFallback>
                        </Avatar>
                        <Avatar>
                          <AvatarFallback gradient>E</AvatarFallback>
                        </Avatar>
                      </AvatarGroup>
                    </div>
                  </SubSection>

                  <SubSection title="Status Dots (Standalone)">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <StatusDot status="online" />
                        <span className="text-sm">Online</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <StatusDot status="away" />
                        <span className="text-sm">Away</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <StatusDot status="busy" />
                        <span className="text-sm">Busy</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <StatusDot status="offline" />
                        <span className="text-sm">Offline</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <StatusDot status="online" pulse />
                        <span className="text-sm">Live</span>
                      </div>
                    </div>
                  </SubSection>
                </CardContent>
              </Card>
            </Section>

            {/* ============== BUTTONS ============== */}
            <Section title="Buttons" description="Action buttons with multiple variants and sizes">
              <Card>
                <CardContent className="pt-6 space-y-6">
                  <SubSection title="Variants">
                    <div className="flex flex-wrap gap-3">
                      <Button>Default</Button>
                      <Button variant="secondary">Secondary</Button>
                      <Button variant="outline">Outline</Button>
                      <Button variant="ghost">Ghost</Button>
                      <Button variant="link">Link</Button>
                      <Button variant="destructive">Destructive</Button>
                    </div>
                  </SubSection>

                  <SubSection title="Sizes">
                    <div className="flex flex-wrap items-center gap-3">
                      <Button size="sm">Small</Button>
                      <Button size="default">Default</Button>
                      <Button size="lg">Large</Button>
                      <Button size="icon">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </SubSection>

                  <SubSection title="States">
                    <div className="flex flex-wrap gap-3">
                      <Button disabled>Disabled</Button>
                      <Button className="pointer-events-none opacity-70">
                        <svg className="mr-2 h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        Loading
                      </Button>
                    </div>
                  </SubSection>
                </CardContent>
              </Card>
            </Section>

            {/* ============== FORM INPUTS ============== */}
            <Section title="Form Inputs" description="Clean, functional input components with Font Awesome icon support">
              <SubSection title="Inputs with Icons">
                <Card>
                  <CardContent className="pt-6">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      <div>
                        <Label htmlFor="icon-search">Search</Label>
                        <Input
                          id="icon-search"
                          placeholder="Search..."
                          startIcon={<FontAwesomeIcon icon={faSearch} className="h-4 w-4" />}
                        />
                      </div>
                      <div>
                        <Label htmlFor="icon-email">Email</Label>
                        <Input
                          id="icon-email"
                          type="email"
                          placeholder="you@example.com"
                          startIcon={<FontAwesomeIcon icon={faEnvelope} className="h-4 w-4" />}
                        />
                      </div>
                      <div>
                        <Label htmlFor="icon-user">Username</Label>
                        <Input
                          id="icon-user"
                          placeholder="johndoe"
                          startIcon={<FontAwesomeIcon icon={faAt} className="h-4 w-4" />}
                        />
                      </div>
                      <div>
                        <Label htmlFor="icon-password">Password</Label>
                        <Input
                          id="icon-password"
                          type="password"
                          placeholder="Enter password"
                          startIcon={<FontAwesomeIcon icon={faLock} className="h-4 w-4" />}
                          endIcon={<FontAwesomeIcon icon={faEye} className="h-4 w-4 cursor-pointer hover:text-foreground transition-colors" />}
                        />
                      </div>
                      <div>
                        <Label htmlFor="icon-phone">Phone</Label>
                        <Input
                          id="icon-phone"
                          type="tel"
                          placeholder="+1 (555) 000-0000"
                          startIcon={<FontAwesomeIcon icon={faPhone} className="h-4 w-4" />}
                        />
                      </div>
                      <div>
                        <Label htmlFor="icon-website">Website</Label>
                        <Input
                          id="icon-website"
                          type="url"
                          placeholder="https://example.com"
                          startIcon={<FontAwesomeIcon icon={faGlobe} className="h-4 w-4" />}
                          endIcon={<FontAwesomeIcon icon={faLink} className="h-4 w-4" />}
                        />
                      </div>
                      <div>
                        <Label htmlFor="icon-card">Credit Card</Label>
                        <Input
                          id="icon-card"
                          placeholder="4242 4242 4242 4242"
                          startIcon={<FontAwesomeIcon icon={faCreditCard} className="h-4 w-4" />}
                        />
                      </div>
                      <div>
                        <Label htmlFor="icon-price">Price</Label>
                        <Input
                          id="icon-price"
                          type="number"
                          placeholder="0.00"
                          startIcon={<FontAwesomeIcon icon={faDollarSign} className="h-4 w-4" />}
                        />
                      </div>
                      <div>
                        <Label htmlFor="icon-location">Location</Label>
                        <Input
                          id="icon-location"
                          placeholder="San Francisco, CA"
                          startIcon={<FontAwesomeIcon icon={faMapMarkerAlt} className="h-4 w-4" />}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </SubSection>

              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Inputs</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="input1">Default Input</Label>
                      <Input id="input1" placeholder="Type something..." />
                    </div>
                    <div>
                      <Label htmlFor="input2">Disabled Input</Label>
                      <Input id="input2" placeholder="Disabled" disabled />
                    </div>
                    <div>
                      <Label htmlFor="textarea1">Textarea</Label>
                      <Textarea id="textarea1" placeholder="Write your message..." />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Select & Toggle</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label>Select</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="option1">Option 1</SelectItem>
                          <SelectItem value="option2">Option 2</SelectItem>
                          <SelectItem value="option3">Option 3</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="switch1" className="mb-0">Enable notifications</Label>
                      <Switch id="switch1" />
                    </div>
                    <div>
                      <Label>Volume: {sliderValue[0]}%</Label>
                      <Slider
                        value={sliderValue}
                        onValueChange={setSliderValue}
                        max={100}
                        step={1}
                        className="mt-2"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Checkboxes</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" />
                      <Label htmlFor="terms" className="mb-0">Accept terms and conditions</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="marketing" defaultChecked />
                      <Label htmlFor="marketing" className="mb-0">Receive marketing emails</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="disabled" disabled />
                      <Label htmlFor="disabled" className="mb-0 text-muted-foreground">Disabled option</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="disabled-checked" disabled defaultChecked />
                      <Label htmlFor="disabled-checked" className="mb-0 text-muted-foreground">Disabled checked</Label>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Radio Group</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup defaultValue="comfortable">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="default" id="r1" />
                        <Label htmlFor="r1" className="mb-0">Default</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="comfortable" id="r2" />
                        <Label htmlFor="r2" className="mb-0">Comfortable</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="compact" id="r3" />
                        <Label htmlFor="r3" className="mb-0">Compact</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="disabled" id="r4" disabled />
                        <Label htmlFor="r4" className="mb-0 text-muted-foreground">Disabled</Label>
                      </div>
                    </RadioGroup>
                  </CardContent>
                </Card>
              </div>

              <SubSection title="Checkbox Cards">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <CheckboxCard id="plan-starter" defaultChecked>
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Zap className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">Starter Plan</div>
                        <div className="text-sm text-muted-foreground">Perfect for small projects</div>
                      </div>
                    </div>
                  </CheckboxCard>
                  <CheckboxCard id="plan-pro">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <CreditCard className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">Pro Plan</div>
                        <div className="text-sm text-muted-foreground">For growing businesses</div>
                      </div>
                    </div>
                  </CheckboxCard>
                  <CheckboxCard id="plan-enterprise" disabled>
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-muted">
                        <Shield className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <div className="font-medium">Enterprise</div>
                        <div className="text-sm text-muted-foreground">Contact sales (disabled)</div>
                      </div>
                    </div>
                  </CheckboxCard>
                </div>
              </SubSection>

              <SubSection title="Radio Card Group">
                <RadioGroup defaultValue="card-1" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  <RadioGroupCardItem value="card-1" id="card-1">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-success/10">
                        <Zap className="h-5 w-5 text-success" />
                      </div>
                      <div>
                        <div className="font-medium">Basic</div>
                        <div className="text-sm text-muted-foreground">$9/month</div>
                      </div>
                    </div>
                  </RadioGroupCardItem>
                  <RadioGroupCardItem value="card-2" id="card-2">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-warning/10">
                        <CreditCard className="h-5 w-5 text-warning" />
                      </div>
                      <div>
                        <div className="font-medium">Standard</div>
                        <div className="text-sm text-muted-foreground">$29/month</div>
                      </div>
                    </div>
                  </RadioGroupCardItem>
                  <RadioGroupCardItem value="card-3" id="card-3">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-info/10">
                        <Shield className="h-5 w-5 text-info" />
                      </div>
                      <div>
                        <div className="font-medium">Premium</div>
                        <div className="text-sm text-muted-foreground">$99/month</div>
                      </div>
                    </div>
                  </RadioGroupCardItem>
                </RadioGroup>
              </SubSection>
            </Section>

            {/* ============== DIVIDER ============== */}
            <Section title="Divider" description="Visual separation with optional labels">
              <Card>
                <CardContent className="pt-6 space-y-6">
                  <div className="text-sm">Content above</div>
                  <Divider />
                  <div className="text-sm">Content below</div>
                  <Divider label="Or continue with" />
                  <div className="text-sm">More content</div>
                </CardContent>
              </Card>
            </Section>

            {/* ============== NAVIGATION ============== */}
            <Section title="Navigation" description="Breadcrumbs and pagination">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Breadcrumb</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Breadcrumb>
                      <BreadcrumbList>
                        <BreadcrumbItem>
                          <BreadcrumbLink href="#">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <BreadcrumbLink href="#">Components</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                        </BreadcrumbItem>
                      </BreadcrumbList>
                    </Breadcrumb>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Pagination</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink href="#">1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink href="#" isActive>2</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink href="#">3</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationNext href="#" />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </CardContent>
                </Card>
              </div>
            </Section>

            {/* ============== OVERLAYS ============== */}
            <Section title="Overlays" description="Tooltips and dropdown menus with soft styling">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Tooltip</CardTitle>
                  </CardHeader>
                  <CardContent className="flex gap-4">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline">Default</Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>This is a tooltip!</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline">With Arrow</Button>
                      </TooltipTrigger>
                      <TooltipContent showArrow>
                        <p>Tooltip with arrow</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="secondary">Dark</Button>
                      </TooltipTrigger>
                      <TooltipContent variant="dark">
                        <p>Dark tooltip variant</p>
                      </TooltipContent>
                    </Tooltip>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Dropdown Menu</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                          Open Menu
                          <svg className="ml-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <User className="mr-2" />
                          Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Settings className="mr-2" />
                          Settings
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Bell className="mr-2" />
                          Notifications
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem destructive>
                          <LogOut className="mr-2" />
                          Log out
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardContent>
                </Card>
              </div>
            </Section>

            {/* ============== FEEDBACK ============== */}
            <Section title="Dialogs & Sheets" description="Modal overlays for important content">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Dialog</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline">Open Dialog</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Are you sure?</DialogTitle>
                          <DialogDescription>
                            This action cannot be undone. This will permanently delete your account.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogClose>
                          <DialogClose asChild>
                            <Button variant="destructive">Delete</Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Toast Notifications</CardTitle>
                    <CardDescription>
                      Premium toast notifications with semantic variants and action support.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <SubSection title="Semantic Variants">
                      <div className="flex flex-wrap gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toast("Event scheduled", { description: "Your meeting has been added to your calendar." })}
                        >
                          Default
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toast.success("Changes saved", { description: "Your profile has been updated successfully." })}
                        >
                          Success
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toast.error("Upload failed", { description: "The file exceeds the maximum size limit." })}
                        >
                          Error
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toast.warning("Storage almost full", { description: "You've used 90% of your storage quota." })}
                        >
                          Warning
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toast.info("New feature available", { description: "Check out the new dashboard analytics." })}
                        >
                          Info
                        </Button>
                      </div>
                    </SubSection>
                    <SubSection title="With Actions">
                      <div className="flex flex-wrap gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toast("File deleted", {
                            description: "document.pdf has been moved to trash.",
                            action: {
                              label: "Undo",
                              onClick: () => toast.success("File restored"),
                            },
                          })}
                        >
                          With Undo
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toast.error("Connection lost", {
                            description: "Unable to reach the server.",
                            action: {
                              label: "Retry",
                              onClick: () => toast.success("Connected!"),
                            },
                          })}
                        >
                          With Retry
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toast.promise(
                            new Promise((resolve) => setTimeout(resolve, 2000)),
                            {
                              loading: "Uploading...",
                              success: "Upload complete!",
                              error: "Upload failed",
                            }
                          )}
                        >
                          Promise
                        </Button>
                      </div>
                    </SubSection>
                  </CardContent>
                </Card>
              </div>
            </Section>

            {/* ============== ANIMATIONS ============== */}
            <Section title="Animations" description="Smooth entrance animations">
              <Card>
                <CardContent className="pt-6 space-y-6">
                  <div className="flex items-center gap-4">
                    <Button variant="outline" onClick={() => setIsAnimating(!isAnimating)}>
                      {isAnimating ? "Hide" : "Show"} Animations
                    </Button>
                  </div>

                  <div className="grid gap-6 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label>Fade</Label>
                      <div className="h-20 flex items-center justify-center border rounded-xl bg-muted/30">
                        {isAnimating && (
                          <Fade>
                            <div className="bg-primary text-primary-foreground px-4 py-2 rounded-lg">Fade In</div>
                          </Fade>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Slide from Bottom</Label>
                      <div className="h-20 flex items-center justify-center border rounded-xl overflow-hidden bg-muted/30">
                        {isAnimating && (
                          <Slide direction="bottom">
                            <div className="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg">Slide Up</div>
                          </Slide>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Slide from Left</Label>
                      <div className="h-20 flex items-center justify-center border rounded-xl overflow-hidden bg-muted/30">
                        {isAnimating && (
                          <Slide direction="left">
                            <div className="bg-accent text-accent-foreground px-4 py-2 rounded-lg">Slide In</div>
                          </Slide>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Stagger List</Label>
                    <div className="border rounded-xl p-4 bg-muted/30">
                      {isAnimating && (
                        <StaggerList className="space-y-2">
                          <div className="bg-card p-3 rounded-lg shadow-sm">First item</div>
                          <div className="bg-card p-3 rounded-lg shadow-sm">Second item</div>
                          <div className="bg-card p-3 rounded-lg shadow-sm">Third item</div>
                          <div className="bg-card p-3 rounded-lg shadow-sm">Fourth item</div>
                        </StaggerList>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Section>

          </div>
        </Container>
      </div>
    </TooltipProvider>
  );
}
