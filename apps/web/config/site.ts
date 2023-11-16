import { env } from "@/env.mjs"

export const SITE_CONFIG = {
  name: "markcms",
  url: env.NEXT_PUBLIC_APP_URL,
  ogImage: `${env.NEXT_PUBLIC_APP_URL}/og.jpg`,
  description: "Open source markdown CMS.",
  links: {
    twitter: "https://twitter.com/davialcantaa",
    github: "https://github.com/davialcantaa/markcms",
  },
}

export type SITE_CONFIG = typeof SITE_CONFIG
