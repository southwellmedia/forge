import Link from "next/link";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
  Container,
  FontAwesomeIcon,
  faRocket,
  faShield,
  faDatabase,
  faPalette,
  faBolt,
  faCode,
} from "@repo/ui";
import { APP_NAME, APP_DESCRIPTION } from "@repo/utils";

const features = [
  {
    icon: faBolt,
    title: "Next.js 16",
    description: "Built on the latest Next.js with App Router, Server Components, and Turbopack.",
  },
  {
    icon: faShield,
    title: "Authentication",
    description: "Complete auth system with Better Auth — email/password, OAuth, email verification.",
  },
  {
    icon: faDatabase,
    title: "Database Ready",
    description: "Drizzle ORM with Neon PostgreSQL. Type-safe schemas, migrations, and seeding.",
  },
  {
    icon: faPalette,
    title: "Design System",
    description: "40+ UI components with CVA variants, OKLCH color tokens, and dark mode support.",
  },
  {
    icon: faCode,
    title: "Type-Safe API",
    description: "End-to-end type safety with tRPC. Validated inputs, protected procedures.",
  },
  {
    icon: faRocket,
    title: "Monorepo",
    description: "Turborepo-powered workspace with shared packages for auth, db, ui, and utils.",
  },
];

const techStack = [
  "Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4",
  "tRPC", "Drizzle ORM", "Better Auth", "Neon PostgreSQL",
  "Turborepo", "pnpm Workspaces",
];

export default function MarketingPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-24 md:py-32">
        <Container size="lg" className="text-center">
          <Badge variant="secondary" className="mb-4">
            Pre-alpha
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Ship faster with{" "}
            <span className="text-primary">{APP_NAME}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            {APP_DESCRIPTION}. Start with authentication, database, UI components,
            and API — all wired together and ready to customize.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/register">Get Started</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/#features">Learn more</Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* Features */}
      <section id="features" className="border-t py-24">
        <Container size="xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need to build
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              A complete foundation so you can focus on what makes your app unique.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title}>
                <CardHeader>
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <FontAwesomeIcon
                      icon={feature.icon}
                      className="h-5 w-5 text-primary"
                    />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Tech Stack */}
      <section className="border-t py-24">
        <Container size="lg" className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Built with the best tools
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Modern, battle-tested technologies for production applications.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {techStack.map((tech) => (
              <Badge key={tech} variant="outline" className="text-sm px-4 py-2">
                {tech}
              </Badge>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="border-t py-24">
        <Container size="lg" className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to start building?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Create your account and start shipping in minutes.
          </p>
          <div className="mt-10">
            <Button size="lg" asChild>
              <Link href="/register">Get Started Free</Link>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
