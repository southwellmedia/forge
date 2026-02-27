import { Skeleton, Card, CardHeader, CardContent } from "@repo/ui";

export default function ProfileLoading() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-7 w-20" />
        <Skeleton variant="text" className="mt-1 w-52" />
      </div>

      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-40" />
          <Skeleton variant="text" className="w-44" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Skeleton variant="avatar" className="h-12 w-12" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-3.5 w-40" />
            </div>
          </div>

          <div className="space-y-2">
            <Skeleton variant="text" className="w-12" />
            <Skeleton variant="input" className="w-full" />
          </div>

          <div className="space-y-2">
            <Skeleton variant="text" className="w-12" />
            <Skeleton variant="input" className="w-full" />
          </div>

          <Skeleton variant="button" className="w-28" />
        </CardContent>
      </Card>
    </div>
  );
}
