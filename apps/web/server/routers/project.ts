import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { projects, tasks } from "@repo/db/schema";
import { eq, and, desc } from "drizzle-orm";

export const projectRouter = createTRPCRouter({
  list: protectedProcedure
    .input(z.object({ limit: z.number().min(1).max(50).default(20), offset: z.number().min(0).default(0) }).optional())
    .query(async ({ ctx, input }) => {
      const { limit = 20, offset = 0 } = input ?? {};
      return ctx.db
        .select()
        .from(projects)
        .where(eq(projects.userId, ctx.session.user.id))
        .orderBy(desc(projects.createdAt))
        .limit(limit)
        .offset(offset);
    }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const [project] = await ctx.db
        .select()
        .from(projects)
        .where(and(eq(projects.id, input.id), eq(projects.userId, ctx.session.user.id)))
        .limit(1);
      if (!project) return null;
      const projectTasks = await ctx.db
        .select()
        .from(tasks)
        .where(eq(tasks.projectId, project.id))
        .orderBy(desc(tasks.createdAt));
      return { ...project, tasks: projectTasks };
    }),

  create: protectedProcedure
    .input(z.object({ name: z.string().min(1).max(100), description: z.string().max(500).optional() }))
    .mutation(async ({ ctx, input }) => {
      const [project] = await ctx.db
        .insert(projects)
        .values({ userId: ctx.session.user.id, name: input.name, description: input.description })
        .returning();
      return project;
    }),

  update: protectedProcedure
    .input(z.object({
      id: z.string(),
      name: z.string().min(1).max(100).optional(),
      description: z.string().max(500).optional(),
      status: z.enum(["active", "archived", "completed"]).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      const [updated] = await ctx.db
        .update(projects)
        .set({ ...data, updatedAt: new Date() })
        .where(and(eq(projects.id, id), eq(projects.userId, ctx.session.user.id)))
        .returning();
      return updated;
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const [deleted] = await ctx.db
        .delete(projects)
        .where(and(eq(projects.id, input.id), eq(projects.userId, ctx.session.user.id)))
        .returning();
      return deleted;
    }),
});
