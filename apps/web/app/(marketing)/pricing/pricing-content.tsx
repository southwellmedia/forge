"use client";

import Link from "next/link";
import {
  Button,
  Badge,
  Container,
  PricingCard,
  StaggerContainer,
  StaggerItem,
  Fade,
  GlowCard,
  FontAwesomeIcon,
  faArrowRight,
} from "@repo/ui";
import { APP_NAME } from "@repo/utils";

const freeFeatures = [
  { text: "Full source code access", included: true },
  { text: "40+ UI components", included: true },
  { text: "Authentication system", included: true },
  { text: "Database + Drizzle ORM", included: true },
  { text: "tRPC API layer", included: true },
  { text: "Email templates", included: true },
  { text: "Community support", included: true },
  { text: "Premium templates", included: false },
  { text: "CLI scaffolding", included: false },
];

const proFeatures = [
  { text: "Everything in Free", included: true },
  { text: "Premium templates", included: true },
  { text: "CLI scaffolding tool", included: true },
  { text: "Priority support", included: true },
  { text: "Team management", included: true },
  { text: "Advanced analytics", included: true },
  { text: "Custom domains", included: true },
  { text: "White-label options", included: true },
  { text: "Dedicated support", included: true },
];

export function PricingContent() {
  return (
    <>
      {/* Hero */}
      <section className="py-28">
        <Container size="lg">
          <Fade direction="up">
            <div className="text-center">
              <Badge variant="soft" size="sm" className="mb-4">
                Pricing
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
                Simple, transparent pricing
              </h1>
              <p className="mx-auto mt-4 max-w-lg text-lg text-muted-foreground">
                {APP_NAME} is open source and free to use. A Pro tier with
                premium features is coming soon.
              </p>
            </div>
          </Fade>

          {/* Pricing Cards */}
          <StaggerContainer
            speed="normal"
            className="mt-16 grid gap-6 md:grid-cols-2 max-w-3xl mx-auto items-start"
          >
            <StaggerItem>
              <PricingCard
                name="Open Source"
                price="$0"
                period="forever"
                description="Everything you need to build and launch your next project."
                features={freeFeatures}
                cta={
                  <Button className="w-full" variant="outline" asChild>
                    <Link href="/register">
                      Get started free
                      <FontAwesomeIcon
                        icon={faArrowRight}
                        className="ml-2 h-3 w-3"
                      />
                    </Link>
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
                description="For teams and power users that need more."
                features={proFeatures}
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

      {/* FAQ / CTA */}
      <section className="border-t py-28">
        <Container size="md">
          <Fade direction="up">
            <GlowCard
              glowIntensity="subtle"
              animationDuration={8}
              className="overflow-hidden"
            >
              <div className="rounded-xl bg-card p-12 text-center">
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  Have questions?
                </h2>
                <p className="mx-auto mt-4 max-w-md text-muted-foreground">
                  {APP_NAME} is fully open source. Explore the code, check the
                  docs, or join the community.
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
                </div>
              </div>
            </GlowCard>
          </Fade>
        </Container>
      </section>
    </>
  );
}
