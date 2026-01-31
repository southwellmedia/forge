import { toNextJsHandler } from "better-auth/next-js";

export const dynamic = "force-dynamic";

async function getAuth() {
  const { auth } = await import("@repo/auth/server");
  return auth;
}

const handler = async (request: Request) => {
  const auth = await getAuth();
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
