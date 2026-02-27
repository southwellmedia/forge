import { toNextJsHandler } from "better-auth/next-js";
import { getAuth } from "@repo/auth/server";

export const dynamic = "force-dynamic";

const handler = async (request: Request) => {
  const auth = getAuth();
  const handlers = toNextJsHandler(auth);

  if (request.method === "GET") {
    return handlers.GET(request);
  } else if (request.method === "POST") {
    return handlers.POST(request);
  }

  return new Response("Method not allowed", { status: 405 });
};

export const GET = handler;
export const POST = handler;
