import { ExternalLink } from "lucide-react"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import Balancer from "react-wrap-balancer"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
    <main className="flex flex-1 items-center flex-col">
      <section className="flex-1 space-y-6 pb-12 pt-16 lg:py-28">
        <div className="container flex max-w-[64rem] flex-col items-center justify-center gap-5 text-center">
          <h1
            className="animate-fade-up bg-gradient-to-br from-gray-900 via-gray-800 to-gray-400 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent opacity-0 sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
          >
            <Balancer>Find your template</Balancer>
          </h1>

          <p
            className="max-w-[42rem] animate-fade-up leading-normal text-muted-foreground opacity-0 sm:text-xl sm:leading-8"
            style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
          >
            <Balancer>
              Jumpstart your app development process with pre-built solutions
              from MarkCMS.
            </Balancer>
          </p>
        </div>
      </section>
      <section className="flex-1 space-y-6 pb-12">
        <div className="container flex max-w-[64rem] flex-col items-center justify-center gap-5 text-center ">
          <Link href="https://blog-markcms.davialcantara.dev/blog">
            <Card className="max-w-[320px] overflow-hidden">
              <CardContent className="p-0 h-[180px] max-w-[320px] overflow-hidden">
                <Image
                  src="https://blog-markcms.davialcantara.dev/og.png"
                  alt="MarkCMS Blog image"
                  width={1000}
                  height={600}
                  className="object-cover"
                />
              </CardContent>
              <CardHeader className="items-start">
                <CardTitle>Blog</CardTitle>
                <CardDescription>
                  A simple blog built using MarkCMS
                </CardDescription>
              </CardHeader>
              <CardFooter className="text-muted-foreground text-sm flex justify-between items-center">
                <span>by MarkCMS</span>
                <Link
                  href="https://blog-markcms.davialcantara.dev/blog"
                  className="hover:text-primary"
                >
                  <ExternalLink size={16} />
                </Link>
              </CardFooter>
            </Card>
          </Link>
        </div>
      </section>
    </main>
  )
}
