"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  Divider,
  Fade,
  Input,
  Label,
  Progress,
  StaggerContainer,
  StaggerItem,
  Textarea,
  FontAwesomeIcon,
  faFolder,
  faPlus,
  toast,
} from "@repo/ui";

interface Project {
  id: string;
  name: string;
  description: string | null;
  status: string;
  createdAt: string;
  totalTasks: number;
  completedTasks: number;
}

interface ProjectsContentProps {
  projects: Project[];
}

const statusBadgeVariant: Record<
  string,
  "success" | "default" | "secondary" | "outline"
> = {
  active: "success",
  completed: "default",
  archived: "outline",
};

const statusBadgeLabel: Record<string, string> = {
  active: "Active",
  completed: "Completed",
  archived: "Archived",
};

export function ProjectsContent({
  projects: initialProjects,
}: ProjectsContentProps) {
  const router = useRouter();
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const createProject = trpc.project.create.useMutation({
    onSuccess: (created) => {
      if (!created) return;
      setAddDialogOpen(false);
      setNewName("");
      setNewDescription("");
      toast.success("Project created");
      router.refresh();
    },
    onError: (err) => toast.error(err.message),
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    createProject.mutate({
      name: newName.trim(),
      description: newDescription.trim() || undefined,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Fade direction="up" delay={0}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
            <p className="mt-1 text-muted-foreground">
              Manage your projects and tasks
            </p>
          </div>
          <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <FontAwesomeIcon icon={faPlus} className="mr-2 h-3 w-3" />
                New Project
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>New Project</DialogTitle>
                <DialogDescription>
                  Create a new project to organize your tasks
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreate} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="project-name">Name</Label>
                  <Input
                    id="project-name"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="My Project"
                    autoFocus
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="project-description">
                    Description{" "}
                    <span className="text-muted-foreground font-normal">
                      (optional)
                    </span>
                  </Label>
                  <Textarea
                    id="project-description"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    placeholder="What is this project about?"
                    rows={3}
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setAddDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={!newName.trim() || createProject.isPending}
                  >
                    {createProject.isPending ? "Creating..." : "Create Project"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </Fade>

      <Divider soft />

      {/* Projects List */}
      <Fade direction="up" delay={0.1}>
        {initialProjects.length === 0 ? (
          <Card variant="ghost" className="py-16 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
              <FontAwesomeIcon
                icon={faFolder}
                className="h-5 w-5 text-muted-foreground"
              />
            </div>
            <p className="text-sm font-medium">No projects yet</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Create your first project to get started.
            </p>
          </Card>
        ) : (
          <StaggerContainer speed="fast" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {initialProjects.map((project) => {
              const completion =
                project.totalTasks > 0
                  ? Math.round(
                      (project.completedTasks / project.totalTasks) * 100
                    )
                  : 0;

              return (
                <StaggerItem key={project.id}>
                  <Link href={`/projects/${project.id}`}>
                    <Card className="h-full cursor-pointer transition-colors hover:bg-muted/50">
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between gap-2">
                          <CardTitle className="text-base truncate">
                            {project.name}
                          </CardTitle>
                          <Badge
                            variant={
                              statusBadgeVariant[project.status] ?? "default"
                            }
                            size="xs"
                            className="shrink-0"
                          >
                            {statusBadgeLabel[project.status] ?? project.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {project.description && (
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {project.description}
                          </p>
                        )}
                        {project.totalTasks > 0 ? (
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-muted-foreground">
                                {project.completedTasks}/{project.totalTasks}{" "}
                                tasks
                              </span>
                              <span className="text-xs font-medium tabular-nums">
                                {completion}%
                              </span>
                            </div>
                            <Progress
                              value={completion}
                              size="xs"
                              colorVariant={
                                completion === 100 ? "success" : "default"
                              }
                            />
                          </div>
                        ) : (
                          <p className="text-xs text-muted-foreground">
                            No tasks yet
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        )}
      </Fade>
    </div>
  );
}
