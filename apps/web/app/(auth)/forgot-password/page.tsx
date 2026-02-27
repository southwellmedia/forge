import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Alert,
  AlertDescription,
} from "@repo/ui";

export default function ForgotPasswordPage() {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Reset your password</CardTitle>
        <CardDescription>
          Password reset functionality is not yet available.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Alert>
          <AlertDescription>
            Password reset via email is coming soon. In the meantime, please
            contact an administrator if you need to reset your password.
          </AlertDescription>
        </Alert>
      </CardContent>

      <CardFooter className="justify-center">
        <p className="text-sm text-muted-foreground">
          Remember your password?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
