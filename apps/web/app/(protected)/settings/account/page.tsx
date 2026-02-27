import { getCurrentUser } from "@repo/auth/dal";
import { redirect } from "next/navigation";
import { ChangePasswordForm } from "./change-password-form";
import { DeleteAccount } from "./delete-account";

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Account</h2>
        <p className="text-sm text-muted-foreground">
          Manage your account security and preferences.
        </p>
      </div>
      <ChangePasswordForm />
      <DeleteAccount />
    </div>
  );
}
