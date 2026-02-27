import { pgEnum, pgTable, text, timestamp, boolean } from "drizzle-orm/pg-core";
import { ROLES, ROLE_USER } from "@repo/utils/constants";

export const roleEnum = pgEnum("role", ROLES);

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull().default(false),
  image: text("image"),
  role: roleEnum("role").notNull().default(ROLE_USER),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
