// Server
export { auth, type Auth } from "./server";

// Client
export {
  authClient,
  signIn,
  signOut,
  signUp,
  useSession,
  getSession as getClientSession,
} from "./client";

// Middleware
export { authMiddleware, config as authMiddlewareConfig } from "./middleware";

// DAL (Data Access Layer)
export { getSession, getCurrentUser, requireAuth, requireUser } from "./dal";

// Types
export type { Session, User, AuthSession } from "./types";
