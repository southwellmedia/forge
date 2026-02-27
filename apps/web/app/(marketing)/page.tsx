"use client";

import Link from "next/link";
import {
  Button,
  Badge,
  Container,
  Stack,
  Divider,
  FeatureCard,
  PricingCard,
  GlowCard,
  SpotlightCard,
  StaggerContainer,
  StaggerItem,
  Fade,
  Slide,
  FontAwesomeIcon,
  faBolt,
  faShield,
  faDatabase,
  faPalette,
  faCode,
  faRocket,
  faArrowRight,
  faGlobe,
  faTerminal,
  faServer,
  faCloud,
  faKey,
  faGear,
} from "@repo/ui";
import { APP_NAME, APP_DESCRIPTION } from "@repo/utils";

const features = [
  {
    icon: <FontAwesomeIcon icon={faBolt} className="h-5 w-5" />,
    title: "Next.js 16",
    description:
      "App Router, Server Components, Turbopack. The latest architecture patterns, ready to build on.",
    accent: "info" as const,
  },
  {
    icon: <FontAwesomeIcon icon={faShield} className="h-5 w-5" />,
    title: "Authentication",
    description:
      "Email/password, OAuth providers, email verification, password reset. All wired up with Better Auth.",
    accent: "success" as const,
  },
  {
    icon: <FontAwesomeIcon icon={faDatabase} className="h-5 w-5" />,
    title: "Database",
    description:
      "Drizzle ORM on Neon PostgreSQL. Type-safe schemas, migrations, seeding — zero config needed.",
    accent: "warning" as const,
  },
  {
    icon: <FontAwesomeIcon icon={faPalette} className="h-5 w-5" />,
    title: "Design System",
    description:
      "40+ components with CVA variants, OKLCH color tokens, dark mode, and motion primitives.",
    accent: "error" as const,
  },
  {
    icon: <FontAwesomeIcon icon={faCode} className="h-5 w-5" />,
    title: "Type-Safe API",
    description:
      "End-to-end type safety with tRPC. Validated inputs, protected procedures, zero boilerplate.",
    accent: "info" as const,
  },
  {
    icon: <FontAwesomeIcon icon={faRocket} className="h-5 w-5" />,
    title: "Monorepo",
    description:
      "Turborepo workspaces with shared packages for auth, database, UI, email, and utilities.",
    accent: "default" as const,
  },
];

const architectureItems = [
  {
    icon: <FontAwesomeIcon icon={faGlobe} className="h-4 w-4" />,
    label: "apps/web",
    description: "Next.js 16 application",
  },
  {
    icon: <FontAwesomeIcon icon={faShield} className="h-4 w-4" />,
    label: "@repo/auth",
    description: "Better Auth + sessions",
  },
  {
    icon: <FontAwesomeIcon icon={faDatabase} className="h-4 w-4" />,
    label: "@repo/db",
    description: "Drizzle + Neon PostgreSQL",
  },
  {
    icon: <FontAwesomeIcon icon={faPalette} className="h-4 w-4" />,
    label: "@repo/ui",
    description: "40+ components + animations",
  },
  {
    icon: <FontAwesomeIcon icon={faTerminal} className="h-4 w-4" />,
    label: "@repo/email",
    description: "Resend + React Email",
  },
  {
    icon: <FontAwesomeIcon icon={faGear} className="h-4 w-4" />,
    label: "@repo/utils",
    description: "Constants, env, helpers",
  },
];

const techStack = [
  { label: "Next.js 16", category: "framework" },
  { label: "React 19", category: "framework" },
  { label: "TypeScript", category: "language" },
  { label: "Tailwind CSS 4", category: "styling" },
  { label: "tRPC", category: "api" },
  { label: "Drizzle ORM", category: "database" },
  { label: "Better Auth", category: "auth" },
  { label: "Neon PostgreSQL", category: "database" },
  { label: "Turborepo", category: "tooling" },
  { label: "pnpm", category: "tooling" },
  { label: "React Email", category: "email" },
  { label: "Resend", category: "email" },
];

const pricingFeatures = {
  free: [
    { text: "Full source code", included: true },
    { text: "40+ UI components", included: true },
    { text: "Authentication system", included: true },
    { text: "Database + ORM", included: true },
    { text: "tRPC API layer", included: true },
    { text: "Email templates", included: true },
    { text: "Community support", included: true },
    { text: "Premium templates", included: false },
    { text: "CLI scaffolding", included: false },
  ],
  pro: [
    { text: "Everything in Free", included: true },
    { text: "Premium templates", included: true },
    { text: "CLI scaffolding tool", included: true },
    { text: "Priority support", included: true },
    { text: "Team management", included: true },
    { text: "Advanced analytics", included: true },
    { text: "Custom domains", included: true },
    { text: "White-label options", included: true },
    { text: "Dedicated support", included: true },
  ],
};

