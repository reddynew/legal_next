// // import { notFound } from "next/navigation";
// // import { blogPosts } from "../blog_data";
// // import Navbar from "@/components/Navbar";

// // export function generateStaticParams() {
// //   return blogPosts.map((post) => ({
// //     slug: post.slug,
// //   }));
// // }

// // export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
// //   const { slug } = await params; // FIX
// //   console.log("slug is ",slug)
// //   const post = blogPosts.find((p) => p.slug === slug);

// //   if (!post) return notFound();

// //   return (
// //     <div>
// //       <Navbar/>
// //     <article>
// //       <h1>{post.title}</h1>
// //       <div dangerouslySetInnerHTML={{ __html: post.content }} />
// //     </article>
// //     </div>
// //   );
// // }
// // app/blog/[slug]/page.tsx
// import fs from "fs";
// import path from "path";
// import { marked } from "marked";
// import sanitizeHtml from "sanitize-html";
// import { notFound } from "next/navigation";
// import { blogPosts } from "../blog_data";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";

// export function generateStaticParams() {
//   return blogPosts
//     .filter(p => p.slug && p.slug.trim().length > 0)
//     .map((post) => ({ slug: post.slug }));
// }

// export default async function BlogPost({ params }: { params: { slug: string } }) {
//   const { slug } = await params;
//   const postMeta = blogPosts.find((p) => p.slug === slug);
//   console.log(postMeta)

//   if (!postMeta) return notFound();

//   // path to markdown file
//   const filePath = path.join(process.cwd(), "app", "blog", "content", `${slug}.md`);

//   if (!fs.existsSync(filePath)) {
//     // fallback: if you still have post.content in blog_data, use it
//     if (postMeta.content) {
//       return (
//         <div>
//           <Navbar />
//           <main className="container-custom py-12">
//             <article className="prose max-w-none">
//               <h1 className="text-3xl font-bold mb-4">{postMeta.title}</h1>
//               <p className="text-gray-600 mb-6">{postMeta.excerpt}</p>
//               <div dangerouslySetInnerHTML={{ __html: postMeta.content }} />
//             </article>
//           </main>
//         </div>
//       );
//     }
//     return notFound();
//   }

//   const md = fs.readFileSync(filePath, "utf8");
//   const rawHtml = marked(md);

//   // sanitize the generated HTML (highly recommended)
//   const safeHtml = sanitizeHtml(rawHtml, {
//     allowedTags: sanitizeHtml.defaults.allowedTags.concat([ "img" ]),
//     allowedAttributes: {
//       ...sanitizeHtml.defaults.allowedAttributes,
//       img: ["src","alt","width","height","loading"],
//     },
//   });

//   return (
//     <div>
//       <Navbar />
//       <main className="container-custom py-12">
//         <article className="prose max-w-none">
//           <h1 className="text-3xl font-bold mb-4">{postMeta.title}</h1>
//           <p className="text-gray-600 mb-6">{postMeta.excerpt}</p>
//           <div dangerouslySetInnerHTML={{ __html: safeHtml }} />
//         </article>
//       </main>
//       <Footer/>
//     </div>
//   );
// }
  import ReactMarkdown from 'react-markdown'
  import { PostLayout } from '@/components/BlogLayout'
  import { getPostSlugs, getPostBySlug } from '@/lib/fetches'
  import Navbar from '@/components/Navbar'

  export async function generateStaticParams() {
    return getPostSlugs().map((file) => ({
      slug: file.replace(/\.md$/, ''),
    }))
  }

  export default async function BlogPostPage({ params }: { params: { slug: string } }) {
     const { slug } = await params;
    console.log('page params', params)
    console.log("slug is", slug)

    const { frontMatter, content } = getPostBySlug(slug)

    return (
      <div>
      <Navbar/>
      <PostLayout
        title={frontMatter.title}
        description={frontMatter.description}
        date={frontMatter.date}
        image={frontMatter.image}
      >
        <ReactMarkdown components={{
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold mt-8">{children}</h1>
        )}}>{content}</ReactMarkdown>
      </PostLayout>
      </div>
    )
  }
