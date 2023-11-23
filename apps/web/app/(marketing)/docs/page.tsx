import { Plus } from "lucide-react"
import { Metadata } from "next"
import Link from "next/link"
import Balancer from "react-wrap-balancer"

import { BuiltInDocsDialog } from "@/components/docs/built-in-docs-dialog"
import { Icons } from "@/components/icons"
import { Logo } from "@/components/logo"
import { Badge } from "@/components/ui/badge"
import { SITE_CONFIG } from "@/config/site"
import { absoluteUrl } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Documentation",
  description: SITE_CONFIG.description,
  openGraph: {
    title: "Documentation",
    description: SITE_CONFIG.description,
    type: "website",
    url: absoluteUrl(`/home`),
    images: [
      {
        url: absoluteUrl("/opengraph-image.png"),
        width: 1200,
        height: 630,
        alt: "Homepage opengraph image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Documentation",
    description: SITE_CONFIG.description,
    images: [absoluteUrl("/opengraph-image.png")],
  },
}

export default async function Page() {
  const { stargazers_count: stars } = await fetch(
    "https://api.github.com/repos/davialcantaraa/markcms",
    {
      next: { revalidate: 3600 },
    }
  )
    .then((res) => res.json())
    .catch((e) => console.log(e))

  return (
    <main className="flex flex-1 items-center">
      <section className="flex-1 space-y-6 pb-12 pt-16 lg:py-28">
        <div className="container flex max-w-[64rem] flex-col items-center justify-center gap-5 text-center">
          <h1
            className="relative flex animate-fade-up items-start bg-gradient-to-br from-gray-900 via-gray-800 to-gray-400 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent opacity-0 sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
          >
            <Balancer>Docs</Balancer>
            <Badge className="absolute right-0 top-0 translate-x-full tracking-normal">
              Soon
            </Badge>
          </h1>

          <div
            className="flex animate-fade-up justify-center space-x-2 opacity-0 md:space-x-4"
            style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
          >
            <Logo />
            <Plus />
            <Link href="https://nextra.site/" target="_blank">
              <Icons.nextra />
            </Link>
          </div>
          <div
            className="flex animate-fade-up justify-center space-x-2 opacity-0 md:space-x-4"
            style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}
          >
            <BuiltInDocsDialog />
          </div>
        </div>
      </section>
    </main>
  )
}
