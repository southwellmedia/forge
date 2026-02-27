import type { Metadata } from "next";
import { Container, Card, CardContent, CardHeader, CardTitle, CardDescription } from "@repo/ui";
import { APP_NAME } from "@repo/utils";

export const metadata: Metadata = {
  title: "Pricing",
};

export default function PricingPage() {
  return (
    <section className="py-24">
      <Container size="lg" className="text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Pricing</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          {APP_NAME} is open source and free to use.
        </p>
        <div className="mt-16 grid gap-8 md:grid-cols-2 max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Open Source</CardTitle>
              <CardDescription>Free forever</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold mb-6">$0</p>
              <ul className="space-y-2 text-sm text-muted-foreground text-left">
                <li>Full source code access</li>
                <li>All components included</li>
                <li>Authentication system</li>
                <li>Database integration</li>
                <li>Community support</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Pro</CardTitle>
              <CardDescription>Coming soon</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold mb-6">TBD</p>
              <ul className="space-y-2 text-sm text-muted-foreground text-left">
                <li>Everything in Open Source</li>
                <li>Premium templates</li>
                <li>Priority support</li>
                <li>CLI scaffolding tool</li>
                <li>Team management</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </Container>
    </section>
  );
}
