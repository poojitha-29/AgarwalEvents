export function Skeleton({ className = '' }) {
  return <div className={`bg-beige-200 animate-pulse rounded-lg ${className}`} />;
}

export function CardSkeleton() {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md">
      <Skeleton className="h-48 w-full rounded-none" />
      <div className="p-5 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    </div>
  );
}
