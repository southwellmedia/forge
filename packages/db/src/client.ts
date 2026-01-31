import { drizzle } from "drizzle-orm/postgres-js";
import { drizzle as drizzleNeon } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import postgres from "postgres";
import * as schema from "./schema";

const isProduction = process.env.NODE_ENV === "production";
const isVercel = !!process.env.VERCEL;

let _db: ReturnType<typeof drizzle> | ReturnType<typeof drizzleNeon> | null = null;

export function getDb() {
  if (_db) return _db;

  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
  }

  // Use Neon serverless driver for Vercel/Edge runtime
  if (isProduction || isVercel) {
    const sql = neon(connectionString);
    _db = drizzleNeon(sql, { schema });
  } else {
    // Use postgres.js for local development
    const client = postgres(connectionString);
    _db = drizzle(client, { schema });
  }

  return _db;
}

// Export a getter that initializes lazily
export const db = new Proxy({} as ReturnType<typeof getDb>, {
  get(_, prop) {
    const instance = getDb();
    return (instance as unknown as Record<string | symbol, unknown>)[prop];
  },
});

export type Database = ReturnType<typeof getDb>;
