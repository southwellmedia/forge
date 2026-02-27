"use client";

import Link from "next/link";
import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Divider,
  Fade,
  Progress,
  SpotlightCard,
  StatCard,
  StaggerContainer,
  StaggerItem,
  FontAwesomeIcon,
  faFolder,
  faBolt,
  faCheckCircle,
  faClock,
} from "@repo/ui";

interface ProjectWithProgress {
  id: string;
  name: string;
  description: string | null;
  status: string;
  createdAt: Date;
  totalTasks: number;
  completedTasks: number;
}

interface DashboardContentProps {
  userName: string;
  stats: {
    totalProjects: number;
    activeTasks: number;
    completedTasks: number;
    overdueTasks: number;
    totalTasks: number;
  };
  recentProjects: ProjectWithProgress[];
}

const statusBadgeVariant: Record<string, "success" | "default" | "secondary" | "outline"> = {
  active: "success",
  completed: "default",
  archived: "outline",
};

const statusBadgeLabel: Record<string, string> = {
  active: "Active",
  completed: "Completed",
  archived: "Archived",
};

export function DashboardContent({ userName, stats, recentProjects }: DashboardContentProps) {
  const completionRate =
    stats.totalTasks > 0
      ? Math.round((stats.completedTasks / stats.totalTasks) * 100)
      : 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <Fade direction="up" delay={0}>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="mt-1 text-muted-foreground">
            Welcome back, {userName.split(" ")[0]}
          </p>
        </div>
      </Fade>

      {/* Stats Row */}
      <StaggerContainer speed="fast" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StaggerItem>
          <SpotlightCard spotlightSize={200} className="h-full">
            <StatCard
              label="Projects"
              value={stats.totalProjects}
              accent="info"
              variant="soft"
              className="h-full border-0 shadow-none"
              icon={
                <FontAwesomeIcon icon={faFolder} className="h-4 w-4" />
              }
            />
          </SpotlightCard>
        </StaggerItem>
        <StaggerItem>
          <SpotlightCard spotlightSize={200} className="h-full">
            <StatCard
              label="In Progress"
              value={stats.activeTasks}
              accent="warning"
              variant="soft"
              className="h-full border-0 shadow-none"
              icon={
                <FontAwesomeIcon icon={faBolt} className="h-4 w-4" />
              }
            />
          </SpotlightCard>
        </StaggerItem>
        <StaggerItem>
          <SpotlightCard spotlightSize={200} className="h-full">
            <StatCard
              label="Completed"
              value={stats.completedTasks}
              accent="success"
              variant="soft"
              className="h-full border-0 shadow-none"
              icon={
                <FontAwesomeIcon icon={faCheckCircle} className="h-4 w-4" />
              }
            />
          </SpotlightCard>
        </StaggerItem>
        <StaggerItem>
          <SpotlightCard spotlightSize={200} className="h-full">
            <StatCard
              label="Overdue"
              value={stats.overdueTasks}
              accent={stats.overdueTasks > 0 ? "error" : "default"}
              variant="soft"
              className="h-full border-0 shadow-none"
              icon={
                <FontAwesomeIcon icon={faClock} className="h-4 w-4" />
              }
            />
          </SpotlightCard>
        </StaggerItem>
      </StaggerContainer>

      {/* Overall Completion */}
      {stats.totalTasks > 0 && (
        <Fade direction="up" delay={0.15}>
          <Card variant="soft">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-muted-foreground">
                  Overall completion
                </span>
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
              <p className="mt-2 text-xs text-muted-foreground">
                {stats.completedTasks} of {stats.totalTasks} tasks completed across all projects
              </p>
            </CardContent>
          </Card>
        </Fade>
      )}

      <Divider soft />

      {/* Recent Projects — full width now */}
      <Fade direction="up" delay={0.2}>
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Recent Projects</CardTitle>
              <Badge variant="soft" size="xs">
                {stats.totalProjects} total
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            {recentProjects.length === 0 ? (
              <div className="py-12 text-center">
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
              </div>
            ) : (
              <StaggerContainer speed="fast" className="space-y-3">
                {recentProjects.map((project) => {
                  const projectCompletion =
                    project.totalTasks > 0
                      ? Math.round(
                          (project.completedTasks / project.totalTasks) * 100
                        )
                      : 0;

                  return (
                    <StaggerItem key={project.id}>
                      <Link href={`/projects/${project.id}`}>
                        <Card
                          variant="ghost"
                          className="p-4 cursor-pointer transition-colors hover:bg-muted/50"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0 flex-1 space-y-2">
                              <div className="flex items-center gap-2">
                                <span className="font-medium truncate">
                                  {project.name}
                                </span>
                                <Badge
                                  variant={
                                    statusBadgeVariant[project.status] ?? "default"
                                  }
                                  size="xs"
                                >
                                  {statusBadgeLabel[project.status] ??
                                    project.status}
                                </Badge>
                              </div>
                              {project.description && (
                                <p className="text-sm text-muted-foreground line-clamp-1">
                                  {project.description}
                                </p>
                              )}
                              {project.totalTasks > 0 && (
                                <div className="flex items-center gap-3">
                                  <Progress
                                    value={projectCompletion}
                                    size="xs"
                                    colorVariant={
                                      projectCompletion === 100
                                        ? "success"
                                        : "default"
                                    }
                                    className="flex-1 max-w-[180px]"
                                  />
                                  <span className="text-xs text-muted-foreground tabular-nums whitespace-nowrap">
                                    {project.completedTasks}/{project.totalTasks}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </Card>
                      </Link>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>
            )}
          </CardContent>
        </Card>
      </Fade>
    </div>
  );
}
