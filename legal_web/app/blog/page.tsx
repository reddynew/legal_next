// app/blog/page.tsx
import BlogListComponent from "@/components/BlogList";
import Navbar from "@/components/Navbar";
import { blogPosts } from "./blog_data";
import Link from 'next/link'
import Footer from "@/components/Footer";


export default function page() {
  return (
    <div>
      <Navbar />
      <div>
        <section className="container-custom mb-40">
          <div className="max-w-7xl mx-auto">
            <h1 className="heading-lg font-bold text-gray-900 mb-4 mt-10 text-center font-serif">Legal Tech Insights</h1>
            <h2 className="paragraph text-center text-gray-700 mb-10">Tech-Enabled Insights for Everyday Legal Needs</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
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
                    Read
                  </Link>
                </div>
              ))}
            </div>
          </div>
          {/* <div className="container-custom">
        <Link
           href='/blog'
           className="text-xl font-semibold mt-10 absolute right-6 text-blue-500">More Insights
        
          </Link>
      </div>  */}
        </section>
      </div>
      <Footer/>
    </div>
  );
}
