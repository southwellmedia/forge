import { type NextRequest } from "next/server";
import { authMiddleware } from "@repo/auth/middleware";

export function middleware(request: NextRequest) {
  return authMiddleware(request);
}

export const config = {
  matcher: [
    "/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\..*|_next).*)",
  ],
};
