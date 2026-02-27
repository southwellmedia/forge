import { getCurrentUser } from "@repo/auth/dal";
import { redirect } from "next/navigation";
import { AppSidebar } from "./app-sidebar";

export const dynamic = "force-dynamic";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <AppSidebar
        user={{
          name: user.name,
          email: user.email,
          image: user.image ?? null,
        }}
      />
      <main className="flex-1 min-w-0 overflow-y-auto">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </div>
  );
}
