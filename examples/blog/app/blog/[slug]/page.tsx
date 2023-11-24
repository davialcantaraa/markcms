import { CustomMDX } from "app/components/mdx"
import { getAuthors, getPosts } from "app/db/blog"
import type { Metadata } from "next"
import { notFound } from "next/navigation"

export async function generateMetadata({
  params,
}): Promise<Metadata | undefined> {
  const posts = await getPosts()
  let post = posts.find((post) => post.slug === params.slug)

  if (!post) {
    return notFound()
  }

  let ogImage = `https://blog-markcms.davialcantara.dev/og?title=${post.title}`

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      publishedTime: post.date,
      url: `https://blog-markcms.davialcantara.dev/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
      images: [ogImage],
    },
  }
}

function formatDate(date: string) {
  let currentDate = new Date()
  let targetDate = new Date(date)

  let yearsAgo = currentDate.getFullYear() - targetDate.getFullYear()
  let monthsAgo = currentDate.getMonth() - targetDate.getMonth()
  let daysAgo = currentDate.getDate() - targetDate.getDate()

  let formattedDate = ""

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`
  } else {
    formattedDate = "Today"
  }

  let fullDate = targetDate.toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  return `${fullDate} (${formattedDate})`
}

export default async function Blog({ params }) {
  const posts = await getPosts()
  const authors = await getAuthors()
  let post = posts.find((post) => post.slug === params.slug)
  let author = authors.find((author) => author.name === post?.author)

  if (!post) {
    return notFound()
  }

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            datePublished: post.date,
            dateModified: post.date,
            description: post.summary,
            image: `https://blog-markcms.davialcantara.dev/og?title=${post.title}`,
            url: `https://blog-markcms.davialcantara.dev/blog/${post.slug}`,
            author: {
              "@type": "Person",
              name: author?.name,
            },
          }),
        }}
      />
      <h1 className="title font-medium text-2xl tracking-tighter max-w-[650px]">
        {post.title}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm max-w-[650px]">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {formatDate(post.date)}
        </p>
      </div>
      <article className="prose prose-quoteless prose-neutral dark:prose-invert">
        <CustomMDX source={post.markdown} />
      </article>
    </section>
  )
}
