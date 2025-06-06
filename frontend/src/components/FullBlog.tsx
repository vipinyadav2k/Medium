import { Blog } from "../hooks";
import { Appbar } from "./Appbar";
import { Avatar } from "./BlogCard";

export const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Appbar />

      <div className="flex justify-center px-4 sm:px-8 md:px-10 pt-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 w-full max-w-screen-xl">
          {/* Main Blog Content */}
          <div className="md:col-span-8 space-y-4">
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
              {blog.title}
            </h1>
            <p className="text-sm text-gray-500">Posted on 2nd December 2023</p>

            <div className="pt-4 text-base leading-relaxed whitespace-pre-line">
              {blog.content}
            </div>
          </div>

          {/* Author Info */}
          <div className="md:col-span-4 mt-10 md:mt-0">
            <div className="flex items-start gap-4">
              <Avatar size="big" name={blog.author.name || "Anonymous"} />
              <div>
                <div className="text-lg font-semibold">
                  {blog.author.name || "Anonymous"}
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  Passionate writer sharing thoughts to spark minds ✨
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
