export default function VideoCardSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Thumbnail */}
      <div className="w-full h-48 bg-gray-300 rounded-lg"></div>

      {/* Text */}
      <div className="mt-3 space-y-2">
        <div className="h-3 bg-gray-300 rounded w-3/4"></div>
        <div className="h-3 bg-gray-300 rounded w-1/2"></div>
      </div>
    </div>
  );
}