"use client";

import { useState, useEffect } from "react";
import { authClient } from "@repo/auth/client";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  FontAwesomeIcon,
  Skeleton,
  toast,
  faGoogle,
  faGithub,
} from "@repo/ui";

interface LinkedAccount {
  id: string;
  providerId: string;
  accountId: string;
}

const ALL_PROVIDERS = [
  {
    id: "google",
    name: "Google",
    icon: faGoogle,
  },
  {
    id: "github",
    name: "GitHub",
    icon: faGithub,
  },
] as const;

interface ConnectedAccountsProps {
  enabledProviders: readonly string[];
}

export function ConnectedAccounts({ enabledProviders }: ConnectedAccountsProps) {
  const providers = ALL_PROVIDERS.filter((p) => enabledProviders.includes(p.id));
  const [accounts, setAccounts] = useState<LinkedAccount[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [hasPassword, setHasPassword] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const session = await authClient.getSession();
        if (session.data) {
          const linked = await authClient.listAccounts();
          if (linked.data) {
            setAccounts(linked.data);
            setHasPassword(
              linked.data.some(
                (a: LinkedAccount) => a.providerId === "credential"
              )
            );
          }
        }
      } catch {
        // Silently fail — user will see empty state
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const isConnected = (providerId: string) =>
    accounts.some((a) => a.providerId === providerId);

  const canDisconnect = () => {
    const authMethods = hasPassword
      ? accounts.length
      : accounts.filter((a) => a.providerId !== "credential").length;
    return authMethods > 1 || hasPassword;
  };

  const handleConnect = async (providerId: string) => {
    setActionLoading(providerId);
    try {
      await authClient.linkSocial({
        provider: providerId,
        callbackURL: "/settings/account",
      });
    } catch {
      toast.error(`Failed to connect ${providerId}`);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDisconnect = async (providerId: string) => {
    if (!canDisconnect()) {
      toast.error("You must have at least one sign-in method");
      return;
    }

    setActionLoading(providerId);
    try {
      const account = accounts.find((a) => a.providerId === providerId);
      if (!account) return;

      await authClient.unlinkAccount({ providerId });

      setAccounts((prev) => prev.filter((a) => a.providerId !== providerId));
      toast.success(`Disconnected ${providerId}`);
    } catch {
      toast.error(`Failed to disconnect ${providerId}`);
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Connected Accounts</CardTitle>
          <CardDescription>
            Manage your linked social accounts for sign-in.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {providers.map((provider) => (
            <div
              key={provider.id}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div className="flex items-center gap-3">
                <Skeleton variant="circle" className="h-5 w-5" />
                <div className="space-y-1.5">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-3.5 w-24" />
                </div>
              </div>
              <Skeleton variant="button" className="h-8 w-24" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Connected Accounts</CardTitle>
        <CardDescription>
          Manage your linked social accounts for sign-in.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {providers.map((provider) => {
          const connected = isConnected(provider.id);
          const isLoading = actionLoading === provider.id;

          return (
            <div
              key={provider.id}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div className="flex items-center gap-3">
                <FontAwesomeIcon icon={provider.icon} className="h-5 w-5" />
                <div>
                  <p className="font-medium">{provider.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {connected ? "Connected" : "Not connected"}
                  </p>
                </div>
              </div>

              {connected ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDisconnect(provider.id)}
                  disabled={isLoading || !canDisconnect()}
                >
                  {isLoading ? "Disconnecting..." : "Disconnect"}
                </Button>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleConnect(provider.id)}
                  disabled={isLoading}
                >
                  {isLoading ? "Connecting..." : "Connect"}
                </Button>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
