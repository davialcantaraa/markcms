import { getPosts } from "./db/blog"

export default async function sitemap() {
  const posts = await getPosts()
  let blogs = posts.map((post) => ({
    url: `https://blog-markcms.davialcantara.dev/blog/${post.slug}`,
    lastModified: post.date,
  }))

  let routes = ["", "/blog"].map((route) => ({
    url: `https://blog-markcms.davialcantara.dev${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }))

  return [...routes, ...blogs]
}
