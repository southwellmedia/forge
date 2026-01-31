import { headers } from "next/headers";
import { cache } from "react";
import { auth } from "./server";
import type { AuthSession, User } from "./types";

export const getSession = cache(async (): Promise<AuthSession | null> => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return null;
  }

  return session as AuthSession;
});

export const getCurrentUser = cache(async (): Promise<User | null> => {
  const session = await getSession();
  return session?.user ?? null;
});

export const requireAuth = async (): Promise<AuthSession> => {
  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized");
  }
  return session;
};

export const requireUser = async (): Promise<User> => {
  const session = await requireAuth();
  return session.user;
};
