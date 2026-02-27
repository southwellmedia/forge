"use client";

import Link from "next/link";
import {
  Button,
  Badge,
  Container,
  FeatureCard,
  StaggerContainer,
  StaggerItem,
  Fade,
  Divider,
  FontAwesomeIcon,
  faBolt,
  faShield,
  faDatabase,
  faPalette,
  faCode,
  faRocket,
  faArrowRight,
} from "@repo/ui";
import { APP_NAME } from "@repo/utils";

const principles = [
  {
    icon: <FontAwesomeIcon icon={faRocket} className="h-5 w-5" />,
    title: "Ship faster",
    description:
      "Stop spending weeks on boilerplate. Clone, install, and start building your product in minutes.",
    accent: "info" as const,
  },
  {
    icon: <FontAwesomeIcon icon={faCode} className="h-5 w-5" />,
    title: "Own everything",
    description:
      "No vendor lock-in, no hidden magic. Full source code access so you can customize every layer.",
    accent: "success" as const,
  },
  {
    icon: <FontAwesomeIcon icon={faPalette} className="h-5 w-5" />,
    title: "Beautiful defaults",
    description:
      "A complete design system with 40+ components, OKLCH color tokens, and motion primitives built in.",
    accent: "warning" as const,
  },
  {
    icon: <FontAwesomeIcon icon={faShield} className="h-5 w-5" />,
    title: "Production-ready",
    description:
      "Auth, database, API, email — battle-tested patterns ready for real users on day one.",
    accent: "error" as const,
  },
];

const stack = [
  {
    icon: <FontAwesomeIcon icon={faBolt} className="h-5 w-5" />,
    title: "Next.js 16 + React 19",
    description:
      "App Router, Server Components, Turbopack. The latest React architecture patterns.",
    accent: "default" as const,
  },
  {
    icon: <FontAwesomeIcon icon={faDatabase} className="h-5 w-5" />,
    title: "Drizzle + Neon",
    description:
      "Type-safe ORM on serverless PostgreSQL. Schemas, migrations, and seeding included.",
    accent: "default" as const,
  },
  {
    icon: <FontAwesomeIcon icon={faShield} className="h-5 w-5" />,
    title: "Better Auth",
    description:
      "Email/password, OAuth, email verification, password reset — all configured and ready.",
    accent: "default" as const,
  },
  {
    icon: <FontAwesomeIcon icon={faCode} className="h-5 w-5" />,
    title: "tRPC",
    description:
      "End-to-end type safety from database to UI. Validated inputs, protected procedures.",
    accent: "default" as const,
  },
];

export function AboutContent() {
  return (
    <>
      {/* Hero */}
      <section className="py-28">
        <Container size="lg">
          <Fade direction="up">
            <div className="max-w-2xl">
              <Badge variant="soft" size="sm" className="mb-4">
                About
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                A foundation for
                <br />
                <span className="text-muted-foreground/40">
                  what you&apos;re building.
                </span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                {APP_NAME} is a production-ready Next.js monorepo boilerplate.
                Instead of spending weeks wiring up auth, databases, and UI
                components, start with a solid foundation and focus on what makes
                your product unique.
              </p>
            </div>
          </Fade>
        </Container>
      </section>

      <Divider soft />

      {/* Principles */}
      <section className="py-28">
        <Container size="xl">
          <Fade direction="up">
            <div className="mb-16">
              <Badge variant="soft" size="sm" className="mb-4">
                Principles
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Why {APP_NAME}?
              </h2>
              <p className="mt-4 max-w-lg text-muted-foreground">
                Every choice is intentional. Modern tools, clean patterns, zero
                bloat.
              </p>
            </div>
          </Fade>

          <StaggerContainer
            speed="slow"
            className="grid gap-5 sm:grid-cols-2"
          >
            {principles.map((item) => (
              <StaggerItem key={item.title}>
                <FeatureCard
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                  accent={item.accent}
                  variant="ghost"
                  className="h-full"
                />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      <Divider soft />

      {/* Tech Stack */}
      <section className="py-28">
        <Container size="xl">
          <Fade direction="up">
            <div className="mb-16">
              <Badge variant="soft" size="sm" className="mb-4">
                Technology
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Built on the best
              </h2>
              <p className="mt-4 max-w-lg text-muted-foreground">
                Modern, battle-tested technologies chosen for developer
                experience and production reliability.
              </p>
            </div>
          </Fade>

          <StaggerContainer
            speed="slow"
            className="grid gap-5 sm:grid-cols-2"
          >
            {stack.map((item) => (
              <StaggerItem key={item.title}>
                <FeatureCard
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                  accent={item.accent}
                  className="h-full"
                />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      <Divider soft />

      {/* Open Source CTA */}
      <section className="py-28">
        <Container size="md">
          <Fade direction="up">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Open source. Always.
              </h2>
              <p className="mx-auto mt-4 max-w-md text-muted-foreground">
                {APP_NAME} is free to use, fork, and modify. The community
                drives the roadmap.
              </p>
              <div className="mt-8 flex justify-center gap-4">
                <Button size="lg" asChild>
                  <Link href="/register">
                    Get started
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="ml-2 h-3.5 w-3.5"
                    />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/pricing">View pricing</Link>
                </Button>
              </div>
            </div>
          </Fade>
        </Container>
      </section>
    </>
  );
}
