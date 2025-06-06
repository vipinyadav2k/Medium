import { Link } from "react-router-dom";
import { FaRegCalendarAlt, FaBookOpen } from "react-icons/fa";

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  mainImage?: string;
  id: number;
}

export const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate,
  mainImage,
}: BlogCardProps) => {
  return (
    <Link to={`/blog/${id}`} className="block">
      <div className="flex max-w-5xl w-full p-6 mb-6 bg-white border border-gray-200 rounded-xl hover:shadow-lg transition-shadow duration-300 cursor-pointer">
        {/* Left Content */}
        <div className="flex flex-col flex-grow pr-6">
          {/* Author Info */}
          <div className="flex items-center gap-3 text-sm text-gray-600 mb-2">
            <Avatar name={authorName} />
            <span>{authorName}</span>
            <Circle />
            <div className="flex items-center gap-1 text-gray-500">
              <FaRegCalendarAlt className="text-xs" />
              <span>{publishedDate}</span>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-xl font-semibold text-gray-900 line-clamp-2 mb-2">
            {title}
          </h2>

          {/* Snippet */}
          <p className="text-gray-700 text-sm leading-relaxed line-clamp-3 mb-4">
            {content.slice(0, 220)}...
          </p>

          {/* Read Time */}
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <FaBookOpen />
            <span>{`${Math.ceil(content.length / 100)} minute(s) read`}</span>
          </div>
        </div>

        {/* Right Image */}
        {mainImage ? (
          <div className="w-48 h-38 flex-shrink-0 overflow-hidden rounded-lg border border-gray-300">
            <img
              src={mainImage}
              alt="Blog main"
              className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
            />
          </div>
        ) : (
          <div className="w-40 h-28 flex-shrink-0 rounded-lg bg-gray-100 border border-gray-300 flex items-center justify-center text-gray-400 text-sm">
            
          </div>
        )}
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
      className={`flex items-center justify-center rounded-full bg-blue-100 text-blue-800 font-semibold uppercase ${
        size === "small" ? "w-8 h-8 text-sm" : "w-12 h-12 text-lg"
      }`}
    >
      {name[0]}
    </div>
  );
}
