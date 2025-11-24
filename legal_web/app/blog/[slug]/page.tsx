import { notFound } from "next/navigation";
import { blogPosts } from "../blog_data";

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; // FIX
  console.log("slug is ",slug)
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) return notFound();

  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}
