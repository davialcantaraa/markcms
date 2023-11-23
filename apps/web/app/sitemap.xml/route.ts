import { SITE_CONFIG } from "@/config/site"

async function generateSiteMap() {
  const publicRoutes = ["", "/home", "/docs", "/upcoming", "/about"]
  const routesMap = publicRoutes.map((route) => ({
    url: `${SITE_CONFIG.url}${route}`,
    lastModified: new Date().toISOString(),
    changeFreq: "daily",
    priority: 1.0,
  }))

  const URLs = [...routesMap]

  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     ${URLs.map(({ url, lastModified, changeFreq, priority }) => {
       return `
       <url>
          <loc>${url}</loc>
          <changefreq>${changeFreq}</changefreq>
          <priority>${priority}</priority>
          <lastmod>${lastModified}</lastmod>
       </url>
     `
     }).join("")}
   </urlset>`
}

// We shouldn't need this but for some reason Next isn't revalidating this route with `revalidatePath`
export const revalidate = 60

export const GET = async () => {
  const sitemap = await generateSiteMap()

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  })
}
