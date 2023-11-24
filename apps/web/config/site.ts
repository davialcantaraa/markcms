import { env } from "@/env.mjs"

export const SITE_CONFIG = {
  name: "MarkCMS - Headless CMS for developers",
  shortName: "MarkCMS",
  url: env.NEXT_PUBLIC_APP_URL,
  ogImage: `${env.NEXT_PUBLIC_APP_URL}/og.png`,
  description:
    "MarkCMS is a open-source headless Markdown CMS with the best API.",
  links: {
    twitter: "https://twitter.com/davialcantaraa",
    github: "https://github.com/davialcantaraa/markcms",
  },
  creator: {
    name: "Davi Alcântara",
    twitter: "https://twitter.com/davialcantaraa",
    twitterId: "@davialcantaraa",
    github: "https://github.com/davialcantaraa",
    website: "https://davialcantara.dev/",
    mail: "dxvialcantara@gmail.com",
  },
}

export type SITE_CONFIG = typeof SITE_CONFIG
