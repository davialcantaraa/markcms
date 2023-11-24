import {
  BarChartIcon,
  DollarSignIcon,
  FileDownIcon,
  ShareIcon,
  SparklesIcon
} from "lucide-react"
import { Metadata } from "next"
import Balancer from "react-wrap-balancer"

import { Icons } from "@/components/icons"
import { SITE_CONFIG } from "@/config/site"
import { absoluteUrl } from "@/lib/utils"

const FEATURES = [
  {
    title: "Activity Tracker",
    description:
      "Keep a comprehensive record of all actions performed within the CMS for enhanced visibility and troubleshooting.",
    icon: <BarChartIcon className="h-8 w-8 text-primary" />,
  },
  {
    title: "Markdown Mastery",
    description:
      "Elevate the Markdown editing experience with advanced features, real-time previews, and a more intuitive interface for seamless content creation.",
    icon: <Icons.logo className="h-8 w-8 text-primary" />,
  },
  {
    title: "Monetization Module",
    description:
      "Integrate a robust billing system to efficiently manage subscriptions, payments, and invoicing for a seamless SaaS experience.",
    icon: <DollarSignIcon className="h-8 w-8 text-primary" />,
  },
  {
    title: "Dynamic Sharing Hub",
    description:
      "Enable users to share content dynamically with customizable routes, fostering collaboration and expanding the reach of your markdown content.",
    icon: <ShareIcon className="h-8 w-8 text-primary" />,
  },
  {
    title: "Ask AI playground",
    description:
      "Unleash the power of artificial intelligence within your CMS with an integrated AI Playground. ",
    icon: <SparklesIcon className="h-8 w-8 text-primary" />,
  },
  {
    title: "Export Wizard",
    description:
      "Facilitate content portability by implementing a feature-rich export tool, allowing users to seamlessly export their markdown content in various formats.",
    icon: <FileDownIcon className="h-8 w-8 text-primary" />,
  },
]

export const metadata: Metadata = {
  title: "Homepage",
  description: SITE_CONFIG.description,
  openGraph: {
    title: "Homepage",
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
    title: "Homepage",
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
    <main className="flex-1">
      <section className="flex flex-col items-center justify-between space-y-6 pb-12 pt-16 lg:py-28">
        <div className="container flex max-w-[64rem] flex-col items-center gap-5 text-center">
          <h1
            className="animate-fade-up bg-gradient-to-br from-gray-900 via-gray-800 to-gray-400 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent opacity-0 sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
          >
            <Balancer>Upcoming</Balancer>
          </h1>

          <p
            className="max-w-[42rem] animate-fade-up leading-normal text-muted-foreground opacity-0 sm:text-xl sm:leading-8"
            style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
          >
            <Balancer>Features that will be implemented soon.</Balancer>
          </p>

        </div>
      </section>
      <section
        id="features"
        className="container space-y-6 py-8 md:py-12 lg:py-24"
      >
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="relative border rounded-xl p-2"
            >
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                {feature.icon}
                <div className="space-y-2">
                  <h3 className="font-bold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