export default function MarketingPage() {
  return (
    <>
      {/* ====== HERO ====== */}
      <section className="relative overflow-hidden py-28 md:py-40">
        {/* Subtle grid background */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        {/* Gradient orbs */}
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-primary/[0.04] blur-3xl" />
        <div className="pointer-events-none absolute top-1/2 -right-40 h-[300px] w-[300px] rounded-full bg-primary/[0.03] blur-3xl" />

        <Container size="lg" className="relative">
          <Fade direction="up" delay={0}>
            <div className="text-center">
              <Slide direction="top" delay={0.1}>
                <Badge variant="outline" size="lg" className="mb-6">
                  <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                  Pre-alpha &mdash; Now available
                </Badge>
              </Slide>

              <h1 className="text-5xl font-bold tracking-tight sm:text-7xl lg:text-8xl">
                <Fade direction="up" delay={0.2}>
                  <span className="block">Stop scaffolding.</span>
                </Fade>
                <Fade direction="up" delay={0.35}>
                  <span className="block text-muted-foreground/40">
                    Start shipping.
                  </span>
                </Fade>
              </h1>

              <Fade direction="up" delay={0.5}>
                <p className="mx-auto mt-8 max-w-xl text-lg text-muted-foreground leading-relaxed">
                  {APP_NAME} is a {APP_DESCRIPTION.toLowerCase()}. Auth,
                  database, UI, email, API &mdash; production-ready from{" "}
                  <span className="font-mono text-foreground text-sm bg-muted px-1.5 py-0.5 rounded">
                    git clone
                  </span>
                </p>
              </Fade>

              <Fade direction="up" delay={0.65}>
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button size="lg" asChild>
                    <Link href="/register">
                      Get started free
                      <FontAwesomeIcon
                        icon={faArrowRight}
                        className="ml-2 h-3.5 w-3.5"
                      />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/#features">See what&apos;s included</Link>
                  </Button>
                </div>
              </Fade>

              {/* Terminal preview */}
              <Fade direction="up" delay={0.8}>
                <div className="mx-auto mt-16 max-w-lg">
                  <GlowCard
                    glowIntensity="subtle"
                    animationDuration={6}
                    className="overflow-hidden"
                  >
                    <div className="bg-foreground text-background rounded-lg p-6 font-mono text-sm">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="h-3 w-3 rounded-full bg-red-500/80" />
                        <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                        <div className="h-3 w-3 rounded-full bg-green-500/80" />
                        <span className="ml-2 text-xs text-background/40">
                          terminal
                        </span>
                      </div>
                      <div className="space-y-1.5 text-left">
                        <p>
                          <span className="text-green-400">$</span>{" "}
                          <span className="text-background/60">
                            git clone forge my-app && cd my-app
                          </span>
                        </p>
                        <p>
                          <span className="text-green-400">$</span>{" "}
                          <span className="text-background/60">
                            pnpm install && pnpm dev
                          </span>
                        </p>
                        <p className="text-green-400/70 mt-2">
                          ▲ Ready on http://localhost:3000
                        </p>
                      </div>
                    </div>
                  </GlowCard>
                </div>
              </Fade>
            </div>
          </Fade>
        </Container>
      </section>

      {/* ====== FEATURES ====== */}
      <section id="features" className="border-t py-28">
        <Container size="xl">
          <Fade direction="up">
            <div className="text-center mb-16">
              <Badge variant="soft" size="sm" className="mb-4">
                Features
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
                Everything you need.
                <br />
                <span className="text-muted-foreground/40">
                  Nothing you don&apos;t.
                </span>
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
                A complete foundation so you can focus on what makes your
                product unique.
              </p>
            </div>
          </Fade>

          <StaggerContainer
            speed="slow"
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {features.map((feature) => (
              <StaggerItem key={feature.title}>
                <SpotlightCard
                  spotlightSize={250}
                  className="h-full"
                >
                  <FeatureCard
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                    accent={feature.accent}
                    variant="ghost"
                    className="h-full border-0 shadow-none"
                  />
                </SpotlightCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      {/* ====== ARCHITECTURE ====== */}
      <section className="border-t py-28">
        <Container size="xl">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 items-center">
            <Fade direction="left">
              <div>
                <Badge variant="soft" size="sm" className="mb-4">
                  Architecture
                </Badge>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Monorepo,
                  <br />
                  done right.
                </h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Shared packages for auth, database, UI, email, and utilities.
                  Turborepo handles the build graph. Each package has its own
                  types, tests, and exports.
                </p>
                <div className="mt-8 flex items-center gap-3">
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/register">
                      Start building
                      <FontAwesomeIcon
                        icon={faArrowRight}
                        className="ml-2 h-3 w-3"
                      />
                    </Link>
                  </Button>
                </div>
              </div>
            </Fade>

            <Fade direction="right">
              <div className="rounded-xl border bg-card p-1">
                <div className="rounded-lg bg-muted/30 p-6">
                  <div className="mb-4 flex items-center gap-2 text-xs text-muted-foreground font-mono">
                    <FontAwesomeIcon
                      icon={faServer}
                      className="h-3 w-3"
                    />
                    pnpm-workspace.yaml
                  </div>
                  <StaggerContainer speed="fast" className="space-y-2.5">
                    {architectureItems.map((item) => (
                      <StaggerItem key={item.label}>
                        <div className="flex items-center justify-between rounded-lg border bg-card px-4 py-3 transition-colors hover:bg-muted/50">
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                              {item.icon}
                            </div>
                            <span className="font-mono text-sm font-medium">
                              {item.label}
                            </span>
                          </div>
                          <span className="text-xs text-muted-foreground hidden sm:block">
                            {item.description}
                          </span>
                        </div>
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </div>
              </div>
            </Fade>
          </div>
        </Container>
      </section>

      {/* ====== TECH STACK ====== */}
      <section className="border-t py-28">
        <Container size="lg">
          <Fade direction="up">
            <div className="text-center">
              <Badge variant="soft" size="sm" className="mb-4">
                Stack
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Built with the best tools
              </h2>
              <p className="mt-4 text-muted-foreground">
                Modern, battle-tested technologies for production applications.
              </p>
            </div>
          </Fade>

          <Fade direction="up" delay={0.2}>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
              {techStack.map((tech) => (
                <Badge
                  key={tech.label}
                  variant="outline"
                  size="lg"
                  className="transition-all hover:bg-muted/50 hover:scale-105 cursor-default"
                >
                  {tech.label}
                </Badge>
              ))}
            </div>
          </Fade>

          <Fade direction="up" delay={0.3}>
            <div className="mt-16 grid gap-px rounded-xl border bg-border overflow-hidden sm:grid-cols-3">
              {[
                {
                  icon: <FontAwesomeIcon icon={faKey} className="h-5 w-5" />,
                  stat: "Type-safe",
                  label: "End to end",
                },
                {
                  icon: (
                    <FontAwesomeIcon icon={faCloud} className="h-5 w-5" />
                  ),
                  stat: "Edge-ready",
                  label: "Neon serverless",
                },
                {
                  icon: (
                    <FontAwesomeIcon icon={faRocket} className="h-5 w-5" />
                  ),
                  stat: "Zero config",
                  label: "Clone and ship",
                },
              ].map((item) => (
                <div
                  key={item.stat}
                  className="flex flex-col items-center gap-2 bg-card p-8 text-center"
                >
                  <div className="text-muted-foreground">{item.icon}</div>
                  <p className="text-2xl font-bold">{item.stat}</p>
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                </div>
              ))}
            </div>
          </Fade>
        </Container>
      </section>

      {/* ====== PRICING ====== */}
      <section id="pricing" className="border-t py-28">
        <Container size="lg">
          <Fade direction="up">
            <div className="text-center mb-16">
              <Badge variant="soft" size="sm" className="mb-4">
                Pricing
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Open source at the core
              </h2>
              <p className="mt-4 text-muted-foreground">
                {APP_NAME} is free and open source. A Pro tier is coming soon.
              </p>
            </div>
          </Fade>

          <StaggerContainer
            speed="normal"
            className="grid gap-6 md:grid-cols-2 max-w-3xl mx-auto items-start"
          >
            <StaggerItem>
              <PricingCard
                name="Open Source"
                price="$0"
                period="forever"
                description="Everything you need to build and launch."
                features={pricingFeatures.free}
                cta={
                  <Button className="w-full" variant="outline" asChild>
                    <Link href="/register">Get started</Link>
                  </Button>
                }
                variant="outlined"
              />
            </StaggerItem>
            <StaggerItem>
              <PricingCard
                name="Pro"
                price="TBD"
                period=""
                description="For teams that need more."
                features={pricingFeatures.pro}
                featured
                badge="Coming Soon"
                cta={
                  <Button className="w-full" disabled>
                    Notify me
                  </Button>
                }
              />
            </StaggerItem>
          </StaggerContainer>
        </Container>
      </section>

      {/* ====== FINAL CTA ====== */}
      <section className="border-t py-28">
        <Container size="md">
          <Fade direction="up">
            <GlowCard
              glowIntensity="subtle"
              animationDuration={8}
              className="overflow-hidden"
            >
              <div className="rounded-xl bg-card p-12 md:p-16 text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Ready to ship?
                </h2>
                <p className="mx-auto mt-4 max-w-md text-muted-foreground">
                  Clone the repo, run one command, and start building your
                  product. No configuration required.
                </p>
                <Stack
                  direction="row"
                  gap="4"
                  justify="center"
                  className="mt-8"
                >
                  <Button size="lg" asChild>
                    <Link href="/register">
                      Get started
                      <FontAwesomeIcon
                        icon={faArrowRight}
                        className="ml-2 h-3.5 w-3.5"
                      />
                    </Link>
                  </Button>
                </Stack>
              </div>
            </GlowCard>
          </Fade>
        </Container>
      </section>

      <Divider soft />
    </>
  );
}
