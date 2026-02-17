// app/blog/BlogListComponent.tsx
import Link from "next/link";
import { blogPosts } from "../app/blog/blog_data";
import { Button } from "./ui/button";

export default function BlogListComponent() {
  const hasBlogs = false; // Set to true to show blogs

  return (
    <div className="relative mb-20">
      {hasBlogs ? (
        <section className="container-custom relative">
          <div className="max-w-7xl mx-auto">
            <h1 className="heading-lg mb-4 mt-10 text-center">Legal Tech Insights</h1>
            <h2 className="paragraph text-center text-gray-700 mb-10">Tech-Enabled Insights for Everyday Legal Needs</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {blogPosts.slice(0, 3).map((post) => (
                <div
                  key={post.slug}
                  className="bg-white text-black rounded-lg shadow hover:shadow-lg transition-shadow p-6 flex flex-col justify-between border"
                >
                  <h2 className="text-xl font-semibold mb-4">{post.title}</h2>
                  {post.excerpt && (
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                  )}
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-auto px-4 py-2 text-blue-500 hover:text-blue-700"
                  >
                    Read more....
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className="container-custom">
            <Link
              href='/blog'
              className="text-xl font-semibold mt-10 absolute right-6 text-blue-500">More Insights
            </Link>
          </div>
        </section>
      ) : (
        <section className="container-custom py-10">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="heading-lg mb-4 mt-10 text-center">Legal Tech Insights</h1>
            {/* <div className="inline-block p-3 rounded-full bg-blue-50 mb-6">
              <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2zM14 2v4a2 2 0 002 2h4" />
              </svg>
            </div> */}
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              COMING SOON....
            </p>
            <div className="h-1 w-20 bg-blue-600 mx-auto rounded-full"></div>
          </div>
        </section>
      )}
    </div>
  );
}
