import { type NextRequest } from "next/server";
import { authMiddleware } from "@repo/auth/middleware";

export function middleware(request: NextRequest) {
  return authMiddleware(request);
}

export { config } from "@repo/auth/middleware";
