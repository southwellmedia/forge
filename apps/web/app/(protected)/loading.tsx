export default function ProtectedLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="flex items-center justify-between">
        <div>
          <div className="h-9 w-48 rounded-md bg-muted" />
          <div className="mt-2 h-5 w-64 rounded-md bg-muted" />
        </div>
        <div className="h-10 w-24 rounded-lg bg-muted" />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-xl border bg-card p-6">
            <div className="space-y-2">
              <div className="h-5 w-24 rounded-md bg-muted" />
              <div className="h-4 w-40 rounded-md bg-muted" />
            </div>
            <div className="mt-6 space-y-3">
              <div className="h-4 w-full rounded-md bg-muted" />
              <div className="h-4 w-3/4 rounded-md bg-muted" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
