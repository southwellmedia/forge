import { pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { PROJECT_STATUSES } from "@repo/utils/constants";
import { users } from "./users";

export const projectStatusEnum = pgEnum("project_status", PROJECT_STATUSES);

export const projects = pgTable("projects", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  description: text("description"),
  status: projectStatusEnum("status").notNull().default("active"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
