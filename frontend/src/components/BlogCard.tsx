import { Link } from "react-router-dom";
import { FaRegCalendarAlt, FaBookOpen } from "react-icons/fa";

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id: number;
}

export const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className="w-full max-w-2xl p-6 mb-6 transition-all duration-300 bg-white border border-gray-200 hover:shadow-md rounded-xl cursor-pointer">
        {/* Author Info */}
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <Avatar name={authorName} />
          <span>{authorName}</span>
          <Circle />
          <div className="flex items-center gap-1 text-gray-500">
            <FaRegCalendarAlt className="text-xs" />
            <span>{publishedDate}</span>
          </div>
        </div>

        {/* Title */}
        <h2 className="mt-4 text-xl font-semibold text-gray-900 line-clamp-2">
          {title}
        </h2>

        {/* Snippet */}
        <p className="mt-2 text-gray-700 text-sm leading-relaxed line-clamp-3">
          {content.slice(0, 100) + "..."}
        </p>

        {/* Read Time */}
        <div className="flex items-center gap-2 mt-4 text-xs text-gray-500">
          <FaBookOpen />
          <span>{`${Math.ceil(content.length / 100)} minute(s) read`}</span>
        </div>
      </div>
    </Link>
  );
};

export function Circle() {
  return <div className="w-1 h-1 bg-gray-400 rounded-full" />;
}

export function Avatar({
  name,
  size = "small",
}: {
  name: string;
  size?: "small" | "big";
}) {
  return (
    <div
      className={`flex items-center justify-center rounded-full bg-gray-200 text-gray-800 font-medium ${
        size === "small" ? "w-7 h-7 text-sm" : "w-10 h-10 text-lg"
      }`}
    >
      {name[0].toUpperCase()}
    </div>
  );
}
