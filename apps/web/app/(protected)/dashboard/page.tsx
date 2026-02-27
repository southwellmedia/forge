import { getCurrentUser } from "@repo/auth/dal";
import { redirect } from "next/navigation";
import { getDb } from "@repo/db/client";
import { projects, tasks } from "@repo/db/schema";
import { eq, and, count, lt, desc } from "drizzle-orm";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  Stack,
  StatCard,
  FontAwesomeIcon,
  faFolder,
  faBolt,
  faCheckCircle,
  faClock,
} from "@repo/ui";
import { SignOutButton } from "./sign-out-button";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const db = getDb();

  // Fetch stats in parallel
  const [
    userProjects,
    [totalProjectsResult],
    [activeTasksResult],
    [completedTasksResult],
    [overdueTasksResult],
  ] = await Promise.all([
    // Recent projects
    db
      .select()
      .from(projects)
      .where(eq(projects.userId, user.id))
      .orderBy(desc(projects.createdAt))
      .limit(5),
    // Total projects count
    db
      .select({ value: count() })
      .from(projects)
      .where(eq(projects.userId, user.id)),
    // In-progress tasks for user's projects
    db
      .select({ value: count() })
      .from(tasks)
      .innerJoin(projects, eq(tasks.projectId, projects.id))
      .where(
        and(eq(projects.userId, user.id), eq(tasks.status, "in_progress"))
      ),
    // Completed tasks
    db
      .select({ value: count() })
      .from(tasks)
      .innerJoin(projects, eq(tasks.projectId, projects.id))
      .where(and(eq(projects.userId, user.id), eq(tasks.status, "done"))),
    // Overdue tasks
    db
      .select({ value: count() })
      .from(tasks)
      .innerJoin(projects, eq(tasks.projectId, projects.id))
      .where(
        and(
          eq(projects.userId, user.id),
          lt(tasks.dueDate, new Date()),
          eq(tasks.status, "todo")
        )
      ),
  ]);

  const totalProjects = totalProjectsResult?.value ?? 0;
  const activeTasks = activeTasksResult?.value ?? 0;
  const completedTasks = completedTasksResult?.value ?? 0;
  const overdueTasks = overdueTasksResult?.value ?? 0;

  const initials = user.name
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const statusColor: Record<string, "default" | "secondary" | "outline"> = {
    active: "default",
    completed: "secondary",
    archived: "outline",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user.name}</p>
        </div>
        <SignOutButton />
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Projects"
          value={totalProjects}
          icon={
            <FontAwesomeIcon icon={faFolder} className="h-4 w-4 text-muted-foreground" />
          }
        />
        <StatCard
          label="In Progress"
          value={activeTasks}
          icon={
            <FontAwesomeIcon icon={faBolt} className="h-4 w-4 text-muted-foreground" />
          }
        />
        <StatCard
          label="Completed Tasks"
          value={completedTasks}
          icon={
            <FontAwesomeIcon
              icon={faCheckCircle}
              className="h-4 w-4 text-muted-foreground"
            />
          }
        />
        <StatCard
          label="Overdue Tasks"
          value={overdueTasks}
          icon={
            <FontAwesomeIcon icon={faClock} className="h-4 w-4 text-muted-foreground" />
          }
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Recent Projects */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Projects</CardTitle>
            <CardDescription>Your latest projects</CardDescription>
          </CardHeader>
          <CardContent>
            {userProjects.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No projects yet. Create your first project to get started.
              </p>
            ) : (
              <div className="space-y-3">
                {userProjects.map((project) => (
                  <div
                    key={project.id}
                    className="flex items-center justify-between rounded-md border p-3"
                  >
                    <div>
                      <p className="font-medium">{project.name}</p>
                      {project.description && (
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {project.description}
                        </p>
                      )}
                    </div>
                    <Badge variant={statusColor[project.status] ?? "default"}>
                      {project.status}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Profile + Quick Actions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Your account information</CardDescription>
            </CardHeader>
            <CardContent>
              <Stack direction="row" gap="4" align="center">
                <Avatar size="lg">
                  {user.image && (
                    <AvatarImage src={user.image} alt={user.name} />
                  )}
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
                <Button
                  variant="outline"
                  className="justify-start"
                  asChild
                >
                  <Link href="/settings/profile">Edit Profile</Link>
                </Button>
                <Button
                  variant="outline"
                  className="justify-start"
                  asChild
                >
                  <Link href="/settings/account">Account Settings</Link>
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
