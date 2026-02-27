import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { getDb } from "@repo/db/client";
import { sendEmail } from "@repo/email";
import { ROLE_USER } from "@repo/utils/constants";

let _auth: ReturnType<typeof betterAuth> | null = null;

export function getAuth() {
  if (_auth) return _auth;

  const db = getDb();

  _auth = betterAuth({
    database: drizzleAdapter(db, {
      provider: "pg",
    }),
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: true,
      async sendResetPassword({ user, url }) {
        await sendEmail({
          to: user.email,
          template: "reset-password",
          props: {
            name: user.name,
            resetUrl: url,
          },
        });
      },
    },
    emailVerification: {
      sendOnSignUp: true,
      autoSignInAfterVerification: true,
      async sendVerificationEmail({ user, url }) {
        await sendEmail({
          to: user.email,
          template: "verify-email",
          props: {
            name: user.name,
            verificationUrl: url,
          },
        });
      },
    },
    user: {
      additionalFields: {
        role: {
          type: "string",
          defaultValue: ROLE_USER,
          input: false,
        },
      },
    },
    socialProviders: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID ?? "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        enabled: !!(
          process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
        ),
      },
      github: {
        clientId: process.env.GITHUB_CLIENT_ID ?? "",
        clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
        enabled: !!(
          process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET
        ),
      },
    },
    session: {
      expiresIn: 60 * 60 * 24 * 7, // 7 days
      updateAge: 60 * 60 * 24, // 1 day
      cookieCache: {
        enabled: true,
        maxAge: 60 * 5, // 5 minutes
      },
    },
    trustedOrigins: [process.env.BETTER_AUTH_URL ?? "http://localhost:3000"],
  });

  return _auth;
}

// Lazy export - auth will be initialized on first access
export const auth = new Proxy({} as ReturnType<typeof getAuth>, {
  get(_, prop) {
    const instance = getAuth();
    return (instance as unknown as Record<string | symbol, unknown>)[prop];
  },
});

export type Auth = ReturnType<typeof getAuth>;
