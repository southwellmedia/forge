import { Container } from "@repo/ui";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30">
      <Container size="sm" className="py-8">
        {children}
      </Container>
    </div>
  );
}
