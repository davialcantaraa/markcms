export type Post = {
  title: string
  author: string
  tags: string[]
  markdown: string
  created_at: string
  date: string
  published_at: string
  draft: boolean
  summary: string
  slug: string
}

export type Author = {
  name: string,
  avatar: string,
  occupation: string,
  company: string,
  email: string,
  twitter: string,
  linkedin: string,
  github: string,
  about: string,
}

