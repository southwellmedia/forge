#!/usr/bin/env node

import * as p from "@clack/prompts";
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const REPO_URL = "https://github.com/southwellmedia/forge.git";

async function main() {
  p.intro("create-forge-app");

  const project = await p.group(
    {
      name: () =>
        p.text({
          message: "Project name",
          placeholder: "my-forge-app",
          validate(value) {
            if (!value) return "Project name is required";
            if (!/^[a-z0-9-]+$/.test(value))
              return "Use lowercase letters, numbers, and hyphens only";
            if (fs.existsSync(value))
              return `Directory "${value}" already exists`;
          },
        }),

      description: () =>
        p.text({
          message: "Project description",
          placeholder: "A web application built with Forge",
        }),

      install: () =>
        p.confirm({
          message: "Install dependencies?",
          initialValue: true,
        }),
    },
    {
      onCancel() {
        p.cancel("Setup cancelled.");
        process.exit(0);
      },
    }
  );

  const s = p.spinner();

  // Clone the template
  s.start("Cloning Forge template");
  try {
    execSync(`git clone --depth 1 ${REPO_URL} ${project.name}`, {
      stdio: "pipe",
    });
    // Remove .git directory so user starts fresh
    fs.rmSync(path.join(project.name, ".git"), {
      recursive: true,
      force: true,
    });
  } catch (err) {
    s.stop("Failed to clone template");
    p.log.error(
      "Could not clone the Forge repository. Check your internet connection."
    );
    process.exit(1);
  }
  s.stop("Template cloned");

  // Update package names
  s.start("Customizing project");
  const rootPkgPath = path.join(project.name, "package.json");
  const rootPkg = JSON.parse(fs.readFileSync(rootPkgPath, "utf-8"));
  rootPkg.name = project.name;
  if (project.description) {
    rootPkg.description = project.description;
  }
  fs.writeFileSync(rootPkgPath, JSON.stringify(rootPkg, null, 2) + "\n");
  s.stop("Project customized");

  // Install dependencies
  if (project.install) {
    s.start("Installing dependencies");
    try {
      execSync("pnpm install", {
        cwd: project.name,
        stdio: "pipe",
      });
      s.stop("Dependencies installed");
    } catch {
      s.stop("Failed to install dependencies");
      p.log.warn(
        "Could not install dependencies. Run `pnpm install` manually."
      );
    }
  }

  // Initialize git
  s.start("Initializing git repository");
  try {
    execSync(
      "git init && git add -A && git commit -m 'Initial commit from create-forge-app'",
      {
        cwd: project.name,
        stdio: "pipe",
      }
    );
  } catch {
    // Non-critical — git init might fail if git isn't installed
  }
  s.stop("Git repository initialized");

  p.note(
    [
      `cd ${project.name}`,
      "",
      "# Set up your environment",
      "cp .env.example .env",
      "# Edit .env with your database URL and auth secrets",
      "",
      "# Push database schema",
      "pnpm db:push",
      "",
      "# Start development server",
      "pnpm dev",
    ].join("\n"),
    "Next steps"
  );

  p.outro(`${project.name} is ready!`);
}

main().catch(console.error);
