import { Author, Post } from "app/types"

export async function getPosts(): Promise<Post[]> {
  const contents = await fetch(
    "https://markcms.davialcantara.dev/api/v1/models/b741d792-85fd-4971-bec9-6755d4431673/contents",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.MARKCMS_API_KEY}`,
      },
    }
  )

  return await contents.json()
}

export async function getAuthors(): Promise<Author[]> {
  const authors = await fetch(
    "https://markcms.davialcantara.dev/api/v1/models/6d75e84b-c5a6-4a53-a855-12c0d51fd966/contents",
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.MARKCMS_API_KEY}`,
      },
    }
  )

  return await authors.json()
}
