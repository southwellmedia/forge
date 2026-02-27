import { Skeleton, Card, CardHeader, CardContent } from "@repo/ui";

export default function AccountLoading() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-7 w-24" />
        <Skeleton variant="text" className="mt-1 w-64" />
      </div>

      {/* Change Password */}
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-36" />
          <Skeleton variant="text" className="w-72" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Skeleton variant="text" className="w-28" />
            <Skeleton variant="input" className="w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton variant="text" className="w-24" />
            <Skeleton variant="input" className="w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton variant="text" className="w-36" />
            <Skeleton variant="input" className="w-full" />
          </div>
          <Skeleton variant="button" className="w-36" />
        </CardContent>
      </Card>

      {/* Connected Accounts */}
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-40" />
          <Skeleton variant="text" className="w-64" />
        </CardHeader>
        <CardContent className="space-y-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div className="flex items-center gap-3">
                <Skeleton variant="circle" className="h-5 w-5" />
                <div className="space-y-1.5">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-3.5 w-24" />
                </div>
              </div>
              <Skeleton variant="button" className="h-8 w-24" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive/50">
        <CardHeader>
          <Skeleton className="h-6 w-24" />
          <Skeleton variant="text" className="w-72" />
        </CardHeader>
        <CardContent>
          <Skeleton variant="button" className="w-32" />
        </CardContent>
      </Card>
    </div>
  );
}
