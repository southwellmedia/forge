"use client";

import { useState } from "react";
import { trpc } from "@/lib/trpc";
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
  Avatar,
  AvatarFallback,
  AvatarImage,
  FontAwesomeIcon,
  faUser,
  toast,
} from "@repo/ui";

interface ProfileFormProps {
  user: {
    id: string;
    name: string;
    email: string;
    image?: string | null;
  };
}

export function ProfileForm({ user }: ProfileFormProps) {
  const [name, setName] = useState(user.name);
  const [error, setError] = useState("");

  const utils = trpc.useUtils();
  const updateProfile = trpc.user.updateProfile.useMutation({
    onSuccess: () => {
      utils.user.me.invalidate();
      toast.success("Profile updated successfully");
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  const displayName = name?.trim() || user.name;
  const nameSegments = displayName.split(" ").filter((s) => s.length > 0);
  const initials = nameSegments.length > 0
    ? nameSegments.map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : user.email[0]?.toUpperCase() || null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Name is required");
      return;
    }

    updateProfile.mutate({ name: name.trim() });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>Update your display name.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar size="lg">
              {user.image && <AvatarImage src={user.image} alt={displayName} />}
              <AvatarFallback>
                {initials ?? <FontAwesomeIcon icon={faUser} className="h-5 w-5" />}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{displayName}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>

          <FormField>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />
          </FormField>

          <FormField>
            <Label htmlFor="email">Email</Label>
            <Input id="email" value={user.email} disabled />
            <p className="text-xs text-muted-foreground">
              Email cannot be changed.
            </p>
          </FormField>

          {error && <FormMessage>{error}</FormMessage>}

          <Button type="submit" disabled={updateProfile.isPending}>
            {updateProfile.isPending ? "Saving..." : "Save changes"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
