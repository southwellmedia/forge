"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  FontAwesomeIcon,
  faBars,
  faTimes,
} from "@repo/ui";
import { MARKETING_NAV_LINKS } from "./nav-links";

interface MobileNavProps {
  user: { name: string; email: string; image: string | null } | null;
}

export function MobileNav({ user }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="md:hidden flex items-center justify-center h-9 w-9 rounded-md text-muted-foreground hover:text-foreground transition-colors"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
      >
        <FontAwesomeIcon icon={open ? faTimes : faBars} className="h-5 w-5" />
      </button>

      {open && (
        <div id="mobile-menu" className="md:hidden absolute top-16 left-0 right-0 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <nav className="flex flex-col px-6 py-4 gap-1">
            {MARKETING_NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 pt-3 border-t flex flex-col gap-2">
              {user ? (
                <Link
                  href="/dashboard"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-muted/50 transition-colors"
                >
                  <Avatar size="xs">
                    {user.image && <AvatarImage src={user.image} alt={user.name} />}
                    <AvatarFallback>
                      {user.name.split(" ").filter(Boolean).map((n) => n[0]).join("").toUpperCase().slice(0, 2) || user.email[0]?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{user.name.split(" ")[0]}&apos;s Dashboard</span>
                </Link>
              ) : (
                <>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/login" onClick={() => setOpen(false)}>
                      Sign in
                    </Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link href="/register" onClick={() => setOpen(false)}>
                      Get Started
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
