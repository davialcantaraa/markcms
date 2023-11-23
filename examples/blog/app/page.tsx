import { allBlogs } from 'contentlayer/generated'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import Main from './Main'

export default async function Page() {
  const markcmsResponse = await fetch(
    'https://markcms.davialcantara.dev/api/v1/models/b741d792-85fd-4971-bec9-6755d4431673/contents',
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.MARKCMS_API_KEY}`,
      },
      cache: "no-cache"
    }
  )

  const markcmsPosts = await markcmsResponse.json()

  console.log(markcmsPosts)

  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)
  return (
    <Main posts={markcmsPosts} />
  )
}
