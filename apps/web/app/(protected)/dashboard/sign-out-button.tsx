"use client";

import { useRouter } from "next/navigation";
import { signOut } from "@repo/auth/client";
import { Button } from "@repo/ui";

export function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <Button variant="outline" onClick={handleSignOut}>
      Sign out
    </Button>
  );
}
