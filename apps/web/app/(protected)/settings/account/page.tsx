import { getCurrentUser } from "@repo/auth/dal";
import { redirect } from "next/navigation";
import { ChangePasswordForm } from "./change-password-form";
import { ConnectedAccounts } from "./connected-accounts";
import { DeleteAccount } from "./delete-account";

export const dynamic = "force-dynamic";

const enabledProviders = [
  ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
    ? ["google" as const]
    : []),
  ...(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET
    ? ["github" as const]
    : []),
];

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
      {enabledProviders.length > 0 && (
        <ConnectedAccounts enabledProviders={enabledProviders} />
      )}
      <DeleteAccount />
    </div>
  );
}
