import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";

export const Blogs = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/signin";
  }

  const { loading, blogs } = useBlogs();

  const ContentWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="max-w-5xl w-full mx-auto px-4 mt-10">
      {children}
    </div>
  );

  if (loading) {
    return (
      <div>
        <Appbar />
        <ContentWrapper>
          <div className="space-y-6">
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
          </div>
        </ContentWrapper>
      </div>
    );
  }

  return (
    <div>
      <Appbar />
      <ContentWrapper>
        <div className="space-y-6">
          {blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              id={blog.id}
              authorName={blog.author.name || "Anonymous"}
              title={blog.title}
              content={blog.content}
              mainImage={blog.mainImage}
              publishedDate={new Date(blog.publishedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            />
          ))}
        </div>
      </ContentWrapper>
    </div>
  );
};
