"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { authClient } from "@repo/auth/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  FontAwesomeIcon,
  faCheckCircle,
  faEnvelope,
} from "@repo/ui";

export function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<
    "verifying" | "success" | "error" | "no-token"
  >(token ? "verifying" : "no-token");

  useEffect(() => {
    if (!token) return;

    authClient
      .verifyEmail({ query: { token } })
      .then((result) => {
        if (result.error) {
          setStatus("error");
        } else {
          setStatus("success");
        }
      })
      .catch(() => {
        setStatus("error");
      });
  }, [token]);

  useEffect(() => {
    if (status !== "success") return;
    const timeout = setTimeout(() => router.push("/dashboard"), 3000);
    return () => clearTimeout(timeout);
  }, [status, router]);

  if (status === "no-token") {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
            <FontAwesomeIcon
              icon={faEnvelope}
              className="h-6 w-6 text-blue-600"
            />
          </div>
          <CardTitle className="text-2xl">Check your email</CardTitle>
          <CardDescription>
            We&apos;ve sent you a verification link. Please check your inbox and
            click the link to verify your email address.
          </CardDescription>
        </CardHeader>
        <CardFooter className="justify-center">
          <p className="text-sm text-muted-foreground">
            Already verified?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    );
  }

  if (status === "verifying") {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Verifying...</CardTitle>
          <CardDescription>
            Please wait while we verify your email address.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (status === "success") {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <FontAwesomeIcon
              icon={faCheckCircle}
              className="h-6 w-6 text-green-600"
            />
          </div>
          <CardTitle className="text-2xl">Email verified</CardTitle>
          <CardDescription>
            Your email has been verified successfully. Redirecting to
            dashboard...
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Link
            href="/dashboard"
            className="text-primary hover:underline text-sm"
          >
            Go to dashboard
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Verification failed</CardTitle>
        <CardDescription>
          This verification link is invalid or has expired.
        </CardDescription>
      </CardHeader>
      <CardFooter className="justify-center">
        <p className="text-sm text-muted-foreground">
          Need a new link?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Sign in to request one
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
