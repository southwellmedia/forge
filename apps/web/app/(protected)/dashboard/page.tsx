import { getCurrentUser } from "@repo/auth/dal";
import { redirect } from "next/navigation";

// Force dynamic rendering to avoid build-time database access
export const dynamic = "force-dynamic";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Stack,
} from "@repo/ui";
import { SignOutButton } from "./sign-out-button";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const initials = user.name
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user.name}
          </p>
        </div>
        <SignOutButton />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Your account information</CardDescription>
          </CardHeader>
          <CardContent>
            <Stack direction="row" gap="4" align="center">
              <Avatar size="lg">
                {user.image && <AvatarImage src={user.image} alt={user.name} />}
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </Stack>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <Stack gap="2">
              <Button variant="outline" className="justify-start">
                Edit Profile
              </Button>
              <Button variant="outline" className="justify-start">
                Account Settings
              </Button>
            </Stack>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
            <CardDescription>Next steps</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
              <li>Complete your profile</li>
              <li>Explore the dashboard</li>
              <li>Check out the documentation</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
