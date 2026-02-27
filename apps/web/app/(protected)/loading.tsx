import { Skeleton, SkeletonText } from "@repo/ui";

export default function ProtectedLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-9 w-48" />
          <Skeleton variant="text" className="mt-2 w-64" />
        </div>
        <Skeleton variant="button" className="w-24" />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-xl border bg-card p-6">
            <div className="space-y-2">
              <Skeleton className="h-5 w-24" />
              <Skeleton variant="text" className="w-40" />
            </div>
            <div className="mt-6">
              <SkeletonText lines={2} lastLineWidth="3/4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
