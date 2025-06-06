import { Circle } from "./BlogCard";

export const BlogSkeleton = () => {
  return (
    <div role="status" className="w-full max-w-2xl p-6 mb-6 bg-white border border-gray-200 rounded-xl animate-pulse">
      {/* Author row */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-7 h-7 bg-gray-200 rounded-full"></div>
        <div className="h-3 w-24 bg-gray-200 rounded-full" />
        <Circle />
        <div className="h-3 w-20 bg-gray-200 rounded-full" />
      </div>

      {/* Title */}
      <div className="h-4 bg-gray-200 rounded-md w-3/4 mb-3"></div>

      {/* Content snippet */}
      <div className="space-y-2">
        <div className="h-3 bg-gray-200 rounded-md w-full"></div>
        <div className="h-3 bg-gray-200 rounded-md w-5/6"></div>
        <div className="h-3 bg-gray-200 rounded-md w-4/6"></div>
      </div>

      {/* Read time */}
      <div className="mt-4 h-3 w-24 bg-gray-200 rounded-md" />

      <span className="sr-only">Loading...</span>
    </div>
  );
};
