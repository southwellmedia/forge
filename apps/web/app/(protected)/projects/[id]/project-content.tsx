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
  CardDescription,
  Divider,
  Fade,
  Progress,
  Stack,
  StaggerContainer,
  StaggerItem,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  Input,
  Label,
  Textarea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  FontAwesomeIcon,
  faArrowLeft,
  faPlus,
  faEllipsisH,
  faCheckCircle,
  faClock,
  faCircleRegular,
  faTag,
  toast,
} from "@repo/ui";

interface Task {
  id: string;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  dueDate: string | null;
  createdAt: string;
}

interface ProjectContentProps {
  project: {
    id: string;
    name: string;
    description: string | null;
    status: string;
    createdAt: string;
  };
  tasks: Task[];
}

const statusConfig: Record<
  string,
  { label: string; variant: "outline" | "default" | "secondary" | "success"; icon: typeof faCircleRegular }
> = {
  todo: { label: "To Do", variant: "outline", icon: faCircleRegular },
  in_progress: { label: "In Progress", variant: "default", icon: faClock },
  done: { label: "Done", variant: "success", icon: faCheckCircle },
};

const priorityConfig: Record<
  string,
  { label: string; variant: "soft" | "warning" | "error" }
> = {
  low: { label: "Low", variant: "soft" },
  medium: { label: "Medium", variant: "warning" },
  high: { label: "High", variant: "error" },
};

const projectStatusConfig: Record<
  string,
  { label: string; variant: "success" | "default" | "outline" }
> = {
  active: { label: "Active", variant: "success" },
  completed: { label: "Completed", variant: "default" },
  archived: { label: "Archived", variant: "outline" },
};

export function ProjectContent({
  project,
  tasks: initialTasks,
}: ProjectContentProps) {
  const router = useRouter();
  const [currentTasks, setCurrentTasks] = useState(initialTasks);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState("medium");

  const totalTasks = currentTasks.length;
  const completedTasks = currentTasks.filter((t) => t.status === "done").length;
  const completionRate =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const todoTasks = currentTasks.filter((t) => t.status === "todo");
  const inProgressTasks = currentTasks.filter(
    (t) => t.status === "in_progress"
  );
  const doneTasks = currentTasks.filter((t) => t.status === "done");

  const updateStatus = trpc.task.updateStatus.useMutation({
    onSuccess: (updated) => {
      if (!updated) return;
      setCurrentTasks((prev) =>
        prev.map((t) =>
          t.id === updated.id ? { ...t, status: updated.status } : t
        )
      );
      toast.success(`Task moved to ${statusConfig[updated.status]?.label}`);
    },
    onError: (err) => toast.error(err.message),
  });

  const createTask = trpc.task.create.useMutation({
    onSuccess: (created) => {
      if (!created) return;
      setCurrentTasks((prev) => [
        {
          id: created.id,
          title: created.title,
          description: created.description,
          status: created.status,
          priority: created.priority,
          dueDate: created.dueDate?.toISOString() ?? null,
          createdAt: created.createdAt.toISOString(),
        },
        ...prev,
      ]);
      setAddDialogOpen(false);
      setNewTaskTitle("");
      setNewTaskDescription("");
      setNewTaskPriority("medium");
      toast.success("Task created");
    },
    onError: (err) => toast.error(err.message),
  });

  const deleteTask = trpc.task.delete.useMutation({
    onSuccess: (deleted) => {
      if (!deleted) return;
      setCurrentTasks((prev) => prev.filter((t) => t.id !== deleted.id));
      toast.success("Task deleted");
    },
    onError: (err) => toast.error(err.message),
  });

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    createTask.mutate({
      projectId: project.id,
      title: newTaskTitle.trim(),
      description: newTaskDescription.trim() || undefined,
      priority: newTaskPriority as "low" | "medium" | "high",
    });
  };

  const handleStatusChange = (taskId: string, newStatus: string) => {
    updateStatus.mutate({
      id: taskId,
      status: newStatus as "todo" | "in_progress" | "done",
    });
  };

  const projStatus = projectStatusConfig[project.status];

  return (
    <div className="space-y-6">
      {/* Back + Header */}
      <Fade direction="up" delay={0}>
        <div className="space-y-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard">
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2 h-3 w-3" />
              Dashboard
            </Link>
          </Button>

          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold tracking-tight">
                  {project.name}
                </h1>
                {projStatus && (
                  <Badge variant={projStatus.variant} size="sm">
                    {projStatus.label}
                  </Badge>
                )}
              </div>
              {project.description && (
                <p className="text-muted-foreground">{project.description}</p>
              )}
            </div>

            <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <FontAwesomeIcon icon={faPlus} className="mr-2 h-3 w-3" />
                  Add Task
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>New Task</DialogTitle>
                  <DialogDescription>
                    Add a task to {project.name}
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAddTask} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={newTaskTitle}
                      onChange={(e) => setNewTaskTitle(e.target.value)}
                      placeholder="What needs to be done?"
                      autoFocus
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">
                      Description{" "}
                      <span className="text-muted-foreground font-normal">
                        (optional)
                      </span>
                    </Label>
                    <Textarea
                      id="description"
                      value={newTaskDescription}
                      onChange={(e) => setNewTaskDescription(e.target.value)}
                      placeholder="Add details..."
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Priority</Label>
                    <Select
                      value={newTaskPriority}
                      onValueChange={setNewTaskPriority}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
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
                      disabled={
                        !newTaskTitle.trim() || createTask.isPending
                      }
                    >
                      {createTask.isPending ? "Creating..." : "Create Task"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </Fade>

      {/* Progress */}
      {totalTasks > 0 && (
        <Fade direction="up" delay={0.1}>
          <Card variant="soft">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <Stack direction="row" gap="4" align="center">
                  <span className="text-sm font-medium text-muted-foreground">
                    Progress
                  </span>
                  <Stack direction="row" gap="2">
                    <Badge variant="outline" size="xs">
                      {todoTasks.length} to do
                    </Badge>
                    <Badge variant="default" size="xs">
                      {inProgressTasks.length} in progress
                    </Badge>
                    <Badge variant="success" size="xs">
                      {doneTasks.length} done
                    </Badge>
                  </Stack>
                </Stack>
                <span className="text-sm font-bold tabular-nums">
                  {completionRate}%
                </span>
              </div>
              <Progress
                value={completionRate}
                size="sm"
                colorVariant={
                  completionRate === 100
                    ? "success"
                    : completionRate >= 50
                      ? "gradient"
                      : "default"
                }
                glow={completionRate === 100}
              />
            </CardContent>
          </Card>
        </Fade>
      )}

      <Divider soft />

      {/* Tasks */}
      <Fade direction="up" delay={0.2}>
        <Tabs defaultValue="all">
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="all">
                All ({totalTasks})
              </TabsTrigger>
              <TabsTrigger value="todo">
                To Do ({todoTasks.length})
              </TabsTrigger>
              <TabsTrigger value="in_progress">
                In Progress ({inProgressTasks.length})
              </TabsTrigger>
              <TabsTrigger value="done">
                Done ({doneTasks.length})
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all">
            <TaskList
              tasks={currentTasks}
              onStatusChange={handleStatusChange}
              onDelete={(id) => deleteTask.mutate({ id })}
            />
          </TabsContent>
          <TabsContent value="todo">
            <TaskList
              tasks={todoTasks}
              onStatusChange={handleStatusChange}
              onDelete={(id) => deleteTask.mutate({ id })}
            />
          </TabsContent>
          <TabsContent value="in_progress">
            <TaskList
              tasks={inProgressTasks}
              onStatusChange={handleStatusChange}
              onDelete={(id) => deleteTask.mutate({ id })}
            />
          </TabsContent>
          <TabsContent value="done">
            <TaskList
              tasks={doneTasks}
              onStatusChange={handleStatusChange}
              onDelete={(id) => deleteTask.mutate({ id })}
            />
          </TabsContent>
        </Tabs>
      </Fade>
    </div>
  );
}

