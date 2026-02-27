import { getCurrentUser } from "@repo/auth/dal";
import { redirect, notFound } from "next/navigation";
import { getDb } from "@repo/db/client";
import { projects, tasks } from "@repo/db/schema";
import { eq, and, desc } from "drizzle-orm";
import { ProjectContent } from "./project-content";

export const dynamic = "force-dynamic";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const { id } = await params;
  const db = getDb();

  const [project] = await db
    .select()
    .from(projects)
    .where(and(eq(projects.id, id), eq(projects.userId, user.id)))
    .limit(1);

  if (!project) notFound();

  const projectTasks = await db
    .select()
    .from(tasks)
    .where(eq(tasks.projectId, project.id))
    .orderBy(desc(tasks.createdAt));

  return (
    <ProjectContent
      project={{
        id: project.id,
        name: project.name,
        description: project.description,
        status: project.status,
        createdAt: project.createdAt.toISOString(),
      }}
      tasks={projectTasks.map((t) => ({
        id: t.id,
        title: t.title,
        description: t.description,
        status: t.status,
        priority: t.priority,
        dueDate: t.dueDate?.toISOString() ?? null,
        createdAt: t.createdAt.toISOString(),
      }))}
    />
  );
}
