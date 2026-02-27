import { db } from "./client";
import { users } from "./schema";
import { accounts } from "./schema/accounts";
import { projects } from "./schema/projects";
import { tasks } from "./schema/tasks";
import { hashPassword } from "better-auth/crypto";
import { generateRandomString } from "better-auth/crypto";
import { ROLE_ADMIN, ROLE_USER } from "@repo/utils/constants";
import { eq } from "drizzle-orm";

function getPassword(envVar: string): string {
  const fromEnv = process.env[envVar];
  if (fromEnv) return fromEnv;

  const generated = generateRandomString(24);
  console.log(
    `  ${envVar} not set, generated random password. Set ${envVar} to control this.`
  );
  return generated;
}

async function seedUser(
  tx: Parameters<Parameters<typeof db.transaction>[0]>[0],
  opts: {
    id: string;
    name: string;
    email: string;
    role: "user" | "admin";
    passwordEnvVar: string;
  }
) {
  const password = getPassword(opts.passwordEnvVar);
  const passwordHash = await hashPassword(password);

  await tx
    .insert(users)
    .values({
      id: opts.id,
      name: opts.name,
      email: opts.email,
      emailVerified: true,
      role: opts.role,
    })
    .onConflictDoNothing();

  // Verify user exists before inserting account
  const [existingUser] = await tx
    .select({ id: users.id })
    .from(users)
    .where(eq(users.id, opts.id));

  if (existingUser) {
    await tx
      .insert(accounts)
      .values({
        id: `seed-account-${opts.id}`,
        userId: existingUser.id,
        accountId: existingUser.id,
        providerId: "credential",
        password: passwordHash,
      })
      .onConflictDoNothing();
  }
}

async function seed() {
  console.log("Seeding database...");

  await db.transaction(async (tx) => {
    await seedUser(tx, {
      id: "seed-admin-1",
      name: "Admin User",
      email: "admin@example.com",
      role: ROLE_ADMIN,
      passwordEnvVar: "SEED_ADMIN_PASSWORD",
    });

    await seedUser(tx, {
      id: "seed-user-1",
      name: "Test User",
      email: "user@example.com",
      role: ROLE_USER,
      passwordEnvVar: "SEED_USER_PASSWORD",
    });

    // Seed projects and tasks
    // Projects for admin user
    await tx
      .insert(projects)
      .values([
        {
          id: "seed-project-1",
          userId: "seed-admin-1",
          name: "Website Redesign",
          description: "Complete overhaul of the company website with modern design patterns",
          status: "active",
        },
        {
          id: "seed-project-2",
          userId: "seed-admin-1",
          name: "API Migration",
          description: "Migrate legacy REST endpoints to tRPC",
          status: "active",
        },
        {
          id: "seed-project-3",
          userId: "seed-admin-1",
          name: "Q4 Planning",
          description: "Quarterly planning and roadmap documentation",
          status: "completed",
        },
      ])
      .onConflictDoNothing();

    // Projects for test user
    await tx
      .insert(projects)
      .values([
        {
          id: "seed-project-4",
          userId: "seed-user-1",
          name: "Personal Blog",
          description: "Build a personal blog with Next.js and MDX",
          status: "active",
        },
        {
          id: "seed-project-5",
          userId: "seed-user-1",
          name: "Recipe App",
          description: "Mobile-friendly recipe management application",
          status: "active",
        },
      ])
      .onConflictDoNothing();

    // Tasks for "Website Redesign"
    await tx
      .insert(tasks)
      .values([
        {
          id: "seed-task-1",
          projectId: "seed-project-1",
          title: "Design new homepage mockup",
          description: "Create Figma mockups for the new homepage layout",
          status: "done",
          priority: "high",
        },
        {
          id: "seed-task-2",
          projectId: "seed-project-1",
          title: "Implement responsive navigation",
          description: "Build mobile-first navigation component",
          status: "in_progress",
          priority: "high",
        },
        {
          id: "seed-task-3",
          projectId: "seed-project-1",
          title: "Set up analytics tracking",
          description: "Integrate analytics for the new site",
          status: "todo",
          priority: "medium",
        },
      ])
      .onConflictDoNothing();

    // Tasks for "API Migration"
    await tx
      .insert(tasks)
      .values([
        {
          id: "seed-task-4",
          projectId: "seed-project-2",
          title: "Audit existing REST endpoints",
          description: "Document all current REST API endpoints and their usage",
          status: "done",
          priority: "high",
        },
        {
          id: "seed-task-5",
          projectId: "seed-project-2",
          title: "Set up tRPC infrastructure",
          description: "Configure tRPC router, context, and middleware",
          status: "in_progress",
          priority: "high",
        },
      ])
      .onConflictDoNothing();

    // Tasks for "Personal Blog"
    await tx
      .insert(tasks)
      .values([
        {
          id: "seed-task-6",
          projectId: "seed-project-4",
          title: "Set up MDX processing",
          description: "Configure next-mdx-remote for blog post rendering",
          status: "todo",
          priority: "high",
        },
        {
          id: "seed-task-7",
          projectId: "seed-project-4",
          title: "Design blog post layout",
          description: "Create a clean, readable layout for blog posts",
          status: "todo",
          priority: "medium",
        },
        {
          id: "seed-task-8",
          projectId: "seed-project-4",
          title: "Add RSS feed",
          description: "Generate an RSS feed from published posts",
          status: "todo",
          priority: "low",
        },
      ])
      .onConflictDoNothing();
  });

  console.log("Seeding complete!");
  console.log("  Admin: admin@example.com");
  console.log("  User:  user@example.com");
}

seed()
  .catch((err) => {
    console.error("Seeding failed:", err);
    process.exit(1);
  })
  .then(() => {
    process.exit(0);
  });
