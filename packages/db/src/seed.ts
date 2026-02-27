import { db } from "./client";
import { users } from "./schema";
import { accounts } from "./schema/accounts";
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
