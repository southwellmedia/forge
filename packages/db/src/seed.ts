import { db } from "./client";
import { users } from "./schema";

async function seed() {
  console.log("Seeding database...");

  // Add seed data here if needed
  // Example:
  // await db.insert(users).values({
  //   id: "seed-user-1",
  //   name: "Test User",
  //   email: "test@example.com",
  //   emailVerified: true,
  // });

  console.log("Seeding complete!");
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
