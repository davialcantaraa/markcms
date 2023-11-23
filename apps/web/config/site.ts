import { env } from "@/env.mjs"

export const SITE_CONFIG = {
  name: "markcms",
  url: env.NEXT_PUBLIC_APP_URL,
  ogImage: `${env.NEXT_PUBLIC_APP_URL}/og.jpg`,
  description: "Open source markdown CMS.",
  links: {
    twitter: "https://twitter.com/davialcantaraa",
    github: "https://github.com/davialcantaraa/markcms",
  },
}

export type SITE_CONFIG = typeof SITE_CONFIG
