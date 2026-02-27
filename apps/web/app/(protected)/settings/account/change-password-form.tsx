"use client";

import { useState } from "react";
import { authClient } from "@repo/auth/client";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  Input,
  Label,
  FormField,
  FormMessage,
  FontAwesomeIcon,
  faLock,
  faEye,
  faEyeSlash,
  toast,
} from "@repo/ui";

export function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswords, setShowPasswords] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters");
      return;
    }

    setLoading(true);

    try {
      const result = await authClient.changePassword({
        currentPassword,
        newPassword,
        revokeOtherSessions: true,
      });

      if (result.error) {
        setError(result.error.message ?? "Failed to change password");
        return;
      }

      toast.success("Password changed successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const toggleIcon = (
    <button
      type="button"
      onClick={() => setShowPasswords(!showPasswords)}
      className="text-muted-foreground hover:text-foreground transition-colors"
      aria-label={showPasswords ? "Hide password" : "Show password"}
    >
      <FontAwesomeIcon
        icon={showPasswords ? faEyeSlash : faEye}
        className="h-4 w-4"
      />
    </button>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
        <CardDescription>
          Update your password to keep your account secure.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField>
            <Label htmlFor="currentPassword">Current password</Label>
            <Input
              id="currentPassword"
              type={showPasswords ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              autoComplete="current-password"
              startIcon={
                <FontAwesomeIcon icon={faLock} className="h-4 w-4" />
              }
              endIcon={toggleIcon}
            />
          </FormField>

          <FormField>
            <Label htmlFor="newPassword">New password</Label>
            <Input
              id="newPassword"
              type={showPasswords ? "text" : "password"}
              placeholder="Min. 8 characters"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              autoComplete="new-password"
              startIcon={
                <FontAwesomeIcon icon={faLock} className="h-4 w-4" />
              }
            />
          </FormField>

          <FormField>
            <Label htmlFor="confirmNewPassword">Confirm new password</Label>
            <Input
              id="confirmNewPassword"
              type={showPasswords ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password"
              startIcon={
                <FontAwesomeIcon icon={faLock} className="h-4 w-4" />
              }
            />
          </FormField>

          {error && <FormMessage>{error}</FormMessage>}

          <Button type="submit" disabled={loading}>
            {loading ? "Changing..." : "Change password"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
