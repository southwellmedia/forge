import type { Metadata } from "next";
import { Container } from "@repo/ui";
import { APP_NAME } from "@repo/utils";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <section className="py-24">
      <Container size="lg">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">About {APP_NAME}</h1>
        <div className="mt-8 max-w-2xl space-y-6 text-muted-foreground">
          <p>
            {APP_NAME} is a production-ready Next.js monorepo boilerplate designed to help developers
            ship faster. Instead of spending weeks setting up authentication, databases, and UI
            components, start with a solid foundation and focus on building your product.
          </p>
          <p>
            Built with modern, battle-tested technologies including Next.js 16, React 19, TypeScript,
            Tailwind CSS 4, tRPC, Drizzle ORM, and Better Auth.
          </p>
          <p>
            The project is open source and maintained by the community.
          </p>
        </div>
      </Container>
    </section>
  );
}
