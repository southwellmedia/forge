"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { signOut } from "@repo/auth/client";
import { APP_NAME } from "@repo/utils";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  Divider,
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  FontAwesomeIcon,
  faHome,
  faFolder,
  faGear,
  faBars,
  faSignOutAlt,
  faBolt,
} from "@repo/ui";

interface AppSidebarProps {
  user: {
    name: string;
    email: string;
    image: string | null;
  };
}

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: faHome },
  { href: "/projects", label: "Projects", icon: faFolder },
  { href: "/settings", label: "Settings", icon: faGear },
];

function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-0.5">
      {navItems.map((item) => {
        const isActive =
          pathname === item.href || pathname.startsWith(item.href + "/");

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={isActive ? "page" : undefined}
            className={`
              group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all duration-200
              ${
                isActive
                  ? "bg-primary/[0.08] font-medium text-foreground"
                  : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
              }
            `}
          >
            {/* Active indicator bar */}
            {isActive && (
              <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-full bg-primary" />
            )}
            <FontAwesomeIcon
              icon={item.icon}
              className={`h-3.5 w-3.5 shrink-0 transition-colors ${
                isActive ? "text-primary" : "text-muted-foreground/70 group-hover:text-muted-foreground"
              }`}
            />
            <span className="truncate">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

function SidebarUserSection({ user }: { user: AppSidebarProps["user"] }) {
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const handleSignOut = async () => {
    setSigningOut(true);
    await signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <div className="flex items-center gap-3">
      <Link href="/settings/profile" className="flex items-center gap-3 min-w-0 flex-1 group">
        <Avatar size="sm">
          {user.image && <AvatarImage src={user.image} alt={user.name} />}
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
            {user.name}
          </p>
          <p className="text-xs text-muted-foreground truncate">
            {user.email}
          </p>
        </div>
      </Link>
      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 shrink-0 text-muted-foreground hover:text-foreground"
              onClick={handleSignOut}
              disabled={signingOut}
            >
              <FontAwesomeIcon
                icon={faSignOutAlt}
                className="h-3.5 w-3.5"
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">Sign out</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

function SidebarContent({
  user,
  onNavigate,
}: AppSidebarProps & { onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col">
      {/* Branding */}
      <div className="px-3 py-1">
        <Link
          href="/dashboard"
          onClick={onNavigate}
          className="flex items-center gap-2.5 group"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-xs font-bold">
            <FontAwesomeIcon icon={faBolt} className="h-3.5 w-3.5" />
          </div>
          <span className="text-base font-semibold tracking-tight">
            {APP_NAME}
          </span>
          <Badge variant="outline" size="xs" className="text-[10px] px-1.5">
            alpha
          </Badge>
        </Link>
      </div>

      <Divider soft className="my-4" />

      {/* Navigation */}
      <div className="flex-1 px-2">
        <p className="mb-2 px-3 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/60">
          Menu
        </p>
        <SidebarNav onNavigate={onNavigate} />
      </div>

      {/* User */}
      <div className="px-3 pb-1">
        <Divider soft className="mb-4" />
        <SidebarUserSection user={user} />
      </div>
    </div>
  );
}

export function AppSidebar({ user }: AppSidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:w-60 lg:shrink-0 lg:flex-col lg:border-r lg:bg-card/50">
        <div className="flex h-full flex-col px-3 py-5">
          <SidebarContent user={user} />
        </div>
      </aside>

      {/* Mobile top bar + sheet */}
      <div className="sticky top-0 z-40 flex items-center gap-3 border-b bg-background/95 backdrop-blur px-4 py-3 lg:hidden">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <FontAwesomeIcon icon={faBars} className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-4" showClose={false}>
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <SidebarContent
              user={user}
              onNavigate={() => setMobileOpen(false)}
            />
          </SheetContent>
        </Sheet>
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground text-xs font-bold">
            <FontAwesomeIcon icon={faBolt} className="h-3 w-3" />
          </div>
          <span className="text-sm font-semibold">{APP_NAME}</span>
        </Link>
      </div>
    </>
  );
}
