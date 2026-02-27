import { Skeleton } from "@repo/ui";

export default function SettingsLoading() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-9 w-36" />
        <Skeleton variant="text" className="mt-2 w-72" />
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <aside className="md:w-48 shrink-0">
          <div className="flex flex-row md:flex-col gap-1">
            <Skeleton className="h-9 w-full rounded-md" />
            <Skeleton className="h-9 w-full rounded-md" />
          </div>
        </aside>

        <div className="flex-1 min-w-0">
          <div className="rounded-xl border bg-card p-6 space-y-6">
            <div className="space-y-1.5">
              <Skeleton className="h-6 w-40" />
              <Skeleton variant="text" className="w-56" />
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Skeleton variant="text" className="w-16" />
                <Skeleton variant="input" className="w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton variant="text" className="w-16" />
                <Skeleton variant="input" className="w-full" />
              </div>
              <Skeleton variant="button" className="w-28" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
