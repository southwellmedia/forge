import { Container } from "@repo/ui";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <Container size="xl" className="py-8">
        {children}
      </Container>
    </div>
  );
}
