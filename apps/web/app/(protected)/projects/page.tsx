import { getCurrentUser } from "@repo/auth/dal";
import { redirect } from "next/navigation";
import { getDb } from "@repo/db/client";
import { projects, tasks } from "@repo/db/schema";
import { eq, desc, count, sql } from "drizzle-orm";
import { ProjectsContent } from "./projects-content";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const db = getDb();

  const userProjects = await db
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
    .orderBy(desc(projects.createdAt));

  return (
    <ProjectsContent
      projects={userProjects.map((p) => ({
        id: p.id,
        name: p.name,
        description: p.description,
        status: p.status,
        createdAt: p.createdAt.toISOString(),
        totalTasks: Number(p.totalTasks),
        completedTasks: Number(p.completedTasks),
      }))}
    />
  );
}
