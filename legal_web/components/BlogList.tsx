// app/blog/BlogListComponent.tsx
import Link from "next/link";
import { blogPosts } from "../app/blog/blog_data";

export default function BlogListComponent() {
  return (
    <>
      {blogPosts.map((post) => (
        <div key={post.slug}>
          <h2>{post.title}</h2>
          <Link href={`/blog/${post.slug}`}>Read</Link>
        </div>
      ))}
    </>
  );
}
