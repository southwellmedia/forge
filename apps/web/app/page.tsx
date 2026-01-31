import { APP_NAME } from "@repo/utils";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
          {APP_NAME}
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          Production-ready Next.js monorepo boilerplate
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="/login"
            className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Get started
          </a>
          <a
            href="https://github.com"
            className="text-sm font-semibold leading-6 text-foreground"
          >
            Learn more <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </main>
  );
}
