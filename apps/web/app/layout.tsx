import { AppProvider } from "@/providers/app-provider"

import "@/styles/globals.css"
import { ClerkProvider } from "@clerk/nextjs"
import { Metadata } from "next"
import { PropsWithChildren } from "react"

import { ThemeProvider } from "@/components/theme-provider"
import { SITE_CONFIG } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: SITE_CONFIG.shortName,
    template: `%s - ${SITE_CONFIG.shortName}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    "Next.js",
    "React",
    "ClerkJS",
    "Shadcn",
    "Radix UI",
    "Tailwind CSS",
    "Server Components",
    "Server Actions",
    SITE_CONFIG.shortName,
    "Markdown",
    "Headless CMS",
    "MDX",
    "Markdown editor",
    "MDX editor",
    "Markdown preview",
    "MDX preview",
  ],
  themeColor: [{ media: "(prefers-color-scheme: light)", color: "white" }],
  authors: [
    {
      name: SITE_CONFIG.creator.name,
      url: SITE_CONFIG.creator.website,
    },
  ],
  creator: SITE_CONFIG.creator.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_CONFIG.url,
    title: SITE_CONFIG.shortName,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: SITE_CONFIG.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.shortName,
    description: SITE_CONFIG.description,
    creator: "@davialcantaraa",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#171717",
        },
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.className,
            fontSans.variable
          )}
        >
          <AppProvider>
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
              {children}
            </ThemeProvider>
          </AppProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
