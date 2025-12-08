import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDir = path.join(process.cwd(), 'app/blog/content')
// console.log('postDir',process.cwd())

export function getPostSlugs() {
  return fs.readdirSync(postsDir).filter(f => f.endsWith('.md'))
}

export function getPostBySlug(slug: string) {
    console.log("slug from fetches",slug)
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = path.join(postsDir, `${realSlug}.md`)
  const file = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(file)
  return { slug: realSlug, frontMatter: data as any, content }
}
