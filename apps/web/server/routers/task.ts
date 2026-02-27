import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { tasks, projects } from "@repo/db/schema";
import { eq, and, desc } from "drizzle-orm";
import { TASK_STATUSES, TASK_PRIORITIES } from "@repo/utils/constants";
import type { Database } from "@repo/db/client";

async function verifyTaskOwnership(
  db: Database,
  taskId: string,
  userId: string
) {
  const [task] = await db
    .select()
    .from(tasks)
    .where(eq(tasks.id, taskId))
    .limit(1);
  if (!task)
    throw new TRPCError({ code: "NOT_FOUND", message: "Task not found" });
  const [project] = await db
    .select({ id: projects.id })
    .from(projects)
    .where(
      and(eq(projects.id, task.projectId), eq(projects.userId, userId))
    )
    .limit(1);
  if (!project)
    throw new TRPCError({ code: "FORBIDDEN", message: "Not authorized" });
  return task;
}

export const taskRouter = createTRPCRouter({
  listByProject: protectedProcedure
    .input(z.object({ projectId: z.string(), limit: z.number().min(1).max(50).default(20), offset: z.number().min(0).default(0) }))
    .query(async ({ ctx, input }) => {
      // Returns empty array for missing/unauthorized projects to avoid
      // exposing project existence. Mutations throw errors instead.
      const [project] = await ctx.db.select({ id: projects.id }).from(projects)
        .where(and(eq(projects.id, input.projectId), eq(projects.userId, ctx.session.user.id))).limit(1);
      if (!project) return [];
      return ctx.db.select().from(tasks)
        .where(eq(tasks.projectId, input.projectId))
        .orderBy(desc(tasks.createdAt))
        .limit(input.limit).offset(input.offset);
    }),

  create: protectedProcedure
    .input(z.object({
      projectId: z.string(),
      title: z.string().min(1).max(200),
      description: z.string().max(1000).optional(),
      priority: z.enum(TASK_PRIORITIES).default("medium"),
      dueDate: z.coerce.date().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const [project] = await ctx.db.select({ id: projects.id }).from(projects)
        .where(and(eq(projects.id, input.projectId), eq(projects.userId, ctx.session.user.id))).limit(1);
      if (!project) throw new TRPCError({ code: "NOT_FOUND", message: "Project not found" });
      const [task] = await ctx.db.insert(tasks).values(input).returning();
      return task;
    }),

  update: protectedProcedure
    .input(z.object({
      id: z.string(),
      title: z.string().min(1).max(200).optional(),
      description: z.string().max(1000).optional(),
      status: z.enum(TASK_STATUSES).optional(),
      priority: z.enum(TASK_PRIORITIES).optional(),
      dueDate: z.coerce.date().nullable().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      await verifyTaskOwnership(ctx.db, id, ctx.session.user.id);
      const [updated] = await ctx.db.update(tasks).set({ ...data, updatedAt: new Date() })
        .where(eq(tasks.id, id)).returning();
      return updated;
    }),

  updateStatus: protectedProcedure
    .input(z.object({ id: z.string(), status: z.enum(TASK_STATUSES) }))
    .mutation(async ({ ctx, input }) => {
      await verifyTaskOwnership(ctx.db, input.id, ctx.session.user.id);
      const [updated] = await ctx.db.update(tasks)
        .set({ status: input.status, updatedAt: new Date() })
        .where(eq(tasks.id, input.id)).returning();
      return updated;
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await verifyTaskOwnership(ctx.db, input.id, ctx.session.user.id);
      const [deleted] = await ctx.db.delete(tasks).where(eq(tasks.id, input.id)).returning();
      return deleted;
    }),
});
