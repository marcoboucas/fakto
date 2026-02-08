import { Skeleton } from "@/components/ui/skeleton";

export function FormationsLoading() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="border rounded-lg p-6">
          <div className="flex gap-4">
            <Skeleton className="w-40 h-28 rounded-lg" />
            <div className="flex-1 space-y-3">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-8 w-32" />
            </div>
            <Skeleton className="w-32 h-6" />
          </div>
        </div>
      ))}
    </div>
  );
}
