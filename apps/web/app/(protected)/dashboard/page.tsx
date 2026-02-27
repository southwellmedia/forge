import { getCurrentUser } from "@repo/auth/dal";
import { redirect } from "next/navigation";
import { getDb } from "@repo/db/client";
import { projects, tasks } from "@repo/db/schema";
import { eq, and, count, lt, desc, sql, inArray } from "drizzle-orm";
import { DashboardContent } from "./dashboard-content";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const db = getDb();

  const [
    [totalProjectsResult],
    [activeTasksResult],
    [completedTasksResult],
    [overdueTasksResult],
    [totalTasksResult],
    recentProjectsRaw,
  ] = await Promise.all([
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
          inArray(tasks.status, ["todo", "in_progress"])
        )
      ),
    // Total tasks
    db
      .select({ value: count() })
      .from(tasks)
      .innerJoin(projects, eq(tasks.projectId, projects.id))
      .where(eq(projects.userId, user.id)),
    // Recent projects with task completion counts
    db
      .select({
        id: projects.id,
        name: projects.name,
        description: projects.description,
        status: projects.status,
        createdAt: projects.createdAt,
        totalTasks: count(tasks.id),
        completedTasks:
          sql<number>`count(case when ${tasks.status} = 'done' then 1 end)`.as(
            "completed_tasks"
          ),
      })
      .from(projects)
      .leftJoin(tasks, eq(tasks.projectId, projects.id))
      .where(eq(projects.userId, user.id))
      .groupBy(projects.id)
      .orderBy(desc(projects.createdAt))
      .limit(5),
  ]);

  return (
    <DashboardContent
      userName={user.name}
      stats={{
        totalProjects: totalProjectsResult?.value ?? 0,
        activeTasks: activeTasksResult?.value ?? 0,
        completedTasks: completedTasksResult?.value ?? 0,
        overdueTasks: overdueTasksResult?.value ?? 0,
        totalTasks: totalTasksResult?.value ?? 0,
      }}
      recentProjects={recentProjectsRaw.map((p) => ({
        id: p.id,
        name: p.name,
        description: p.description,
        status: p.status,
        createdAt: p.createdAt,
        totalTasks: Number(p.totalTasks),
        completedTasks: Number(p.completedTasks),
      }))}
    />
  );
}
