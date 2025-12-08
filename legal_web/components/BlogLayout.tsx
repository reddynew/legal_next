// components/PostLayout.tsx
type PostLayoutProps = {
  title: string
  description?: string
  date?: string
  image:any
  children: React.ReactNode
}

export function PostLayout({ title, description, date, image, children }: PostLayoutProps) {
  return (
    <article className="prose max-w-3xl mx-auto py-12 container-custom">
      <header className="mb-8">
      
  <img src={image} alt={title} />
        <h1 className="text-4xl sm:5xl font-bold mb-2 leading-tight sm:leading-[1.2] mt-4">{title}</h1>
        {description && <p className="text-gray-500">{description}</p>}
        {date && (
          <p className="text-sm text-gray-400 mt-1">
            {new Date(date).toLocaleDateString()}
          </p>
        )}
      </header>
      <section>{children}</section>
    </article>
  )
}
