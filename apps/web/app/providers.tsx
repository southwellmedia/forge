"use client";

import { TRPCProvider } from "@/lib/trpc";
import { Toaster } from "@repo/ui";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TRPCProvider>
      {children}
      <Toaster />
    </TRPCProvider>
  );
}
