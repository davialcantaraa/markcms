import { Metadata } from "next"
import Balancer from "react-wrap-balancer"

import { SITE_CONFIG } from "@/config/site"
import { absoluteUrl } from "@/lib/utils"

const FEATURES = [
  {
    title: "Activity Tracker",
    description: "Keep a comprehensive record of all actions performed.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="lucide h-8 w-8 lucide-bar-chart"
      >
        <line x1="12" x2="12" y1="20" y2="10" />
        <line x1="18" x2="18" y1="20" y2="4" />
        <line x1="6" x2="6" y1="20" y2="16" />
      </svg>
    ),
  },
  {
    title: "Markdown Mastery",
    description:
      "Elevate the Markdown editing experience with advanced features.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="lucide h-8 w-8 lucide-heading-1"
      >
        <path d="M4 12h8" />
        <path d="M4 18V6" />
        <path d="M12 18V6" />
        <path d="m17 12 3-2v8" />
      </svg>
    ),
  },
  {
    title: "Monetization Module",
    description:
      "Integrate a robust billing system to efficiently manage subscriptions.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="lucide h-8 w-8 lucide-dollar-sign"
      >
        <line x1="12" x2="12" y1="2" y2="22" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    title: "Dynamic Sharing Hub",
    description:
      "Enable users to share content dynamically with customizable routes.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="lucide h-8 w-8 lucide-share-2"
      >
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
        <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
      </svg>
    ),
  },
  {
    title: "Ask AI playground",
    description:
      "Unleash the power of artificial intelligence within your CMS with an integrated AI Playground. ",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="lucide h-8 w-8 lucide-sparkles"
      >
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
        <path d="M5 3v4" />
        <path d="M19 17v4" />
        <path d="M3 5h4" />
        <path d="M17 19h4" />
      </svg>
    ),
  },
  {
    title: "SDKs",
    description: "Empower your developers with our comprehensive SDKs",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        className="lucide h-8 w-8 lucide-code"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
]

export const metadata: Metadata = {
  title: "Upcoming",
  description: SITE_CONFIG.description,
  openGraph: {
    title: "Upcoming",
    description: SITE_CONFIG.description,
    type: "website",
    url: absoluteUrl(`/upcoming`),
    images: [
      {
        url: absoluteUrl("/opengraph-image.png"),
        width: 1200,
        height: 630,
        alt: "Upcoming opengraph image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Upcoming",
    description: SITE_CONFIG.description,
    images: [absoluteUrl("/opengraph-image.png")],
  },
}

export default async function Page() {
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
            <div key={feature.title} className="relative border rounded-xl p-2">
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