function TaskList({
  tasks,
  onStatusChange,
  onDelete,
}: {
  tasks: Task[];
  onStatusChange: (taskId: string, status: string) => void;
  onDelete: (taskId: string) => void;
}) {
  if (tasks.length === 0) {
    return (
      <Card variant="ghost" className="py-12 text-center">
        <p className="text-sm text-muted-foreground">No tasks here.</p>
      </Card>
    );
  }

  return (
    <StaggerContainer speed="fast" className="space-y-2">
      {tasks.map((task) => {
        const status = statusConfig[task.status];
        const priority = priorityConfig[task.priority];

        return (
          <StaggerItem key={task.id}>
            <Card
              variant="ghost"
              className="p-4 transition-colors hover:bg-muted/50"
            >
              <div className="flex items-start gap-3">
                {/* Status toggle button */}
                <button
                  type="button"
                  className="mt-0.5 shrink-0 text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => {
                    const cycle: Record<string, string> = {
                      todo: "in_progress",
                      in_progress: "done",
                      done: "todo",
                    };
                    onStatusChange(task.id, cycle[task.status] ?? "todo");
                  }}
                  aria-label={`Mark as ${
                    task.status === "todo"
                      ? "in progress"
                      : task.status === "in_progress"
                        ? "done"
                        : "to do"
                  }`}
                >
                  <FontAwesomeIcon
                    icon={status?.icon ?? faCircleRegular}
                    className={`h-4 w-4 ${
                      task.status === "done"
                        ? "text-success"
                        : task.status === "in_progress"
                          ? "text-primary"
                          : ""
                    }`}
                  />
                </button>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-medium text-sm ${
                        task.status === "done"
                          ? "line-through text-muted-foreground"
                          : ""
                      }`}
                    >
                      {task.title}
                    </span>
                    {priority && (
                      <Badge variant={priority.variant} size="xs">
                        <FontAwesomeIcon
                          icon={faTag}
                          className="mr-1 h-2.5 w-2.5"
                        />
                        {priority.label}
                      </Badge>
                    )}
                  </div>
                  {task.description && (
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-1">
                      {task.description}
                    </p>
                  )}
                </div>

                {/* Actions */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 shrink-0"
                    >
                      <FontAwesomeIcon
                        icon={faEllipsisH}
                        className="h-3.5 w-3.5"
                      />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => onStatusChange(task.id, "todo")}
                      disabled={task.status === "todo"}
                    >
                      Move to To Do
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onStatusChange(task.id, "in_progress")}
                      disabled={task.status === "in_progress"}
                    >
                      Move to In Progress
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onStatusChange(task.id, "done")}
                      disabled={task.status === "done"}
                    >
                      Move to Done
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => onDelete(task.id)}
                      className="text-error"
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </Card>
          </StaggerItem>
        );
      })}
    </StaggerContainer>
  );
}
