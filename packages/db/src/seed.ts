import { db } from "./client";
import { users } from "./schema";
import { accounts } from "./schema/accounts";
import { hashPassword } from "better-auth/crypto";

async function seed() {
  console.log("Seeding database...");

  // Create admin user
  const adminId = "seed-admin-1";
  const adminPasswordHash = await hashPassword("admin123456");

  await db
    .insert(users)
    .values({
      id: adminId,
      name: "Admin User",
      email: "admin@example.com",
      emailVerified: true,
      role: "admin",
    })
    .onConflictDoNothing();

  await db
    .insert(accounts)
    .values({
      id: "seed-account-admin-1",
      userId: adminId,
      accountId: adminId,
      providerId: "credential",
      password: adminPasswordHash,
    })
    .onConflictDoNothing();

  // Create regular user
  const userId = "seed-user-1";
  const userPasswordHash = await hashPassword("user123456");

  await db
    .insert(users)
    .values({
      id: userId,
      name: "Test User",
      email: "user@example.com",
      emailVerified: true,
      role: "user",
    })
    .onConflictDoNothing();

  await db
    .insert(accounts)
    .values({
      id: "seed-account-user-1",
      userId: userId,
      accountId: userId,
      providerId: "credential",
      password: userPasswordHash,
    })
    .onConflictDoNothing();

  console.log("Seeding complete!");
  console.log("  Admin: admin@example.com / admin123456");
  console.log("  User:  user@example.com / user123456");
}

seed()
  .catch((err) => {
    console.error("Seeding failed:", err);
    process.exit(1);
  })
  .then(() => {
    process.exit(0);
  });
