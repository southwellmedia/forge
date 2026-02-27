import Link from "next/link";
import { Button, Badge, Container, Divider } from "@repo/ui";
import { APP_NAME } from "@repo/utils";
import { MobileNav } from "./mobile-nav";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Container size="xl">
          <nav className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="text-xl font-bold tracking-tight">
                {APP_NAME}
              </span>
              <Badge variant="soft" size="sm">
                alpha
              </Badge>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link
                href="/#features"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Features
              </Link>
              <Link
                href="/pricing"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Pricing
              </Link>
              <Link
                href="/about"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                About
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="hidden md:inline-flex" asChild>
                <Link href="/login">Sign in</Link>
              </Button>
              <Button size="sm" className="hidden md:inline-flex" asChild>
                <Link href="/register">Get Started</Link>
              </Button>
              <MobileNav />
            </div>
          </nav>
        </Container>
      </header>

      <main className="flex-1">{children}</main>

      <Divider soft />

      <footer className="py-12">
        <Container size="xl">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <p className="font-bold tracking-tight">{APP_NAME}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Production-ready Next.js monorepo boilerplate.
              </p>
            </div>
            <div>
              <p className="text-sm font-medium mb-3">Product</p>
              <div className="space-y-2">
                <Link
                  href="/#features"
                  className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Features
                </Link>
                <Link
                  href="/pricing"
                  className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Pricing
                </Link>
                <Link
                  href="/about"
                  className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  About
                </Link>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium mb-3">Get Started</p>
              <div className="space-y-2">
                <Link
                  href="/register"
                  className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Create account
                </Link>
                <Link
                  href="/login"
                  className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Sign in
                </Link>
              </div>
            </div>
          </div>
          <Divider soft className="my-8" />
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </p>
        </Container>
      </footer>
    </div>
  );
}
